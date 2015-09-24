// http://172.18.138.171/geoserver/sf/ows/


var cities = new L.LayerGroup();

L.marker([60.736622, 24.779603]).bindPopup('Riihimäki').addTo(cities);

var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

var map = L.map('map', {
	center: [60.736622, 24.779603],
	zoom: 8,
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

// ---------------------------------------------------


var owsrootUrl = 'http://172.18.138.171/geoserver/sf/ows';

var defaultParameters = {
    service : 'WFS',
    version : '1.0.0',
    request : 'GetFeature',
    typeName : 'sf:roads',
    outputFormat : 'json',
    format_options : 'callback:getJson',
    SrsName : 'EPSG:4326'
};

var parameters = L.Util.extend(defaultParameters);
var URL = owsrootUrl + L.Util.getParamString(parameters);

var boundaries = null;
var ajax = $.ajax({
    url : URL,
    dataType : 'json',
    jsonpCallback : 'getJson',
    success : function (response) {
    	alert("success");
        boundaries = L.geoJson(response, {
            style: function (feature) {
                return {
                    stroke: false,
                    fillColor: 'FFFFFF',
                    fillOpacity: 0
                };
                }
        });
    }
});




