
var defaultArgs_ScanViewer = {
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






//******************************************************
//  Init
//	
//******************************************************
var ScanViewer = function (args) {
  	
	utils.oo.init(this, defaultArgs_ScanViewer, args);
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

 	
	// Modify the FrameViewer such that it lets "this"
	// know of the currentScan when it's dropped in.
	this.FrameViewer.addOnloadCallback(function () {
		if(that.FrameViewer.currDroppable.scanData) {
			that.populateData(that.FrameViewer.currDroppable.scanData)
		}
	})


 	this.addViewPlaneMenu();
 	

	 //----------------------------------
	 // FRAME SLIDER
	 //----------------------------------	
	this.FrameSlider = new utils.gui.horizontalSlider(utils.dom.mergeArgs(this.args.sliderCSS, {
		id: "FrameSlider", 
		parent: this.widget,
		round: true
	}));


	// Tell frameslider how to behave...	
	this.FrameSlider.addSlideCallback(function (_slider) { 
		
		var subtractor = (_slider.currArgs().max > 0) ? _slider.currArgs().min  : 0;
		
		var val = Math.round(_slider.value);
		
		// Update any displayable data
		if (that.displayableData && that.displayableData.frameNumber) {
			
			that.displayableData.frameNumber.innerHTML = "Frame: "+(val + 1) + " / " + that.FrameViewer.frames.length;	
			
		}
		
		// Draw the frame
	
		that.FrameViewer.drawFrame(val - subtractor, true); 
		
	  });


	// Bind mousewheel scrolling to slider	
	this.FrameSlider.bindToMouseWheel(this.FrameViewer.widget);


	// Add FrameViewer callback function to synchronize with slider
	this.FrameViewer.addOnloadCallback(function () {
		
		if (that.FrameSlider) {
			
			that.FrameSlider.updateProperties({
				
				min : 0,
				max : that.FrameViewer.frames.length-1,
				value : Math.round(that.FrameViewer.frames.length/2)
			
			});

			that.FrameViewer.drawFrame(Math.round(that.FrameSlider.value), true);
			
		}		
		else{
			
			utils.dom.debug("NO DRAW FRAME");
			
		}

	});
	



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
			$(that.ContentDivider.widget).css( {
				top: $(that.widget).height() - GLOBALS.tabClickHeight - cHeight
			});			
		}
		else{
			if (that.ScanTabs.minClick) {
				$(that.ContentDivider.widget).css( {
					top: minCTop
				});	
			}			
		}			

		that.updateCSS();
	})

	





	//----------------------------------
	// Link Menu
	//----------------------------------	
	this.addLinkMenu();


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
	$(this.displayableData.frameNumber).css(this.textCSS_small);		
		
		
		
		
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
	
	this.setJQueryEvents();
	
	this.updateCSS();


}

ScanViewer.prototype.setJQueryEvents = function () {
	
	var that = this;
	
	this.setDraggable_jQuery();
	
	$(this.widget).bind('mouseenter.hover', function () {

		$(that.ViewPlaneMenu).stop().show();
		$(that.LinkMenu).stop().show();
		$(that.FrameSlider.getWidget()).stop().fadeTo(GLOBALS.animFast, 1);
		$(that.widget).stop().animate({
			//borderColor: "rgb(115,115,115)"
		}, GLOBALS.animFast)
	
	}).bind('mouseleave.hover', function () {

		$(that.ViewPlaneMenu).stop().hide();
		$(that.LinkMenu).stop().hide();
		$(that.FrameSlider.getWidget()).stop().fadeTo(GLOBALS.animFast, .7);
		$(that.widget).stop().animate({
			//borderColor: "rgb(85,85,85)"
		}, GLOBALS.animFast)
		
	});
	
	$(this.widget).mouseleave();	
	
}






//******************************************************
//******************************************************
ScanViewer.prototype.closeButtonClicked = function (event) {}





