/** ***************************************************************************
 * Get Train Informations.
 * Initialize Map content
 *
 * @author Pev
 * @version 1.1
 *************************************************************************** */

/* ============================================================================
 * CONSTANTS
 * ========================================================================= */

var DIGI_TRAFFIC = 'http://rata.digitraffic.fi/api/v1/live-trains?station='

/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

/**
 * Load HTML content for Stations informations
 * @param {json} data JSON response from digitraffic
 --------------------------------------------------------------------------- */
function loadTimetables (data) {
  console.log(data);

  //Init html
  var htmlContent = '';

  // Loop Trains
  for (var i = 0; i < data.length; i++) {
    htmlContent += '<h4>'+data[i].trainCategory + ': ' 
    htmlContent += data[i].trainNumber
    htmlContent += ' (' + data[i].trainType +')</h4>'
    htmlContent += '<table class="table table-striped">'
    htmlContent += ''
    
    // Loop time table
    for (var j = 0; j < data[i].timeTableRows.length; j++) {
      
      htmlContent += '<tr><td>' + data[i].timeTableRows[j] + '</td></tr>'

    };

    htmlContent += '</table>'
  };

  $("#divResults").html(htmlContent);
}

/* ============================================================================
 * MAIN
 * ========================================================================= */

/**
 * Action performed when the page is fully loaded
 --------------------------------------------------------------------------- */
$(document).ready(function($) {

  // Form button onclick event
  $("#trainButton").on('click', function(){

    // Get train value
    var trainValue = $("#trainValue").val();

    // Init XMLHttp request
    var xhr = new XMLHttpRequest();

    // GET query
    xhr.open('GET', DIGI_TRAFFIC+trainValue);

    // Load Content
    xhr.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
        //console.log('response: ' + this.responseText);
        loadTimetables(JSON.parse(this.responseText));
      }
    };

    // Sent request
    xhr.send();
  }); //-- end $("#trainButton").click()
}); //--- end $(document).ready()