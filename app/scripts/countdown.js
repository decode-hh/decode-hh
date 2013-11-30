define(['jquery'], function($) {
    function flip(el){
        if(!el.classList.contains('flip')){
            el.classList.add('flip');
        } else {
            setTimeout(flip, 20, el);
            el.classList.remove('flip');
        }
    }

    function zeroPad(n) {
        // 1 --> 101 -> 01
        return String(100+n).slice(1);
    }

    return {
        init: function(nextEventTime) {
            var eventDate = new Date(nextEventTime),
                eventTimestamp = eventDate.getTime();

            var s = $('.js_counter_seconds').get(0),
                m = $('.js_counter_minutes').get(0),
                h = $('.js_counter_hours').get(0),
                d = $('.js_counter_days').get(0);

            var view = {
                _el: { d: d, h: h, m: m, s: s },
                _last: { d: 0, h: 0, m: 0, s: 0 },

                _datasets: {
                    d: d.children[1].dataset,
                    h: h.children[1].dataset,
                    m: m.children[1].dataset,
                    s: s.children[1].dataset
                },

                _lastDatasets: {
                    d: d.children[0].dataset,
                    h: h.children[0].dataset,
                    m: m.children[0].dataset,
                    s: s.children[0].dataset
                },

                update: function(remaining) {
                    var last = this._last,
                        d = this._datasets,
                        ld = this._lastDatasets;

                    $.each(this._el, function(prop) {
                        if(last[prop] !== remaining[prop]) {
                            ld[prop].time = zeroPad(last[prop]);
                            d[prop].time = zeroPad(remaining[prop]);

                            last[prop] = remaining[prop];
                            flip(this);
                        }
                    });
                }
            };

            var remainingTime = { d: 0, h: 0, m: 0, s: 0 };

            function getRemainingTime(now) {
                var ts = eventTimestamp - now;

                remainingTime.s = Math.floor((ts / 1000) % 60);
                remainingTime.m = Math.floor((ts / (1000 * 60)) % 60);
                remainingTime.h = Math.floor((ts / (1000 * 60 * 60)) % 24);
                remainingTime.d = Math.floor(ts / (1000 * 60 * 60 * 24));

                return remainingTime;
            }

            (function clock() {
                window.setTimeout(clock, Math.max(1000, 1));

                view.update(getRemainingTime(Date.now()));
            } ());
        }
    }
});