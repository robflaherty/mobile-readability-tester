(function() {
  
  /* 
   * jQuery injection courtesy, @reybango, @paul_irish, and @jquery
   * http://blog.reybango.com/2010/09/02/how-to-easily-inject-jquery-into-any-web-page/
   */

	var script = document.createElement('script');

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

    // Pump in stylesheet hosted at github
    jQuery('head').append('<link rel="stylesheet" type="text/css" href="http://robflaherty.github.com/mobile-readability-tester/styles.css" />');
    
    // Quick and dirty HTML  	
    var controls = '<div id="mobile-readability-controls"> \
      <h1>Mobile Readability Tester <small><a href="https://github.com/robflaherty/mobile-readability-tester">(Home)</a></small></h1> \
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

    jQuery('body').prepend(controls);
    addHandlers();

  } 
  
  function addHandlers() {

    var container = prompt("What's the selector for the element that wraps your main content?", "#content");

    printCalc();
    
    jQuery('#choose-padding').change(function() {
      setPadding();
      printCalc();
    });
    
    jQuery('#choose-font').change(function() {
      setFont();
      printCalc();      
    });    
    
    jQuery('#choose-size').change(function() {
      setSize();
      printCalc();      
    });
        
    function setFont() {
      var option = jQuery('#choose-font').find('option:selected').val();
      jQuery(container).css({ 'font-family': option });
    }    
    
    function setSize() {
      var option = jQuery('#choose-size').find('option:selected').val();
      jQuery(container).css({ 'font-size': option });
    }
    
    function setPadding() {
      var option = jQuery('#choose-padding').find('option:selected').val();
      jQuery(container).css({ 'padding-left': option, 'padding-right': option });
      
      //Hack to fix text reflow
      jQuery('p').toggleClass('relative');      
      setSize();
    }    
    
    function printCalc() {
      jQuery('.article-height').html(jQuery(container).height() + 'px');      
      jQuery('.article-pages').html((jQuery(container).height() / 416).toFixed(1));      
    }
      
  }
  
}());
