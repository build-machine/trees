(function() {
    "use strict";
    var map = L.mapbox.map('map', 'eknuth.gmh51030',
        { zoomControl: false }).setView([45.52, -122.67], 13);
    new L.Control.Zoom({ position: 'topright' }).addTo(map);

    window.TreesCtrl = function TreesCtrl ($scope, $http) {
        var tree_layer;
        $scope.searchTerm = null;
        $scope.searchResults = [];

        $scope.search = function (term) {
            var url = "http://civicapps.iknuth.com/data/Heritage_Trees_pdx.geojson";
            url = url + '?callback=JSON_CALLBACK&search-field=common_nam&search-term=' + term;
            $http.jsonp(url).success(function (d) {
                if (tree_layer) {
                    map.removeLayer(tree_layer);
                }
                $scope.searchResults = d.features;
                tree_layer = L.geoJson(d).addTo(map);
            });
        };
    };



})();