/** *************************************************************************************
 * Geoserver Layers.
 * Geoserver functions
 *
 * @author Fanda
 * @version 0.0
 ************************************************************************************* */

// TODO : COMMENT !!


//retrurn list of layers


function getGeoServerLayers(url){

	var myLayer = new L.GeoJSON.AJAX("example.json");
	return [myLayer]

};

