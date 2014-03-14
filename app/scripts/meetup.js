define('meetup', ['jquery'], function($) {
    var SINGNED_REQUEST_URL = 'http://api.meetup.com/2/events?status=upcoming&order=time&limited_events=False&group_urlname=decode-hh&desc=false&offset=0&format=json&page=20&fields=&sig_id=13373526&sig=c4f2f84603dea9af69a3f273196a6e1fa5729a97'

    return {
        getEvents: function(callback) {
            $.ajax({
                dataType: "jsonp",
                url: SINGNED_REQUEST_URL,
                success: function(data) {
                    if(!data || !data.results) {
                        return callback(new Error('failed to retrieve data'));
                    }

                    return callback(null, data.results);
                }
            });
        },

        getNextEvent: function(callback) {
            this.getEvents(function(err, events) {
                if(err) { return callback(err); }

                return callback(null, events[0]);
            });
        }
    }
});