var projection = new ol.proj.Projection({
      code: 'EPSG:2154',
      units: 'm'
    });

    var layers = [
      new ol.layer.Image({
        source: new ol.source.ImageWMS({
          url: 'http://geoservices.brgm.fr/geologie',
          attributions: [new ol.Attribution({
            html: '&copy; ' +
              'BRGM (French USGS equivalent)'
            })
          ],
          params: {
            'LAYERS': 'SCAN_F_GEOL1M',
            'VERSION': '1.1.1'
          }
        })
      })
    ];

    var map = new ol.Map({
      layers: layers,
      target: 'map',
      view: new ol.View({
        projection: projection,
        center: [755520.187986, 6587896.855407],
        zoom: 6
      })
    });