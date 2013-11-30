define(['jquery', 'menu', 'countdown'], function($, menu, countdown) {
    var $node = $(document);


// Twitter API Call
    var tweets = [];
    var lastTweet = [];
    $.getJSON("scripts/tweets.json", function(data){
        tweets = data;
        lastTweet = tweets[0];
        var lastTweetDate = new Date(lastTweet.created_at);
        var computedText =

            createTweet(lastTweet.text, lastTweet.user.screen_name, lastTweetDate);
    });

    function wrap( str ) {
        return '<a href="' + str + '" target="_blank">' + str + '<\/a>';
    }

    function createTweet(text, user, date){
        var options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        var $tweet = $node.find('.tweet');
        $tweet.find('p').append(text.replace(/\bhttp[^ ]+/ig, wrap));
        $tweet.find('cite a').append('@' + user).attr('href', 'http://twitter.com/' + user).after(' on ' + date.toLocaleTimeString("en-us", options));
    }

    return {
        menu: menu,
        countdown: countdown,

        init: function(config) {
            menu.init();
            countdown.init(config.nextEventTime);
        }
    };
});