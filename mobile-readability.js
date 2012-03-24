(function() {

	//Inject jQuery
	var script = document.createElement('script');

  // Mmore or less stolen form jquery core and adapted by paul irish
  function getScript(url, success) {
    
    var script = document.createElement('script'),
      head = document.getElementsByTagName('head')[0],
      done = false;
    
    script.src = url;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
      
      if ( !done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
        done=true;
        success();
        script.onload = script.onreadystatechange = null;
        head.removeChild(script);
      }
    };
    
    head.appendChild(script);
  
  }
  
  getScript('http://code.jquery.com/jquery-latest.min.js', function() {    
    return addControls();
  });


  function addControls() {


    $('head').append('<link rel="stylesheet" type="text/css" href="styles.css" />');
  	
    var controls = '<div class="info"> \
      <h1>Mobile Readability Tester</h1> \
      <fieldset> \
      <label>Font Family</label> \
        <select id="choose-font"> \
          <option value="Georgia" selected>Georgia</option> \
          <option value="Helvetica">Helvetica</option> \
        </select> \
      </fieldset> \
      <fieldset> \
        <label>Font Size</label> \
        <select id="choose-size"> \
          <option value="12px">12px</option> \
          <option value="13px">13px</option> \
          <option value="14px">14px</option> \
          <option value="15px">15px</option> \
          <option value="16px" selected>16px</option> \
          <option value="17px">17px</option> \
          <option value="18px">18px</option> \
          <option value="19px">19px</option> \
          <option value="20px">20px</option> \
        </select> \
      </fieldset> \
      <fieldset> \
        <label>Content Padding</label> \
        <select id="choose-padding"> \
          <option value="0px">0px</option> \
          <option value="5px">5px</option> \
          <option value="10px" selected>10px</option> \
          <option value="15px">15px</option> \
          <option value="20px">20px</option> \
          <option value="25px">25px</option> \
          <option value="30px">30px</option> \
          <option value="35px">35px</option> \
          <option value="40px">40px</option> \
        </select> \
      </fieldset> \
      <fieldset> \
        <label>Article Height</label> \
        <span class="article-height"></span> \
      </fieldset> \
      <fieldset> \
        <label>iPhone Pages</label> \
        <span class="article-pages"></span> \
      </fieldset> \
    </div>';

    $('body').prepend(controls);

  } 

}());
