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

  	this.restyle();
  	
  	this.slide = function(e,ui){
  		//console.log(ui.value)
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
	
		var sWidth = this.args["width"]/2 + this.args["sliderBorderWidth"];
	var hWidth = this.args["handleWidth"]/2 + this.args["handleBorderWidth"];
	var dWidth = hWidth - sWidth;
	
	var sHeight = this.args["height"]/2 + this.args["sliderBorderWidth"];
	var hHeight = this.args["handleHeight"]/2 + this.args["handleBorderWidth"];
	var dHeight = hHeight - sHeight;
	//Top position of the entire slider relative to the widget



	$(this.sliderHandle).css({
		"border-radius": this.args["handleBorderRadius"],
		"width": _px(this.args["handleWidth"]),
		"margin-left":  "-" + _px((this.args["handleWidth"] + 2*this.args["handleBorderWidth"])/2),
		"height" : _px(this.args["handleHeight"]),
		"margin-top" :   _px(handleTopMarginAdj),
		"border-color" : this.args["handleBorderColor"],
		"background" : this.args["handleBGColor"],
		"border-width" : _px(this.args["handleBorderWidth"])	
	})

		
	//$(".ui-slider-horizontal .ui-slider-handle").css("top", "0px");
	//$(".ui-slider-vertical .ui-slider-handle").css("width", "0px");
	if (!document.getElementById(this.args["id"] + "_sliderConstrainer")){
  		this.sliderConstrainer= document.createElement("div");
	  	this.sliderConstrainer.setAttribute("id", this.args["id"] + "_sliderConstrainer");
	  	this.widget.removeChild(this.slider);
	  	this.sliderConstrainer.appendChild(this.slider);
	  	this.widget.appendChild(this.sliderConstrainer);
	}
	
	if (!document.getElementById(this.args["id"] + "_sliderBounds")){
  		this.sliderBounds= document.createElement("div");
	  	this.sliderBounds.setAttribute("id", this.args["id"] + "_sliderBounds");
	  	this.widget.appendChild(this.sliderBounds);
	}
	
	$(this.sliderBounds).css({
		"position": "absolute",
		"border" : "solid",
		"border-color": this.args["sliderBorderColor"],
	  	"background-color" : this.args["sliderBGColor"],
	  	"border-width" : _px(this.args["sliderBorderWidth"]),
	  	"border-radius": _px(this.args["sliderBorderRadius"]),		
	});

	if (this.args["orientation"] == "horizontal"){

  		// Begin here for Tuesdayt 3-11
  		var startPx = this.args["constrainMargin"] + (this.args["handleWidth"])/2 	  		
	  			    - this.args["sliderBorderWidth"] + this.args["handleBorderWidth"];	  
	  									  
	  	$(this.sliderConstrainer).css({
		  	"width" : _px(this.args["width"]-startPx*2 - this.args["constrainMargin"]*2 + this.args["sliderBorderWidth"]*2),
		  	"position" : "relative",
		  	"left": _px(startPx + this.args["constrainMargin"] - this.args["sliderBorderWidth"]),
		  	"height": _px(this.args["height"]),
	  	});	
	  	
	  	$(this.slider).css({
		  	"position" : $(this.sliderConstrainer).css("position"),
		  	"left": _px($(this.sliderConstrainer).css("left")),	   		  		
		  	"width" : _px($(this.sliderConstrainer).css("width")),	   		  		
		  	"top" : _px(0),	   		  		
		  	"height": _px(this.args["height"]),
	  	});	
  	
		$(this.sliderBounds).css({
		  	"left" : _px(0),
		  	"top" : _px(- this.args["sliderBorderWidth"]*2),
		  	"width" : _px(this.args["width"]-this.args["sliderBorderWidth"]*2),
		  	"height" : _px(this.args["height"]),
		});
	  	
	    this.slider.style.borderColor =  "rgba(0,0,0,0)";
	    this.sliderHandle.style.left  =  _px(0);// - (this.args["handleWidth"]/2 + this.args["handleBorderWidth"]));
	    this.sliderHandle.style.marginLeft  =  "-" + _px((this.args["handleWidth"] + 2*this.args["handleBorderWidth"])/2);
	    this.sliderHandle.style.marginTop = _px(0);
		this.sliderHandle.style.top = _px(0);
  }
  else if (this.args["orientation"] == "vertical"){
  		
  		console.log("HERE")
  		//find the difference between the total widths of of the handle and the slider

		

  		var startPx = this.args["constrainMargin"] + (this.args["handleHeight"])/2 - this.args["sliderBorderWidth"] + this.args["handleBorderWidth"];	  									  
	  	$(this.sliderConstrainer).css({
		  	"height" : _px(this.args["height"] - this.args["constrainMargin"]*2 - hHeight*2),
		  	"position" : "relative",
		  	"top": _px(this.args["constrainMargin"] + this.args["sliderBorderWidth"] + hHeight),
		  	"left": _px(-this.args["sliderBorderWidth"]),
		  	//"backgroundColor" : "rgba(0,0,0,1)",	  		  		
	  	});	
	  	
	  	// For whatever reason the slider hieght does not borrow from the slider container
	  	$(this.slider).css({
		  	"height" : _px($(this.sliderConstrainer).css("height")),
		  	"position" : $(this.sliderConstrainer).css("position"),
		  	"left": _px($(this.sliderConstrainer).css("left")),	   		  		
		  	"width" : this.args["width"],	   		  		
	  	});	

		$(this.sliderBounds).css({
		  	"top" : _px(0),
		  	"left" : _px(- this.args["sliderBorderWidth"]*2),
		  	"height" : _px(this.args["height"]-this.args["sliderBorderWidth"]*2),
		  	"width" : _px(this.args["width"]),	
		});
				
	    this.slider.style.borderColor =  "rgba(0,0,0,0)";
	    this.sliderHandle.style.left  =  _px(0);
		
		//The handle starts off at twice the border width of the slider.  
		var leftCalc = -this.args["sliderBorderWidth"];
		leftCalc -= dWidth;

	    this.sliderHandle.style.marginLeft  =  _px(leftCalc);
	    //this.sliderHandle.style.marginTop  =  _px(50);
	    this.sliderHandle.style.marginBottom  =  _px(-hHeight);
	    //this.sliderHandle.style.bottom  =  "10%";
	    console.log(this.sliderHandle.style.marginBottom ); 
  }
  	
}

