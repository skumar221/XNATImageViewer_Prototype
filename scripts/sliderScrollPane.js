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


function skSlider(args){
	this.args = args;
  	
  	this.widget = document.createElement("div");
  	this.widget.setAttribute("id", this.args["id"]);
  	this.args["parent"].appendChild(this.widget);

  	this.slider = document.createElement("div");
  	this.slider.setAttribute("id", this.args["id"] + "_slider");
  	this.widget.appendChild(this.slider);
    
    that = this;
	$(this.slider).slider({
		  orientation: this.args["orientation"],
		  min: 0,
          max: this.args["sliderMax"],
          value: this.args["sliderMax"],
          slide: function(e,ui){
			   that.slide(e, ui)
          },

	});
	

	this.slider= this.slider;
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


  	this.restyle();
  	
  	this.slide = function(e,ui){
  		////console.log(ui.value)
  	}
}



skSlider.prototype.restyle = function(){	
	this.widget.style.position = (this.args["position"]);
	this.widget.style.width = _px(this.args["width"]);
	this.widget.style.height = _px(this.args["height"]);
	this.widget.style.left = _px(this.args["left"]);
	this.widget.style.top = _px(this.args["top"]);
	//this.widget.style.backgroundColor = "rgba(255,0,0,.5)";

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
	  	//******************************************************
	  	// HEIGHT:
	  	//  You shouldn't need a hieght for this as it will adopt 
	  	//  to the default height of the slider, which is irrelevant.
	  	// "height": _px(this.args["height"]),
	  	//*******************************************************	
	  	constrainWidth = this.args["width"]-(this.args["constrainMargin"]*2) - 	(this.args["handleWidth"]);						  
	  	$(this.sliderConstrainer).css({
	  		"position": "relative",
		  	"width" : _px(constrainWidth),
		  	"left": _px(0),
		  	"top": _px(0), // basically puts the slider at the top of the widget
		  				   // no big deal, because handle's top is adjusted
			"background-color": "rgba(255,120,255,0)",
			"margin" : "0px auto",	//aligns the slider and handle to the middle
	  	});	
	  	
	  	// for debugging
	  	// $(this.slider).css({  		
		  	// "background-color": "rgba(0,0,0,1)",
	  	// });	 
	  	 	
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
		  	//"backgroundColor" : "rgba(0,255,0,.5)",	  		  		 		  		
	  	});	
	  	

	  	$(this.slider).css({
	  		// For whatever reason the slider hieght does not 
	  		// borrow from the slider container
		  	"height" : _px($(this.sliderConstrainer).css("height")),	
		  	//"backgroundColor" : "rgba(0,255,0,.5)",		  		
	  	});	

			
	    $(this.sliderHandle).css({
		  	"left" : _px(this.args["width"]/2 - totalHandleWidth/2),
		  	// Don't mess with top, as that is how it slides.
		  	// mess with margin-top instdead
		  	//"top" : _px(0), 
		  	"margin-bottom" : _px(-totalHandleHeight/2), 
		  	"margin-left" : _px(0), 
		});
  }
  	
}

