$( document ).ready(function() {
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'osm'})
      })
    ],
    view: new ol.View({
      // Utajärvi
      center: ol.proj.transform([27.079751, 64.943554], 'EPSG:4326', 'EPSG:3857'),
      zoom: 5
    })
  });
});