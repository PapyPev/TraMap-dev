var cities = new L.LayerGroup();

L.marker([60.736622, 24.779603]).bindPopup('This is Littleton, CO.').addTo(cities);


var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

var map = L.map('map', {
	center: [65.407166, 27.085315],
	zoom: 5,
	layers: [grayscale, cities]
});

var baseLayers = {
	"Grayscale": grayscale,
	"Streets": streets
};

var overlays = {
	"Cities": cities
};

L.control.layers(baseLayers, overlays).addTo(map);