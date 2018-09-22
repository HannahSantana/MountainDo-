// We create the tile layers that will be the selectable backgrounds of our map.
// One for our grayscale background.

var apiKey = 'pk.eyJ1IjoiYnVpdHJvbiIsImEiOiJjamVscGdqMGMxbDM4MndtZWkyNzlya3k3In0.pKbQxM0ARbeBunYG4UBZ-Q';

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: apiKey
});

var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-satellite",
  accessToken: apiKey
});

var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: apiKey
});

// We then create the map object with options. Adding the tile layers we just
// created to an array of layers.
var map = L.map("map", {
  center: [
    40.7, -94.5
  ],
  zoom: 3,
  layers: [graymap, satellitemap, outdoors]
});

// Adding our 'graymap' tile layer to the map.
graymap.addTo(map);

// We create the layers for our two different sets of data, earthquakes and
// tectonicplates.
// var tectonicplates = new L.LayerGroup();
// var earthquakes = new L.LayerGroup();
var GreatLoc = new L.LayerGroup();
var GoodLoc = new L.LayerGroup();
var OkLoc = new L.LayerGroup();

// Defining an object that contains all of our different map choices. Only one
// of these maps will be visible at a time!
var baseMaps = {
  Satellite: satellitemap,
  Grayscale: graymap,
  Outdoors: outdoors
};

// We define an object that contains all of our overlays. Any combination of
// these overlays may be visible at the same time!
var overlays = {
  "Great Location": GreatLoc,
  "Good Location": GoodLoc,
  "OK Location": OkLoc
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L
  .control
  .layers(baseMaps, overlays)
  .addTo(map);

// Our AJAX call retrieves our earthquake geoJSON data.
//d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {




let data = dataset.features;
    console.log(data)
let myFeatures.forEach(x => {
 
     let lng_lat = x.geometry.coordinates // array
     L.marker([lng_lat[1], lng_lat[0]])
         .bindPopup(x.properties.name)
         .addTo(map)

// let ski_function = d3.json("/data").then(function (response){
//     console.log(response)

//     let skitable = response.then(function(skitable){
//         return (skitable)
//     })

//     return skitable

// })
//  console.log (ski_function)

// This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.score),
      color: "#000000",
      //radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // Determines the color of the marker based on the magnitude of the earthquake.
  function getColor(score) {
    switch (true) {
    case score > 90:
      return "blue";
    case score > 85:
      return "red";
    default:
      return "green";
    }
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  // function getRadius(magnitude) {
  //   if (magnitude === 0) {
  //     return 1;
  //   }

  //   return magnitude * 4;
  // }

  // Here we add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each marker to display the magnitude and location of
    // the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + features.properties.name + "</h3><hr><h3> Score:</h3>" + features.properties.score + "<br><h3>True Snow:</h3>" + features.properties.true_snow + "<br><h3>Vertical Feet:</h3>" + features.properties.vert);

    }
    // We add the data to the earthquake layer instead of directly to the map.
  }).addTo(GreatLoc);

  // Then we add the earthquake layer to our map.
  GreatLoc.addTo(map);

  // // Here we create a legend control object.
  // var legend = L.control({
  //   position: "bottomright"
  // });

  // // Then we add all the details for our legend
  // legend.onAdd = function() {
  //   var div = L
  //     .DomUtil
  //     .create("div", "info legend");

  //   var grades = [0, 1, 2, 3, 4, 5];
  //   var colors = [
  //     "#98ee00",
  //     "#d4ee00",
  //     "#eecc00",
  //     "#ee9c00",
  //     "#ea822c",
  //     "#ea2c2c"
  //   ];

  //   // Loop through our intervals and generate a label with a colored square for each interval.
  //   for (var i = 0; i < grades.length; i++) {
  //     div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
  //       grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  //   }
  //   return div;
  // };

  // // We add our legend to the map.
  // legend.addTo(map);

  // // Here we make an AJAX call to get our Tectonic Plate geoJSON data.
  // d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json",
  //   function(platedata) {
  //     // Adding our geoJSON data, along with style information, to the tectonicplates
  //     // layer.
  //     L.geoJson(platedata, {
  //       color: "orange",
  //       weight: 2
  //     })
  //     .addTo(tectonicplates);

  //     // Then add the tectonicplates layer to the map.
  //     tectonicplates.addTo(map);
  //   });

