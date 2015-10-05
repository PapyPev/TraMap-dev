/** ***************************************************************************
 * Get Train Informations.
 * Initialize Map content
 *
 * @author Pev
 * @version 1.0
 *************************************************************************** */

/* ============================================================================
 * CONSTANTS
 * ========================================================================= */

var DIGITRAFFIC = 'http://rata.digitraffic.fi/api/v1/live-trains?station='

/* ============================================================================
 * MAIN
 * ========================================================================= */

function loadingTrainInformation (jsonInfo) {
  console.log(jsonInfo);
}

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
    xhr.open('GET', DIGITRAFFIC+trainValue);

    // Load Content
    xhr.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
        //console.log('response: ' + this.responseText);
        loadingTrainInformation(JSON.parse(this.responseText));
      }
    };

    // Sent request
    xhr.send();

  }); //-- end $("#trainButton").click()

}); //--- end $(document).ready()