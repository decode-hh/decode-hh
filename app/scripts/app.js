/*global define */
define([], function () {
    'use strict';

    return '\'Allo \'Allo!';
});

/* Toggle menu */
var $menu = $(document).find('.menu');
$(document).find('.menuButton').on('click', function(){
    $menu.toggleClass('active');
    console.log('test');
});
