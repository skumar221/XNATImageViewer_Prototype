//******************************************************
//  Init
//
//******************************************************
var ScrollGallery = function (args) {
  	var that = this;

	this.args = (args) ? __mergeArgs__(this.defaultArgs(), args) : this.defaultArgs();
	this.widget = __makeElement__("div", this.args.parent, this.args.id, this.widgetCSS);
	
	$(window).resize(function () { that.updateCSS();});


	//-------------------------------
	// THE WIDGET
	//-------------------------------	 
	 __setCSS__(this.widget, {
	    position: "relative",
	 	overflow: "hidden",
	 	"overflow-x": "hidden",
	 	"overflow-y": "hidden"
	 });




	//-------------------------------
	// THE CONTENTS HOLDER
	//-------------------------------
	  this.scrollContent = __makeElement__("div", this.widget, this.args.id + "_scrollContent", {
	  	position: "relative",
	  	border: "solid rgb(0,0,255,1) 1px",
	  	top: 0,
	  	left: this.args._sliderCSS.trackCSS.width + 4
	  })




	//-------------------------------
	// THE SLIDER
	//-------------------------------	
	var mArgs = this.args._sliderCSS;
	this.contentSlider = new __verticalSlider__(__mergeArgs__(mArgs,{
		parent: this.widget,
		id: this.args.id + "_contentSlider",
		round: true,
	}));
  
  
  
  
	//-------------------------------
	// THE CONTENTS - BLANK FOR NOW
	//-------------------------------
	var blankContents = __makeElement__("div", document.body, "blankElement", {
		height: 800, 
		width: 100, 
		backgroundColor: "rgba(200,100,51,1)"
	});

	blankContents.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."	    
	this.setContents(blankContents)
  
	
	this.updateCSS();
}




ScrollGallery.prototype.defaultArgs = function () {
	
	return {
		id: "ScrollGallery",
		parent: document.body,
		orientation: "vertical",
		sliderLocation: "left",
		sliderWidth: 8,
		scrollMarginY: 8,
		scrollMarginX: 8,
		widgetCSS: {
			top: 0,
			left: 30,
			width: GLOBALS.ScrollGalleryWidth,
			height: 400,
			border: "solid rgba(90,90,90,1) 1px",
		},
		
		_sliderCSS:	
		{
			id: "FrameSlider", 
			parent: document.body,
			round: true,
			handleOffsetLeft: 0,
		  	handleOffsetTop: 0,
			widgetCSS:{
			},
			handleCSS:{
				height: 70,
				width: 7,
				borderWidth: 0,
				borderColor: GLOBALS.semiactiveLineColor,
				backgroundColor: "rgba(105,105,105,1)"
			},
			trackCSS:{
				borderWidth: 0,
				width: 10,
				borderColor: GLOBALS.semiactiveLineColor,
				backgroundColor: "rgba(0, 0, 0, 1)"
			}
		}		
	}
}




//******************************************************
//  Need to map the min/max and step values of the slider
//  to the length of the contents so we can scroll
//  in a proportional manner. This varies depending on 
//  the orientation of the gallery: vertical or horizontal.
//******************************************************
ScrollGallery.prototype.mapSliderToContents = function () {
	var that = this;
	return function (_slider) {		
		
		if (that.args.orientation == "vertical") {
	  		var t = -1 * __remap1D__(_slider.value, [_slider.currArgs().min, _slider.currArgs().max], 
	   							    [0, $(that.scrollContent).outerHeight() - $(that.widget).height() - that.args.scrollMarginY]).newVal;	
	   		$(that.scrollContent).css({
	  			top: t,
	  		});
		}
   }
}




//******************************************************
//  Sets contents.
//******************************************************
ScrollGallery.prototype.setContents = function (obj) {
  
	var that = this;

  
	//-------------------------------
	// REMOVE PREXISTING CHILD ELEMENTS
	//-------------------------------  
	while (this.scrollContent.hasChildNodes()) {
	    this.scrollContent.removeChild(this.scrollContent.lastChild);
	}
	

	//-------------------------------
	// IF OBJ IS A FUNCTION
	//-------------------------------  
	if (typeof obj === "function") {
		obj();
	}
	else if (typeof obj === "object") {
		// if obj is a DOM Element
		if(obj.tagName) {
			that.scrollContent.appendChild(obj);
			that.scrollContent.style.height = __toPx__($(obj).height());
			that.scrollContent.style.width = __toPx__($(obj).width());
		}
	}

	that.contentSlider.addSlideCallback(that.mapSliderToContents());  
	that.contentSlider.bindToMouseWheel(that.widget);		
	this.updateCSS();
}




//******************************************************
//  UpdateCSS
//******************************************************
ScrollGallery.prototype.updateCSS = function (args) {


    if (args) { __setCSS__(this.widget, args.widgetCSS) };
    
	//----------------------------------
	// CSS: FRAME SLIDER
	//----------------------------------
    this.contentSlider.updateCSS({
    	widgetCSS:{
 			top : 0,
			left : 0,   		
    	},
    	trackCSS:{
    		height: __toInt__($(this.widget).css('height')),
    	}
    })
}
