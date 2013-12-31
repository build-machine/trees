(function() {
    "use strict";

    window.HaulerCtrl = function HaulerCtrl ($scope, $http) {
        var map = L.mapbox.map('map', 'eknuth.gmh51030').setView([45.5, -122.5], 8);

        var hauler_layer;

        $scope.haulers = false;
        $scope.error = false;
        var success = function(pos) {
            var url = 'http://civicapps.iknuth.com/data/hauler.geojson';
            url = url + '?callback=JSON_CALLBACK&pip=' + [
                pos.coords.longitude,
                pos.coords.latitude
            ].join(',');
            $http.jsonp(url).success(function (d) {
                $scope.haulers = _.map(d.features, function (hauler) {
                    return hauler.properties;
                });
                hauler_layer = L.geoJson(d).addTo(map);
                hauler_layer.setStyle({
                    color: '#f0ba48', //#006a32', f0ba48,
                    weight: 2
                });
                map.setView(hauler_layer.getBounds().getCenter(), 13, { animate: false });
            });
        };

        var error = function(err) {
            console.log(err);
            $scope.error = err.message;
        };

        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    };
})();