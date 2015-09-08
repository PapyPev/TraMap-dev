
$( document ).ready(function() {

	// Initialise toc values
	var message = "";

	// TODO : Get JSON
	var getJson = true;

	// If we have a success
	if (getJson) {

		// TODO : Parse JSON to format TOC
		// TODO : Create function : check the box, refresh the map
		message += "<ul data-role=\"listview\">"
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

	};

	// Write TOC content
	$("#app_toc").html(message).trigger("create");


});
