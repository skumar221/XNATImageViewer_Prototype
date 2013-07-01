//******************************************************
//  Init
//
//******************************************************

goog.require('goog.ui.AnimatedZippy'); 
goog.require('goog.events'); 
goog.require('goog.dom'); 


goog.require(GLOBALS.classNames.XVWidget);
goog.provide(GLOBALS.classNames.ScrollGallery);
/**
 * @constructor
 * @extends {XVWidget}
 */
ScrollGallery = function (args) {
  	
  	
  	var that = this;
	XVWidget.call(this, args);
	
	
	/**
	 * @type {Object}
	 * @protected
	 */	
	this.Scrollables = {};


	var ScrollAreaWidth = utils.css.dims(this.widget, 'width') - this.args.sliderCSS.widgetCSS.width - 7;	
	
	/**
	 * @type {Element}
	 * @protected
	 */	
	this.ScrollArea = utils.dom.makeElement("div", this.widget, "ScrollArea", {
		position: "relative",
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
		className: "ContentSlider",
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
goog.inherits(ScrollGallery, XVWidget);



/**
 * @protected
 */
ScrollGallery.prototype.defaultArgs = {

	className: GLOBALS.classNames.ScrollGallery,
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
	
	var header,
		headerLabel,
		expandIcon,
		content,
		zippy;
	
	
	
	
	//-----------------------------------
	// ZIPPY HEADER
	//-----------------------------------
	var counter = 0;
	for (key in this.Scrollables) {
		counter ++;
	}
	
	header = utils.dom.makeElement("div", this.ScrollArea, "Header_" + zKey, {
		position: "relative",
		marginTop: (counter > 1) ? 5 : 0,
		backgroundColor: "rgb(70,70,70)",
		//top: -5,
		//left: headerLeft,
		width: utils.css.dims(this.ScrollArea, 'width'),
		height: '1.5em',
		color: 'rgb(0, 0, 0)',
		fontSize: GLOBALS.fontSizeMed,
		fontFamily: GLOBALS.fontFamily,
		cursor: 'pointer'
	})
	header.className = GLOBALS.classNames.ScrollGalleryZippyHeader;
	header.key = zKey;
	this.Scrollables[zKey]['header'] = header;
	
	


	//-----------------------------------
	// HEADER LABEL
	//-----------------------------------
	headerLabel = utils.dom.makeElement("div", header, "HeaderLabel_" + zKey, {
		position: "absolute",
		marginTop: '.25em',
		marginLeft: '1em',
		backgroundColor: "none"
	})
	headerLabel.innerHTML = zKey;
	this.Scrollables[zKey]['headerLabel'] = headerLabel;
	



	//-----------------------------------
	// HEADER EXPAND ICON
	//-----------------------------------	
	expandIcon = utils.dom.makeElement("div", header, "ExpandIcon_" + zKey, {
		position: "absolute",
		left: utils.css.dims(this.ScrollArea, 'width'), 
		marginTop: '.25em',
		marginLeft: '-1em'
	})
	expandIcon.innerHTML = "-";
	this.Scrollables[zKey]['expandIcon'] = expandIcon;
	
	


	//-----------------------------------
	// ZIPPY CONTENT
	//-----------------------------------	

	content = utils.dom.makeElement("div", this.ScrollArea, "Content_" + zKey, {
		width: utils.css.dims(this.ScrollArea, 'width'),
		top: headerHeight,
		left: headerLeft,
		//backgroundColor: "rgba(0,0,0,1)",
	})		
	this.Scrollables[zKey]['content'] = content;


	
	
	//
	// CREATE ZIPPY
	//	
	zippy = new goog.ui.AnimatedZippy(header, content, false);
	this.Scrollables[zKey]['zippy'] = zippy;




	//
	// SET EXPAND METHOD
	//	
	var EVENTS = goog.object.getValues(goog.ui.Zippy.Events);
	goog.events.listen(zippy, EVENTS, function(e) { 		
		 //
		 //  Moves contents
		 //
		that.moveContents(that.ContentSlider, that);		
		//
		// Change expand icon to '+' or '-'
		//
		if (e.target.isExpanded()) {
			expandIcon.innerHTML =  "-";
			utils.css.setCSS(expandIcon, {
				marginLeft: '-1em'
			})
		}
		else {
			expandIcon.innerHTML =  "+";
			utils.css.setCSS(expandIcon, {
				marginLeft: '-1.1em'
			})				
		}
	});
	



	//
	// SET HOVER METHOD
	//			
	var bgDefault = "rgb(70,70,70)";
	var bgHighlight = "rgb(110,110,110)";
	var iconDefault = "rgb(100,100,100)";
	var iconHighlight = "rgb(200,200,200)";
	
	
	// set defaults
	utils.css.setCSS(header, {
		backgroundColor: bgDefault,
	})
	utils.css.setCSS(expandIcon, {
		color: iconDefault,
	})
	
	
	// hover function
	function applyHover(cssObj, e) {
		if (e.target == e.currentTarget) {
			utils.css.setCSS(e.target, cssObj)				
		}	
		else {
			utils.css.setCSS(goog.dom.getAncestorByClass(e.target, GLOBALS.classNames.ScrollGalleryZippyHeader), cssObj)			
		}
		utils.css.setCSS(expandIcon, cssObj['iconColor'])		   
	}



	// mouseover
	goog.events.listen(header, goog.events.EventType.MOUSEOVER, goog.partial(applyHover, {
   		backgroundColor: bgHighlight,
   		'iconColor' : {
   			color: iconHighlight,
   		}
   }));
	                   
	// mouseout
	goog.events.listen(header, goog.events.EventType.MOUSEOUT, goog.partial(applyHover, {
   		backgroundColor: bgDefault,
   		'iconColor' : {
   			color: iconDefault,
   		}
   }));	



}
