define('map', ['async!https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&sensor=false!callback'], function(foo) {
    var getGeo = function(address){
        var addressString = address.street + ' ' + address.number + ',' + address.zip + ' ' + address.city;

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode( {'address': addressString}, function(results, status) {
            console.log('geo', results[0].geometry.location);
            if (status == google.maps.GeocoderStatus.OK) {
                return results;

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };

    var createMap = function(canvasEl, results){
        var mapOptions = {
            zoom: 16,
            center: results[0].geometry.location,
            disableDefaultUI: true
        };

        return new google.maps.Map(canvasEl, mapOptions);
    };

    var setMarker = function(results, map, existingMarker){
        if (existingMarker){
            var marker = existingMarker;
            marker.position = results[0].geometry.location;
        } else {
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        }
    };

    var placesSearch = function(results, map){
        var locationRequest = {
            location: results[0].geometry.location,
            radius: '500',
            query: address.name
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(locationRequest, function(results, status){
            setMarker(results, map);
            console.log(map.center);
            map.center = results[0].geometry.location;
        });
    };

    return {
        init: function(canvasEl, address) {

        }
    };

        // return {
        //     init: function(canvasEl, venue) {
        //         console.log(venue)
        //         var location = new google.maps.LatLng(53.5570026,9.9256488);
        //         console.log(location);
        //         var mapOptions = {
        //             center: location,
        //             zoom: 16,
        //             disableDefaultUI: true,
        //             mapTypeId: google.maps.MapTypeId.ROADMAP
        //         };

        //         var map = new google.maps.Map(canvasEl, mapOptions);

        //         var marker = new google.maps.Marker({
        //             map: map,
        //             position: location
        //         });
        //     }
        // }
});
