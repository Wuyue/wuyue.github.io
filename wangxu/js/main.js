'use strict'; 
$(window).on("load", function() {	
    
     //PRELOADER
    $('.preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.


    if ($('.isotope_items').length) {

        // PORTFOLIO ISOTOPE
         var $container = $('.isotope_items');
         $container.isotope();

        $('ul.filter li').on("click", function(){
            $("ul.filter li").removeClass("select-cat");
            $(this).addClass("select-cat");				 
            var selector = $(this).attr('data-filter');
            $(".isotope_items").isotope({
                filter: selector,
        });
            return false;
        });

    }  
    
    
}); // window load end 


    
$(document).on("ready", function() {	
    
        
    
    //  CUSTOM SCROLLBAR
        function centerInit() {
            var tavilla =  $('.profile-sidebar').height()
       if ($(window).height() < tavilla ) {
            var hometext = $('.profile-sidebar') 
            hometext.css({
                "height": $(window).height()
            });
            
            }
        }
        centerInit();
        $(window).resize(centerInit);
    
    
    $(function () {
        $('.profile-sidebar').perfectScrollbar({
            suppressScrollX: true
            , wheelSpeed: 100
        });
    });
    
    
    
//    //  ONUR
//    
//    function centerInit() {
//        var tavilla =  $('.sidebar-content').height() + $('.profile-img').height()
//        if ($(window).height() < tavilla ) {
//            $('.profile-img').addClass('hidden');
//            $('.profile-img').removeClass('show');
//        }
//        else{
//           $('.profile-img').addClass('show'); 
//            $('.profile-img').removeClass('hidden'); 
//        }
//        
//    }
//    centerInit();
//    $(window).resize(centerInit);
    
    
     // MOBILE SCROLL
    if ($(window).width() < 768) {
         $(".filter li a").on("click", function(){
            $('html,body').animate({
                scrollTop: $(".content").offset().top},
                'slow');
        });
    }
    
            
    // MAGNIFIC POPUP FOR PORTFOLIO PAGE
    if ($('.image-link').length) {
        $('.image-link').magnificPopup({
            type: 'image'
        });
    }
    
    
    // OWL CAROUSEL GENERAL JS
    if ($('.owl-carousel').length) {
        $('.owl-carousel').each(function () {
            $(this).owlCarousel({
                items: $(this).data('items') ? $(this).data('items') : 3
                , autoPlay: $(this).data('autoplay') ? $(this).data('autoplay') : 2500
                , pagination: $(this).data('pagination') ? $(this).data('pagination') : false
                , itemsDesktop: [1199, 3]
                , itemsDesktopSmall: [991, 1]
            });
        });
    }
    
    //CONTACT MAP
    if ($('#map').length) {
            var myOptions = {
            zoom: 14,
            center: new google.maps.LatLng(40.801485408197856, -63.96745953467104), //change the coordinates
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            mapTypeControl: false
            };

            var map = new google.maps.Map(document.getElementById("map"), myOptions);
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(40.801485408197856, -73.96745953467104) //change the coordinates
            });
            var infowindow = new google.maps.InfoWindow({
                content: "<b>GENNARO GATTUSO</b><br/>2550 Santa Monica Boulevard<br/> Los Angeles"  //add your address
            });
            google.maps.event.addListener(marker, "click", function () {
                infowindow.open(map, marker);
            });
            infowindow.open(map, marker);
    }
    
}); // document ready end 






/* Contact Form JS*/
(function ($) {
    'use strict';
    if ($('.contact-form').length) {
        $(".contact-form").on('submit', function (e) {
            e.preventDefault();
            var uri = $(this).attr('action');
            $("#con_submit").val('Wait...');
            var con_name = $("#con_name").val();
            var con_email = $("#con_email").val();
            var con_message = $("#con_message").val();
            var required = 0;
            $(".requie", this).each(function () {
                if ($(this).val() == '') {
                    $(this).addClass('reqError');
                    required += 1;
                }
                else {
                    if ($(this).hasClass('reqError')) {
                        $(this).removeClass('reqError');
                        if (required > 0) {
                            required -= 1;
                        }
                    }
                }
            });
            if (required === 0) {
                $.ajax({
                    type: "POST"
                    , url: 'mail.php'
                    , data: {
                        con_name: con_name
                        , con_email: con_email
                        , con_message: con_message
                    }
                    , success: function (data) {
                        $(".contact-form input, .contact-form textarea").val('');
                        $("#con_submit").val('Done!');
                        $("#con_submit").addClass("ok");
                    }
                });
            }
            else {
                $("#con_submit").val('Failed!');
            }
        });
        $(".requie").keyup(function () {
            $(this).removeClass('reqError');
        });
    }
})(jQuery);
