var url = "/data";

function get_data() {
    response = d3.json(url).then(function (response) {
        return response
    })
    return response
}
ski_table = get_data()

function onClick(e) {
    
   console.log(e)
}

// Creating map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 3
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: 'pk.eyJ1IjoiYnVpdHJvbiIsImEiOiJjamVscGdqMGMxbDM4MndtZWkyNzlya3k3In0.pKbQxM0ARbeBunYG4UBZ-Q',
}).addTo(myMap);


ski_table.then(function (result) {

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();



    for (var i = 0; i < result.features.length; i++) {

        var geometry = result.features[i].geometry;

        if (geometry) {
            markers.addLayer(L.marker([geometry.coordinates[1], geometry.coordinates[0]])
                .bindPopup(result.features[i].properties.name));
 
        }
    }
    markers.on('click', onClick);
    // Add our marker cluster layer to the map
    myMap.addLayer(markers)
});
