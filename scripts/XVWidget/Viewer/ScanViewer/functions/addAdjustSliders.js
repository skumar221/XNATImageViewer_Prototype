//******************************************************
//  
//
//******************************************************
ScanViewer.prototype.addAdjustSliders = function () {
	
	var that = this;
	
	var labelLeft =  15;
	var sliderMarginTop = 15;
	var sliderVerticalSpacing = 30;
	var sliderWidth = 100;
	var sliderLeft = labelLeft + 65;
	var numLeft = sliderLeft + sliderWidth + 10;

	var imgProcSliderCSS =
	{
		widgetCSS:{
			position: 'absolute',
			width: sliderWidth,
			height: 20
			//border: "solid 1px rgb(255,255,255)"
		},
		thumbCSS:{
			height: 18,
			width: 6,
			borderRadius: 0,
			borderColor: GLOBALS.semiactiveLineColor,
			backgroundColor: "rgba(185,185,185,1)"
		},
		trackCSS: {
			width: "100%",
			height: 6,
			position: "absolute",
			top: 6,
			border: "solid 1px rgb(155,155,155)",
			borderRadius: 0
		}
	}
	

	var labelCSS = {
		position: "absolute",
		color: "rgba(255, 255, 255)",
		fontSize: GLOBALS.fontSizeSmall,
		fontFamily: GLOBALS.fontFamily,
		//border: "solid 1px rgba(255,255,0,1)",
		width: sliderLeft * .75,
		height: 10
	}
	
	
	var sliderVals = ['Brightness', 'Contrast'];
	var sliderKey;
	
	utils.array.forEach(sliderVals, function(SliderName, i) { 

		sliderKey = SliderName + 'Slider';
		
		var bNum, bLabel;
		
		 /**
		 * @type {utils.gui.GenericSlider}
		 */
		this[sliderKey] = new utils.gui.GenericSlider(utils.dom.mergeArgs(imgProcSliderCSS, {
			parent: that.ScanTabs.getTab("Adjust"),
			className: SliderName + 'Slider',
			widgetCSS:{
				top: sliderMarginTop + sliderVerticalSpacing * (i),
				left: sliderLeft,
				borderColor: 'rgb(180,180,180)'
			}
		}));
	    
	        
		


	    bLabel = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
	    	top: sliderMarginTop + (sliderVerticalSpacing * (i)) + imgProcSliderCSS.thumbCSS.height/2 - GLOBALS.fontSizeMed/2 + 2,
	    	left: labelLeft
	    }))
	    bLabel.innerHTML = SliderName;
	    

	    bNum = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
	    	top: sliderMarginTop + (sliderVerticalSpacing * (i)) + imgProcSliderCSS.thumbCSS.height/2 - GLOBALS.fontSizeMed/2 - 2 + 3,
	    	left: numLeft ,
	    	fontSize: GLOBALS.fontSizeMed
	    }))
	    bNum.innerHTML = "0";

		// Callback
		this[sliderKey].addSlideCallback(function (_slider) {		
			var sliderVal = _slider.getValue();
			console.log("SLIDER VAL ",  sliderVal)
			bNum.innerHTML = Math.round(sliderVal);		
			that.FrameHolder.imageAdjust(SliderName.toLowerCase(), sliderVal);
	    });  

	})
	
}