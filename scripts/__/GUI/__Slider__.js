var defaultArgs___Slider__ = {
  	id: "sliderScroller",			//def "sliderScroller"
  	corollary: "sliderScroller",			//def "sliderScroller"
  	displayLabel: "sliderScroller",			//def "sliderScroller"
  	parent: document.body,			//def document.body
  	width: 200,						//def 500
  	height: 8,					//def 200
  	top: 50,						//def 0
  	left: 50,						//def 0
  	position: "absolute",			//def absolute
  	height_handle: 20,				//def 16
  	width_handle: 7,				//def 8
  	constrainMargin: 0,				//def 3
  	borderWidth_slider: 1,			//def 1
  	borderWidth_handle: 1,			//def 1
  	min: 0,			//def 1
  	max: 100,			//def 1
  	handleBorderColor: __Globals__.inactiveLineColor,			//def 1
  	sliderBorderColor: __Globals__.inactiveLineColor,			//def 1
  	sliderBGColor: "rgba(20,20,20,1)",			//def 1
  	handleBGColor: "rgba(155,155,155,1)",			//def 1
  	orientation: "horizontal",			//def 1
  	borderRadius_slider: 0,			//def 1
  	borderRadius_handle: 0,			//def 1
  	step: 1,			//def 1
  	value: 0,
  	disableDocumentOverflow: true,
  	lastMouseWheelEvent: 0,
}


var mouseWheelScroll = function(e, that){
	  	//get the current mouseWheelEvent
	  	_date = new Date();
	    var currMouseWheelEvent = _date.getTime();
	    
	    var delta = 0, element = $(that.slider), value, result, oe;
	    oe = e.originalEvent; // for jQuery >=1.7
	    value = element.slider('value');
	
		var multiplier = (that.args["orientation"] == "horizontal") ? -1: 1;
		
		var timeDiff = currMouseWheelEvent - that.args.lastMouseWheelEvent;
		if (timeDiff < 70){
			multiplier *= 1.5; 
		}
		
		
	    if (oe.wheelDelta) {
	        delta -= oe.wheelDelta;
	    }
	    if (oe.detail) {
	        delta = oe.detail * 40;
	    }
		// Delta varies depending on the browser
		// We just need the sign (.i.e. the direction of the mouse scroll)
		var d = (delta< 0)? -1: 1 
	    value -= multiplier * d * that.args["step"];


	    if (value > $(that.slider).slider("option", "max")) {
	        value = $(that.slider).slider("option", "max");
	    }
	    if (value < $(that.slider).slider("option", "min")) {

	        value = $(that.slider).slider("option", "min");
	    }
	
		// Need to round the value if the "step" of the slider
		// is an integer
		if (! (value % $(that.slider).slider("option", "step") === 0)){
			value = Math.round(value )
		}
		
	    result = element.slider('option', 'slide').call(element, e, { value: value });
	    that.currValue = value;
	    //console.log("value: " + that.currValue)
	    if (result !== false) {
	        element.slider('value', value);
	    }

	    that.args.lastMouseWheelEvent = currMouseWheelEvent;
}

__Slider__.prototype.bindToMouseWheel = function(elt){
//	console.log(this.args.id)
 	var that = this;
    var eltFound = false;
    for (var i=0;i<this.mouseWheelBindElements.length;i++){
    	if (this.mouseWheelBindElements[i] == elt){
    		eltFound = true;
    		break;
    	}
    } 		
	if (!eltFound){
		this.mouseWheelBindElements.push(elt);
		$(elt).bind('mousewheel DOMMouseScroll', function(e){mouseWheelScroll(e, that)});
		$(this.slider).slider('option', 'value', this.currValue);
		$(elt).hover(function(){
			that.mouseOver = true;
		});
	}
}



function __Slider__(args){
	that = this;
	this.args = (args) ? __MergeArgs__(defaultArgs___Slider__, args) : defaultArgs___Slider__;
  	
  	
  	
 	//----------------------------------
	// PRIVATE VARS
	//----------------------------------      
    this.mouseOver = false;
    this.slideCallbacks = [];
    this.mouseWheelBindElements = [];
    
    
    
     	
	//----------------------------------
	// WIDGET
	//----------------------------------	
  	this.widget = document.createElement("div");
  	this.widget.setAttribute("id", this.args["id"]);
  	this.args["parent"].appendChild(this.widget);




	//----------------------------------
	// JQUERY SLIDER
	//----------------------------------
  	this.slider = document.createElement("div");
  	this.slider.setAttribute("id", this.args["id"] + "_slider");
  	this.widget.appendChild(this.slider);




	//----------------------------------
	// SLIDER'S VALUES
	//----------------------------------    
    var that = this;
    this.currValue = this.args["value"];
	$(this.slider).slider({
		  orientation: this.args["orientation"],
		  min: this.args["min"],
          max: this.args["max"],
          value: this.args["value"],
          step: this.args["step"],
          slide: function(e,ui, _that){
          	  if (_that) {
          	  	_that.slide(e, ui);
          	  }
          	  that.slide(e, ui);
          },
	});




	//----------------------------------
	// DETATCHING THE CSS PROVIDED BY JQUERY UI
	// FOR VARIOUS SLIDER COMPONENTS
	//----------------------------------  
	this.sliderHandle = this.slider.getElementsByTagName('a')[0];
	this.sliderHandle.setAttribute("id", this.args["id"] + "_handle");
	$(this.sliderHandle).removeClass("ui-slider-horizontal");

	// the scroller
	
	this.scroller = document.createElement("div");
  	this.scroller.setAttribute("id", this.args["id"] + "_scroller");
  	this.widget.appendChild(this.scroller);
  	
	// the constrainer, which is actually the jquery slider's bounds
	
	this.sliderConstrainer= document.createElement("div");
  	this.sliderConstrainer.setAttribute("id", this.args["id"] + "_sliderConstrainer");
  	this.widget.removeChild(this.slider);  	
  	this.sliderConstrainer.appendChild(this.slider);
  	this.widget.appendChild(this.sliderConstrainer);

	// the value display, usually hidden
	 	
  	this.valueDisplay = document.createElement("div");
  	this.valueDisplay.setAttribute("id", this.args["id"] + "_valueDisplay");
  	this.valueDisplay.innerHTML = (this.currValue);
  	this.valueDisplay.style.textAlign = "center";
  	if (!this.args["showValue"]) this.valueDisplay.style.display = "none";

  	this.args["parent"].appendChild(this.valueDisplay);




	//----------------------------------
	// BIND WIDGET TO MOUSE WHEEL
	//---------------------------------- 	
	this.bindToMouseWheel(this.widget);
	
	 if (that.args["disableDocumentOverflow"]){
  		document.documentElement.style.overflowY = 'hidden';
  	}
  	
  	this.addSlideCallback = function(func, mapValueToSlider, clearAll, call){
  		addSlideCallback(that, func, mapValueToSlider, clearAll, call);
  	}
  	
  	
  	this.addLinkedCallback = function(func){
  		if (!that.linkedCallbacks)
			that.linkedCallbacks = [];
  		addLinkedCallback(that, func);
  	}
  	
  	this.updateCSS();
} 




//******************************************************
// The official slide routine
//******************************************************
__Slider__.prototype.slide = function(e,ui){
	//console.log("this.id: " + this.args["id"] + " " + ui.value);
	this.currValue = (this.args["orientation"] == "horizontal") ? 
					  ui.value : this.args["max"] - ui.value;
	this.valueDisplay.innerHTML = (this.currValue);
	performCallbacks(this);
}




//******************************************************
// Changes the slider properties and calls the slide routine!
//******************************************************
__Slider__.prototype.changeSliderProperties = function(args, callSlide){
	if (args["min"]) $(this.slider).slider("option", "min",   args["min"]);
	if (args["max"]) $(this.slider).slider("option", "max",   args["max"]);
	if (args["step"]) $(this.slider).slider("option", "step",  args["step"]);
	if (args["value"]) {
		$(this.slider).slider("option", "value", args["value"]);
		this.currValue = args["value"]
	}
	
	if (callSlide===true){
		$(this.slider).slider('option', 'slide').call(this.slider, this.slider, {
			value: $(this.slider).slider("option", "value")
		});	
	}
}




//******************************************************
//  Clips value to the min/max of the slider.  Sometimes these
//  are violated b/c of the mousehweel.
//******************************************************
__Slider__.prototype.clipValue = function(val){
	this.currValue = (val) ? val : this.currValue;

	
	if (this.currValue > this.args.max){
		$(this.slider).slider("option", "max", this.currValue);
	}
	
	
	else if (this.currValue < this.args.min){
		$(this.slider).slider("option", "min", this.currValue);
	}
	
	
	$(this.slider).slider("option", "value", this.currValue);
}




//******************************************************
//  Append to callback list
//******************************************************
var addSlideCallback = function(that, func, mapValueToSlider, clearAll, call){

	that.clipValue(mapValueToSlider);
	if (clearAll === true) that.slideCallbacks = [];
	that.slideCallbacks.push(func);

	if (!call===false){
		$(that.slider).slider('option', 'slide').call(that.slider, that.slider, {value: that.currValue});
		that.currValue = $(that.slider).slider("option", "value");
	}
}




//******************************************************
//  Append to linked callback list
//******************************************************
var addLinkedCallback = function(that, func){
	that.linkedCallbacks.push(func);
}




//******************************************************
//  Clears linked callbacks and sliders
//******************************************************
__Slider__.prototype.clearLinked= function(){
	this.linkedCallbacks = [];
	this.linkedSliders = [];
}




//******************************************************
//  Runs the callbacks
//******************************************************
var performCallbacks = function(that){
	for (var i=0; i<that.slideCallbacks.length; i++){
		that.slideCallbacks[i](that);
	}
	
	if (that.linkedSliders && that.linkedSliders.length > 0 
		&& that.linkedCallbacks && that.linkedCallbacks.length > 0){
		for (var i=0;i<that.linkedCallbacks.length; i++){
//			console.log("CALLING LINKED CALLBACK " + i)
			that.linkedCallbacks[i](that);
		}
	}
}




//******************************************************
//  Links the inputted slider (b) to this (a)
//******************************************************
__Slider__.prototype.linkSlider = function(b){
	
	var that = this;
	if (this.linkedSliders){
		for (var i=0;i<this.linkedSliders.length; i++){
			if(b == this.linkedSliders[i]){
				return;
			}				
		}
		this.linkedSliders.push(b);		
	}
	else{
		this.linkedSliders = [];
	}

	this.addLinkedCallback(function(a){  
		if (a.mouseOver){	
			
			var aDiff = $(a.slider).slider("option", "max") - $(a.slider).slider("option", "min");
			
			var bDiff = $(b.slider).slider("option", "max") - $(b.slider).slider("option", "min");
			// percentage-based linking
			var bVal = Math.round(bDiff * (a.currValue / aDiff));

			b.changeSliderProperties({value: bVal}, false);
			performCallbacks(b);
			//b.slide(null, {value: bVal});
		}
  	});
}




__Slider__.prototype.updateCSS = function(){	




	//----------------------------------------------
	//  CSS: THE WIDGET
	//----------------------------------------------
	$(this.widget).css({
		"position": "absolute",
		width: __PX__(this.args["width"]),
		height: __PX__(this.args["height"]),
		left: __PX__(this.args["left"]),
		top: __PX__(this.args["top"]),
		"border" : "solid",
		"border-color": this.args["sliderBorderColor"],
	  	"background-color" : this.args["sliderBGColor"],
	  	"border-width" : (this.args["borderWidth_slider"]),
	  	"border-radius": (this.args["borderRadius_slider"]),	  		
	});
	
	
	
	
	//----------------------------------------------
	//  CSS: VALUE DISPLAY
	//----------------------------------------------
	if (this.args["showValue"]){
		this.valueDisplay.style.position = (this.args["position"]);
		this.valueDisplay.style.top =  __PX__(this.args["top"] + this.args["height"] + 20);
		this.valueDisplay.style.left =  __PX__(this.args["left"]);
	}

	//correctly compute the height of the slider + handle
	var totalSliderHeight = this.args["height"] + 2*this.args["borderWidth_slider"];
	var totalheight_handle = this.args["height_handle"] + 2*this.args["borderWidth_handle"];
	
	// determine whether the handle+borders or the slider+borders is taller
	var heightAdj = 0;//(totalSliderHeight < totalheight_handle) ? totalheight_handle/2 + totalSliderHeight/2 : totalSliderHeight;
	var handleTopMarginAdj = 0; 
	
	if (totalSliderHeight < totalheight_handle){
		heightAdj = totalheight_handle/2 + totalSliderHeight/2;
		handleTopMarginAdj = -(totalheight_handle/2 - this.args["height"]/2);
	}
	else{
		heightAdj = totalSliderHeight;
		handleTopMarginAdj = this.args["height"]/2 - totalheight_handle/2; 
		
	}
	
	var totalSliderWidth = this.args["width"] + this.args["borderWidth_slider"]*2;
	var totalwidth_handle = this.args["width_handle"] + this.args["borderWidth_handle"]*2;
	var deltaWidth = totalwidth_handle - totalSliderWidth;
	
	var totalSliderHeight = this.args["height"] + this.args["borderWidth_slider"]*2;
	var totalheight_handle = this.args["height_handle"] + this.args["borderWidth_handle"]*2;
	var deltaHeight = totalheight_handle - totalSliderHeight;
	
	$(this.sliderHandle).css({
		"border-radius": this.args["borderRadius_handle"],
		"width": (this.args["width_handle"]),
		"margin-left":  "-" + ((this.args["width_handle"] + 2*this.args["borderWidth_handle"])/2),
		"height" : (this.args["height_handle"]),
		"margin-top" :   (handleTopMarginAdj),
		"border-color" : this.args["handleBorderColor"],
		"background" : this.args["handleBGColor"],
		"border-width" : (this.args["borderWidth_handle"]),	
		"font" : "none",
		"font-size" : "0px",
		"z-index": "500",
		"margin-bottom": "0px",
	})

	//*********************************************
	//	Dimension out and style the widget
	//*********************************************
	$(this.widget).css({
		"position": "absolute",
		"border" : "solid",
		"border-color": this.args["sliderBorderColor"],
	  	"background-color" : this.args["sliderBGColor"],
	  	"border-width" : (this.args["borderWidth_slider"]),
	  	"border-radius": (this.args["borderRadius_slider"]),	  		
	});
	
	//*********************************************
	//	Remove Default Styling
	//*********************************************	
  	$(this.slider).css({  		
	  	"background": "none",
	  	"border": "none",
  	});	

	if (this.args["orientation"] == "horizontal"){	  
		//console.log("Horiz: " + this.args.id);			    
	  	constrainWidth = this.args["width"]-(this.args["constrainMargin"]*2) - 	(this.args["width_handle"]);						  
	  	$(this.sliderConstrainer).css({
	  		"position": "relative",
		  	"width" : __PX__(constrainWidth),
		  	"height" : __PX__(this.args["height"]),
		  	"left": __PX__(0),
		  	"top": __PX__(0), // basically puts the slider at the top of the widget
		  				   // no big deal, because handle's top is adjusted
			//"backgroundColor" : "rgba(0,255,0,.5)",	 
			"margin" : "0px auto",	//aligns the slider and handle to the middle
	  	});	
	  	
	  	// for debugging
	  	$(this.slider).css({  	
	  		"height" : __PX__($(this.sliderConstrainer).css("height")),	
		  	"width" : __PX__($(this.sliderConstrainer).css("width")),		
		  	//"backgroundColor" : "rgba(0,255,0,.5)",	 
	  	});	 
	  	 	
		$(this.sliderHandle).css({
		  	"margin-left" : (-totalwidth_handle/2), // minor tweak
		  	"margin-top" : (0), 
		  	"top" : (this.args["height"]/2 - totalheight_handle/2),
		});
		
  }
  else if (this.args["orientation"] == "vertical"){	
  		//console.log("vert: " + this.args.id)
  		constrainHeight = this.args["height"]-(this.args["constrainMargin"]*2) - (this.args["height_handle"]);			  
	  	$(this.sliderConstrainer).css({
	  		"position" : "relative",
		  	"height" : (constrainHeight),
		  	// no vertical align, so have to use this
		  	"top": ((this.args["height"] - constrainHeight)/2),
		  	"left": (0),
		  	//"backgroundColor" : "rgba(0,255,0,.5)",	  		  		 		  		
	  	});	

	  	$(this.slider).css({
	  		// For whatever reason the slider hieght does not 
	  		// borrow from the slider container
		  	"height" : $(this.sliderConstrainer).css("height"),	
		  	"width" : $(this.sliderConstrainer).css("width"),	
		  	//"height" : (0),	
		  	//"width" : (0),	
		  	//"backgroundColor" : "rgba(0,255,0,.5)",		  		
	  	});	

			
	    $(this.sliderHandle).css({
		  	"left" : ((this.args["width"]/2 - totalwidth_handle/2)),
		  	// Don't mess with top, as that is how it slides.
		  	// mess with margin-top instdead
		  	//"top" : (0), 
		  	"margin-bottom" : (-totalheight_handle/2), 
		  	"margin-top" : (0), 
		  	"margin-left" : (0), 
		});
  }

	//$(this.slider).slider('option', 'value', this.currValue);
  	
}

