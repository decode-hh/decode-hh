define(['jquery', 'menu', 'meetup', 'map', 'countdown'], function($, menu, meetup, map, countdown) {
    var $node = $(document);


// Twitter API Call
    var tweets = [];
    var lastTweet = [];
    $.getJSON("scripts/tweets.json", function(data){
        tweets = data;
        lastTweet = tweets[0];
        var lastTweetDate = new Date(lastTweet.created_at);
        var computedText = createTweet(lastTweet.text, lastTweet.user.screen_name, lastTweetDate);
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

        init: function(data){
            console.log('data', data);
            menu.init();

            var $targetElements = $('[data-target]');

            $targetElements.each(function() {
                var $el = $(this),
                    key = $el.data('target');

                if (key === 'talk'){
                    var talks = data.event.talks,
                        template = $el.find('[data-template=' + key + ']').html(),
                        talknodes = [];

                    talks.forEach(function(talk,i){
                        var $talk = $(template).clone();
                        $talk.find('[data-binding="avatar"]').attr('src', talk.speaker.avatar);
                        $talk.find('[data-binding="twitter"]').attr('href', 'https://twitter.com/' + talk.speaker.twitter);
                        $talk.find('[data-binding="name"]').html(talk.title);
                        $talk.find('[data-binding="description"]').html(talk.description);

                        talknodes.push($talk);
                    });

                    $el.append(talknodes);

                } else if (key === 'event'){
                    var event = data.event,
                        $event = $el.clone(),
                        date = new Date(event.date);

                    $event.find('[data-binding="title"]').html(event.title);
                    $event.find('[data-binding="location"]').html(event.location.name + ', ' + event.location.street + ' ' + event.location.number);
                    $event.find('[data-binding="date"]').html(date.toDateString() + ', ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes());
                    $event.find('[data-binding="image"]').attr('src', event.location.image);

                    //map.init($event.find('#js_map-canvas'), event.location); Currently working on this

                    $el.replaceWith($event);
                    countdown.init(event.date);
                }
            });
        }
    };

    // return {
    //     menu: menu,
    //     countdown: countdown,

    //     init: function(config) {
    //         menu.init();

    //         var $boundElements = $('[data-binding]');


    //         meetup.getNextEvent(function(err, event) {
    //             console.log('next event', event);

    //             $boundElements.each(function() {
    //                 var $el = $(this),
    //                     key = $el.data('binding'),
    //                     value = event[key];

    //                 if(key === 'shortDescription') {
    //                     var $tmp = $('<div>'+event.description+'</div>');

    //                     value = $tmp.find('p:first');
    //                 }

    //                 if(key === 'address') {
    //                     var venue = event.venue;

    //                     value = venue.name + ', ' + venue.address_1 + ', ' + venue.city;
    //                 }

    //                 $el.html(value);
    //             });
    //             map.init(document.getElementById('js_map-canvas'), event.venue);
    //             countdown.init(event.time);
    //         });

    //     }
    // };
});
