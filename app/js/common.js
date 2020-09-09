$(document).ready(function(){

    var element = document.querySelector( '.main-mnu' );

    var droppy = new Droppy( element, {
        parentSelector: 'li',
        dropdownSelector: 'li > ul',
        triggerSelector: 'a'
    } );

    $('.droppy__parent').on("mouseenter", function(){
        $(this).children('.droppy__drop ').addClass('droppy__drop--active')
    });

    $('.droppy__parent').on("mouseleave", function(){
        $(this).children('.droppy__drop ').removeClass('droppy__drop--active')
    });


    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-back",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */


    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });





    $('.intro-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        // autoplay: true,
        autoplaySpeed: 6000,
        fade: true,
        cssEase: 'linear',
        arrows: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    adaptiveHeight: true
                }
            }
        ]
    });

    function heightses() {
        if ($(window).width()>480) {
            $('.tabs-slider .product-item-title').matchHeight();
            $('.stocks-wrap .product-item-title').matchHeight({byRow: true});
            $('.s-similar .product-item-title').matchHeight({byRow: true});
        }
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    $('.tabs').tabs();

    $( ".tabs" ).on( "tabsactivate", function( event, ui ) {
        let tabId = ui.newPanel.attr('id');


        setTimeout(function(){
            heightses();
            $('#'+tabId).find('.tabs-preloader').hide();
        }, 1000)
    } );



    $('.product-slider').owlCarousel({
        loop:false,
        nav:false,
        items: 1,
        thumbs: true,
        dots: false,
        thumbsPrerendered: true,
        thumbItemClass: 'product-nav',
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        mouseDrag: false,
        navText: ['', ''],
    });



    $('.tabs-slider').owlCarousel({
        loop: false,
        nav:true,
        items: 4,
        margin: 30,
        autoHeight: false,
        dots: false,
        navText: ['',''],
        responsive: {
            0: {
                items: 1,
                nav: false,
                margin: 10,
                autoHeight: true
            },
            480: {
                items: 2,
                nav: false,
                margin: 10
            },
            992: {
                items: 3,
                nav: true,
                margin: 10
            },
            1200: {
                items: 4
            }
        }
    });

    $('.product-item-rate').raty({
        path: "libs/raty/img/"
    });

    $('.product-rate').raty({
        path: "libs/raty/img/"
    });

    $('.filter select').styler();

    $('.preloader').fadeOut();


    $('.spinner-amount').on('click', 'button', function(e){
        var parent = $(this).parents('.spinner-amount');
        var input = parent.find('.amount');
        var amount = input.val();
        var btn = parent.siblings('.btn');

        var product = $(this).parents('.product-wrap');
        var cartBtn = product.find('.add_to_cart_button');


        if (!$(this).is('.down')) {
            amount++
        } else {
            if (amount > 0) amount--
        }

        input.val(amount).attr('value', amount);

        cartBtn.attr("data-quantity", amount);
    });


    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
});
