function mergeArgs(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

var jQueryScrollSlider= function(args){
  this.args = args;
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
    .append( "<span class='ui-icon ui-icon-grip-dotted-vertical'></span>" )
    .wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();
 
    //change overflow to hidden now that slider handles the scrolling
    scrollPane.css( "overflow", "hidden" );
 
    //size scrollbar and handle proportionally to scroll distance
    function sizeScrollbar() {
      var remainder = scrollContent.width() - scrollPane.width();
      var proportion = remainder / scrollContent.width();
      var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );
      scrollbar.find( ".ui-slider-handle" ).css({
        width: handleSize,
        "margin-left": -handleSize / 2
      });
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

jQueryScrollSlider.prototype.createScrollSliderElements = function(){
  
  parent = (!this.args["parent"]) ? document.body: this.args["parent"];
  id = (!this.args["id"]) ? "genericScrollSlider": this.args["id"];
  
  // Code borrowed from here: http://jqueryui.com/slider/#side-scroll
  var styleStrs = new Array(8)  
  styleStrs[0] = ".scroll-pane { overflow: auto; width: 200px; float:left; }";
  styleStrs[1] = ".scroll-content { width: 2900px; float: left; }";
  styleStrs[2] = ".scroll-content-item { width: 100px; height: 100px; float: left; margin: 10px; font-size: 3em; line-height: 96px; text-align: center; }";
  styleStrs[3] = ".scroll-bar-wrap { clear: left; padding: 0 4px 0 2px; margin: 0 -1px -1px -1px; }";
  styleStrs[4] = ".scroll-bar-wrap .ui-slider { background: none; border:0; height: 2em; margin: 0 auto;  }";
  styleStrs[5] = ".scroll-bar-wrap .ui-handle-helper-parent { position: relative; width: 100%; height: 100%; margin: 0 auto; }";
  styleStrs[6] = ".scroll-bar-wrap .ui-slider-handle { top:.2em; height: 1.5em; }";
  styleStrs[7] = ".scroll-bar-wrap .ui-slider-handle .ui-icon { margin: -8px auto 0; position: relative; top: 50%; }";
  for (var i=0;i<styleStrs.length;i++){
   	$("<style type='text/css'>" + styleStrs[i] + "</style>").appendTo("head");
  } 
   
  var sS = document.createElement("div");
  sS.setAttribute("id", id);
  sS.className = "scroll-pane ui-widget ui-widget-header ui-corner-all";
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
}


window.onload = function(){
	var args = {
	  	id: "sS_A",
	  	parent: document.body,
	  	contents: imageScans,	
  	}
	a = new jQueryScrollSlider(args);
}
