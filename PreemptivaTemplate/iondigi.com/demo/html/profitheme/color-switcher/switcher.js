(function($, window) {
    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name,"",-1);
    }

    switcher = {
        data: {
            pathToColorScheme: './css/color-schemes/'
        },
        init: function() {
            var _self = this;
            $.get( "color-switcher/template.html", function(data) {
                _self.$switcherBody = $(data);
                $("body").append(_self.$switcherBody);
                _self.initSwitcher();
            });
        },
        initSwitcher: function() {
            this.$switcherBody.find('.switcher-trigger').click(function() {
                _self.$switcherBody.toggleClass('active');
            });
            this.initColorSwitcher();
        },
        initColorSwitcher: function() {
            _self = this;
            var $stylelink = $('<link rel="stylesheet" type="text/css" href="">');
            $('head').append($stylelink);
            var color = readCookie('profi-color');
            if(color) {
                var href = _self.data.pathToColorScheme + color + '_scheme.css';
                $stylelink.attr('href', href);
            }

            this.$switcherBody.find('#switcher-reset-button').click(function(event) {
                event.preventDefault();
                $stylelink.attr('href', '');
                eraseCookie('profi-color');
                $(".switcher-option-color li").removeClass("active")
                return false;
            });
            this.$switcherBody.find('.switcher-option-color li').click(function() {
                var href = _self.data.pathToColorScheme + $(this).data('color') + '_scheme.css';
                $stylelink.attr('href', href);
                createCookie('profi-color', $(this).data('color'), 30);
                $(".switcher-option-color li").removeClass("active");
                $(this).addClass("active")
            });
        }
    }
    switcher.init();

})(jQuery, window);