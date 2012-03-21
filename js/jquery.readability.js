// Mobile Readability Tester
// A plugin to test the readability of pages on mobile.
// version 0.5, March 21st, 2012
// by @robflaherty
// with help from Daniel Garcia (@buzzedword)

!function($) {

    $.fn.readability = function(method) {

        var methods = {

            init : function(options) {
                this.readability.settings = $.extend({}, this.readability.defaults, options);
                return this.each(function() {
                    var $element = $(this),
                         element = this;
						$('body').prepend(helpers.buildControls());                         
                         
					    helpers.setFont(element);    
					    helpers.setPadding(element);
					    helpers.setSize(element);
					    helpers.printCalc(element);                         
                         
					    $(document).on('change', '#choose-padding', function(event) {
					      helpers.setPadding(element);
					      helpers.printCalc(element);
					    });
					    
					    $(document).on('change', '#choose-font', function(event) {
					      helpers.setFont(element);
					      helpers.printCalc(element);      
					    });    
					    
					    $(document).on('change', '#choose-size', function(event) {
					      helpers.setSize(element);
					      helpers.printCalc(element);      
					    });		
					    
				   window.hideUrlBar = function(){/mobile/i.test(navigator.userAgent)&&!pageYOffset&&!location.hash&&setTimeout(function(){window.scrollTo(0,1)},1000)};			
                });

            }
        }

        var helpers = {
        	style : { // src : http://jsfiddle.net/doktormolle/ubDDd/
	          insertRule:function(selector,rules,contxt)
	          {
	            var context=contxt||document,stylesheet;
	
	            if(typeof context.styleSheets=='object')
	            {
	              if(context.styleSheets.length)
	              {
	                stylesheet=context.styleSheets[context.styleSheets.length-1];
	              }
	              if(context.styleSheets.length)
	              {
	                if(context.createStyleSheet)
	                {
	                  stylesheet=context.createStyleSheet();
	                }
	                else
	                {
	                  context.getElementsByTagName('head')[0].appendChild(context.createElement('style'));
	                  stylesheet=context.styleSheets[context.styleSheets.length-1];
	                }
	              }
	              if(stylesheet.addRule)
	              {
	                for(var i=0;i<selector.length;++i)
	                {
	                  stylesheet.addRule(selector[i],rules);
	                }
	              }
	              else
	              {
	                stylesheet.insertRule(selector.join(',') + '{' + rules + '}', stylesheet.cssRules.length);  
	              }
	            }
	          }
	        },
            setFont: function(el) {
		      var option = $('#choose-font').find('option:selected').val();
		      	$(el).css({ 'font-family': option });
            },
            setSize: function(el){
		      var option = $('#choose-size').find('option:selected').val();
		      	$(el).css({ 'font-size': option });            
            },
            setPadding: function(el){
		      var option = $('#choose-padding').find('option:selected').val();
		      	$(el).css({ 'padding-left': option, 'padding-right': option });            
            },
            printCalc: function(el){
		      $('.article-height').html($(el).height() + 'px');      
		      $('.article-pages').html(($(el).height() / 416).toFixed(1));            
            },
            buildControls : function(){
        		Array.prototype.middle = function(){
        			return Math.ceil(this.length / 2);
        		};
            	
            	helpers.style.insertRule(['div.info select'], 'font-size: 16px;');
            	helpers.style.insertRule(['div.info'], 'font-family: sans-serif; border-bottom: 1px solid #ddd; overflow: hidden; margin: 0 0 1.5em; padding: 10px; background: #eee;');
            	helpers.style.insertRule(['.info select'], 'float: right;');
            	helpers.style.insertRule(['div.info .article-height', 'div.info .article-pages'], 'font-weight: bold; float: right;');
            	helpers.style.insertRule(['div.info h1'], 'font-size: 1.5em; margin: 0 0 1em; padding: 0; line-height: 1em;');
            	helpers.style.insertRule(['div.info fieldset'], 'margin: 0 0 10px; padding: 0; border: 0;');
            	
            	var infoDiv = $('<div/>', {
            		class : "info"
            	});
	            	var title = $('<h1/>').html('Mobile Readability Tester');
	            	var fieldset = {
	            		fontFamily: $('<fieldset/>').html($('<label/>').html('Font Family')),
	            		fontSize: $('<fieldset/>').html($('<label/>').html('Font Size')),
	            		contentPadding: $('<fieldset/>').html($('<label/>').html('Content Padding')),
	            		articleHeight: $('<fieldset/>').html($('<label/>').html('Article Height')),	            			            			            	            		iphonePages: $('<fieldset/>').html($('<label/>').html('iPhone Pages'))			            		
	            	};
	            	
	            		var fontPicker = $('<select/>', {
	            			id : 'choose-font'
	            		});
	            		var fontOptions = [
	            			$('<option/>', { value : 'Georgia'}).html('Georgia'),
	            			$('<option/>', { value : 'Helvetica'}).html('Helvetica')	            			
	            		];
	            		fontOptions[fontOptions.middle()].attr('selected', 'true');	            		
	            		$.each(fontOptions, function(i, el){
	            			fontPicker.append(el);
	            		});
	            		

            			var sizePicker = $('<select/>', {
	            			id : 'choose-size'
	            		});
	            		var sizeOptions = [];
	            		for (var i = 12; i <= 20; i++){
	            			var px = i + 'px';
	            			sizeOptions.push($('<option/>', {
	            				value : px
	            			}).html(px));
	            		}
	            		sizeOptions[sizeOptions.middle()].attr('selected', 'true');
	            		$.each(sizeOptions, function(i, el){
	            			sizePicker.append(el);
	            		});	            		

            			var paddingPicker = $('<select/>', {
	            			id : 'choose-padding'
	            		});
	            		var paddingOptions = [];
	            		for (var j = 0; j < 10; j++) {
	            			var px = (j * 5) + 'px';
	            			paddingOptions.push($('<option/>', {
	            				value : px
	            			}).html(px));
	            		}
	            		paddingOptions[paddingOptions.middle()].attr('selected', 'true');
	            		$.each(paddingOptions, function(i, el){
	            			paddingPicker.append(el);
	            		});
            		fieldset.fontFamily.append(fontPicker);	            		
            		fieldset.fontSize.append(sizePicker);	            		
	            	fieldset.contentPadding.append(paddingPicker);
	            	fieldset.articleHeight.append($('<span/>', { class : 'article-height' }));
	            	fieldset.iphonePages.append($('<span/>', { class : 'article-pages' }));
	            	

	            	
	            infoDiv.append(title);
	            infoDiv.append(fieldset.fontFamily);
	            infoDiv.append(fieldset.fontSize);
	            infoDiv.append(fieldset.contentPadding);
	            infoDiv.append(fieldset.articleHeight);
	            infoDiv.append(fieldset.iphonePages);

	            return infoDiv;	            		
            }
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in readability plugin!');
        }

    }

    $.fn.readability.defaults = {};

    $.fn.readability.settings = {};

}(jQuery);