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
	//Top position of the entire slider relative to the widget
	this.slider.style.marginTop = _px(this.args["height"] - heightAdj);
	
	// This has to do with how the widget positions itself

	$(".ui-slider-horizontal .ui-slider-handle").css("left", "0px");
	
	$(this.slider).css({
		"border-radius": "0px",
		"border-color": this.args["sliderBorderColor"],
		"background": this.args["sliderBGColor"],
		"height": _px(this.args["height"]),
		"border-width":  _px(this.args["sliderBorderWidth"])
	})

	$(this.sliderHandle).css({
		"border-radius": "0px",
		"width": _px(this.args["handleWidth"]),
		"margin-left":  "-" + _px((this.args["handleWidth"] + 2*this.args["handleBorderWidth"])/2),
		"height" : _px(this.args["handleHeight"]),
		"margin-top" :   _px(handleTopMarginAdj),
		"border-color" : this.args["handleBorderColor"],
		"background" : this.args["handleBGColor"],
		"border-width" : _px(this.args["handleBorderWidth"])	
	})
	
	if (this.args["sliderLayout"] == 'constrained'){
			$(".ui-slider-horizontal .ui-slider-handle").css("top", "0px");
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
		
		if (this.args["orientation"] == "horizontal"){
	  		var startPx = this.args["constrainMargin"] + (this.args["handleWidth"])/2 	  		
		  									  - this.args["sliderBorderWidth"] + this.args["handleBorderWidth"];	  
		  									  
		  	$(this.sliderConstrainer).css({
			  	"width" : _px(this.args["width"]-startPx*2 - this.args["constrainMargin"]*2 + this.args["sliderBorderWidth"]*2),
			  	"position" : "relative",
			  	"left": _px(startPx + this.args["constrainMargin"] - this.args["sliderBorderWidth"]),
			  	"backgroundColor" : "rgba(0,0,0,.5)",		
		  	});	
	  	
			$(this.sliderBounds).css({
				"position": "absolute",
			  	"left" : _px(0),
			  	"top" : _px(- this.args["sliderBorderWidth"]*2),
			  	"width" : _px(this.args["width"]-this.args["sliderBorderWidth"]*2),
			  	"height" : _px(this.args["height"]),
			  	"backgroundColor" : "rgba(0,100,0,.5)",
			  	"border" : "solid rgba(0,0,0,1)",
			  	"borderWidth" : _px(this.args["sliderBorderWidth"])		
			});
		  	
		    this.slider.style.borderColor =  "rgba(0,0,0,0)";
		    this.sliderHandle.style.marginLeft  =  "-" + _px((this.args["handleWidth"] + 2*this.args["handleBorderWidth"])/2);
	  }
	  else if (this.args["orientation"] == "vertical"){
	  		var startPx = this.args["constrainMargin"] + (this.args["handleHeight"])/2 	  		
		  									  - this.args["sliderBorderWidth"] + this.args["handleBorderWidth"];	  	  									  
		  	$(this.sliderConstrainer).css({
			  	"height" : _px(this.args["height"]-startPx*2 - this.args["constrainMargin"]*2 + this.args["sliderBorderWidth"]*2 ),
			  	"position" : "relative",
			  	"top": _px(startPx + this.args["constrainMargin"]),
			  	"left": _px(-this.args["sliderBorderWidth"]),
			  	"backgroundColor" : "rgba(0,0,0,.5)",	  		
		  	});	
			$(this.sliderBounds).css({
				"position": "absolute",
			  	"top" : _px(0),
			  	"left" : _px(- this.args["sliderBorderWidth"]*2),
			  	"height" : _px(this.args["height"]-this.args["sliderBorderWidth"]*2),
			  	"width" : _px(this.args["width"]),
			  	"backgroundColor" : "rgba(0,100,0,.5)",
			  	"border" : "solid rgba(0,0,0,1)",
			  	"borderWidth" : _px(this.args["sliderBorderWidth"])		
			});
		    this.slider.style.borderColor =  "rgba(0,0,0,0)";
		    this.sliderHandle.style.marginLeft  =  "-" + _px((this.args["handleWidth"] + 2*this.args["handleBorderWidth"])/2);
	  }
  	}

}

