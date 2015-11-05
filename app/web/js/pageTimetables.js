/** ***************************************************************************
 * Get Train Informations.
 * Initialize Map content
 *
 * @author Pev
 * @version 1.2
 *************************************************************************** */

/* ============================================================================
 * CONSTANTS
 * ========================================================================= */

var DIGI_TRAFFIC = 'http://rata.digitraffic.fi/api/v1/live-trains?station=';
var DIGI_STATIONS = 'http://rata.digitraffic.fi/api/v1/metadata/stations';

/* ============================================================================
 * GLOBALS
 * ========================================================================= */

var dictStations = {}
var listStations = []

/* ============================================================================
 * FUNCTIONS AUTOLOAD
 * ========================================================================= */

// Autocomplete
$(function() {
  $( "#textDeparture" ).autocomplete({
    source: listStations
  });
});
$(function() {
  $( "#textArrival" ).autocomplete({
    source: listStations
  });
});

/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

/**
 * Generate the title of the dropdown widget
 * @param {json} data All train informations
 * @return {string} Title of the dropdown
 --------------------------------------------------------------------------- */
function getTrainTitle (data) {
  var type = data.trainType;
  var depKey = data.timeTableRows[0].stationShortCode;
  var depName = dictStations[depKey];
  var arrKey = data.timeTableRows[data.timeTableRows.length-1].stationShortCode;
  var arrName = dictStations[arrKey];
  var trainNum = data.trainNumber
  var title = type + ' - ' + depName + ' > ' + arrName 
    + ' (num:' + trainNum + ')';
  return title;
};

/**
 * Load HTML content for Stations informations
 * @param {json} data JSON response from digitraffic
 * @param {string} type Search type
 --------------------------------------------------------------------------- */
function loadTimetables (data, dep, arr, type) {
  console.log(data);

  // Init html content
  var htmlContent = '';

  // Init Acordeon group
  htmlContent += '<div class="panel-group" id="accordion" '
    + 'role="tablist" aria-multiselectable="true">'

  // Loop for each Train
  for (var i = 0; i < data.length; i++) {

    // Acordeon Title
    var acTitle = getTrainTitle(data[i]);
    // Heading
    var headId = 'head' + data[i].trainCategory + '-'
      + data[i].trainType + '-' + data[i].trainNumber
    // Acordeon ID
    var acIdent = 'id' + data[i].trainCategory + '-'
      + data[i].trainType + '-' + data[i].trainNumber

    // Init container
    htmlContent += '<div class="panel panel-default">'
    htmlContent += '<div class="panel-heading" role="tab" id="'+headId+'">'
    htmlContent += '<h4 class="panel-title">'
    htmlContent += '<a role="button" data-toggle="collapse" '
      + 'data-parent="#accordion" href="#'+acIdent+'" '
      + 'aria-expanded="true" aria-controls="'+acIdent+'">'
      + acTitle
    htmlContent += '</a>'
    htmlContent += '</h4>'
    htmlContent += '</div>'
    htmlContent += '<div id="'+acIdent+'" '
      + 'class="panel-collapse collapse" role="tabpanel" '
      + 'aria-labelledby="'+headId+'">'
    htmlContent += '<div class="panel-body">'
    htmlContent += '<div class="table-responsive">'
    htmlContent += '<table class="table table-striped">'
    htmlContent += '<thead>'
    htmlContent += '<tr>'
    htmlContent += '<th>Status</th>'
    htmlContent += '<th>StationShortCode</th>'
    htmlContent += '<th>ScheduledTime</th>'
    htmlContent += '<th>CommercialTrack</th>'
    htmlContent += '</tr>'
    htmlContent += '</thead>'
    htmlContent += '<tbody>'

    // Loop timetable
    for (var j = 0; j < data[i].timeTableRows.length; j++) {

      // Content
      htmlContent += '<tr>'
      htmlContent += '<td>'

      // Test Cancelled
      if (data[i].timeTableRows[j].cancelled) {
        htmlContent += '<span class="flaticon-close11" style="color: red;"></span>'
      } else {
        htmlContent += '<span class="flaticon-check2" style="color: green;"></span>'
      };

      // Test type
      if (data[i].timeTableRows[j].type == "DEPARTURE") {
        htmlContent += '<span class="flaticon-double4"></span>'
      } else if (data[i].timeTableRows[j].type == "ARRIVAL"){
        htmlContent += '<span class="flaticon-double5"></span>'
      };

      // Matching with list of Stations
      htmlContent += '<td>'+data[i].timeTableRows[j].stationShortCode+'</td>'
      htmlContent += '<td>'+data[i].timeTableRows[j].scheduledTime+'</td>'
      htmlContent += '<td>'+data[i].timeTableRows[j].commercialTrack+'</td>'
      htmlContent += '</tr>'

    };

    // End Container
    htmlContent += '</tbody>'
    htmlContent += '</table>'
    htmlContent += '</div>'
    htmlContent += '</div>'
    htmlContent += '</div>'
    htmlContent += '</div>'

  };

  // End Acordeon group
  htmlContent += '</div>'

  $("#divResults").html(htmlContent);
};


function updateOptionsChoices (choice) {
  
  switch(choice){
    case "optionsDeparture":
      document.getElementById("textDeparture").disabled = false;
      document.getElementById("textArrival").disabled = true;
      break;
    case "optionsArrival":
      document.getElementById("textDeparture").disabled = true;
      document.getElementById("textArrival").disabled = false;
      break;
    case "optionsItinerary":
      document.getElementById("textDeparture").disabled = false;
      document.getElementById("textArrival").disabled = false;
      break;
    default:
      document.getElementById("textDeparture").disabled = true;
      document.getElementById("textArrival").disabled = true;
      break;
  }

};

/* ============================================================================
 * MAIN
 * ========================================================================= */

/**
 * Action performed when the page is fully loaded
 --------------------------------------------------------------------------- */
$(document).ready(function($) {

  // ------- STATIONS AUTOCOMPLETE -------

  console.log("pageTimetables.listStations");
  // Init XMLHttp request
  var xhrAutoCompl = new XMLHttpRequest();
  // GET query
  xhrAutoCompl.open('GET', DIGI_STATIONS);
  // Load Content
  xhrAutoCompl.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      // Data responses from digitraffic
      var data = JSON.parse(this.responseText);
      // Loop
      for (var i = 0; i < data.length; i++) {
        var value = data[i].stationShortCode + ":" + data[i].stationName;
        listStations.push(value);
        dictStations[data[i].stationShortCode] = data[i].stationName;
      };
    }
  };
  // Sent request
  xhrAutoCompl.send();


  // ------- INVERST DEP/ARR -------

  $("#buttonInvert").on('click', function(){
    var dep = $("#textDeparture").val();
    var arr = $("#textArrival").val();
    document.getElementById("textDeparture").value = arr;
    document.getElementById("textArrival").value = dep;
    console.log("pageTimetables.buttonInvert: " + dep + "<->" + arr);
  }); //-- end $("#buttonInvert").click()


  // ------- SEARCH TIME TABLE -------

  // Form button onclick event
  $("#buttonSearch").on('click', function(){

    // Get Radio value
    var type = '';
    var radioForm = document.getElementsByName('optionsTimetable');
    for (var i = 0, length = radioForm.length; i < length; i++) {
      if (radioForm[i].checked) {
          type = radioForm[i].value;
          break;
      }
    }

    // Get Form values
    var depName = $("#textDeparture").val();
    var arrName = $("#textArrival").val();

    // Get Keys
    var depKey = depName.split(":")[0];
    var arrKey = arrName.split(":")[0];

    // Init XMLHttp request
    var xhrTimetables = new XMLHttpRequest();

    switch(type){
      case "optionsDeparture":
        // GET query
        xhrTimetables.open('GET', DIGI_TRAFFIC+depKey);
        // Load Content
        xhrTimetables.onreadystatechange = function () {
          if (this.status == 200 && this.readyState == 4) {
            loadTimetables(
              JSON.parse(this.responseText), 
              depKey, arrKey, type
            );
          }
        };
        break;
      case "optionsArrival":
        // GET query
        xhrTimetables.open('GET', DIGI_TRAFFIC+arrKey);
        // Load Content
        xhrTimetables.onreadystatechange = function () {
          if (this.status == 200 && this.readyState == 4) {
            loadTimetables(
              JSON.parse(this.responseText), 
              depKey, arrKey, type
            );
          }
        };
        break;
      case "optionsItinerary":
        //TODO
        break;
      default:
        break;
    }

    // Sent request
    xhrTimetables.send();
  }); //-- end $("#trainButton").click()

}); //--- end $(document).ready()