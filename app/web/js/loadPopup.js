

/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

function loadPopup (content) {

  // HTML content
  var htmlContent = "";

  for (var i = 0; i < content.length; i++) {

    console.log('loadPopup.loadPopup: ' + content[i][0]);

    switch(content[i][0]){

      case 'contact':
        htmlContent += '' 
          + '<div class="modal fade" id="'+content[i][0]+'Popup" tabindex="-1" role="dialog" aria-labelledby="contactLabel">'
          + '  <div class="modal-dialog" role="document">'
          + '    <div class="modal-content">'
          + '      <div class="modal-header">'
          + '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
          + '        <h4 class="modal-title" id="contactLabel">Contact Us</h4>'
          + '      </div><!-- modal-header -->'
          + ''
          + '      <div class="modal-body">'
          + '        <form>'
          + '          <label for="message-text" class="control-label">Your email:</label>'
          + '          <div class="form-group">'
          + '            <div class="input-group">'
          + '              <span class="input-group-addon">@</span>'
          + '              <input type="email" class="form-control" id="contactEmail">'
          + '            </div> <br />'
          + '            <div class="form-group">'
          + '              <label for="message-text" class="control-label">Message:</label>'
          + '              <textarea class="form-control" id="message-text" id="contactMessage"></textarea>'
          + '            </div>'
          + '          </div>'
          + '        </form>'
          + '      </div><!-- modal-body -->'
          + '      <div class="modal-footer">'
          + '        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
          + '        <button type="button" class="btn btn-primary disabled">Send message</button>'
          + '      </div> <!--modal-footer -->'
          + '    </div> <!-- modalContent -->'
          + '  </div><!-- modalDialog -->'
          + '</div> <!-- /contactPopup -->';

        break;

      case 'informations':
        htmlContent += '' 
          + '<div class="modal fade" id="'+content[i][0]+'Popup" tabindex="-1" role="dialog" aria-labelledby="contactLabel">'
          + '  <div class="modal-dialog" role="document">'
          + '    <div class="modal-content">'
          + '      <div class="modal-header">'
          + '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
          + '        <h4 class="modal-title" id="contactLabel">Information</h4>'
          + '      </div><!-- modal-header -->'
          + ''
          + '      <div class="modal-body">'
          + '        <form>'
          + '          <label for="message-text" class="control-label">Your email:</label>'
          + '          <div class="form-group">'
          + '            <div class="input-group">'
          + '              <span class="input-group-addon">@</span>'
          + '              <input type="email" class="form-control" id="contactEmail">'
          + '            </div> <br />'
          + '            <div class="form-group">'
          + '              <label for="message-text" class="control-label">Message:</label>'
          + '              <textarea class="form-control" id="message-text" id="contactMessage"></textarea>'
          + '            </div>'
          + '          </div>'
          + '        </form>'
          + '      </div><!-- modal-body -->'
          + '      <div class="modal-footer">'
          + '        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
          + '        <button type="button" class="btn btn-primary disabled">Send message</button>'
          + '      </div> <!--modal-footer -->'
          + '    </div> <!-- modalContent -->'
          + '  </div><!-- modalDialog -->'
          + '</div> <!-- /contactPopup -->';
        break;

      default:
        alert('Error loadPopup: ' + content);
        break;

    } // end switch
    
  }; // end loop

  $("#popup").html(htmlContent).trigger("create");

};
