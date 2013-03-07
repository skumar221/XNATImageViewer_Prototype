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


function sliderScroller(args){
	this.args = args;
  	
  	this.widget = document.createElement("div");
  	this.widget.setAttribute("id", this.args["id"]);
  	this.args["parent"].appendChild(this.widget);

  	this.slider = document.createElement("div");
  	this.slider.setAttribute("id", this.args["id"] + "_slider");
  	this.widget.appendChild(this.slider);
     
    this.constrainPct = 1;
	if (this.args["sliderLayout"] == "constrained"){
		this.constrainPct = this.args["constrainMargin"] / this.args["width"];
	 }
	 console.log("CONSTRAINOCT: " + this.constrainPct);
	 console.log("MIN: " + (this.args["sliderMin"] - this.args["sliderMax"]*this.constrainPct));
	 console.log("MAX: " + (this.args["sliderMax"] + this.args["sliderMax"]*this.constrainPct));
  	that = this;
	$(this.slider).slider({
		  min: that.args["sliderMin"] - that.args["sliderMax"]*that.constrainPct,
          max: that.args["sliderMax"] + that.args["sliderMax"]*that.constrainPct,
          value: 0,  // start here tomorrow
         slide: function(e,ui){
		     console.log(ui.value)
			   if (that.args["sliderLayout"] == "constrained"){
			   		if(ui.value < that.args["sliderMin"]){//Note the value of ui.value is between 0 to 99
		          		return false;
		       		}
			   		else if(ui.value > that.args["sliderMax"]){//Note the value of ui.value is between 0 to 99
		          		return false;
		       		}
			   }
         }
	});
	
	this.scroller = document.createElement("div");
  	this.scroller.setAttribute("id", this.args["id"] + "_scroller");
  	this.widget.appendChild(this.scroller);
  	
  	this.restyle();
}

sliderScroller.prototype.restyle = function(){
	

	
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
	
	$(".ui-slider-horizontal").css("border-radius", "0px");
	$(".ui-slider-horizontal").css("border-color", "#000000");
	$(".ui-slider-horizontal").css("background", "rgba(0,255,20,0)");
	$(".ui-slider-horizontal").css("color", "rgba(0,0,20,.1)");
	$(".ui-slider-horizontal").css("height", _px(this.args["sliderHeight"]));
	$(".ui-slider-horizontal").css("border-width", _px(this.args["sliderBorderWidth"]));
	
	$(".ui-slider-handle").css("border-radius", "0px");
	$(".ui-slider-handle").css("width", _px(this.args["handleWidth"]));
	
	// Keeps handled centered on the ends. 
	$(".ui-slider-handle").css("margin-left", "-" + _px((this.args["handleWidth"] + 2*this.args["handleBorderWidth"])/2));
	$(".ui-slider-handle").css("height", _px(this.args["handleHeight"]));
	
	$(".ui-slider-handle").css("margin-top",  _px(handleTopMarginAdj));
	$(".ui-slider-handle").css("border-color", "#000000");
	$(".ui-slider-handle").css("background", "#000000");
	$(".ui-slider-handle").css("border-width", _px(this.args["handleBorderWidth"]));

	if (this.args["sliderLayout"] == "constrained"){
		
	}

}

