//******************************************************
//  Init
//	
//******************************************************
goog.require('goog.fx.DragDrop');
goog.require('goog.fx.DragDropGroup');
goog.require('goog.array');
goog.require(GLOBALS.classNames.XVWidget);

goog.provide(GLOBALS.classNames.ViewerBox);

/**
 * @constructor
 * @extends {XVWidget}
 */
ViewerBox = function (args) {
  	
	XVWidget.call(this, args);
	goog.fx.DragDrop.call(this, this.widget, undefined);
	
	
	var that = this;
	

	 //----------------------------------
	 // FRAME VIEWER
	 //----------------------------------
	 /**
	  * @type {FrameViewer}
	  */
	 this.FrameViewer = new FrameViewer({
	 	parent: this.widget,
	 	"border-width": 0
	 });
	this.FrameViewer.ViewerBox = this;

 	
	/*
	 *	Modify the FrameViewer such that it lets "this"
	 *  know of the currentScan when it's dropped in.
	 */
	this.FrameViewer.addOnloadCallback(function () {
		if(that.FrameViewer.currDroppable.scanData) {
			that.populateData(that.FrameViewer.currDroppable.scanData)
		}
	})




	//----------------------------------
	// MENUS
	//----------------------------------	
 	this.addViewPlaneMenu();
	this.addLinkMenu(); 	




	 //----------------------------------
	 // SLIDER
	 //----------------------------------	
	this.addFrameSlider();




	//----------------------------------
	// CONTENT DIVIDER
	//----------------------------------
	/**
	 * @type {ContentDivider}
	 */	
	this.ContentDivider = new ContentDivider( {	
		parent: this.widget,
	});
	this.ContentDivider.setDrag(function(e) {
		that.updateCSS();
	})



	
	//----------------------------------
	// SCAN TABS
	//----------------------------------		
	/**
	 * @type {ScanTabs}
	 */	
	this.ScanTabs = new ScanTabs({

		parent: this.widget,
		tabTitles: ["Info", "Adjust"]
		
	});


	
	//----------------------------------
	// ADJUST / IMAGE PROCESSING SLIDERS
	//----------------------------------		
	this.addAdjustSliders();


	
	//----------------------------------
	// METADATA, A.K.A. DISPLAYABLE DATA
	//----------------------------------	
	/**
	 * @type {object}
	 */
	this.displayableData = {};
	/**
	 * @type {object}
	 * @private
	 */
	this.textCSS_small = {
		color: "rgba(255,255,255,1)",
		position: "absolute",
		top: 0,
		left: 0,
		fontSize: GLOBALS.fontSizeMed,
		textAlign: "left",
		//border: "solid 1px rgb(255,255,255)",
		width: 140
	};




	/**
	 * @protected
	 */
	this.displayableData.frameNumber = utils.dom.makeElement("div", this.widget, "ViewerBoxDisplayableData");
	utils.css.setCSS( this.displayableData.frameNumber, this.textCSS_small);		
		
		
		
		
	//
	// Synchronize current frame number with display
	//
	this.FrameViewer.addOnloadCallback(function () {
		that.displayableData.frameNumber.innerHTML = "Frame: "+ (that.FrameViewer.currFrame) + 
													 " / " + that.FrameViewer.frames.length;	
	});

	
	/**
	 * @type {string}
	 * @private
	 */
	this.currDroppableId = undefined;
	/**
	 * @param {string}
	 */	
	this.setDroppable = function(dId) {
		this.currDroppableId = dId;
	}
	/**
	 * @return {string}
	 */	
	this.getDroppable = function() {
		return this.currDroppableId;
	}

    this.setHoverEvents();
    this.updateCSS();
}
goog.inherits(ViewerBox, XVWidget);
goog.inherits(ViewerBox, goog.fx.DragDrop);





/*
 * @type {object}
 * @protected
 */
ViewerBox.prototype.defaultArgs = {
	parent: document.body,
	className: GLOBALS.classNames.ViewerBox,
	CSS: {
		top: 0,
		left: 80,
		width: 500,
		height: 500,
		border: "solid rgba(90,90,90,1) 1px",
		//backgroundColor: "rgba(208,123, 92, .3)",
		position: "absolute",
	 	overflow: "hidden",
	 	"overflow-x": "visible",
	 	"overflow-y": "visible"
	},
	sliderCSS:	
	{ 
		parent: document.body,
		round: true,
		handleOffsetLeft: 0,
	  	handleOffsetTop: 0,
		widgetCSS:{
		},
		handleCSS:{
			height: 8,
			width: 8,
			borderRadius: 2,
			borderColor: GLOBALS.semiactiveLineColor,
			backgroundColor: "rgba(255,255,255,1)"
		},
		trackCSS:{
			height: 3,
			borderWidth: 1,
			borderColor: GLOBALS.semiactiveLineColor,
			backgroundColor: "rgba(70, 70, 70, 1)",
			borderRadius: "3px"
		}
	}
}



/**
 * @private
 */
ViewerBox.prototype.setHoverEvents = function () {
	
	var that = this;
	var keeperClasses = [
		GLOBALS.classNames.FrameViewer
	]
	
	this.hoverOut = function() {
		goog.array.forEach(that.widget.childNodes, function (node) { 
			
			var found = false;
			goog.array.forEach(keeperClasses, function (keeper) { 
				if (node.className.indexOf(keeper) > -1) {
					found = true;
				}	
			});
			
			if (!found) {
				utils.fx.fadeOut(node, 0);
			}
		})		
	}
	
	this.hoverIn = function() {
		goog.array.forEach(that.widget.childNodes, function (node) { 
			utils.fx.fadeIn(node, 0);
		})
	}
	
	goog.events.listen(this.widget, goog.events.EventType.MOUSEOVER, function() { that.hoverIn() });
	goog.events.listen(this.widget, goog.events.EventType.MOUSEOUT,  function() { that.hoverOut() });

	that.hoverOut();
}


/**
 * @param {Element}
 * @protected
 */
ViewerBox.prototype.createDragElement = function(srcElt) {

	var parent, clonedElt, srcCanv, clonedCanv, context;
	var keepClasses = [
		GLOBALS.classNames.FrameViewer
	];
	var keepElts = [];
		
		
	parent = goog.dom.getAncestorByClass(srcElt, GLOBALS.classNames.ViewerBox);

	//
	// Retain any children that you want to keep
	//

	//
	// Create draggable ghost by cloning the parent
	//	
	clonedElt = parent.cloneNode(true);
	clonedElt.style.fontFamily = GLOBALS.fontFamily;
	
	srcCanv = goog.dom.getElementByClass(GLOBALS.classNames.FrameViewerCanvas, parent);
	clonedCanv = goog.dom.getElementByClass(GLOBALS.classNames.FrameViewerCanvas, clonedElt);


	
	//
	// Draw text on draggable ghost
	//
	context = clonedCanv.getContext("2d");
	context.drawImage(srcCanv, 0, 0);		  
  	//clonedElt.style.opacity = .5;	
	clonedElt.className = "CLONE";
	clonedElt.id = "CLONE";

	
	utils.css.setCSS(clonedElt, {
		cursor: 'move',
        '-moz-user-select': 'none'
	})

	
	goog.events.removeAll(clonedElt);
	return clonedElt;
}

