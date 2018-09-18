function createFeatures(skiData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.name + " </h3>");
    }
    var ski = L.geoJSON(skiData, {
        onEachFeature: onEachFeature
    });

    createMap(ski);

}

console.log(dataset)


function createMap(ski) {

    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    var overlayMaps = {
        Ski: ski
    };

    var myMap = L.map('map', {
        center: [40.7128, -74.0060],
        zoom: 3
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}


