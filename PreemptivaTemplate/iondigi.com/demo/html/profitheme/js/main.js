
// Smooth scroll
uAgent = navigator.userAgent;
macOS = uAgent.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false;
mobileIE = uAgent.indexOf('IEMobile') !== -1;
touch = false;
windowWidth = $(window).width();
windowHeight = $(window).height();
documentHeight = $(document).height();
isNewerIe = uAgent.match(/msie (9|([1-9][0-9]))/i);
isOlderIe = uAgent.match(/msie/i) && !isNewerIe;
isAncientIe = uAgent.match(/msie 6/i);
isIe = isAncientIe || isOlderIe || isNewerIe;
latestKnownScrollY = $('html').scrollTop() || $('body').scrollTop();
ticking = false;
// Smooth scroll end

$(document).ready(function () {
    if ('ontouchstart' in window || 'onmsgesturechange' in window) {
        touch = true;
    }

    var footerHeight = $('footer').height(),
        map;

    $(window).on('load', function () {
        // PRELOADER
        var preloader = $('#page-preloader');
        setTimeout(function () {
            for (var i = 0; i <= 100; i++){
                (function(i){
                 setTimeout(function () {
                    preloader.css({
                      '-moz-background': 'radial-gradient(circle,transparent '+i+'%, white 0%)',
                      '-o-background': 'radial-gradient(circle,transparent '+i+'%, white 0%)',
                      '-webkit-background': 'radial-gradient(circle,transparent '+i+'%, white 0%)',
                     'background': 'radial-gradient(circle,transparent '+i+'%, white 0%)'
                     });
                }, 3*i);
             })(i);
            }
            preloader.removeClass('pageload-loading');
        }, 2000);
        setTimeout(function () {
            preloader.css('z-index','-1');
            $('.main-section .animated').addClass('play-animation');
            $('.main-section').addClass('play-animation');
        },2300);
        // PRELOADER END
    
        Parallax.initialize();
    });

    $(window).on("scroll", function () {
        latestKnownScrollY = $('html').scrollTop() || $('body').scrollTop();
        requestAnimation();
        if ($(document).width() > 1024) {
            if ($(window).scrollTop() > 100) {
                $(".navbar.main-menu").addClass("navbar-fixed");
            } else {
                $(".navbar.main-menu").removeClass("navbar-fixed");
            }
        }
        // fix menu end
    });
    $(document)
      .on('focus', 'input,textarea ', function(e) {
          $('body').addClass('fixfixed');
      })
      .on('blur', 'input,textarea ', function(e) {
          $('body').removeClass('fixfixed');
      });
    if ($(document).width() > 1024) {
        if ($(window).scrollTop() > 100) {
            $(".navbar.main-menu").addClass("navbar-fixed");
        } else {
            $(".navbar.main-menu").removeClass("navbar-fixed");
        }
    }
    // mobile menu
    if ($(document).width() < 1025) {
        $(".main-menu").addClass("mobile-menu");
    } else {
        $(".main-menu").removeClass("mobile-menu");
    }

    $(window).on("resize", function () {
        windowWidth = $(window).width();
        windowHeight = $(window).height();
        Parallax.initialize();
        if ($(document).width() < 1025) {
            $(".main-menu").addClass("mobile-menu");
        } else {
            $(".main-menu").removeClass("mobile-menu");
        }
        $('body').css('padding-bottom', footerHeight);
    });

    $(document).on("click", ".mobile-menu-btn", function () {
        $(".main-menu").toggleClass("mobile-menu-open");
        $(".mobile-menu-btn").toggleClass("active");
        $("html, body").toggleClass("no-scroll");
    });
    // mobile menu END

    // main block height
    if (!$('.main-section').hasClass("no-index")) {
        $('.main-section').css('height', $(window).height());
        $(window).resize(function () {
            $('.main-section').css('height', $(window).height());
        });
    }
    // main block height END
    
    // footer height
    $('body').css('padding-bottom', footerHeight);
    // footer height END
    

    // google map init map
    function initialize() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            scrollwheel: false,
            center: {lat: 40.711557, lng: -74.016489}
        });

        // marker
        var marker = new google.maps.Marker({
        map: map,
        position: {lat: 40.711557, lng: -74.016489},
        title: 'Hello World!'
      });

    }
    google.maps.event.addDomListener(window, 'load', initialize);
    // google map END

    // footer map open  
        $(document).on("click", ".open-map", function () {
            $(this).addClass("_open-map");
            return false;
        });
        $(document).on("click", "#map", function () {
            return false;
        });
        $(document).on("click", "body", function () {
            $('.open-map').removeClass("_open-map");
        });
    // footer map open end    

    // anchor scrollTo
    if($("body").hasClass("index")) {
        $('.navbar-nav a[href*=#]').bind("click", function (e) {
            var anchor = $(this);
            if(anchor.parent().hasClass('reserve'))
                return;

            $('.navbar-nav > li').removeClass('active');
            $(this).parent(".navbar-nav li:not(.reserve)").addClass('active');
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 500);
            
            if($(this).parents(".main-menu").is(".mobile-menu, .mobile-menu-open")) {
                $(".main-menu").removeClass("mobile-menu-open");
                $(".mobile-menu-btn").removeClass("active");
                $("html, body").removeClass("no-scroll");
            }
            
            e.preventDefault();
            return false;
        });

        $("section, footer").waypoint(function (direction) {
            if (direction === "down") {
                $(".navbar-nav a[href*=#" + this.element.id + "]").parent().addClass('active').siblings().removeClass('active');
            }
        }, {
            offset: "50%"
        });
        
        $("section, footer").waypoint(function (direction) {
            if (direction === "up") {
                $(".navbar-nav a[href*=#" + this.element.id + "]").parent().addClass('active').siblings().removeClass('active');
                if(this.element.id == "main-section") {
                    $(".navbar-nav > li").removeClass('active');
                }
            }
        }, {
            offset: "-1%"
        });
    }
    // anchor scroll end

    // counter
    if($('.counter').length > 0) {
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
    }
    // counter end

    // slide bottom
    $(document).on("click", ".slide-bottom span", function () {
        $('html, body').animate({'scrollTop': $('section:eq(1)').offset().top}, 500);
        return false;
    });
    // slide bottom end

    //form reservation focus
    $(document).on("focus", ".form-control", function () {
        $(this).parent().find(".input-group-addon").addClass("focus");
    });

    $(document).on("blur", ".form-control", function () {
        $(this).parent().find(".input-group-addon").removeClass("focus");
    });
    //form reservation focus end

    // resrevation open
    $(document).on("click", ".reserve-popup, .main-menu li.reserve", function(){
        $("#reservation").fadeIn();
        return false;
    });
    $(document).on("click", "#reservation .modal-header button.close, #reservation", function(){
        $("#reservation").fadeOut();
        return false;
    });
    $(document).on("click", ".modal-content", function(){
        return false;
    });
    $(document).on("click", ".modal-content .btn", function(){
        event.stopPropagation();
    });
    // resrevation open end

    // share links open
    $(document).on("click", ".share p", function () {
        $(this).toggleClass("active");
        $(this).parent().find("ul.share-links").slideToggle("active");
    });
    // share links open end
    
    //Reserve form validation
    $(document).on("submit", "form#formReservation, form#formReservation-2", function() {
        if(!validation($(this).attr("id"))) {
            //here code if validation is successful
        }
        return false;
    });
    //End reserve form validation
    
    //Comment form validation
    $(document).on("submit", "form#formComment", function() {
        if(!validation($(this).attr("id"))) {
            //here your code
        }
        return false;
    });
    //End comment form validation
    //Reserve form validation
    $(document).on("submit", "form#subscribe-form", function() {
        if(!validation($(this).attr("id"))) {
            $(this).find('input[type="email"]').parent().append('<strong class="field-success">Success</strong>');
        }
        return false;
    });

    //End reserve form validation

    //Initialize all sliders
    if(typeof Resto != 'undefined') {
        if($('.main-section.version-4 .main-section-slider').length > 0) {
            mainSlider = Resto.Slider.in($('.main-section.version-4 .main-section-slider'), {
                loop: true,
                autoplay: true,
                type: 'book-slider',
                dots: false,
                nextArrow: '.main-section.version-4 .next',
                previousArrow: '.main-section.version-4 .prev'
            });
        }
        
        if($('.customers-carousel').length > 0) {
            clientSlider = Resto.Slider.in($('.customers-carousel'), {
                type: 'accordion-slider',
                dots: true,
                loop: true,
                autoplay: true,
            });
        }

        if($('.products.version-1 .products-list').length > 0) {
            dishesSlider = Resto.Slider.in($('.products.version-1 .products-list'), {
                loop: true,
                autoplay: true,
                type: 'accordion-slider',
                dots: '.products-thumbs li',
                nextArrow: '.products-body .next',
                previousArrow: '.products-body .prev'
            });
        }
        
        if($('.products.version-2 .products-list').length > 0) {
            if ($(document).width() < 768) {
                dishesSlider2 = Resto.Slider.in($('.products.version-2 .products-list'), {
                    loop: true,
                    autoplay: true,
                    dots: true,
                    type: 'inline-multi-slider',
                    pagePagination: true,
                    nextArrow: '.products-body .next',
                    previousArrow: '.products-body .prev'
                });
            } else {
                dishesSlider2 = Resto.Slider.in($('.products.version-2 .products-list'), {
                    loop: true,
                    autoplay: true,
                    dots: false,
                    type: 'inline-multi-slider',
                    pagePagination: true,
                    nextArrow: '.products-body .next',
                    previousArrow: '.products-body .prev'
                });
            }

        }
        
        if($('.products.version-3 .products-list').length > 0) {
            dishesSlider3 = Resto.Slider.in($('.products.version-3 .products-list'), {
                loop: true,
                autoplay: true,
                dots: false,
                type: 'inline-multi-slider',
                pagePagination: true,
                nextArrow: '.products-body .next',
                previousArrow: '.products-body .prev'
            });
        }
        
        if($('.news-home.version-4 .news-list').length > 0) {
            dishesSlider4 = Resto.Slider.in($('.news-home.version-4 .news-list'), {
                dots: false,
                loop: true,
                autoplay: true,
                type: 'book-slider',
                nextArrow: '.news-home.version-4 .news-body .next',
                previousArrow: '.news-home.version-4 .news-body .prev'
            });
        }

        if($('.team-carousel').length > 0) {
            teamSlider = Resto.Slider.in($('.team-carousel'), {
                dots: true,
                type: 'inline-multi-slider',
                pagePagination: true
            });
        }
        
        if($('.news-home.version-1 .news-list').length > 0) {
            newsSlider = Resto.Slider.in($('.news-home.version-1 .news-list'), {
                dots: true,
                loop: true,
                autoplay: true,
                type: 'book-slider',
                nextArrow: '.news-home.version-1 .news-body .next',
                previousArrow: '.news-home.version-1 .news-body .prev',
            });
        }
    }
    //Initialize all sliders end

    // galleru initialize
    if($('#gallery-list').length > 0) {
        document.getElementById('gallery-list').onclick = function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement,
                link = target.src ? target.parentNode : target,
                options = {index: link, event: event},
                links = this.getElementsByTagName('a');
            blueimp.Gallery(links, options);
        }
    }
    // galleru initialize end

    // animation
    if ($(document).width() > 1024) {
        $(".main-section .main-section-title h1, .main-section .main-section-title h3, .main-section .main-section-title a, .main-section.version-4 .arrow-block a").hide().show().resto_animated("fadeInUp", "fadeOutUp");
    }
    //End animation
});

(function ($) {
    "use strict";
    $.fn.resto_animated = function (inEffect, outEffect) {
        $(this).css("opacity", "0").addClass("animated").waypoint(function (dir) {
            if (dir === "down")
                $(this.element).removeClass(outEffect).addClass(inEffect).css("opacity", "1");
        }, {
            offset: "90%"
        });

        $(this).css("opacity", "0").addClass("animated").waypoint(function (dir) {
            if (dir === "up")
                $(this.element).removeClass(outEffect).addClass(inEffect).css("opacity", "1");
        }, {
            offset: "5%"
        });
    };
})(jQuery);

(function() {
    'use strict';
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame'] || window[vp+'CancelRequestAnimationFrame']);
    }
    
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());


function updateParallax() {
    ticking = false;
    Parallax.update();
}

function requestAnimation() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
    }
    ticking = true;
}

function validation (formId) {
    if($('form#'+ formId +' .field-success')[0] ) $('form#'+ formId +' .field-success').remove();
    $('form#'+ formId +' .field-error').remove();
    $('form#'+ formId +' .form-control').removeClass('inputError');
    var hasError = false;
    $('form#'+ formId +' .requiredField').each(function() {
        if(jQuery.trim($(this).val()) == '' || jQuery.trim($(this).val()) == jQuery.trim($(this).attr('placeholder'))){
            $(this).parent().append('<strong class="field-error">This is a required field</strong>');
            $(this).addClass('inputError');
            hasError = true;
        } else {
            if($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if(!emailReg.test(jQuery.trim($(this).val()))){
                    $(this).parent().append('<strong class="field-error">Please enter a valid email address.</strong>');
                    $(this).addClass('inputError');
                    hasError = true;
                } 
            } else if($(this).hasClass('phone')) {
                var phoneReg = /^\+?[0-9 ]*$/;
                if(!phoneReg.test(jQuery.trim($(this).val()))){
                    $(this).parent().append('<strong class="field-error">Please enter a valid phone number.</strong>');
                    $(this).addClass('inputError');
                    hasError = true;
                } 
            } else if($(this).hasClass('date')) {
                var dateReg = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
                if(!dateReg.test(jQuery.trim($(this).val()))){
                    $(this).parent().append('<strong class="field-error">Please enter a valid date.</strong>');
                    $(this).addClass('inputError');
                    hasError = true;
                } 
            } else if($(this).hasClass('time')) {
                var dateReg = /^[0-9]{2}:[0-9]{2}$/;
                if(!dateReg.test(jQuery.trim($(this).val()))){
                    $(this).parent().append('<strong class="field-error">Please enter a valid time.</strong>');
                    $(this).addClass('inputError');
                    hasError = true;
                } 
            } else if($(this).hasClass('persons')) {
                var personsReg = /^[1-9]{1}[0-9]{0,1}$/;
                if(!personsReg.test(jQuery.trim($(this).val()))){
                    $(this).parent().append('<strong class="field-error">Please enter a valid number of persons.</strong>');
                    $(this).addClass('inputError');
                    hasError = true;
                } 
            }
        }
    });
    
    return hasError;
}


// Style swicher Temp
$.getScript( "color-switcher/switcher.js" )