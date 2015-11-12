// ***************************************************************************
// actionPopup.js
// All popup function (load, refresh, actions, events, ...)
// 
// @author Pev
// @version 2.3
// ***************************************************************************

// ============================================================================
// GLOBALS
// ============================================================================

// List : origin destination
var listOD = [];

// ============================================================================
// FUNCTIONS CALCULATE
// ============================================================================

/**
 * Find itinerary betwin origin and destination
 * @param {Marker} origin Origin contains lat and long coordinates
 * @param {Marker} destination Destination contains lat and long coordinates
 */
function findItinerary(origin, destination) {

  console.log('findItinerary');
  // TODO : algo

} //--- end findItinerary (origin, destination)

// ============================================================================
// FUNCTIONS DATABASE
// ============================================================================

/**
 * Get Metatables from REST service for Focus Popup filters by Keyword.
 * @return JSON object with status and list of interests
 */
function getInterests() {

  // Return value
  var val = {};

  // Get JSON
  $.ajax({
    type: 'GET',
    url: restProperties.getAddress() + '/interests',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',

    success: function(data){
      val = data.message;
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

  return val;
} //--- getInterests()

// ============================================================================
// POPUP LOADING
// ============================================================================

/**
 * Load Popup Focus Filter after REST service from database
 */
function loadPopupFocus() {

  // Init the div container names
  divFocusInterests = 'optionsFocusInterests';

  // HTML content
  var htmlList = '<select class="selectpicker" id="listOfInterests">' 
    + '<optgroup label="default">'
    + '<option value="default">-- All --</option>'
    + '</optgroup>';

  // Get all tables from REST services
  var interests = getInterests();

  // Verifications
  if (interests.status=='ok') {

    // Loop tables
    for (var i = 0; i < interests.result.length; i++) {
      htmlList += '<optgroup label="' + interests.result[i].table + '">';

      // Loop interests
      for (var j = 0; j < interests.result[i].interests.length; j++) {
        htmlList += '<option id="' + interests.result[i].interests[j] + '">';
        htmlList += interests.result[i].interests[j] + '</option>';
      }

      // Close the optgroup
      htmlList += '</optgroup>';
      
    } // end loop result

  } // end if status

  // Close the select container
  htmlList += '</select>';

  // Add to list of values
  $("#"+divFocusInterests+"").html(htmlList);
}; //--- end loadPopupFocus ()

/**
 * Create button and load popup content onclick
 * @param {string} glyph Icon on the button
 * @param {string} popupName Name of the popup container (name+type)
 * @param {Object} sidebar TOC content will hide on event
 */
function loadPopupEvent(glyph, popupName, sidebar) {
  L.easyButton(
    '<span class="glyphicon '+glyph+'" aria-hidden="true"></span>',
    function(){
      sidebar.hide(); // close sidebar
      $('#'+popupName).modal('show'); // load content
      console.log('actionPopup.loadPopupEvent(...) #'+popupName);
    }, popupName // For event
  ).addTo(map);
}; //--- end loadPopupEvent (glyph, popupName, sidebar)

/**
 * Load Popup content from JSON file (url)
 * @param {json} data Popup json
 */
function loadPopupContent(data) {
  // Prepare HTML content
  var html = "";

  // Loop object
  for (var i = 0; i < data.content_overTheMap.length; i++) {

    // Prepare content
    content = "";

    // Get HTML Content
    $.ajax({
      url: data.content_overTheMap[i].view,
      type: 'get',
      dataType: 'html',
      async: false,
      success: function(data) {
        content = data;
      } 
    });

    // Switch on content type
    switch(data.content_overTheMap[i].type){
      case 'Popup':
        // Init container
        html  += '<div class="modal fade" '
                + 'id="'+data.content_overTheMap[i].name
                  + data.content_overTheMap[i].type
                  +'" tabindex="-1" role="dialog" '
                  + 'aria-labelledby="contactLabel">'
                  + '<div class="modal-dialog" role="document">'
                    + '<div class="modal-content">';
        // Content
        html += content;
        // End container
        html += '</div></div></div>';
        // Write on the div
        $("#"+data.div_popup_content+"").html(html).trigger("create");
        break;

      default:
        alert('actionPopup.loadPopup : error');
        break;

    } //end Switch
  } //end Loop object

} //--- end loadPopup (data)

/**
 * Load all popup contains on JSON file
 */
function loadPopup() {

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
        var buttonID = data.content_overTheMap[i].id.toString();
        
        // TODO : Filter by buttonID
        
        // Create and load content and event
        loadPopupEvent(data.content_overTheMap[i].icon, 
          data.content_overTheMap[i].name + data.content_overTheMap[i].type,
          sidebar);

      } // end loop 
      
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

  }); // end $.ajax()
} //--- end loadPopup()

// ============================================================================
// FUNCTION EVENT CLICK
// ============================================================================

/**
 * Get form value from contact popup and open the default system email software
 */
function buttonContact() {
  // Get Form informations
  var mail = document.getElementById("contactEmail");
  var subj = document.getElementById("contactSubject");
  var mess = document.getElementById("contactMessage");
  // Create link
  var link = "mailto:pev.arfan@gmail.com"
   + "?cc=" + mail
   + "&subject=" + subj
   + "&body=" + mess;
  // Redirection to link
  window.location.href = link;
  //window.open(link);
} //-- end buttonContact ()

/**
 * Get form value from focus popup and focus on values
 */
function buttonFocus() {
  // Get Form information
  var key = document.getElementById("textFocusKeyword").value;
  var lat = document.getElementById("textFocusLat").value;
  var lon = document.getElementById("textFocusLong").value;
  // Test radio button checked
  if(document.getElementById('optionsFocusKeyword').checked) {
    alert("keyword: " + key);
  }else if(document.getElementById('optionsFocusLatLong').checked) {
    // Zoom LatLong
    map.panTo(new L.LatLng(lat, lon));
  }
} //--- end buttonFocus ()

/**
 * Active mouse click and wait two points : origin and destination.
 */
function buttonSearchByPointer() {

  // Change cursor symbol
  $('.leaflet-container').css('cursor','crosshair');

  // Init marker
  var redMarker = L.icon({
    iconUrl: 'img/icon-map/marker.png',
    iconSize:     [35, 35], // size of the icon
    iconAnchor:   [17, 35], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
  });

  // Clean old list of marker OD (origin destination)
  if (listOD.length !== 0) {
    for (var i = 0; i < listOD.length; i++) {
      map.removeLayer(listOD[i]);
    }
  }

  // Init list of marker OD
  listOD = [];

  // --------------------

  // Active click on the map
  map.on('click', function(e) {
    
    // Add point on list
    listOD.push(new L.Marker(e.latlng, {
      icon: redMarker,
      draggable:false
    }));
    
    // For each point, add to map
    for (var i = 0; i < listOD.length; i++) {
      map.addLayer(listOD[i].bindPopup(listOD[i].getLatLng().toString()));
    }
    
    // If we have 2 points
    if (listOD.length == 2) {
      // Remove click event
        map.off('click');
      // Remove cursor style
      $('.leaflet-container').css('cursor','');
      // Run itinerary alorithm
      findItinerary(listOD[0], listOD[1]);
    }
    
  }); // end map.on('click', function(e) {}

  // --------------------
  
  // If esc is pressed
  $(document).keyup(function(e) {
    
    if (e.keyCode == 27) {
      // Remove click event
      map.off('click');
      // Remove cursor style
      $('.leaflet-container').css('cursor','');
      // Remove old marker from the map
      for (var i = 0; i < listOD.length; i++) {
        map.removeLayer(listOD[i]);
      }
    }

  }); // end $(document).keyup(function(e))

} //--- end buttonSearchByPointer()
