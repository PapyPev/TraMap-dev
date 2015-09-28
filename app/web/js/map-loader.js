/** *************************************************************************************
 * Map Loader.
 * Initialize Map content
 *
 * @author Pev
 * @version 1.0
 ************************************************************************************* */


/* CONSTANTS
 ************************************************************************************* */

var GEO_SRV = 'http://172.18.138.171/geoserver';
var PROJ = 'EPSG:3857';
var TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ'


/* LOAD DATA
 ************************************************************************************* */

// Initialize LayerGroups
var point_riihimaki = new L.LayerGroup();
var point_helsinki = new L.LayerGroup();


// Add data to LayerGroups
L.marker([60.736622, 24.779603]).bindPopup('Riihimäki').addTo(point_riihimaki);
L.marker([60.173484, 24.941046]).bindPopup('Helsinki').addTo(point_helsinki);


/* LOAD BACKGROUND
 ************************************************************************************* */

// Create Copyright
var tiles_copyright = 'Map data &copy;' 
	+ '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' 
	+ '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' 
	+ 'Imagery © <a href="http://mapbox.com">Mapbox</a>'

// Get tiles sources
var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?'
	+'access_token=' + TOKEN;

//Create Tiles layers
var tiles_light = L.tileLayer(mbUrl, {
	id: 'mapbox.light', 
	attribution: tiles_copyright
})
var tiles_street = L.tileLayer(mbUrl, {
	id: 'mapbox.streets', 
	attribution: tiles_copyright
});


/* CREATE MAP
 ************************************************************************************* */

// Create Map object
var map = L.map('map', {
	center: [60.736622, 24.779603],
	zoom: 8,
	layers: [tiles_street, point_riihimaki]
});

/* ADD TOC
 ************************************************************************************* */

// Create base Layer for background
var baseLayers = {
	"Light": tiles_light,
	"Streets": tiles_street
};

// Create checkbox
var overlays = {
	"Riihimaki": point_riihimaki,
	"Helsinki": point_helsinki
};

L.control.layers(baseLayers, overlays).addTo(map);




















