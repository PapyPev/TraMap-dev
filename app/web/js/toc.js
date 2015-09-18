/**
 * Get Json File to make TableOfContent
 * @author Pev
 * @date 2015.09.10
 */

// When the document is ready, we load the TOC
$( document ).ready(function() {

    alert("Hello");

    // Initialise toc values
    var message = "";

    // Ajax request
    $.ajax({
    
        // GET Parameters
        type: "GET",
        url: "../srv/cgi-bin/json-file.py",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        
        success: function(data){

            // Get Json content
            var dataJson = data[0];
            // TOC HTML value
            var tocHTML = "";

            // Get Status from Json
            if (dataJson.status==="success") {

                // TOC element Loop
                for (var i = 0; i < data[0].toc.length; i++) {

                    // Prepare Category container
                    tocHTML += "<div data-role=\"collapsible\">";
                    tocHTML += "   <h3>" + data[0].toc[i].alias + "</h3>"
                    tocHTML += "   <fieldset data-role=\"controlgroup\">"

                    var categoryContent = data[0].toc[i].content;

                    // Contents element Loop
                    for (var j = 0; j < categoryContent.length; j++) {
                        tocHTML += "<input "
                            + "name=\"radio-" + categoryContent[j].attr + "\" "
                            + "id=\"radio-" + categoryContent[j].attr + "\" "
                            + "value=\"choice-" + categoryContent[j].attr + "\" "
                            + "checked=\"" + categoryContent[j].checked + "\" "
                            + "type=\"" + data[0].toc[i].type + "\">"
                        tocHTML += "<label for=\"radio-" + categoryContent[j].attr + "\">" + categoryContent[j].alias + "</label>"
                    };
                    tocHTML += "   </fieldset>"
                    tocHTML += "</div>";

                }; // End TOC element Loop

            } else{
                tocHTML += "<div data-role=\"collapsible\">"
                    + "<h3>Error</h3>"
                    + "</div>"
            };

            // Write TOC content
            $("#app_toc").html(tocHTML).trigger("create");

        },

        error: function(jqXHR, exception) {
            if (jqXHR.status === 401) {
                alert('HTTP Error 401 Unauthorized.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }

            var message = "<h3>Hard Code</h3><ul data-role=\"listview\">"
                    + "<div data-role=\"collapsible\">"
                    + "  <h3>Tiles</h3>"
                    + "  <fieldset data-role=\"controlgroup\">"
                    + "    <input name=\"radio-choice-osm\" id=\"radio-choice-osm\" value=\"choice-osm\" checked=\"checked\" type=\"radio\">"
                    + "    <label for=\"radio-choice-osm\">OSM</label>"
                    + "    <input name=\"radio-choice-sat\" id=\"radio-choice-sat\" value=\"choice-sat\" type=\"radio\">"
                    + "    <label for=\"radio-choice-sat\">SAT</label>"
                    + "  </fieldset>"
                    + "</div>"
                    + "<div data-role=\"collapsible\">"
                    + "  <h3>Section 1</h3>"
                    + "  <fieldset data-role=\"controlgroup\">"
                    + "    <input name=\"checkbox-1a\" id=\"checkbox-1a\" checked=\"\" type=\"checkbox\">"
                    + "    <label for=\"checkbox-1a\"><small>Cheetos</small></label>"
                    + "    <input name=\"checkbox-2a\" id=\"checkbox-2a\" type=\"checkbox\">"
                    + "    <label for=\"checkbox-2a\"><small>Doritos</small></label>"
                    + "    <input name=\"checkbox-3a\" id=\"checkbox-3a\" type=\"checkbox\">"
                    + "    <label for=\"checkbox-3a\"><small>Fritos</small></label>"
                    + "    <input name=\"checkbox-4a\" id=\"checkbox-4a\" type=\"checkbox\">"
                    + "    <label for=\"checkbox-4a\"><small>Sun Chips</small></label>"
                    + "  </fieldset>"
                    + "</div>"
                    + "<div data-role=\"collapsible\">"
                    + "  <h3>Section 2</h3>"
                    + "  <fieldset data-role=\"controlgroup\">"
                    + "    <input name=\"checkbox-5a\" id=\"checkbox-5a\" checked=\"\" type=\"checkbox\">"
                    + "    <label for=\"checkbox-5a\"><small>Other</small></label>"
                    + "  </fieldset>"
                    + "</div>"
                    + "<div data-role=\"collapsible\">"
                    + "  <h3>Section 3</h3>"
                    + "  <p>I'm the collapsible content for section 3</p>"
                    + "</div>"
                + "</ul>";

            // Write TOC content
            $("#app_toc").html(message).trigger("create");
        }

    });

});
