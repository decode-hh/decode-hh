define('map', ['async!https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false!callback'], function(foo) {
    return {
        init: function(canvasEl, venue) {
            var location = new google.maps.LatLng(venue.lat,venue.lon);
            var mapOptions = {
                center: location,
                zoom: 16,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(canvasEl, mapOptions);

            var marker = new google.maps.Marker({
                map: map,
                position: location
            });
        }
    }
});
