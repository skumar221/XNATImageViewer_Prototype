//******************************************************
//  Init
//	
//******************************************************
goog.require('goog.fx.DragDrop');
goog.require('goog.fx.DragDropGroup');
goog.require('goog.array');

goog.provide(GLOBALS.classNames.ViewerBox);

/*
 * @constructor
 */
ScanViewer = function (args) {
  	
	utils.oo.init(this, this.defaultArgs, args);	
	
	goog.fx.DragDrop.call(this, this.widget, undefined);
	
	this.setSourceClass('source');
	this.setTargetClass('target'); 			
	this.init();
	
	function dragViewer() {
		console.log("Dragging Viewer")
	}
	
	goog.events.listen(this.widget, 'dragstart', dragViewer);	
	
	
	var that = this;
	this.widget.defaultMouseEvents = [];
	
	
	

	this.axisIcons = [];

 	
 	    	
	 //----------------------------------
	 // FRAME VIEWER
	 //----------------------------------
	 this.FrameViewer = new FrameViewer({
	 	id: "FrameViewer",
	 	parent: this.widget,
	 	"border-width": 0
	 });
	this.FrameViewer.ScanViewer = this;

 	
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
	this.ContentDivider = new ContentDivider( {	
		parent: this.widget
	});
	
	
	
	 //----------------------------------
	 // Content Divider CAllback
	 //----------------------------------	 
	 $(this.ContentDivider.widget).draggable( {
		
		start: function () {
		   this.dragging = true;		
		},
		
	 	drag: function () {
		   that.updateCSS();
		},
		
		stop: function () {
			this.dragging = false;
		}
		
	});
   	

	
		
	
	//----------------------------------
	// SCAN TABS
	//----------------------------------		
	
	this.ScanTabs = new ScanTabs({
		
		id: "tabs",
		parent: this.widget,
		tabTitles: ["<b>Session Info</b>", "<b>Adjust</b>"]
		
	});
	
	this.ScanTabs.addCallback( 'setActiveTab', function () {
		
		//if (that.ScanTabs.minClick) {
		var cPos = $(that.ContentDivider.widget).position();
		var cHeight = $(that.widget.ContentDivider).height();
		var minCTop = GLOBALS.minContentDividerTop($(that.widget).height());
		var minDiff = Math.abs(cPos.top - minCTop);
		
		if (minDiff < 10 ) {
			utils.css.setCSS( that.ContentDivider.widget,  {
				top: $(that.widget).height() - GLOBALS.tabClickHeight - cHeight
			});			
		}
		else{
			if (that.ScanTabs.minClick) {
				utils.css.setCSS( that.ContentDivider.widget,  {
					top: minCTop
				});	
			}			
		}			

		that.updateCSS();
	})

	








	//----------------------------------
	// BRIGHNESS AND CONTRAST SLIDERS
	//----------------------------------	
	
	
	//----------------------------------
	// ADJUST / IMAGE PROCESSING SLIDERS
	//----------------------------------		
	this.addAdjustSliders();


	
	//----------------------------------
	// METADATA, A.K.A. DISPLAYABLE DATA
	//----------------------------------	
	this.displayableData = {};
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


	// DATA: Frame Number
	this.displayableData.frameNumber = utils.dom.makeElement("div", this.widget, "_frameDisplay");
	utils.css.setCSS( this.displayableData.frameNumber, this.textCSS_small);		
		
		
		
		
	//----------------------------------
	// Synchronize current frame number with display
	//----------------------------------	
	this.FrameViewer.addOnloadCallback(function () {
		that.displayableData.frameNumber.innerHTML = "Frame: "+ (that.FrameViewer.currFrame) + 
													 " / " + that.FrameViewer.frames.length;	
	});
	

	
	
	//--------------------------
	// Setup procedure, defines the mouseenters
	//--------------------------		
	
	//this.setJQueryEvents();
	
	this.updateCSS();
	
	/*
	 * @private
	 */
	this.currDroppableId = undefined;
	/*
	 * @type {function(string)}
	 */	
	this.setDroppable = function(dId) {
		this.currDroppableId = dId;
	}
	/*
	 * @type {function(): string}
	 */	
	this.getDroppable = function() {
		return this.currDroppableId;
	}


}
goog.inherits(ScanViewer, goog.fx.DragDrop);





/*
 * @type {object}
 * @protected
 */
ScanViewer.prototype.defaultArgs = {
	id: GLOBALS.ScanViewerPreId,
	parent: document.body,
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
		id: "_FrameSlider", 
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




ScanViewer.prototype.setJQueryEvents = function () {
	
	var that = this;
	
	this.setDraggable_jQuery();
	
	$(this.widget).bind('mouseenter.hover', function () {

		$(that.ViewPlaneMenu).stop().show();
		$(that.LinkMenu).stop().show();
		//$(that.FrameSlider.getWidget()).stop().fadeTo(GLOBALS.animFast, 1);
		$(that.widget).stop().animate({
			//borderColor: "rgb(115,115,115)"
		}, GLOBALS.animFast)
	
	}).bind('mouseleave.hover', function () {

		$(that.ViewPlaneMenu).stop().hide();
		$(that.LinkMenu).stop().hide();
		//$(that.FrameSlider.getWidget()).stop().fadeTo(GLOBALS.animFast, .7);
		$(that.widget).stop().animate({
			//borderColor: "rgb(85,85,85)"
		}, GLOBALS.animFast)
		
	});
	
	$(this.widget).mouseleave();	
	
}






//******************************************************
//******************************************************
ScanViewer.prototype.closeButtonClicked = function (event) {}





