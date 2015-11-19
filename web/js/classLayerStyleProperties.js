/*
|------------------------------------------------------------------------------
| Class Layer Style Properties
|------------------------------------------------------------------------------
|
| This class contains all Layer properties and functions.
|
| @author Pev
| @verion 1.0.0
|
|------------------------------------------------------------------------------
*/

// ============================================================================
// CONSTRUCTOR
// ============================================================================

/**
 * [Creates an instance of LayerStyleProperties]
 * @constructor
 * @this {LayerStyleProperties}
 * @param {String} filePath      [The layer style configuration file]
 */
function LayerStyleProperties(filePath) {

  // Read configuration file from JSON
  var fromJson = getLayerStyleConfig(filePath);

  /**
   * [Name of the layer]
   * @type {String}
   * @private
   */
  this.layers = fromJson.layers;

} //-- end LayerStyleProperties(...)

// ============================================================================
// GETTERS
// ============================================================================

/**
 * [Return the list of layers properties]
 * @return {String} [Layer's name]
 */
LayerStyleProperties.prototype.getLayers = function(){
  return this.layers;
}

LayerStyleProperties.prototype.getLayerStyle = function(name) {
  
  var style;

  for (var i = this.layers.length - 1; i >= 0; i--) {
    if (this.layers[i].name === name) {
      style = this.layers[i];
      break;
    }
  }

  return style;

};

// ============================================================================
// METHODS
// ============================================================================

/**
 * [String representation of the LayerStyleProperties]
 * @overide
 * @this {LayerStyleProperties}
 * @return {String} [Human-readable representation of this
 * LayerStyleProperties]
 */
LayerStyleProperties.prototype.toString = function() {
  var attributesToLog = [{
    layers : this.layers
  }];
  return JSON.stringify(attributesToLog);
};

// ============================================================================
// FUNCTIONS
// ============================================================================

/**
 * [Get GeoServer Configurations from JSON file]
 * @this {LayerStyleProperties}
 * @param  {String} filePath [Path to the json file (or url)]
 * @return {json}          [Content configuration : JSON content]
 */
function getLayerStyleConfig (filePath) {

  // Returned value
  var layerStyleConfig;

  // Get JSON
  $.ajax({
    type: 'GET',
    url: filePath,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){

      layerStyleConfig = data;

    },
    error: function(jqXHR, exception){
      console.warn("failde")
      if (jqXHR.status === 401) {
        console.log('HTTP Error 401 Unauthorized.');
      } else {
        console.log('Uncaught Error.\n' + jqXHR.responseText);
      }
    },
    async: false

  });

  return layerStyleConfig;
} //-- end getContentConfig (filePath)

