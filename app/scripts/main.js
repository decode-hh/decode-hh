require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery'
    },
    shim: {}
});

require(['app', 'jquery'], function (app, $) {
    'use strict';

    $(function() {
        app.init({
            nextEventTime: '12 4 2013 19:00'
        });
    });
});