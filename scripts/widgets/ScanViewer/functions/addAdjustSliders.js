//******************************************************
//  
//
//******************************************************
ScanViewer.prototype.addAdjustSliders = function () {
	
	var that = this;
	var sliderMargin = 40;
	var sliderLeft = 100;
	var numLeft = 320;
	var labelLeft = 20;
	
	var imgProcSliderCSS =
	{
		id: "_FrameSlider", 
		parent: document.body,
		round: true,
		handleOffsetLeft: 0,
	  	handleOffsetTop: 0,
		widgetCSS:{
		},
		handleCSS:{
			height: 20,
			width: 10,
			borderRadius: 2,
			borderColor: GLOBALS.semiactiveLineColor,
			backgroundColor: "rgba(255,255,255,1)"
		},
		trackCSS:{
			height: 8,
			width: 200,
			borderWidth: 1,
			borderColor: GLOBALS.semiactiveLineColor,
			backgroundColor: "rgba(0, 0, 0, 1)"
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
	this.BrightnessSlider = new utils.gui.horizontalSlider(utils.dom.mergeArgs(imgProcSliderCSS, {
		id: "BrightnessSlider", 
		parent: that.ScanTabs.getTab("Adjust"),
		round: true,
		widgetCSS:{
			top: sliderMargin * 1,
			left: sliderLeft
		}
	}));
	
    
    // Label
    var bLabel = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
    	top: (sliderMargin * 1) + imgProcSliderCSS.handleCSS.height/2 - GLOBALS.fontSizeMed/2 - 2,
    	left: labelLeft
    }))
    bLabel.innerHTML = "Brightness";
    
    
    // Number
    var bNum = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
    	top: (sliderMargin * 1) + imgProcSliderCSS.handleCSS.height/2 - GLOBALS.fontSizeMed/2 - 2,
    	left: numLeft ,
    	fontSize: GLOBALS.fontSizeLarge
    }))
    bNum.innerHTML = "0";
    
    
	// Callback
	this.BrightnessSlider.addSlideCallback(function (_slider) {		
		bNum.innerHTML = Math.round(_slider.value);		
		that.FrameViewer.imageAdjust("brightness", _slider.value);
    });    
    
    
    
    
	//---------------------------
	// CONTRAST SLIDER
	//---------------------------    
    this.ContrastSlider = new utils.gui.horizontalSlider(utils.dom.mergeArgs(imgProcSliderCSS, {
		id: "ContrastSlider", 
		parent: that.ScanTabs.getTab("Adjust"),
		round: true,
		widgetCSS:{
			top: sliderMargin * 2,
			left: sliderLeft
		}
	}));
	

    
    var cLabel = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
    	top: (sliderMargin * 2) + imgProcSliderCSS.handleCSS.height/2 - GLOBALS.fontSizeMed/2 - 2,
    	left: labelLeft
    }))
    cLabel.innerHTML = "Contrast";
    

    // Number
    var cNum = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
    	top: (sliderMargin * 2) + imgProcSliderCSS.handleCSS.height/2 - GLOBALS.fontSizeMed/2 - 2,
    	left: numLeft ,
    	fontSize: GLOBALS.fontSizeLarge
    }))
    cNum.innerHTML = "0";
    
        
	this.ContrastSlider.addSlideCallback(function (_slider) {
		cNum.innerHTML = Math.round(_slider.value);					
		that.FrameViewer.imageAdjust("contrast", _slider.value);
    });
	
}