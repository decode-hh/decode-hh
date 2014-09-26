require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        async: '../bower_components/requirejs-plugins/src/async'
    },
    shim: {}
});

require(['app', 'jquery'], function (app, $) {
    'use strict';

    $(function() {
        $.getJSON("../events/2014-10-01.json", function(data){
            var event = data;
            app.init(data);
        });

    });
});
