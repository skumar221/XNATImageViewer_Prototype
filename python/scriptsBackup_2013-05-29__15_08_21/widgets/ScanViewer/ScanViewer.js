
var defaultArgs_ScanViewer = {
	id: "ScanViewer",
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
	_sliderCSS:	
	{
		id: "_frameSlider", 
		parent: document.body,
		round: true,
		handleOffsetLeft: 0,
	  	handleOffsetTop: 0,
		widgetCSS:{
		},
		handleCSS:{
			height: 10,
			width: 10,
			borderRadius: 2,
			borderColor: GLOBALS.semiactiveLineColor,
			backgroundColor: "rgba(255,255,255,1)"
		},
		trackCSS:{
			height: 5,
			borderWidth: 1,
			borderColor: GLOBALS.semiactiveLineColor,
			backgroundColor: "rgba(50, 50, 50, 1)"
		}
	}
}






//******************************************************
//  Init
//	
//******************************************************
var ScanViewer = function (args) {
  	
	INIT(this, defaultArgs_ScanViewer, args);
	var that = this;
	this.widget.defaultMouseEvents = [];
	
	
	this.setDraggable_jQuery();

    	
	 //----------------------------------
	 // FRAME VIEWER
	 //----------------------------------
	 this.FrameViewer = new FrameViewer({
	 	id: "FrameViewer",
	 	parent: this.widget,
	 	"border-width": 0,
	 });

	this.axisIcons = [];
 	this.addAxisMenu();
 	
 	
	// Modify the FrameViewer such that it lets "this"
	// know of the currentScan when it's dropped in.
	this.FrameViewer.addOnloadCallback(function () {
		if(that.FrameViewer.currDroppable.scanData) {that.populateData(that.FrameViewer.currDroppable.scanData)}
	})




	 //----------------------------------
	 // FRAME SLIDER
	 //----------------------------------	
	this.frameSlider = new __horizontalSlider__(__mergeArgs__(this.args._sliderCSS, {
		id: "FrameSlider", 
		parent: this.widget,
		round: true,
	}));


	// Tell frameslider how to behave...	
	this.frameSlider.addSlideCallback(function (_slider) { 
		
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
	this.frameSlider.bindToMouseWheel(this.FrameViewer.widget);


	// Add FrameViewer callback function to synchronize with slider
	this.FrameViewer.addOnloadCallback(function () {
		
		if (that.frameSlider) {
			
			that.frameSlider.updateProperties({
				
				min : 0,
				max : that.FrameViewer.frames.length-1,
				value : Math.round(that.FrameViewer.frames.length/2),
			
			});

			that.FrameViewer.drawFrame(Math.round(that.frameSlider.value), true);
			
		}		
		else{
			
			//console.log("NO DRAW FRAME");
			
		}	
	});
	



	//----------------------------------
	// CONTENT DIVIDER
	//----------------------------------	

	this.ContentDivider = new ContentDivider( {	
		parent: this.widget,		
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
		tabTitles: ["<b>Session Info</b>", "<b>Adjust</b>"],
		
	});
	this.ScanTabs.addCallback( 'setActiveTab', function() {
		
		//if (that.ScanTabs.minClick){
		var cPos = $(that.ContentDivider.widget).position();
		var cHeight = $(that.widget.ContentDivider).height();
		var minCTop = GLOBALS.minContentDividerTop($(that.widget).height());
		var minDiff = Math.abs(cPos.top - minCTop);
		
		if (minDiff < 10 ) {
			$(that.ContentDivider.widget).css( {
				top: $(that.widget).height() - GLOBALS.tabClickHeight - cHeight,
			});			
		}
		else{
			if (that.ScanTabs.minClick) {
				$(that.ContentDivider.widget).css( {
					top: minCTop,
				});	
			}			
		}			




		that.updateCSS();
	})

	



	//----------------------------------
	// CLOSE BUTTON
	//----------------------------------		
	this.closeButton = __makeElement__("img", this.widget, "closeButton",{
		
		position: "absolute",
		//"cursor": "pointer",
		width: 10,
		height: 10,
		
	});
	//this.closeButton.src = "./icons/closeX.png";

	//
	// Its natural state -- slightly faded
	//
	$(this.closeButton).fadeTo(0, .5);
	
	//
	// mouseenter / mouseleave	
	//
	$(this.closeButton).mouseenter(function () {
		
	  $(that.closeButton).stop().fadeTo(200, 1);
	
	}).mouseleave(function () {
		 
		$(that.closeButton).stop().fadeTo(200, .5);
    
    });

	//
	// onclick
	//	
	this.closeButton.onclick = function (event) {
		
		that.closeButtonClicked(event)
		
	}


	//----------------------------------
	// Link Menu
	//----------------------------------	
	this.addLinkMenu();


	//----------------------------------
	// BRIGHNESS AND CONTRAST SLIDERS
	//----------------------------------	
	
	
	//----------------------------------
	// FRAME SLIDER
	//----------------------------------	
	this.brightnessSlider = new __horizontalSlider__(__mergeArgs__(this.args._sliderCSS, {
		id: "BrightnessSlider", 
		parent: this.widget,
		round: true,
	}));


	// Tell frameslider how to behave...	
	this.frameSlider.addSlideCallback(function (_slider) { 
		
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
	this.frameSlider.bindToMouseWheel(this.FrameViewer.widget);
	
	/*
	  var SliderSetArgs = {
	    id: this.args.SliderSet + "_styleSliderSet",
	    parent: that.ScanTabs.getTab("Adjust"),
	    CSS:{
	        "top": 40,
	        "left": 0, 
	        "borderColor": "rgba(255,255,255,1)",
	        "borderWidth": 0,
	        "color": GLOBALS.activeFontColor,
	        "backgroundColor": "rgba(0,0,0,0)"   
	        }
	  }
	*/
	  
	// Create new slider set	
	/*
	  var ss = new SliderSet(SliderSetArgs, [    
	    {id: "_brightnessSlider",
	    displayLabel: "Brightness:"},
	    {id: "_contrastSlider",
	    displayLabel: "Contrast:"},
	  ]); 
	

	// Append slider set to frame viewer
	 for (var j=0;j<ss.sliders.length;j++) {
	    var sl = ss.sliders[j];
	    if (j==0) {
			sl.addSlideCallback(function (_slider) {				
				that.FrameViewer.imageAdjust("brightness", _slider.value);
		    });
	    }
	    else if (j==1) {
			sl.addSlideCallback(function (_slider) {
				that.FrameViewer.imageAdjust("contrast", _slider.value);
		    });
	    }    
	 }
	
	*/
	
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
	this.displayableData.frameNumber = __makeElement__("div", this.widget, "_frameDisplay");
	$(this.displayableData.frameNumber).css(this.textCSS_small);		
		
		
		
		
	//----------------------------------
	// Synchronize current frame number with display
	//----------------------------------	
	this.FrameViewer.addOnloadCallback(function () {
		that.displayableData.frameNumber.innerHTML = "Frame: "+ (that.FrameViewer.currFrame) + 
													 " / " + that.FrameViewer.frames.length;	
	});
	
	this.updateCSS();
}







//******************************************************
//******************************************************
ScanViewer.prototype.closeButtonClicked = function (event) {}





