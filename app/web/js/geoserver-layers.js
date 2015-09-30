/** *************************************************************************************
 * Geoserver Layers.
 * Geoserver functions
 *
 * @author Fanda
 * @version 0.0
 ************************************************************************************* */

// TODO : COMMENT !!


//retrurn list of layers
function getGeoserverLayers(url){
	var geojson_data;

	$.ajax({
	    type: "GET",
	    url: "example.json",
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
		success: function(data){
			geojson_data = data;
	    },
	    error: function(jqXHR, exception) {
	        alert('Load problem');    
	    }

	    });

	var myLayer = L.geoJson();

	myLayer.addData(geojson_data);

	return [myLayer]

};

