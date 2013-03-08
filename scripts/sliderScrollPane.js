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
		  min: 0,
          max: this.args["sliderMax"],
          value: 0,
          slide: function(e,ui){
			   that.slide(e, ui)
          },

	});
	

	this.sliderHandle = Array.prototype.slice.call(document.getElementsByClassName("ui-slider-handle"))[0];
	this.slider= this.slider;

	this.scroller = document.createElement("div");
  	this.scroller.setAttribute("id", this.args["id"] + "_scroller");
  	this.widget.appendChild(this.scroller);

  	this.restyle();
}

skSlider.prototype.slide = function(e, ui){
	//console.log("v: " + ui.value)
}

skSlider.prototype.restyle = function(){
	
	this.widget.style.position = (this.args["position"]);
	this.widget.style.width = _px(this.args["width"]);
	this.widget.style.height = _px(this.args["height"]);
	this.widget.style.left = _px(this.args["left"]);
	this.widget.style.top = _px(this.args["top"]);
	this.widget.style.backgroundColor = "rgba(255,0,0,.5)";

	//correctly compute the height of the slider + handle
	var totalSliderHeight = this.args["sliderHeight"] + 2*this.args["sliderBorderWidth"];
	var totalHandleHeight = this.args["handleHeight"] + 2*this.args["handleBorderWidth"];
	
	// determine whether the handle+borders or the slider+borders is taller
	var heightAdj = 0;//(totalSliderHeight < totalHandleHeight) ? totalHandleHeight/2 + totalSliderHeight/2 : totalSliderHeight;
	var handleTopMarginAdj = 0; 
	
	if (totalSliderHeight < totalHandleHeight){
		heightAdj = totalHandleHeight/2 + totalSliderHeight/2;
		handleTopMarginAdj = -(totalHandleHeight/2 - this.args["sliderHeight"]/2);
	}
	else{
		heightAdj = totalSliderHeight;
		handleTopMarginAdj = this.args["sliderHeight"]/2 - totalHandleHeight/2; 
		
	}
	//Top position of the entire slider relative to the widget
	this.slider.style.marginTop = _px(this.args["height"] - heightAdj);
	
	$(".ui-slider-horizontal .ui-slider-handle").css("top", "0px");

	this.slider.style.borderRadius = "0px";
	this.slider.style.borderColor = this.args["sliderBorderColor"];
	this.slider.style.background = this.args["sliderBGColor"];
	this.slider.style.height = _px(this.args["sliderHeight"]);
	this.slider.style.borderWidth =  _px(this.args["sliderBorderWidth"]);
	
	this.sliderHandle.style.borderRadius = "0px";
	this.sliderHandle.style.width = _px(this.args["handleWidth"]);
	this.sliderHandle.style.marginLeft =  "-" + _px((this.args["handleWidth"] + 2*this.args["handleBorderWidth"])/2);
	this.sliderHandle.style.height = _px(this.args["handleHeight"]);
	this.sliderHandle.style.marginTop =   _px(handleTopMarginAdj);
	this.sliderHandle.style.borderColor = this.args["handleBorderColor"];
	this.sliderHandle.style.background = this.args["handleBGColor"];
	this.sliderHandle.style.borderWidth = _px(this.args["handleBorderWidth"]);	
	
	if (this.args["sliderLayout"] == 'constrained'){
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
		
  		var startPx = this.args["constrainMargin"] + (this.args["handleWidth"])/2 
	  									  - this.args["sliderBorderWidth"] + this.args["handleBorderWidth"];	  	
	  	this.sliderConstrainer.style.width = _px(this.args["width"]-startPx*2 - this.args["constrainMargin"]*2);
	  	this.sliderConstrainer.style.position= "relative";
	  	this.sliderConstrainer.style.left= _px(startPx + this.args["constrainMargin"]);
	  	

	    this.sliderBounds.style.position= "absolute";

	  	this.sliderBounds.style.left= _px(0);
	  	this.sliderBounds.style.top= _px(this.args["height"] - this.args["sliderHeight"] - this.args["sliderBorderWidth"]*2);
	  	this.sliderBounds.style.width= _px(this.args["width"]-this.args["sliderBorderWidth"]*2);
	  	this.sliderBounds.style.height= _px(this.args["sliderHeight"]);
	  	this.sliderBounds.style.backgroundColor = "rgba(0,100,0,.5)";
	  	this.sliderBounds.style.border = "solid rgba(0,0,0,1)";
	  	this.sliderBounds.style.borderWidth = _px(this.args["sliderBorderWidth"]);
	  	
	    this.slider.style.borderColor =  "rgba(0,0,0,0)";
	    this.sliderHandle.style.marginLeft  =  "-" + _px((this.args["handleWidth"] + 2*this.args["handleBorderWidth"])/2);
	  	
  	}

}

