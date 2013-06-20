//******************************************************
//  Init
//
//******************************************************

goog.require('goog.ui.AnimatedZippy'); 
goog.require('goog.events'); 
goog.provide('ScrollGallery');


/**
 * @constructor
 */
ScrollGallery = function (args) {
  	
  	
  	var that = this;
	this.args = (args) ? utils.dom.mergeArgs(this.defaultArgs(), args) : this.defaultArgs();

	/**
	 * @private
	 */	
	this.widget = utils.dom.makeElement("div", this.args.parent, this.args.id, this.args.widgetCSS);
	this.getWidget = function() {
		return this.widget;
	}
	
	
	/**
	 * @protected
	 */	
	this.Scrollables = {};


	var ScrollAreaWidth = utils.css.dims(this.widget, 'width') - this.args.sliderCSS.widgetCSS.width - 7;
	/**
	 * @protected
	 */	
	this.ScrollArea = utils.dom.makeElement("div", this.widget, "ScrollArea", {
		position: "relative",
		//top: -4,
		width: ScrollAreaWidth,
		left: utils.css.dims(this.widget, 'width') - ScrollAreaWidth
	});
	this.getScrollArea = function () {
		return this.ScrollArea;
	}
	

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
	
	this.ContentSlider.addSlideCallback(that.moveContents, that);  
	this.ContentSlider.bindToMouseWheel(that.widget);
	
	this.updateCSS();
}




/**
 * @private
 */
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

/**
 * @private
 */
ScrollGallery.prototype.moveContents = function (Slider, that) {
	
	console.log("move")
	var widgetHeight = utils.css.dims(that.widget, 'height');
	var beforeRange = [Slider.getMinimum(), Slider.getMaximum()];
	var scrollAreaHeight = 0;
	var afterRange = [0, utils.css.dims(that.ScrollArea, 'height') - widgetHeight];
	var thumb = Slider.getThumb();
	
	if (afterRange[1] > beforeRange[1]) {

		utils.css.setCSS(thumb, {
			opacity: 1,
			height: widgetHeight * (beforeRange[1] / afterRange[1])
		});
				
		Slider.setEnabled(true);
			
		var sendVal = Math.abs(Slider.getValue() - 100);
		var remap = utils.convert.remap1D(sendVal, beforeRange, afterRange);
		var t = remap.newVal;
	
	
		utils.css.setCSS( that.ScrollArea, {
			//position: "absolute",
			top: -t
		});	
			
	}
	else {
		
		utils.css.setCSS(thumb, {
			opacity: 0
		});
		Slider.setEnabled(false);
		Slider.setValue(100);
	}	
}




//******************************************************
//  Sets contents.
//******************************************************
ScrollGallery.prototype.addContentToZippy = function (header, contents) {
  
	var that = this;

	that.ContentHeaders[header]['contents'].appendChild(contents);

			
	utils.dims.setCSS(that.ScrollContent,  {
		height: utils.css.dims(contents, 'height')
	})
		
	
	

		
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

    utils.css.setCSS(this.ContentSlider.getWidget(), {
    	height: utils.css.dims(this.widget, 'height')
    });

}




ScrollGallery.prototype.getScrollables = function(h1, h2) {
	return this.Scrollables[h1][h2];	
}




ScrollGallery.prototype.addZippy = function(zKey) {

	var that = this;
	var headerHeight = GLOBALS.fontSizeMed * 2;
	var headerLeft = this.args.sliderCSS.widgetCSS.width + 5;
	
	this.Scrollables[zKey] = {};
	
	
	
	this.Scrollables[zKey]['header'] = utils.dom.makeElement("div", this.ScrollArea, "Header_" + zKey, {
		position: "relative",
		backgroundColor: "rgb(70,70,70)",
		//top: -5,
		//left: headerLeft,
		width: utils.css.dims(this.ScrollArea, 'width'),
		height: '1.5em',
		color: 'rgb(0, 0, 0)',
		fontSize: GLOBALS.fontSizeLarge,
		fontFamily: GLOBALS.fontFamily,
		cursor: 'pointer'
	})
	this.Scrollables[zKey]['header'].key = zKey;
	
	
	this.Scrollables[zKey]['headerLabel'] = utils.dom.makeElement("div", this.Scrollables[zKey]['header'], "HeaderLabel_" + zKey, {
		position: "absolute",
		marginTop: '.25em',
		marginLeft: '1em'
	})
	this.Scrollables[zKey]['headerLabel'].innerHTML = zKey;
	
	
	
	this.Scrollables[zKey]['expandIcon'] = utils.dom.makeElement("div", this.Scrollables[zKey]['header'], "ExpandIcon_" + zKey, {
		position: "absolute",
		left: utils.css.dims(this.ScrollArea, 'width'), 
		marginLeft: '-1em',
		color: "rgb(120,120,120)",
		fontSize: 20,
	})
	this.Scrollables[zKey]['expandIcon'].innerHTML = "-";
	
	
	
	this.Scrollables[zKey]['content'] = utils.dom.makeElement("div", this.ScrollArea, "Content_" + zKey, {
		//position: "absolute",
		width: utils.css.dims(this.ScrollArea, 'width') - 3,
		top: headerHeight,
		left: headerLeft,
		backgroundColor: "rgba(0,0,0,1)",
	})	
	
	
	var EVENTS = goog.object.getValues(goog.ui.Zippy.Events);
	this.Scrollables[zKey]['zippy'] = new goog.ui.AnimatedZippy(this.Scrollables[zKey]['header'], this.Scrollables[zKey]['content'], true);
	
	goog.events.listen(this.Scrollables[zKey]['zippy'], EVENTS, function(e) { 
		
		that.moveContents(that.ContentSlider, that);

		var elt = document.getElementById("ExpandIcon_" + e.target.elHeader_.key);
		elt.innerHTML = (e.target.isExpanded()) ? "-" : "+";

	});
}
