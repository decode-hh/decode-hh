define(['jquery'], function($) {
    "use strict";

    var $doc = $(document);

    return {
        init: function() {
            this.isShown = false;

            this.$menu = $('.menu');
            this.$trigger = $('.menuButton');

            this._bindEvents();
        },

        show: function() {
            if(this.isShown) { return; }

            this.isShown = true;
            this.$menu.addClass('active');
        },

        hide: function() {
            if(!this.isShown) { return; }

            this.isShown = false;
            this.$menu.removeClass('active');
        },

        toggle: function() {
            if(this.isShown) {
                this.hide();
            } else {
                this.show();
            }
        },

        _bindEvents: function() {
            var self = this;

//            this.$menu.on('click', function(ev) { ev.stopPropagation(); });
            this.$trigger.on('click', function(ev) {
                self.toggle();

                ev.stopPropagation();
                ev.preventDefault();
            });

            $doc.on({
                keydown: function(ev) {
                    if(ev.keyCode === 27) { self.hide(); }
                    if(ev.keyCode === 77 /* 'm' */) { self.show(); }
                },
                click: function() { self.hide(); }
            });
        }
    };
});