var defaultArgs_modSlider = {
  	id: "sliderScroller",			//def "sliderScroller"
  	corollary: "sliderScroller",			//def "sliderScroller"
  	displayLabel: "sliderScroller",			//def "sliderScroller"
  	parent: document.body,			//def document.body
  	contents: imageScans,			//def []
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
  	min: 1,			//def 1
  	max: 100,			//def 1
  	handleBorderColor: "rgba(55,55,55,1)",			//def 1
  	sliderBorderColor: "rgba(55,55,55,1)",			//def 1
  	sliderBGColor: "rgba(200,200,200,1)",			//def 1
  	handleBGColor: "rgba(155,155,155,1)",			//def 1
  	orientation: "horizontal",			//def 1
  	borderRadius_slider: 0,			//def 1
  	borderRadius_handle: 0,			//def 1
  	step: 1,			//def 1
  	value: 0,//Math.round(imageScans.length/2),
  	disableDocumentOverflow: true,
}


var mouseWheelScroll = function(e, that){
	  	//if (!that.mouseOver) return false;
	    var delta = 0, element = $(that.slider), value, result, oe;
	    oe = e.originalEvent; // for jQuery >=1.7
	    value = element.slider('value');
	
		var multiplier = (that.args["orientation"] == "horizontal") ? -1: 1;
		
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

	    if (value > that.args["max"]) {
	        value = that.args["max"];
	    }
	    if (value < that.args["min"]) {
	        value = that.args["min"];
	    }
	
	    result = element.slider('option', 'slide').call(element, e, { value: value });
	    if (result !== false) {
	        element.slider('value', value);
	    }
}

modSlider.prototype.bindToMouseWheel = function(elt){
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
		$(this.slider).slider('value', this.currValue);
	}
}



function modSlider(args){
	that = this;
	this.args = (args) ? mergeArgs(defaultArgs_modSlider, args) : defaultArgs_modSlider;
  	
//  	console.log(args);
  	this.widget = document.createElement("div");
  	this.widget.setAttribute("id", this.args["id"]);
  	//this.widget.style.cursor = "pointer";
  	this.args["parent"].appendChild(this.widget);

  	this.slider = document.createElement("div");
  	this.slider.setAttribute("id", this.args["id"] + "_slider");
  	this.widget.appendChild(this.slider);
    
    var that = this;
    //this.currValue = (this.args["orientation"] == "horizontal") ? this.args["min"] : this.args["max"];
    this.currValue = this.args["value"];
    				 
    
    this.mouseOver = false;
    
    this.sliderFunctions = [];
    this.mouseWheelBindElements = [];

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
	
	this.widget.onmouseover=function(){
		//console.log("MOUSEOVER! " + that.args["id"]); 
		this.mouseOver = true;
	}
	
	this.widget.onmouseout=function(){
		//console.log("MOUSEOUT! " + that.args["id"]); 
		this.mouseOver = false;
	}	
	
	this.sliderHandle = this.slider.getElementsByTagName('a')[0];
	this.sliderHandle.setAttribute("id", this.args["id"] + "_handle");
	
	this.scroller = document.createElement("div");
  	this.scroller.setAttribute("id", this.args["id"] + "_scroller");
  	this.widget.appendChild(this.scroller);

	this.sliderConstrainer= document.createElement("div");
  	this.sliderConstrainer.setAttribute("id", this.args["id"] + "_sliderConstrainer");
  	this.widget.removeChild(this.slider);  	
  	this.sliderConstrainer.appendChild(this.slider);
  	this.widget.appendChild(this.sliderConstrainer);
  	
  	this.valueDisplay = document.createElement("div");
  	this.valueDisplay.setAttribute("id", this.args["id"] + "_valueDisplay");
  	this.valueDisplay.innerHTML = (this.currValue);
  	this.valueDisplay.style.textAlign = "center";
  	if (!this.args["showValue"]) this.valueDisplay.style.display = "none";

  	this.args["parent"].appendChild(this.valueDisplay);

	this.restyle();
  	
	
	this.bindToMouseWheel(this.widget);
	
	 if (that.args["disableDocumentOverflow"]){
  		document.documentElement.style.overflowY = 'hidden';
  	}
  	
  	this.addSlideFunction = function(func){
  		addSlideFunction(that, func);
  	}
} 

modSlider.prototype.slide = function(e,ui){
	//console.log("this.id: " + this.args["id"] + " " + ui.value)
	this.currValue = (this.args["orientation"] == "horizontal") ? 
					  ui.value : this.args["max"] - ui.value + 1;
	this.valueDisplay.innerHTML = (this.currValue);
	otherSliderFunctions(this);
}
	
var addSlideFunction = function(that, func){
	//console.log("add slider function: " + func);
	that.sliderFunctions.push(func);
	$(that.slider).slider('option', 'slide').call(that.slider, that.slider, {value: that.currValue});
}

var otherSliderFunctions = function(that){
	//this.slide = func;
	//console.log("performing other slider functions: " + that.args.id + " " + that.sliderFunctions.length);
	for (var i=0; i<that.sliderFunctions.length; i++){
		that.sliderFunctions[i](that);
	}
}

modSlider.prototype.positionWidget = function(){
	this.widget.style.position = (this.args["position"]);
	this.widget.style.width = _px(this.args["width"]);
	this.widget.style.height = _px(this.args["height"]);
	this.widget.style.left = _px(this.args["left"] + 8);  // I have no idea why I have to do this.
	this.widget.style.top = _px(this.args["top"]);
	
		$(this.widget).css({
		"position": "absolute",
		"border" : "solid",
		"border-color": this.args["sliderBorderColor"],
	  	"background-color" : this.args["sliderBGColor"],
	  	"border-width" : _px(this.args["borderWidth_slider"]),
	  	"border-radius": _px(this.args["borderRadius_slider"]),	  		
	});
}

modSlider.prototype.restyle = function(){	
	//console.log("RESTYLE");
	this.positionWidget();
	//this.widget.style.backgroundColor = "rgba(255,0,0,.5)";

	if (this.args["showValue"]){
		this.valueDisplay.style.position = (this.args["position"]);
		this.valueDisplay.style.top =  _px(this.args["top"] + this.args["height"] + 20);
		this.valueDisplay.style.left =  _px(this.args["left"]);
		
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
		"width": _px(this.args["width_handle"]),
		"margin-left":  "-" + _px((this.args["width_handle"] + 2*this.args["borderWidth_handle"])/2),
		"height" : _px(this.args["height_handle"]),
		"margin-top" :   _px(handleTopMarginAdj),
		"border-color" : this.args["handleBorderColor"],
		"background" : this.args["handleBGColor"],
		"border-width" : _px(this.args["borderWidth_handle"]),	
		"font" : "none",
		"font-size" : "0px",
		"z-index": "500",
		"margin-bottom": "0px"
	})

	//*********************************************
	//	Dimension out and style the widget
	//*********************************************
	$(this.widget).css({
		"position": "absolute",
		"border" : "solid",
		"border-color": this.args["sliderBorderColor"],
	  	"background-color" : this.args["sliderBGColor"],
	  	"border-width" : _px(this.args["borderWidth_slider"]),
	  	"border-radius": _px(this.args["borderRadius_slider"]),	  		
	});
	//*********************************************
	//	Remove Default Styling
	//*********************************************	
  	$(this.slider).css({  		
	  	"background": "none",
	  	"border": "none",
  	});	

	if (this.args["orientation"] == "horizontal"){	  			    
	  	constrainWidth = this.args["width"]-(this.args["constrainMargin"]*2) - 	(this.args["width_handle"]);						  
	  	$(this.sliderConstrainer).css({
	  		"position": "relative",
		  	"width" : _px(constrainWidth),
		  	"height" : _px(this.args["height"]),
		  	"left": _px(0),
		  	"top": _px(0), // basically puts the slider at the top of the widget
		  				   // no big deal, because handle's top is adjusted
			//"backgroundColor" : "rgba(0,255,0,.5)",	 
			"margin" : "0px auto",	//aligns the slider and handle to the middle
	  	});	
	  	
	  	// for debugging
	  	$(this.slider).css({  	
	  		"height" : _px($(this.sliderConstrainer).css("height")),	
		  	"width" : _px($(this.sliderConstrainer).css("width")),		
		  	//"backgroundColor" : "rgba(0,255,0,.5)",	 
	  	});	 
	  	 	
		$(this.sliderHandle).css({
			// NOTE: margin-left is good -- the handle is centered by default.
			//       Don't mess with it.
		  	"left" : _px(0), // minor tweak
		  	"margin-top" : _px(0), 
		  	"top" : _px(this.args["height"]/2 - totalheight_handle/2),
		});
		
  }
  else if (this.args["orientation"] == "vertical"){
  						
  		constrainHeight = this.args["height"]-(this.args["constrainMargin"]*2) - (this.args["height_handle"]);			  
	  	$(this.sliderConstrainer).css({
	  		"position" : "relative",
		  	"height" : _px(constrainHeight),
		  	// no vertical align, so have to use this
		  	"top": _px((this.args["height"] - constrainHeight)/2),
		  	"left": _px(0),
		  	//"backgroundColor" : "rgba(0,255,0,.5)",	  		  		 		  		
	  	});	
	  	

	  	$(this.slider).css({
	  		// For whatever reason the slider hieght does not 
	  		// borrow from the slider container
		  	"height" : _px($(this.sliderConstrainer).css("height")),	
		  	"width" : _px($(this.sliderConstrainer).css("width")),	
		  	//"backgroundColor" : "rgba(0,255,0,.5)",		  		
	  	});	

			
	    $(this.sliderHandle).css({
		  	"left" : _px(this.args["width"]/2 - totalwidth_handle/2),
		  	// Don't mess with top, as that is how it slides.
		  	// mess with margin-top instdead
		  	//"top" : _px(0), 
		  	"margin-bottom" : _px(-totalheight_handle/2), 
		  	"margin-top" : _px(0), 
		  	"margin-left" : _px(0), 
		});
  }

	$(this.slider).slider('value', this.currValue);
  	
}

