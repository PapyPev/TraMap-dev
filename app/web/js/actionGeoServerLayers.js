/** ***************************************************************************
 * Geoserver Layers.
 * Geoserver functions
 *
 * @author Fanda/Pev
 * @version 1.1
 *************************************************************************** */

/* ============================================================================
 * CONSTANTS
 * ========================================================================= */

// This is an example of temporary data. This data format is GeoJSON
var temp = {"type":"FeatureCollection","totalFeatures":1451275,"features":[{"type":"Feature","id":"roads_cr.1","geometry":{"type":"LineString","coordinates":[[14.4363544,50.0486718],[14.4363404,50.0485623]]},"geometry_name":"geometry","properties":{"osm_id":4947,"osm_name":"HorÃ¡Äkova","osm_meta":null,"osm_source_id":703192,"osm_target_id":748349520,"clazz":32,"flags":3,"source":1,"target":383417,"km":0.012216812,"kmh":50,"cost":2.4433623E-4,"reverse_cost":2.4433623E-4,"x1":14.4363544,"y1":50.0486718,"x2":14.4363404,"y2":50.0485623}},{"type":"Feature","id":"roads_cr.2","geometry":{"type":"LineString","coordinates":[[14.4363404,50.0485623],[14.4363075,50.0483872]]},"geometry_name":"geometry","properties":{"osm_id":4947,"osm_name":"HorÃ¡Äkova","osm_meta":null,"osm_source_id":748349520,"osm_target_id":1273338336,"clazz":32,"flags":3,"source":383417,"target":521044,"km":0.019611437,"kmh":50,"cost":3.9222874E-4,"reverse_cost":3.9222874E-4,"x1":14.4363404,"y1":50.0485623,"x2":14.4363075,"y2":50.0483872}},{"type":"Feature","id":"roads_cr.3","geometry":{"type":"LineString","coordinates":[[14.4363075,50.0483872],[14.4362908,50.0482846],[14.4362415,50.047993]]},"geometry_name":"geometry","properties":{"osm_id":4947,"osm_name":"HorÃ¡Äkova","osm_meta":null,"osm_source_id":1273338336,"osm_target_id":2424683216,"clazz":32,"flags":3,"source":521044,"target":2,"km":0.044086013,"kmh":50,"cost":8.817203E-4,"reverse_cost":8.817203E-4,"x1":14.4363075,"y1":50.0483872,"x2":14.4362415,"y2":50.047993}},{"type":"Feature","id":"roads_cr.4","geometry":{"type":"LineString","coordinates":[[14.4298007,50.048601],[14.4299148,50.0486098]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":683618,"osm_target_id":1273323652,"clazz":31,"flags":3,"source":3,"target":157625,"km":0.008205178,"kmh":50,"cost":1.6410356E-4,"reverse_cost":1.6410356E-4,"x1":14.4298007,"y1":50.048601,"x2":14.4299148,"y2":50.0486098}},{"type":"Feature","id":"roads_cr.5","geometry":{"type":"LineString","coordinates":[[14.4299148,50.0486098],[14.4305175,50.0486631],[14.4307737,50.0486857]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":1273323652,"osm_target_id":1273323503,"clazz":31,"flags":3,"source":157625,"target":520933,"km":0.061905302,"kmh":50,"cost":0.001238106,"reverse_cost":0.001238106,"x1":14.4299148,"y1":50.0486098,"x2":14.4307737,"y2":50.0486857}},{"type":"Feature","id":"roads_cr.6","geometry":{"type":"LineString","coordinates":[[14.4307737,50.0486857],[14.4310826,50.0487129]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":1273323503,"osm_target_id":1273323484,"clazz":31,"flags":3,"source":520933,"target":520935,"km":0.02226248,"kmh":50,"cost":4.452496E-4,"reverse_cost":4.452496E-4,"x1":14.4307737,"y1":50.0486857,"x2":14.4310826,"y2":50.0487129}},{"type":"Feature","id":"roads_cr.7","geometry":{"type":"LineString","coordinates":[[14.4310826,50.0487129],[14.4311138,50.0487157]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":1273323484,"osm_target_id":273515531,"clazz":31,"flags":3,"source":520935,"target":59221,"km":0.0022505873,"kmh":50,"cost":4.5011748E-5,"reverse_cost":4.5011748E-5,"x1":14.4310826,"y1":50.0487129,"x2":14.4311138,"y2":50.0487157}},{"type":"Feature","id":"roads_cr.8","geometry":{"type":"LineString","coordinates":[[14.4311138,50.0487157],[14.4315067,50.0487444]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":273515531,"osm_target_id":1273323633,"clazz":31,"flags":3,"source":59221,"target":520929,"km":0.028234914,"kmh":50,"cost":5.646983E-4,"reverse_cost":5.646983E-4,"x1":14.4311138,"y1":50.0487157,"x2":14.4315067,"y2":50.0487444}},{"type":"Feature","id":"roads_cr.9","geometry":{"type":"LineString","coordinates":[[14.4315067,50.0487444],[14.4320021,50.0487807]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":1273323633,"osm_target_id":776032678,"clazz":31,"flags":3,"source":520929,"target":394613,"km":0.03560213,"kmh":50,"cost":7.120426E-4,"reverse_cost":7.120426E-4,"x1":14.4315067,"y1":50.0487444,"x2":14.4320021,"y2":50.0487807}},{"type":"Feature","id":"roads_cr.10","geometry":{"type":"LineString","coordinates":[[14.4320021,50.0487807],[14.4335771,50.0488615]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":776032678,"osm_target_id":694266,"clazz":31,"flags":3,"source":394613,"target":362903,"km":0.112816654,"kmh":50,"cost":0.0022563331,"reverse_cost":0.0022563331,"x1":14.4320021,"y1":50.0487807,"x2":14.4335771,"y2":50.0488615}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}};

/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

/**
 * This function gives a visual style to data
 * @param {number} feature Type's number of feature
 * @return {json} Style properties
 --------------------------------------------------------------------------- */
function setStyle(feature) {
    console.log("actionGeoServerLayers.setStyle("+feature+")");

	// Switch on class properties
    switch (feature.properties.clazz) {

    	// TODO : Comment
        case 31: return {color: "orange", weight: 17, opacity: 0.5};

        // TODO : Comment
        case 32: return {color: "#0000ff", weight: 17, opacity: 0.5};

    } //end switch(feature.properties.clazz)
};

/**
 * This function gives a visual style to data
 * @param {string} url GeoServer OWS access
 * @preturn {Layer} Return a classLayer object with his properties 
 --------------------------------------------------------------------------- */
function getGeoServerLayers(url){
  console.log("actionGeoServerLayers.getGeoServerLayers("+url+")");

  // Return value : list of layers
  var listOfLayers = [];

  // Ajax request
  $.ajax({

    // GET Parameters
    type: 'GET',
    url: url+"/rest/workspaces/hamk-map-project/featuretypes.json",
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',

    success: function(data){

      // Loop Layer properties
      for (var i = 0; i < data.featureTypes.featureType.length; i++) {

        console.log(data.featureTypes.featureType[i].name);

        // Get GeoJSON layer content
          var layerContent = new L.GeoJSON.AJAX(
            url
            +"/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="
            +"hamk-map-project:"+data.featureTypes.featureType[i].name
            +"&maxFeatures=100&outputFormat=application/json",
            {
              style: setStyle
            }
          );

        // Current classLayer
        var layer = new Layer(
          "Checkbox", 
          "Data", 
          data.featureTypes.featureType[i].name,
          data.featureTypes.featureType[i].name,
          i,
          true,
          layerContent);

        // Add to listfLayers
        listOfLayers.push(layer);

      };

    },
    
    error: function(jqXHR, exception){
      if (jqXHR.status === 401) {
        console.log('HTTP Error 401 Unauthorized.');
      } else {
        console.log('Uncaught Error.\n' + jqXHR.responseText);
      }
    }

  });

  console.log("list:");
  console.log(listOfLayers);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~ ONLY ONE LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // TODO : Loop to get all layers

	var alias = "hamk-map-project:fin_2po_4pgr";
	var baseurl = url+"/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+alias+"&maxFeatures=100&outputFormat=application/json";

  // Get layer from GeoServer
	// var myLayer = new L.GeoJSON.AJAX(baseurl,{
	// 	style: setStyle
	// });

  // Get layer from temp contant
	var myLayer = new L.geoJson(temp,{
		style: setStyle
	});

    // Prepare classLayer's attribute
	var l1 = new Layer(
    "Checkbox", 
    "Traffic Information", 
    "traffic", 
    alias, 
    1, 
    true, 
    myLayer
  );

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~ ONLY ONE LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Return tab of classLayers
	//return [l1];
  return listOfLayers;
}; //--- end getGeoServerLayers(url){

