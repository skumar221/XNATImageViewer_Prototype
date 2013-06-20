//******************************************************
//  Init
//
//******************************************************

goog.require('goog.ui.Zippy'); 
goog.require('goog.ui.AnimatedZippy'); 
goog.provide('ScrollGallery');

var ScrollGallery = function (args) {
  	
  	var that = this;
	this.args = (args) ? utils.dom.mergeArgs(this.defaultArgs(), args) : this.defaultArgs();
	this.widget = utils.dom.makeElement("div", this.args.parent, this.args.id, this.widgetCSS);

	

	//-------------------------------
	// WIDGET
	//-------------------------------	 
	 utils.css.setCSS(this.widget, utils.dom.mergeArgs(this.args.widgetCSS, args.widgetCSS));


	//-------------------------------
	// THE SLIDER
	//-------------------------------	
	this.ContentSlider = new utils.gui.GenericSlider({
		parent: this.widget,
		id: "ContentSlider",
		'orientation' : 'vertical',
		widgetCSS : {
			width: 7,//this.args.sliderCSS.widgetCSS.width,
			backgroundColor: 'rgb(0,0,0)',
			border: 'none'
		},
		thumbCSS : {
			height: 60,
			backgroundColor: 'rgb(120,120,120)',
			border: 'none'
		}
	});
  
  


  	//-------------------------------
	// SCROLL CONTENT
	//-------------------------------
	this.ContentHeaders = [];
	var contentWidth = utils.css.dims(this.widget, 'width') - this.args.sliderCSS.widgetCSS.width - 7;
	this.ContentHeaders.push(utils.dom.makeElement("div", this.widget, "ScrollContent", {
		position: "relative",
		backgroundColor: "rgba(120,120,120,1)",
		top: 0,
		left: this.args.sliderCSS.widgetCSS.width + 5,
		width: contentWidth,
		height: GLOBALS.fontSizeMed * 2,
		color: 'rgb(255,255,255)',
		fontSize: GLOBALS.fontSizeLarge,
		fontFamily: GLOBALS.fontFamily,
		'verticalAlign' : 'center',
		marginRight: 20,
		cursor: 'pointer',
		borderRadius: "4px",
		border: "solid 1px rgb(200,200,200)"
	}))
	
	this.ContentHeaders[0].innerHTML = 'Scans';
	
  	//-------------------------------
	// SCROLL CONTENT
	//-------------------------------
	this.ScrollContent = utils.dom.makeElement("div", this.widget, "ScrollContent", {
		position: "relative",
		//backgroundColor: "rgba(0,0,255,.5)",
		//top: 0,
		//left: this.args.sliderCSS.widgetCSS.width,
		width: contentWidth,
		backgroundColor: "rgba(0,0,0,1)",

	})
	var z1 = new goog.ui.AnimatedZippy(this.ContentHeaders[0], this.ScrollContent, true);
    
    
     
	//-------------------------------
	// THE CONTENTS - BLANK FOR NOW
	//-------------------------------
	var blankContents = utils.dom.makeElement("div", document.body, "blankElement", {
		height: 800, 
		width: 100, 
		backgroundColor: "rgba(200,100,51,.5)"
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
			position: "absolute",
		 	overflow: "hidden",
		 	"overflow-x": "hidden",
		 	"overflow-y": "hidden"
		 	//backgroundColor: "rgba(200,20,20,1)",
		 	//border: "solid 1px rgba(255,0,0,1)"
		},
		
		sliderCSS:	
		{
			id: "FrameSlider", 
			parent: document.body,
			thumbCSS:{
				height: GLOBALS.ThumbnailWidgetHeight,
				width: 7,
				borderWidth: 0,
				borderColor: GLOBALS.semiactiveLineColor,
				backgroundColor: "rgba(105,105,105,1)"
			},
			widgetCSS:{
				borderWidth: 0,
				width: 7,
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
	return function (Slider) {		

		
		var beforeRange = [Slider.getMinimum(), Slider.getMaximum()];
		var afterRange = [0, utils.css.dims(that.ScrollContent, 'outerHeight') - utils.css.dims(that.widget, 'height')  - that.args.scrollMarginY ]
		var sendVal = Math.abs(Slider.getValue() - 100);
		var remap = utils.convert.remap1D(sendVal, beforeRange, afterRange);
  		var t = remap.newVal;// - utils.css.dims(that.widget, 'height');	

   		utils.css.setCSS( that.ScrollContent, {
  			top: -t
  		});
		
   }
}




//******************************************************
//  Sets contents.
//******************************************************
ScrollGallery.prototype.setContents = function (thing) {
  
	var that = this;

  
	//-------------------------------
	// REMOVE PREXISTING CHILD ELEMENTS
	//-------------------------------  
	while (this.ScrollContent.hasChildNodes()) {
	    this.ScrollContent.removeChild(this.ScrollContent.lastChild);
	}
	

	//-------------------------------
	// IF thing IS A FUNCTION
	//-------------------------------  
	if (typeof thing === "function") {
		thing();
	}
	//-------------------------------
	// IF thing IS AN OBJECT - (used now for blank contents)
	//-------------------------------  
	else if (typeof thing === "object") {
		// if obj is a DOM Element
		if(thing.tagName) {
			that.ScrollContent.appendChild(thing);
			that.ScrollContent.style.height = utils.convert.px($(thing).height());
		}
	}

	this.ContentSlider.addSlideCallback(that.mapSliderToContents());  
	this.ContentSlider.bindToMouseWheel(that.widget);		
	this.updateCSS();
}



//******************************************************
//  UpdateCSS
//******************************************************
ScrollGallery.prototype.updateCSS = function (args) {


    if (args) { 
    	utils.css.setCSS(this.widget, args.widgetCSS) 
    };
    
	//----------------------------------
	// CSS: FRAME SLIDER
	//----------------------------------

    utils.css.setCSS(this.ContentSlider.getHolder(), {
    	height: utils.css.dims(this.widget, 'height')
    });

}
