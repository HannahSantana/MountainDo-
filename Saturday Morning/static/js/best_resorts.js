


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




