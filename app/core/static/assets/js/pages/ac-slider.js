'use strict';
$(window).on('load',function() {
    setTimeout(function(){

    // [ slider ]
    $('.slider1').owlCarousel({
        items: 1,
        nav: true,
        dots: true,
    });
    $(".slider1 .owl-prev").html('Prev');
    $(".slider1 .owl-next").html('Next');

   // [ Only-Nav slider ]
    $('.slider2').owlCarousel({
        items: 1,
        nav: true,
        dots: false,
    });
    $(".slider2 .owl-prev").html('<i class="feather icon-chevron-left"></i>');
    $(".slider2 .owl-next").html('<i class="feather icon-chevron-right"></i>');

    // [ Only-Dots slider ]
    $('.slider3').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
    });
    },500);
});
