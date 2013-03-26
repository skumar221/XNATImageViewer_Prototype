
var defaultArgs_scanViewer = {
	id: "scanViewer",
	parent: document.body,
	innerPct: .95,
	marginPct: .025,
	_css: {
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
	}
}

var scanViewer = function(args){
  	var that = this;
	 __Init__(this, defaultArgs_scanViewer, args, function(){});
	 
	 $(this.widget).css({});
	 
	 
	 //----------------------------------
	 // Frame Viewer
	 //----------------------------------
	 this.frameViewer = new frameViewer({
	 	id: this.args.id + "_frameViewer",
	 	parent: this.widget,
	 	_css: {
	 		left: $(this.widget).width() * this.args.marginPct,
	 	  	top: $(this.widget).width() * this.args.marginPct,
	 	  	width: $(this.widget).width() * this.args.innerPct,
	 	  	height: $(this.widget).width() * this.args.innerPct,
	 	  }
	 });


	 //----------------------------------
	 // FRAME SLIDER
	 //----------------------------------		
	this.frameSlider = new modSlider({
		id: this.args.id + "_frameSlider", 
		parent: this.widget,
		value: 50,
		max: 100,
		min: 0,
		constrainMargin : 0,
		borderWidth_slider : 1,
		borderWidth_handle : 1,
		top : $(this.frameViewer.widget).height() + 20,
		left : $(this.frameViewer.widget).position().left,
		height : 5,
		width : $(this.frameViewer.widget).width(),
		height_handle : 10,
		width_handle : 10,
		borderRadius_slider : 0,
		borderRadius_handle : 2,
		borderWidth_slider: 1,			
  		borderWidth_handle: 0,			
		handleBorderColor: __Globals__.semiactiveLineColor,				
	  	sliderBorderColor: __Globals__.semiactiveLineColor,				
	  	sliderBGColor: "rgba(50, 50, 50, 1)",			
	  	handleBGColor: "rgba(255,255,255,1)",	
	});
	// Appends the drawFrame function of the frame viewer
	// to moving the slider...
	this.frameSlider.addSlideFunction(function(_slider){  		
		var subtractor = (that.frameSlider.args["sliderMin"] > 0) ? that.frameSlider.args["sliderMin"] : 0;
		that.frameViewer.drawFrame(that.frameSlider.currValue-subtractor, true); 
	  });
	// Mouse movements over the frameViewer are now linked
	// to moving the slider.
	this.frameSlider.bindToMouseWheel(that.frameViewer.widget);
	// Make the frameViewer aware of the frameSlider
	this.frameViewer.frameSlider = this.frameSlider;
	
	
	//----------------------------------
	// FRAME SLIDER
	//----------------------------------		
	var scanTabTop = $(this.frameSlider.widget).height() +  $(this.frameSlider.widget).position().top + 10;
	var scanTabHeight = $(this.widget).height() - scanTabTop - $(this.widget).width() * this.args.marginPct; 
	this.scanTabs = new scanTabs({
		id: this.args.id + "_tabs",
		parent: this.widget,
		_css:{
	 		left: $(this.widget).width() * this.args.marginPct,
	 	  	top: scanTabTop,
	 	  	width: $(this.widget).width() * this.args.innerPct,
	 	  	height: scanTabHeight,
		}
	});

	
	/*
	//----------------------------------
	// BRIGHNESS SLIDER (ON SCAN TAB 1)
	//----------------------------------	
	this.scanTabs.tabs[1].innerHTML += "<br>Brightness:<br>";
	this.brightnessSlider = new modSlider({
		parent: this.scanTabs.tabs[1],
		id: this.args.id + "_brightnessSlider",
		top: 200,
		left: 200,
		value: 50,
		min: 0,
		max: 100,
		handleBorderColor: __Globals__.semiactiveLineColor,				
	  	sliderBorderColor: __Globals__.semiactiveLineColor,			
	  	sliderBGColor: "rgba(30, 30, 30, 1)",	
	});
	this.brightnessSlider.addSlideFunction(function(_slider){
	    that.frameViewer.imageAdjust("brightness", that.brightnessSlider.currValue);
	});  


	//----------------------------------
	// CONTRAST SLIDER (ON SCAN TAB 1)
	//----------------------------------	
	this.scanTabs.tabs[1].innerHTML += "<br>Contrast:<br>";
	this.contrastSlider = new modSlider({
		parent: this.scanTabs.tabs[1],
		id: this.args.id + "_contrastSlider",
		top: 85,
		left: 100,
		handleBorderColor: __Globals__.semiactiveLineColor,				
	  	sliderBorderColor: __Globals__.semiactiveLineColor,			
	  	sliderBGColor: "rgba(30, 30, 30, 1)",					
	});
	this.contrastSlider.addSlideFunction(function(_slider){      
	    that.frameViewer.imageAdjust("contrast", that.contrastSlider.currValue);
	});
	*/
	
	  var sliderSetArgs = {
	    id: this.args.sliderSet + "_styleSliderSet",
	    parent: this.scanTabs.tabs[1],
	    _css:{
	        "top": 40,
	        "left": 0, 
	        "borderColor": "rgba(255,255,255,1)",
	        "borderWidth": 0,
	        "color": __Globals__.activeFontColor,
	        "backgroundColor": "rgba(0,0,0,0)"   
	        }
	  }
	
	  var ss = new sliderSet(sliderSetArgs, [    
	    {id: this.args.id + "_brightnessSlider",
	    displayLabel: "Brightness:"},
	    {id: this.args.id + "_contrastSlider",
	    displayLabel: "Contrast:"},
	  ]); 
	
	 for (var j=0;j<ss.sliders.length;j++){
	    var sl = ss.sliders[j];
	    if (j==0){
			sl.addSlideFunction(function(_slider){
					that.frameViewer.imageAdjust("brightness", _slider.currValue);
		    });
	    }
	    else if (j==1){
			sl.addSlideFunction(function(_slider){
					that.frameViewer.imageAdjust("contrast", _slider.currValue);
		    });
	    }    
	 }
	
	this.updateCSS();
}

scanViewer.prototype.updateCSS = function(){
	//alert((this.args.parent).style.height);
	 $(this.widget).css({
	 	top: 10,
	 	height: $(this.args.parent).innerHeight() - 20,
	 })


}
