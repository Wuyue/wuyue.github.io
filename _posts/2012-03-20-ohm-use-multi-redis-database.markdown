---
layout: post
title:  Ohm使用多个redis库
date:   2014-03-20
categories: jekyll update
---

Redis提供两种持久化数据备份方式，rdb和aof。这两种方式在save或重写的时候都会开起一个新的进程。也就是说如果redis数据有10G的话，那么在做备份的时候，机器的内存至少得要20G才能做到。相当于服务器的内存一直要保证在数据的两倍以上才行，要不然备份的时候线上服务立马卡死，造成了极大的浪费。

但是如果把10G的数据分成5分，每份2G，每个库备份的时间错开。那在做备份的时候，也最多吃掉12G的内存，节省了内存。重点是操作起来也相当简单。完全不影响开发效率。
当然，更高端的数据库方案，这里不讨论，只是提供一种减轻redis内存压力的思路。

配置多个数据库，redis.yml

```ruby
redis1:  
  driver: hiredis  
  host: 127.0.0.1  
  password:  
  port: 1989  
  
redis2:  
  driver: hiredis  
  host: 127.0.0.1  
  password:  
  port: 1990 
```

然后，创建多个redis连接

```ruby
REDIS_SERVERS = YAML.load_file(File.join(Rails.root, 'config', 'redis.yml')) rescue {}  
REDIS = {}  
REDIS_SERVERS.map do |k,v|  
	REDIS[k] = Redis.new v  
end 
```

然后，扩展一下Ohm

```ruby
class OhmModel < Ohm::Model  
  @database = 'redis1'  

  class << self    
    attr_accessor :database    
  end  

  def redis  
    REDIS[@database]  
  end  

  alias :db :redis  
end  
```

然后，在Model里面设置对应的数据库

```ruby
class Test < OhmModel 
  @database = 'redis1'
  #...
end
  
class Test2 < OhmModel
  @database = 'redis2' 
  #...
end
```

再然后，就没有然后了

OK，搞定，collection,reference照常使用，不影响
