function _px(){
	var val = 0;
	for (i=0;i<arguments.length;i++){
		val += parseInt(arguments[i], 10);
	}
	return val.toString() + "px";
}

function _i(val){
	return parseInt(val, 10);
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

	    if (value > that.args["sliderMax"]) {
	        value = that.args["sliderMax"];
	    }
	    if (value < that.args["sliderMin"]) {
	        value = that.args["sliderMin"];
	    }
	
	    result = element.slider('option', 'slide').call(element, e, { value: value });
	    if (result !== false) {
	        element.slider('value', value);
	    }
}

skSlider.prototype.bindMouseWheel = function(that, otherElements){
	 // From: http://stackoverflow.com/questions/5722949/ui-slider-mousewheel/5723291#5723291
	 	var that = that;
	  	$(this.widget).bind('mousewheel DOMMouseScroll', function(e){mouseWheelScroll(e, that)});
}



function skSlider(args){
	this.args = args;
  	
  	this.widget = document.createElement("div");
  	this.widget.setAttribute("id", this.args["id"]);
  	//this.widget.style.cursor = "pointer";
  	this.args["parent"].appendChild(this.widget);

  	this.slider = document.createElement("div");
  	this.slider.setAttribute("id", this.args["id"] + "_slider");
  	this.widget.appendChild(this.slider);
    
    var that = this;
    //this.currValue = (this.args["orientation"] == "horizontal") ? this.args["sliderMin"] : this.args["sliderMax"];
    this.currValue = this.args["startValue"];
    				 
    
    this.mouseOver = false;
    
    this.sliderFunctions = [];

	$(this.slider).slider({
		  orientation: this.args["orientation"],
		  min: this.args["sliderMin"],
          max: this.args["sliderMax"],
          value: this.args["startValue"],
          step: this.args["step"],
          slide: function(e,ui, _that){
          	  //console.log(e);
          	  //console.log(ui);
          	  if (_that) {
          	  	//console.log(_that);
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
  	if (!this.args["showValueDisplay"]) this.valueDisplay.style.display = "none";
  	this.args["parent"].appendChild(this.valueDisplay);

	this.restyle();
  	
	
	this.bindMouseWheel(this);
} 

skSlider.prototype.slide = function(e,ui){
	//console.log("this.id: " + this.args["id"])
	this.currValue = (this.args["orientation"] == "horizontal") ? 
					  ui.value : this.args["sliderMax"] - ui.value + 1;
	this.valueDisplay.innerHTML = (this.currValue);
	otherSliderFunctions(this);
}
	
skSlider.prototype.addSliderFunction = function(func){
	//console.log("add slider function: " + this.currValue);
	this.sliderFunctions.push(func);
	var dummy;
	//this.slide(dummy, this.currValue);
	$(this.slider).slider('option', 'slide').call(this.slider, this.slider, {value: this.currValue});
}

var otherSliderFunctions = function(that){
	//this.slide = func;
	//console.log("performing other slider functions");
	for (var i=0; i<that.sliderFunctions.length; i++){
		that.sliderFunctions[i](that);
	}
}

skSlider.prototype.restyle = function(){	
	//console.log("RESTYLE");
	this.widget.style.position = (this.args["position"]);
	this.widget.style.width = _px(this.args["width"]);
	this.widget.style.height = _px(this.args["height"]);
	this.widget.style.left = _px(this.args["left"]);
	this.widget.style.top = _px(this.args["top"]);
	//this.widget.style.backgroundColor = "rgba(255,0,0,.5)";

	this.valueDisplay.style.position = (this.args["position"]);
	this.valueDisplay.style.top =  _px(this.args["top"] + this.args["height"] + 20);
	this.valueDisplay.style.left =  _px(this.args["left"]);
	//correctly compute the height of the slider + handle
	var totalSliderHeight = this.args["height"] + 2*this.args["sliderBorderWidth"];
	var totalHandleHeight = this.args["handleHeight"] + 2*this.args["handleBorderWidth"];
	
	// determine whether the handle+borders or the slider+borders is taller
	var heightAdj = 0;//(totalSliderHeight < totalHandleHeight) ? totalHandleHeight/2 + totalSliderHeight/2 : totalSliderHeight;
	var handleTopMarginAdj = 0; 
	
	if (totalSliderHeight < totalHandleHeight){
		heightAdj = totalHandleHeight/2 + totalSliderHeight/2;
		handleTopMarginAdj = -(totalHandleHeight/2 - this.args["height"]/2);
	}
	else{
		heightAdj = totalSliderHeight;
		handleTopMarginAdj = this.args["height"]/2 - totalHandleHeight/2; 
		
	}
	
	var totalSliderWidth = this.args["width"] + this.args["sliderBorderWidth"]*2;
	var totalHandleWidth = this.args["handleWidth"] + this.args["handleBorderWidth"]*2;
	var deltaWidth = totalHandleWidth - totalSliderWidth;
	
	var totalSliderHeight = this.args["height"] + this.args["sliderBorderWidth"]*2;
	var totalHandleHeight = this.args["handleHeight"] + this.args["handleBorderWidth"]*2;
	var deltaHeight = totalHandleHeight - totalSliderHeight;
	
	$(this.sliderHandle).css({
		"border-radius": this.args["handleBorderRadius"],
		"width": _px(this.args["handleWidth"]),
		"margin-left":  "-" + _px((this.args["handleWidth"] + 2*this.args["handleBorderWidth"])/2),
		"height" : _px(this.args["handleHeight"]),
		"margin-top" :   _px(handleTopMarginAdj),
		"border-color" : this.args["handleBorderColor"],
		"background" : this.args["handleBGColor"],
		"border-width" : _px(this.args["handleBorderWidth"]),	
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
	  	"border-width" : _px(this.args["sliderBorderWidth"]),
	  	"border-radius": _px(this.args["sliderBorderRadius"]),	  		
  		"left" : _px(this.args["left"]),
	  	"top" : _px(this.args["top"]),
	  	"width" : _px(this.args["width"]),
	  	"height" : _px(this.args["height"]),	

	});
	//*********************************************
	//	Remove Default Styling
	//*********************************************	
  	$(this.slider).css({  		
	  	"background": "none",
	  	"border": "none",
  	});	

	if (this.args["orientation"] == "horizontal"){	  			    
	  	constrainWidth = this.args["width"]-(this.args["constrainMargin"]*2) - 	(this.args["handleWidth"]);						  
	  	$(this.sliderConstrainer).css({
	  		"position": "relative",
		  	"width" : _px(constrainWidth),
		  	"height" : _px(this.args["height"]),
		  	"left": _px(0),
		  	"top": _px(0), // basically puts the slider at the top of the widget
		  				   // no big deal, because handle's top is adjusted
			"backgroundColor" : "rgba(0,255,0,.5)",	 
			"margin" : "0px auto",	//aligns the slider and handle to the middle
	  	});	
	  	
	  	// for debugging
	  	$(this.slider).css({  	
	  		"height" : _px($(this.sliderConstrainer).css("height")),	
		  	"width" : _px($(this.sliderConstrainer).css("width")),		
		  	"backgroundColor" : "rgba(0,255,0,.5)",	 
	  	});	 
	  	 	
		$(this.sliderHandle).css({
			// NOTE: margin-left is good -- the handle is centered by default.
			//       Don't mess with it.
		  	"left" : _px(0), // minor tweak
		  	"margin-top" : _px(0), 
		  	"top" : _px(this.args["height"]/2 - totalHandleHeight/2),
		});
		
  }
  else if (this.args["orientation"] == "vertical"){
  						
  		constrainHeight = this.args["height"]-(this.args["constrainMargin"]*2) - (this.args["handleHeight"]);			  
	  	$(this.sliderConstrainer).css({
	  		"position" : "relative",
		  	"height" : _px(constrainHeight),
		  	// no vertical align, so have to use this
		  	"top": _px((this.args["height"] - constrainHeight)/2),
		  	"left": _px(0),
		  	"backgroundColor" : "rgba(0,255,0,.5)",	  		  		 		  		
	  	});	
	  	

	  	$(this.slider).css({
	  		// For whatever reason the slider hieght does not 
	  		// borrow from the slider container
		  	"height" : _px($(this.sliderConstrainer).css("height")),	
		  	"width" : _px($(this.sliderConstrainer).css("width")),	
		  	"backgroundColor" : "rgba(0,255,0,.5)",		  		
	  	});	

			
	    $(this.sliderHandle).css({
		  	"left" : _px(this.args["width"]/2 - totalHandleWidth/2),
		  	// Don't mess with top, as that is how it slides.
		  	// mess with margin-top instdead
		  	//"top" : _px(0), 
		  	"margin-bottom" : _px(-totalHandleHeight/2), 
		  	"margin-top" : _px(0), 
		  	"margin-left" : _px(0), 
		});
  }

	$(this.slider).slider('value', this.currValue);
  	
}

