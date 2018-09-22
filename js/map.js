// function initialize(){

    var worldMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        // id: 'mapbox.streets',
        // id: 'mapbox.mapbox-streets-v7',
        // id: 'mapbox.mapbox-traffic-v1',
        // id: 'mapbox.terrain-rgb',
        // id: 'mapbox.mapbox-terrain-v2',
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1IjoiYnVpdHJvbiIsImEiOiJjamVscGdqMGMxbDM4MndtZWkyNzlya3k3In0.pKbQxM0ARbeBunYG4UBZ-Q',
        maxZoom: 16,
        minZoom: 2
    });


    var layers = {
        GREAT_LOC: new L.LayerGroup(),
        GOOD_LOC: new L.LayerGroup(),
        OK_LOC: new L.LayerGroup()
    };

    var map = L.map('map', {
        center: [0,10],
        zoom: 2,
        layers: [
        layers.GREAT_LOC,
        layers.GOOD_LOC,
        layers.OK_LOC
        ]
    });

    worldMap.addTo(map);

    var overlays = {
        // "Best Rated Locations": layers.GREAT_LOC,
        // "Pretty Good Rated Locations": layers.GOOD_LOC,
        // "Meh Rated Locations": layers.OK_LOC
    };

    L.control.layers(null, overlays, {collapsed: false}).addTo(map);

    var info = L.control({
        position: "topright"
    });

    info.onAdd = function(){
        var div = L.DomUtil.create("div", "legend");
        return div
    };

    info.addTo(map);

    var icons = {
        GREAT_LOC: L.ExtraMarkers.icon({
            icon: "ion-snow",
            iconColor: "white",
            markerColor: "yellow",
            shape: "star",
            iconSize: [38,46],
            iconAnchor: [14,45],
            shadowSize: [35, 16],
            shadowAnchor: [5, 15]
        }),
        GOOD_LOC: L.ExtraMarkers.icon({
            icon: "snow",
            iconColor: "white",
            markerColor: "blue-dark",
            shape: "circle",
            iconSize: [38,46],
            iconAnchor: [14,45],
            shadowSize: [35, 16],
            shadowAnchor: [5, 15]
        }),
        OK_LOC: L.ExtraMarkers.icon({
            icon: "snow",
            iconColor: "white",
            markerColor: "red",
            shape: "penta",
            iconSize: [38,46],
            iconAnchor: [14,45],
            shadowSize: [35, 16],
            shadowAnchor: [5, 15]
        })
    };
//} // end initialize - why init? map is local to function scope??
// also add below logic to init, but why?


// initialize()


setTimeout(() => {

    var markers = L.markerClusterGroup();

  // Loop through data
        for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].location;

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(response[i].descriptor));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
    


    //     let myFeatures = dataset.features;

    // myFeatures.forEach(x => {
    
    //     let lng_lat = x.geometry.coordinates // array
    //     L.marker([lng_lat[1], lng_lat[0]])
    //         .bindPopup(x.properties.name)
    //         .addTo(map)
    
    

     
    // })    


}, 100);


//     d3.json('/data/dataset.js', (d) => {

//         var rated;

//         d.forEach((element) => {

//             try {

//                 var newMarker = L.marker([features.coordinates, features.name], {
//                     icon: icons[rated],
//                     riseOnHover: true
//                 });

//                 newMarker.addTo(layers[rated]);

//                 newMarker.on('click', (selected) => {
                    
//                 })

//                 updateLegend("0", "0", "earth", "world", "", "", "", "", "", "");
//             }
//             catch(err){
//                 console.log("nope");
//             }
//         });
//     });
// }


