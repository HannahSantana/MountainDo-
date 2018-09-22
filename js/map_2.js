
    var worldMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets',
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
        center: L.latLng(39.774, -98.125),
        zoom: 5,
        layers: [
        layers.GREAT_LOC,
        layers.GOOD_LOC,
        layers.OK_LOC
        ]
    });

    worldMap.addTo(map);

    var overlays = {
        "Best Rated Locations": layers.GREAT_LOC,
        "Pretty Good Rated Locations": layers.GOOD_LOC,
        "Meh Rated Locations": layers.OK_LOC
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



setTimeout(() => {


    let myFeatures = dataset.features.slice(0,550);
    
    let icons = {
        GREAT_LOC = L.ExtraMarkers.icon({
            icon: 'fa-snowflake',
            markerColor: 'blue',
            shape: 'star',
            prefix: 'fa'
          }),

        GOOD_LOC = L.ExtraMarkers.icon({
            icon: 'fa-coffee',
            markerColor: 'red',
            shape: 'star',
            prefix: 'fa'
          }),

          OK_LOC = L.ExtraMarkers.icon({
            icon: 'fa-coffee',
            markerColor: 'yellow',
            shape: 'star',
            prefix: 'fa'
          }),
    }

    function determineColor(rating) {
        if (x.rating < 85){
            rated = 'OK_LOC';
        } else if (x.rating < 90){
            rated = 'GOOD_LOC';
        } else {
            rated = 'GREAT_LOC';
        }
    }

    myFeatures.forEach(x => {

            let lng_lat = x.geometry.coordinates; // array
            L.marker([lng_lat[1], lng_lat[0], {
                icon: determineColor(rating)})
                .bindPopup("<h3>" + x.properties.name + "</h3><hr><h3> Score:</h3>" + x.properties.score + "<br><h3>True Snow:</h3>" + x.properties.true_snow + "<br><h3>Vertical Feet:</h3>" + x.properties.vert)
                .addTo(map)
            });
   

     
        


}, 100);

