//******************************************************
//  
//
//******************************************************
ViewerBox.prototype.addAdjustSliders = function () {
	
	var that = this;
	var sliderMargin = 40;
	var sliderLeft = 100;
	var numLeft = 320;
	var labelLeft = 20;
	
	var imgProcSliderCSS =
	{
		widgetCSS:{
			position: 'absolute',
			width: 200,
			height: 20,
			//border: "solid 1px rgb(255,255,255)"
		},
		thumbCSS:{
			height: 20,
			width: 10,
			borderRadius: 2,
			borderColor: GLOBALS.semiactiveLineColor,
			backgroundColor: "rgba(255,255,255,1)"
		},
		trackCSS: {
			width: "100%",
			height: 10,
			position: "absolute",
			top: 4,
			border: "solid 1px rgb(255,255,255)",
			borderRadius: 0
		}
	}
	
	
	var labelCSS = {
		position: "absolute",
		color: "rgba(255, 255, 255)",
		fontSize: GLOBALS.fontSizeMed,
		fontFamily: GLOBALS.fontFamily,
		//border: "solid 1px rgba(255,255,0,1)",
		width: sliderLeft * .75
	}
	
	
	
	
	//---------------------------
	// BRIGHTNESS SLIDER
	//---------------------------

	this.BrightnessSlider = new utils.gui.GenericSlider(utils.dom.mergeArgs(imgProcSliderCSS, {
		parent: that.ScanTabs.getTab("Adjust"),
		className: "BrightnessSlider",
		widgetCSS:{
			top: sliderMargin * 1,
			left: sliderLeft,
		},
	}));
	

    // Label
    var bLabel = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
    	top: (sliderMargin * 1) + imgProcSliderCSS.thumbCSS.height/2 - GLOBALS.fontSizeMed/2 - 2,
    	left: labelLeft
    }))
    bLabel.innerHTML = "Brightness";
    
    
    // Number
    var bNum = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
    	top: (sliderMargin * 1) + imgProcSliderCSS.thumbCSS.height/2 - GLOBALS.fontSizeMed/2 - 2,
    	left: numLeft ,
    	fontSize: GLOBALS.fontSizeLarge
    }))
    bNum.innerHTML = "0";
    
        
	// Callback
	this.BrightnessSlider.addSlideCallback(function (_slider) {		
		
		bNum.innerHTML = Math.round(_slider.getValue());		
		that.FrameViewer.imageAdjust("brightness", _slider.getValue());
    });    
    
    
    
    
	//---------------------------
	// CONTRAST SLIDER
	//---------------------------    
    this.ContrastSlider = new utils.gui.GenericSlider(utils.dom.mergeArgs(imgProcSliderCSS, {
		parent: that.ScanTabs.getTab("Adjust"),
		className: "ContrastSlider", 
		widgetCSS:{
			top: sliderMargin * 2,
			left: sliderLeft
		},
	}));
	

    
    var cLabel = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
    	top: (sliderMargin * 2) + imgProcSliderCSS.thumbCSS.height/2 - GLOBALS.fontSizeMed/2 - 2,
    	left: labelLeft
    }))
    cLabel.innerHTML = "Contrast";
    

    // Number
    var cNum = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
    	top: (sliderMargin * 2) + imgProcSliderCSS.thumbCSS.height/2 - GLOBALS.fontSizeMed/2 - 2,
    	left: numLeft ,
    	fontSize: GLOBALS.fontSizeLarge
    }))
    cNum.innerHTML = "0";
    
      
	this.ContrastSlider.addSlideCallback(function (_slider) {
		cNum.innerHTML = Math.round(_slider.getValue());					
		that.FrameViewer.imageAdjust("contrast", _slider.getValue());
    });
    
	
}