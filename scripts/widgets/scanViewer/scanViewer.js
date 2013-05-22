
var defaultArgs_scanViewer = {
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
			borderColor: Globals.semiactiveLineColor,
			backgroundColor: "rgba(255,255,255,1)"
		},
		trackCSS:{
			height: 5,
			borderWidth: 1,
			borderColor: Globals.semiactiveLineColor,
			backgroundColor: "rgba(50, 50, 50, 1)"
		}
	}
}






//******************************************************
//  Init
//	
//******************************************************
var scanViewer = function(args){
  	var that = this;
	 INIT(this, defaultArgs_scanViewer, args);

	this.widget.defaultMouseEvents = [];

    	
	 //----------------------------------
	 // FRAME VIEWER
	 //----------------------------------
	 this.frameViewer = new frameViewer({
	 	id: this.args.id + "_FrameViewer",
	 	parent: this.widget,
	 	"border-width": 0,
	 });

	this.axisIcons = [];
 	this.addViewPlaneMenu();
 	
 	
	// Modify the frameViewer such that it lets "this"
	// know of the currentScan when it's dropped in.
	this.frameViewer.addOnloadCallback(function(){
		if(that.frameViewer.currDroppable.scanData) {that.populateData(that.frameViewer.currDroppable.scanData)}
	})




	 //----------------------------------
	 // FRAME SLIDER
	 //----------------------------------	
	this.frameSlider = new __horizontalSlider__(__mergeArgs__(this.args._sliderCSS, {
		id: this.args.id + "_FrameSlider", 
		parent: this.widget,
		round: true,
	}));


	// Tell frameslider how to behave...	
	this.frameSlider.addSlideCallback(function(_slider){ 
		
		var subtractor = (_slider.currArgs().max > 0) ? _slider.currArgs().min  : 0;
		
		var val = Math.round(_slider.value);
		
		// Update any displayable data
		if (that.displayableData && that.displayableData.frameNumber){
			
			that.displayableData.frameNumber.innerHTML = "Frame: "+(val + 1) + " / " + that.frameViewer.frames.length;	
			
		}
		
		// Draw the frame
	
		that.frameViewer.drawFrame(val - subtractor, true); 
		
	  });


	// Bind mousewheel scrolling to slider	
	this.frameSlider.bindToMouseWheel(this.frameViewer.widget);


	// Add frameViewer callback function to synchronize with slider
	this.frameViewer.addOnloadCallback(function(){
		
		if (that.frameSlider){
			
			that.frameSlider.updateProperties({
				
				min : 0,
				max : that.frameViewer.frames.length-1,
				value : Math.round(that.frameViewer.frames.length/2),
			
			});

			that.frameViewer.drawFrame(Math.round(that.frameSlider.value), true);
			
		}		
		else{
			
			//console.log("NO DRAW FRAME");
			
		}	
	});
	



	//----------------------------------
	// CONTENT DIVIDER
	//----------------------------------	
	this.contentDivider = new contentDivider({
		
		id: this.args.id + "_contentDivider",
		parent: this.widget,		
		
	});

	
		
	
	//----------------------------------
	// SCAN TABS
	//----------------------------------		
	var scanTabTop = this.args._sliderCSS.handleCSS.height +  this.args._sliderCSS.widgetCSS.top + 10;
	var scanTabHeight = $(this.widget).height() - scanTabTop - $(this.widget).width() * this.args.marginPct; 
	
	this.scanTabs = new scanTabs({
		
		id: this.args.id + "_tabs",
		parent: this.widget,
		tabTitles: ["<b>Session Info</b>", "<b>Adjust</b>"],
		
	});

	



	//----------------------------------
	// CLOSE BUTTON
	//----------------------------------		
	this.closeButton = __makeElement__("img", this.widget, this.args.id + "_closeButton",{
		
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
	$(this.closeButton).mouseenter(function(){
		
	  $(that.closeButton).stop().fadeTo(200, 1);
	
	}).mouseleave(function(){
		 
		$(that.closeButton).stop().fadeTo(200, .5);
    
    });

	//
	// onclick
	//	
	this.closeButton.onclick = function(event){
		
		that.closeButtonClicked(event)
		
	}


	//----------------------------------
	// Link Menu
	//----------------------------------	
	this.addLinkMenu();


	//----------------------------------
	// BRIGHNESS AND CONTRAST SLIDERS
	//----------------------------------	
	
	/*
	  var sliderSetArgs = {
	    id: this.args.sliderSet + "_styleSliderSet",
	    parent: that.scanTabs.getTab("Adjust"),
	    CSS:{
	        "top": 40,
	        "left": 0, 
	        "borderColor": "rgba(255,255,255,1)",
	        "borderWidth": 0,
	        "color": Globals.activeFontColor,
	        "backgroundColor": "rgba(0,0,0,0)"   
	        }
	  }
	*/
	  
	// Create new slider set	
	/*
	  var ss = new sliderSet(sliderSetArgs, [    
	    {id: this.args.id + "_brightnessSlider",
	    displayLabel: "Brightness:"},
	    {id: this.args.id + "_contrastSlider",
	    displayLabel: "Contrast:"},
	  ]); 
	

	// Append slider set to frame viewer
	 for (var j=0;j<ss.sliders.length;j++){
	    var sl = ss.sliders[j];
	    if (j==0){
			sl.addSlideCallback(function(_slider){				
				that.frameViewer.imageAdjust("brightness", _slider.value);
		    });
	    }
	    else if (j==1){
			sl.addSlideCallback(function(_slider){
				that.frameViewer.imageAdjust("contrast", _slider.value);
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
		top: $(this.frameViewer.widget).height() - Globals.fontSizeSmall -5,
		left: 5,
		fontSize: Globals.fontSizeSmall
	};


	// DATA: Frame Number
	this.displayableData.frameNumber = __makeElement__("div", this.frameViewer.widget, this.args.id + "_frameDisplay");
	$(this.displayableData.frameNumber).css(this.textCSS_small);		
		
		
		
		
	//----------------------------------
	// Synchronize current frame number with display
	//----------------------------------	
	this.frameViewer.addOnloadCallback(function(){
		that.displayableData.frameNumber.innerHTML = "Slice: "+ (that.frameViewer.currFrame) + " / " + that.frameViewer.frames.length	
	});
	
	this.updateCSS();
}







//******************************************************
//******************************************************
scanViewer.prototype.closeButtonClicked = function(event){}





