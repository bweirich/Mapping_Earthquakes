// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create dark view tile layer
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create base layer holds both
let baseMaps = {
    Light: light,
    Dark: dark
};

// create map object 
let map = L.map("mapid", {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [light]
});

// pass map layers into layers control
L.control.layers(baseMaps).addTo(map);

// Accessing the tronto Geojson url
let torontoData = "https://raw.githubusercontent.com/bweirich/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// create style for lines
let myStyle = {
    color: "#ffffa1",
    weight: 2
};
// Grabbing our geojson data
d3.json(torontoData).then(function(data) {
    console.log(data);
    L.geoJson(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: " + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});
