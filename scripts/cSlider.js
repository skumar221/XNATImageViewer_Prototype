var jQueryScrollSlider= function(args){
  this.args = mergeArgs(this.defaultArgs, args);
  this.createScrollSliderElements();
  
  $(function() {
    //scrollpane parts
    var scrollPane = $( ".scroll-pane" );
    var scrollContent = $( ".scroll-content" );
 
    //build slider
    var scrollbar = $( ".scroll-bar" ).slider({
      slide: function( event, ui ) {
        if ( scrollContent.width() > scrollPane.width() ) {
          scrollContent.css( "margin-left", Math.round(
            ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
          ) + "px" );
        } else {
          scrollContent.css( "margin-left", 0 );
        }
      }
    });
    
    var handleHelper = scrollbar.find( ".ui-slider-handle" )
    .mousedown(function() {
      scrollbar.width( handleHelper.width() );
    })
    .mouseup(function() {
      scrollbar.width( "100%" );
    })
    //.append( "<span class='ui-icon ui-icon-grip-dotted-vertical'></span>" )
    .wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();
 
    //change overflow to hidden now that slider handles the scrolling
    scrollPane.css( "overflow", "hidden" );
 
    //size scrollbar and handle proportionally to scroll distance
    function sizeScrollbar() {
      var remainder = scrollContent.width() - scrollPane.width();
      var proportion = remainder / scrollContent.width();
      
      var handleSize = 0//this.args["handleWidth"];//scrollPane.width() - ( proportion * scrollPane.width() );
      
      /*
      scrollbar.find( ".ui-slider-handle" ).css({
        width: handleSize,
        "margin-left": -handleSize / 2
      });
      */
     
      handleHelper.width( "" ).width( scrollbar.width() - handleSize );
    }
 
    //reset slider value based on scroll content position
    function resetValue() {
      var remainder = scrollPane.width() - scrollContent.width();
      var leftVal = scrollContent.css( "margin-left" ) === "auto" ? 0 :
        parseInt( scrollContent.css( "margin-left" ) );
      var percentage = Math.round( leftVal / remainder * 100 );
      scrollbar.slider( "value", percentage );
    }
 
    //if the slider is 100% and window gets larger, reveal content
    function reflowContent() {
        var showing = scrollContent.width() + parseInt( scrollContent.css( "margin-left" ), 10 );
        var gap = scrollPane.width() - showing;
        if ( gap > 0 ) {
          scrollContent.css( "margin-left", parseInt( scrollContent.css( "margin-left" ), 10 ) + gap );
        }
    }
 
    //change handle position on window resize
    $( window ).resize(function() {
      resetValue();
      sizeScrollbar();
      reflowContent();
    });
    //init scrollbar size
    setTimeout( sizeScrollbar, 10 );//safari wants a timeout
  });
}

jQueryScrollSlider.prototype.defaultArgs = {
	handleColor: "rgba(50, 50, 50, 1)",
	id: "slider",
  	parent: document.body,
  	width: 600,
  	height: 200,	
  	thumbWidth: 100,
  	thumbHeight: 100,
  	thumbMargin: 6,
  	borderWidth: 1,
  	borderRadius: 0,
  	handleHeight: 10,
  	handleWidth: 5,
  	sliderHeight: 5
}

jQueryScrollSlider.prototype.getAndSetCSS = function() {
	    // Code borrowed from http://jqueryui.com/slider/#side-scroll 
	  var contentWidth = 0;
	  for (var i=0;i<this.args["contents"].length;i++){
	  	contentWidth  += this.args["thumbWidth"] + this.args["thumbMargin"]*2;
	  } 
	  contentWidth += this.args["thumbMargin"] + (2*this.args["borderWidth"])*this.args["contents"].length;
  
	  var styleStrs = new Array(8);
	  
	  styleStrs[0] = _css(".scroll-pane", { 
		 'overflow': 	"auto", 
		 'width':  		_px(this.args["width"]), 
		 'float': 		"left",  
		 "border-radius" : _px(this.args["borderRadius"]),
	  });
	                  
	  styleStrs[1] = _css(".scroll-content",  { 
		 'width' : 		_px(contentWidth), 
		 'float' : 		"left", 
	  });
	  				 
	  styleStrs[2] = _css(".scroll-content-item",{ 
		 'width' : 		_px(this.args["thumbWidth"]), 
		 'height' : 	_px(this.args["thumbHeight"]), 
		 'float' : 		"left", 
		 'margin' : 	_px(this.args["thumbMargin"]), 
		 'font-size' : 	"3em",
		 'line-height': "96px", 
		 'text-align' : "center",
		});
	
	  styleStrs[3] = _css(".scroll-bar-wrap", { 
	   	 'clear': 		"left", 
	   	 'padding': 	"0 2px 0 2px", 
	   	 'margin': 		"0 -1px -1px -1px",
	  });
	  
	  styleStrs[4] = _css(".scroll-bar-wrap .ui-slider", { 
		'background': 	"none", 
		'border': 		"0", 
		'height': 		_px(this.args["sliderHeight"]), 
		'margin': 		"0 auto",
		'border-radius': "0px"
	  });
	    
	  styleStrs[5] = _css(".scroll-bar-wrap .ui-handle-helper-parent", { 
	  	'position': 	"relative", 
	  	'width': 		"100%", 
	  	'height': 		"100%", 
	  	'margin': 		"0 auto", 
	  });
	  
	  styleStrs[6] = _css(".scroll-bar-wrap .ui-slider-handle", { 
		"height"     : _px(this.args["handleHeight"]),
		"width"     : _px(this.args["handleWidth"]),
	  });
	  
	  styleStrs.push( _css(".ui-corner-all", { 
	  	"border-radius" : _px(this.args["borderRadius"]),
	  }));
	  
	  styleStrs.push( _css(".ui-slider-handle", { 
	  	"background" : this.args["handleColor"],
	  }));
	  
	  styleStrs.push( _css(".ui-state-default", { 
	  	"background" : "none",
	  	"background-color" : "none",
	  }));

	  styleStrs.push( _css(".ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default", { 
	  	"background" : this.args["handleColor"],
	    "border-color" : "rgba(0,0,0,0)",
	  }));
	  
	  styleStrs.push( _css(".ui-slider-horizontal .ui-slider-handle", {
	    "top": _px(-this.args["handleHeight"] + this.args["sliderWidth"]/2),
	    "margin-left": "-0px",
	  }));

	  styleStrs = styleStrs.map(function(a){return "<style type='text/css'>" + a + "</style>"});
	for (var i=0;i<styleStrs.length;i++){
		$(styleStrs[i]).appendTo("head");
	} 
}

jQueryScrollSlider.prototype.createScrollSliderElements = function(){
  
  parent = (!this.args["parent"]) ? document.body: this.args["parent"];
  id = (!this.args["id"]) ? "genericScrollSlider": this.args["id"];
   
  var sS = document.createElement("div");
  sS.setAttribute("id", id);
  sS.className = "scroll-pane ui-widget ui-widget-header";
  parent.appendChild(sS);
  
  sC = document.createElement("div");
  sC.setAttribute("id", id + "_scrollContent");
  sC.className = "scroll-content";
  sS.appendChild(sC);
  
  var numFrames = (this.args["contents"])? this.args["contents"].length: 20;
  for (var i=0;i<numFrames;i++){
  	var c = document.createElement("img");
  	c.setAttribute("id",   sC.getAttribute("id") + "_scrollContentImage" + i.toString());
  	c.className = "scroll-content-item ui-widget-header";
  	c.innerHTML = i.toString();
  	c.src = this.args["contents"][i];
  	sC.appendChild(c);
  }

  sB = document.createElement("div");
  sB.setAttribute("id",   id + "_scrollBar");
  sB.className = "scroll-bar-wrap ui-widget-content ui-corner-bottom";
  sS.appendChild(sB);
  
  sBb = document.createElement("div");
  sBb.setAttribute("id",   sB.getAttribute("id") + "_scrollBarb");
  sBb.className = "scroll-bar";
  sB.appendChild(sBb);
  
  this.getAndSetCSS();
}


<<<<<<< HEAD

=======
window.onload = function(){
	var args = {
	  	id: "sS_A",
	  	parent: document.body,
	  	contents: imageScans,
	  	width: 600,
	  	height: 200,	
	  	thumbWidth: 100,
	  	thumbHeight: 100,
	  	thumbMargin: 6,
	  	borderWidth: 1,
	  	borderRadius: 0,
	  	handleHeight: 20,
	  	handleWidth: 8,
	  	sliderHeight: 10
  	}
	a = new jQueryScrollSlider(args);
	//console.log(_px(1))
}
>>>>>>> Updated
