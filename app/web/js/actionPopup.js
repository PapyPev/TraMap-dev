/** ***************************************************************************
 * actionPopup.
 * All popup function (load, refresh, actions, events, ...)
 * 
 * @author Pev
 * @version 2.0
 *************************************************************************** */

/* ============================================================================
 * GLOBALS
 * ========================================================================= */

// List : origin destination
var listOD;

/* ============================================================================
 * FUNCTIONS CALCULATE
 * ========================================================================= */
/**
 * Find itinerary betwin origin and destination
 * @param {Object} origin Origin contains lat and long coordinates
 * @param {Object} destination Destination contains lat and long coordinates
 --------------------------------------------------------------------------- */
function findItinerary (origin, destination) {
  console.log("actionPopupEvents.findItinerary(...)");
  console.log("From:"+origin.toString()+" - To:"+destination.toString());

  // TODO : algo

}; //--- end findItinerary (origin, destination)


/* ============================================================================
 * FUNCTIONS DATABASE
 * ========================================================================= */

function getInterests(table) {

  // Get JSON
  $.ajax({
    type: 'GET',
    url: 'http://172.18.138.171/api/interests/'+table,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){
      console.log(data)
    },
    error: function(jqXHR, exception){
      if (jqXHR.status === 401) {
        console.log('HTTP Error 401 Unauthorized.');
      } else {
        console.log('Uncaught Error.\n' + jqXHR.responseText);
      }
    },
    async: false
  });

};

function getMetatables() {

  // Get JSON
  $.ajax({
    type: 'GET',
    url: 'http://172.18.138.171/api/metatables',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){
      console.log(data)
      return data.result;
    },
    error: function(jqXHR, exception){
      if (jqXHR.status === 401) {
        console.log('HTTP Error 401 Unauthorized.');
      } else {
        console.log('Uncaught Error.\n' + jqXHR.responseText);
      }
    },
    async: false
  });

};


/* ============================================================================
 * POPUP LOADING
 * ========================================================================= */

/**
 * Load Popup Focus Point of Interests from tableName by REST service
 * @param {string} tableName Name of the database Table for getting POI list
 --------------------------------------------------------------------------- */
function updatePopupFocusInterests (tableName) {
  console.log('actionMapLoader.updatePopupFocusInterests('
    + tableName.toString() + ')');

  // TODO : Get List of tables from REST service
  divFocusInterests = 'optionsFocusInterests';

  // TODO : Get list of filter tables
  //var listOfInterests = getMetatables();

  // Prepare the selection list
  //var listOfInterests = '<select class="selectpicker bs-select-hidden" id="listOfInterests">'
  //  + '<option value="default">-- All --</option>'
  
  // TODO : Loop all listOfInterests and format for the HTML content

  listOfInterests = "";
  switch(tableName){
    case 'Mustard':
      listOfInterests += '<option value="yellow">Yellow</option>'
      break;
    case 'Ketchup':
      listOfInterests += '<option value="red">Red</option>'
      break;
    default:
      listOfInterests += '<option value="other">Other</option>'
      break;
  }

  // Close the selection
  //listOfInterests += '</select>';

  console.log(listOfInterests)

  // Write on HTML content
  $("#"+divFocusInterests+"").html(listOfInterests);

}; //--- end updatePopupFocusInterests (tableName)

/**
 * Load Popup Focus Filter after REST service from database
 --------------------------------------------------------------------------- */
function loadPopupFocus () {
  console.log('actionMapLoader.loadPopupFocus()')

  // Initi the div container
  divFocusMetatables = 'optionsFocusMetatables';
  divFocusInterests = 'optionsFocusInterests';

  // Init default values
  var defaultMetatables = '<select class="selectpicker" id="listOfTables" onchange="updatePopupFocusInterests(this.value);">'
    + '<option value="default">-- All --</option>'
    + '</select>'
  var defaultInterests = '<select class="selectpicker" id="listOfInterests">'
    + '<option value="default">-- All --</option>'
    + '</select>'

  // Create the HTML content
  $("#"+divFocusMetatables+"").html(defaultMetatables).trigger("create");
  $("#"+divFocusInterests+"").html(defaultInterests).trigger("create");

  // Get all tables from REST services
  listOfTables = getMetatables();


  // TODO : Loop all listOfTables and format for the HTML content
  var listOfTables = '<select class="selectpicker" id="listOfTables" onchange="updatePopupFocusInterests(this.value);">'
    + '<option value="all">-- All --</option>'
    + '<option value="Mustard">Mustard</option>'
    + '<option value="Ketchup">Ketchup</option>'
    + '<option value="">PepperSauce</option>'
    + '</select>';

  // Add to list of values
  $("#"+divFocusMetatables+"").html(listOfTables);
  

}; //--- end loadPopupFocus ()

/**
 * Create button and load popup content onclick
 * @param {string} glyph Icon on the button
 * @param {string} popupName Name of the popup container (name+type)
 * @param {sidebar} sidebar TOC content will hide on event
 --------------------------------------------------------------------------- */
function loadPopupEvent (glyph, popupName, sidebar) {
  console.log('actionMapLoader.loadPopupEvent(' 
    + glyph + ','+popupName+','+sidebar+')');

  L.easyButton(
    '<span class="glyphicon '+glyph+'" aria-hidden="true"></span>',
    function(){
      sidebar.hide(); // close sidebar
      $('#'+popupName).modal('show'); // load content
      console.log('actionMapLoader.loadPopupEvent(...) #'+popupName);
    }, popupName // For event
  ).addTo(map);
} //--- loadPopupEvent (glyph, popupName, sidebar)

/**
 * Load Popup content from JSON file (url)
 * @param {json} data Popup json
 --------------------------------------------------------------------------- */
function loadPopupContent (data) {
  console.log('actionMapLoader.loadPopupContent()');

  // Prepare HTML content
  var html = "";
  
  // Loop object
  for (var i = 0; i < data.content_overTheMap.length; i++) {

    switch(data.content_overTheMap[i].type){

      case 'popup':
        // Init container
        html  += '<div class="modal fade" '
                + 'id="'+data.content_overTheMap[i].name
                  + data.content_overTheMap[i].type
                  +'" tabindex="-1" role="dialog" '
                  + 'aria-labelledby="contactLabel">'
                  + '<div class="modal-dialog" role="document">'
                    + '<div class="modal-content">'
        // Content
        html += data.content_overTheMap[i].content;
        // End container
        html += '</div></div></div>';
        // Write on the div
        $("#"+data.div_popup_content+"").html(html).trigger("create");
        break;

      default:
        alert('actionMapLoader.loadPopup : error');
        break;

    }; //end Switch
  }; //end Loop object
} //--- end loadPopup (data)

/**
 * Load all popup contains on JSON file
 --------------------------------------------------------------------------- */
function loadPopup () {
  console.log('actionMapLoader.loadPopup()');

  // Ajax request
  $.ajax({

    // GET Parameters
    type: 'GET',
    url: CON_PROP,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){

      // Load Content Properties
      contentProperties = data;

      // Load HTML Popup content
      loadPopupContent(data);

      // Load Buttons
      for (var i = 0; i < data.content_overTheMap.length; i++) {

        // Get button id
        var title = data.content_overTheMap[i].id.toString();

        // Create and load content and event
        loadPopupEvent(data.content_overTheMap[i].icon, 
          data.content_overTheMap[i].name + data.content_overTheMap[i].type,
          sidebar);

      }; // end loop 

      // Load Focus Filter
      loadPopupFocus();

    },
    error: function(jqXHR, exception){
      if (jqXHR.status === 401) {
        console.log('HTTP Error 401 Unauthorized.');
      } else {
        console.log('Uncaught Error.\n' + jqXHR.responseText);
      }
    }

  });
}; //--- end loadPopup()


/* ============================================================================
 * FUNCTION EVENT CLICK
 * ========================================================================= */

/**
 * Get form value from focus popup and focus on values
 --------------------------------------------------------------------------- */
function buttonFocus () {
  console.log("actionPopupEvents.buttonFocus()");

  // Get Form information
  var key = document.getElementById("textFocusKeyword").value;
  var lat = document.getElementById("textFocusLatLong-Lat").value;
  var lon = document.getElementById("textFocusLatLong-Long").value;

  // Test radio button checked
  if(document.getElementById('optionsFocusKeyword').checked) {
    alert("keyword: " + key);
  }else if(document.getElementById('optionsFocusLatLong').checked) {
    // Zoom LatLong
    map.panTo(new L.LatLng(lat, lon));
  }

}; //--- end buttonFocus ()

/**
 * Active mouse click and wait two points : origin and destination.
 --------------------------------------------------------------------------- */
function buttonSearchByPointer () {
  console.log("actionPopupEvents.buttonSearch()");

  // Init list origin-destination
  listOD = [];

  // Change cursor symbol
  $('.leaflet-container').css('cursor','crosshair');

  // Active click on the map
  map.on('click', function(e) {
    alert(e.containerPoint.toString() + ', ' + e.latlng.toString());

    // Add point on list
    listOD.push(e.latlng);

    // If we have 2 points
    if (listOD.length == 2) {
      // Remove click event
        map.off('click');
      // Remove cursor style
      $('.leaflet-container').css('cursor','');
      // Run itinerary alorithm
      findItinerary(listOD[0], listOD[1]);
    };

  });

  // If esc is pressed
  $(document).keyup(function(e) {
     if (e.keyCode == 27) {
        // Remove click event
        map.off('click');
        // Remove cursor style
        $('.leaflet-container').css('cursor','');
    }
  });

}; //--- end buttonSearchByPointer()

