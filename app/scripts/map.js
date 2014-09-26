define('map', ['async!https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&sensor=false!callback'], function(foo) {

    var placesSearch = function(canvasEl, address, callback){
        var locationRequest = {
            location: {lat:53.558572,lng:9.9278215},
            radius: '7000',
            query: [address.name, address.street + ' ' + address.number, address.zip + ' ' + address.city].join(',')
        };

        service = new google.maps.places.PlacesService(canvasEl);
        service.textSearch(locationRequest, function(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                if (callback){
                    callback(canvasEl, results, setMarker);
                }

                return results;

            } else{
                alert('Location was not successful for the following reason: ' + status);
            }
        });
    };

    var createMap = function(canvasEl, results, callback){
        var location = results[0].geometry.location || {lat:53.558572,lng:9.9278215}; // std is location of Hamburg
        var mapOptions = {
            zoom: 16,
            center: location,
            disableDefaultUI: true
        };

        var map = new google.maps.Map(canvasEl, mapOptions);
        if (callback){
            callback(map, location);
        }

        return map;
    };

    var setMarker = function(map, location, recenter){
        var marker = new google.maps.Marker({
            map: map,
            position: location
        });

        if (recenter){
            map.setCenter(results[0].geometry.location);
        }

        return marker;
    };

    return {
        init: function(canvasEl, address) {
            var place = placesSearch(canvasEl, address, createMap);
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
