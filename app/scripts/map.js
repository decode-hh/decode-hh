define('map', ['async!https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false!callback'], function(foo) {
    function codeAddress(address, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status !== google.maps.GeocoderStatus.OK) {
                callback(new Error("Geocode was not successful for the following reason: " + status));
            } else {
                callback(null, results[0].geometry.location);
            }
        });
    }

    return {
        init: function(canvasEl, venue) {
            var mapOptions = {
                zoom: 16,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(canvasEl, mapOptions);

            codeAddress(venue.address_1, function(err, location) {
                map.setCenter(location);

                var marker = new google.maps.Marker({
                    map: map,
                    position: location
                });

            });
        }
    }
});