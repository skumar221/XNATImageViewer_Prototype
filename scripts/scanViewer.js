
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
	},
	_frameslidercss:{
		value: 50,
		max: 100,
		min: 0,
		constrainMargin : 0,
		borderWidth_slider : 1,
		borderWidth_handle : 1,
		height : 5,
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
	}
}



var scanViewer = function(args){
  	var that = this;
	 __Init__(this, defaultArgs_scanViewer, args, function(){});
	 
	 $(this.widget).css({});

	 //----------------------------------
	 // FRAME VIEWER
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


	// Modify the frameViewer such that it lets "this"
	// know of the currentScan when it's dropped in.
	this.frameViewer.addOnloadCallback(function(){
		if(that.frameViewer.currDroppable.scanData)
			that.populateData(that.frameViewer.currDroppable.scanData)
	})


	 //----------------------------------
	 // FRAME SLIDER
	 //----------------------------------		
	this.frameSlider = new __Slider__(mergeArgs(this.args._frameslidercss, {
		id: this.args.id + "_frameSlider", 
		parent: this.widget,
		top : $(this.frameViewer.widget).height() + 20,
		left : $(this.frameViewer.widget).position().left,
		width : $(this.frameViewer.widget).width(),
	}));


	// Tell frameslider how to behave...	
	this.frameSlider.addSlideFunction(function(_slider){  		
		var subtractor = (that.frameSlider.args["sliderMin"] > 0) ? that.frameSlider.args["sliderMin"] : 0;


		// Update any displayable data
		if (that.displayableData && that.displayableData.frameNumber){
			that.displayableData.frameNumber.innerHTML = "Slice: "+(that.frameSlider.currValue + 1) + " / " + that.frameViewer.frames.length	
		}


		// Draw the frame		
		that.frameViewer.drawFrame(that.frameSlider.currValue-subtractor, true); 
	  });


	// Bind mousewheel scrolling to slider	
	this.frameSlider.bindToMouseWheel(that.frameViewer.widget);


	// Add frameViewer callback function to synchronize with slider
	this.frameViewer.addOnloadCallback(function(){
		if (that.frameSlider){
			that.frameSlider.changeSliderProperties({
				"min" : 0,
				"max" : that.frameViewer.currDroppable.frames.length-1,
				"value" : Math.round(that.frameViewer.currDroppable.frames.length/2),
			});
			that.frameViewer.drawFrame(that.frameSlider.currValue, true);
		}		
		else{
			console.log("NO DRAW FRAME");
		}	
	});
	
	
	//----------------------------------
	// SCAN TABS
	//----------------------------------		
	var scanTabTop = $(this.frameSlider.widget).height() +  $(this.frameSlider.widget).position().top + 10;
	var scanTabHeight = $(this.widget).height() - scanTabTop - $(this.widget).width() * this.args.marginPct; 
	this.scanTabs = new scanTabs({
		id: this.args.id + "_tabs",
		parent: this.widget,
		tabTitles: ["<b>View Type</b>", "<b>Session Info</b>", "<b>Adjust</b>"],
		_css:{
	 		left: $(this.widget).width() * this.args.marginPct,
	 	  	top: scanTabTop,
	 	  	width: $(this.widget).width() * this.args.innerPct,
	 	  	height: scanTabHeight,
		}
	});

	

	//----------------------------------
	// BRIGHNESS AND CONTRAST SLIDERS
	//----------------------------------	
	  var sliderSetArgs = {
	    id: this.args.sliderSet + "_styleSliderSet",
	    parent: that.scanTabs.getTab("Adjust"),
	    _css:{
	        "top": 40,
	        "left": 0, 
	        "borderColor": "rgba(255,255,255,1)",
	        "borderWidth": 0,
	        "color": __Globals__.activeFontColor,
	        "backgroundColor": "rgba(0,0,0,0)"   
	        }
	  }

	  
	// Create new slider set	
	  var ss = new sliderSet(sliderSetArgs, [    
	    {id: this.args.id + "_brightnessSlider",
	    displayLabel: "Brightness:"},
	    {id: this.args.id + "_contrastSlider",
	    displayLabel: "Contrast:"},
	  ]); 


	// Append sliders set to frame viewer
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
	

	
	//----------------------------------
	// DISPLAYABLE DATA
	//----------------------------------	
	this.displayableData = {};
	this.textCSS_small = {
		color: "rgba(255,255,255,1)",
		position: "absolute",
		top: $(this.frameViewer.widget).height() - __Globals__.fontSizeSmall -5,
		left: 5,
		fontSize: __Globals__.fontSizeSmall
	};


	// DATA: Frame Number
	this.displayableData.frameNumber = __MakeElement__("div", this.frameViewer.widget, this.args.id + "frameDisplay");
	$(this.displayableData.frameNumber).css(this.textCSS_small);		
		
	//----------------------------------
	// Synchronize current frame number with display
	//----------------------------------	
	this.frameViewer.addOnloadCallback(function(){
		that.displayableData.frameNumber.innerHTML = "Slice: "+ (that.frameViewer.currFrame) + " / " + that.frameViewer.frames.length	
	});
	
	that.updateCSS();
}

scanViewer.prototype.updateCSS = function(){
	 $(this.widget).css({
	 	top: 10,
	 	height: $(this.args.parent).innerHeight() - 20,
	 })
}

scanViewer.prototype.populateData = function(data){	
	var that = this;

	//----------------------------------
	// DATA: VIEW TYPE DATA
	//----------------------------------
	function makeDisplayableData(labelArr){
		for (var i=0;i<labelArr.length;i++){
			var noSpace = labelArr[i]["label"].replace(/\s+/g, ' ');
			var currTop = (that.textCSS_small.fontSize * (2.5*i+1) + 30);
			that.displayableData[noSpace] = __MakeElement__("div", that.scanTabs.getTab("View Type"), that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace]).css(mergeArgs(that.textCSS_small,{
				top: currTop,
				left: 15
			}));
			that.displayableData[noSpace].innerHTML = labelArr[i].label;		

			that.displayableData[noSpace + "_dropdown"] = __MakeElement__("select", that.scanTabs.tabs[0], that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace + "_dropdown"]).css(mergeArgs(that.textCSS_small,{
				top: currTop,
				left: 110,
				width: "10em",
				backgroundColor: "rgba(0,0,0,0)",
				borderWidth: 1,
				borderColor: __Globals__.semiactiveLineColor
			}));	
			
			for (var j=0;j<labelArr[i]["option"].length;j++){
				that.displayableData[noSpace + "_dropdown"].innerHTML += "<option>" + labelArr[i]["option"][j] + "</option>"
			}
		}
	}
	
	makeDisplayableData(data.viewTypeData);


	//----------------------------------
	// DATA: SESSION INFO DATA
	//----------------------------------
	function makeSessionInfoData(labelArr){
		//----------------------------------
		//	SCROLL GALLERY
		//----------------------------------

		that.sessionInfoScrollGallery = new scrollGallery({
			parent: that.scanTabs.getTab("Session Info"),
			id: that.args.id + ("_sessionInfoTab_data"),
			orientation: "vertical",
			_css: {
				left: 0,
				top: 0,
				height: that.scanTabs._css.height * .80,
				width: 440
			}
		});	

		var contents = __MakeElement__("div", that.sessionInfoScrollGallery.scrollContent, that.args.id + "_contents");
		
		for (var i=0;i<labelArr.length;i++){
			var noSpace = labelArr[i]["label"].replace(/\s+/g, ' ');			
			var currTop = (that.textCSS_small.fontSize * (2*i));
			that.displayableData[noSpace] = __MakeElement__("div", contents, that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace]).css(mergeArgs(that.textCSS_small,{
				top: currTop,
				left: 15
			}));
			that.displayableData[noSpace].innerHTML = labelArr[i].label + ":";		

			that.displayableData[noSpace + "_value"] = __MakeElement__("div", contents, that.args.id + "_value_" + noSpace);
			$(that.displayableData[noSpace + "_value"]).css(mergeArgs(that.textCSS_small,{
				top: currTop,
				left: 160,
			}));	
			that.displayableData[noSpace + "_value"].innerHTML = labelArr[i]["value"][0]
		}
		
		contents.style.height = _px(currTop + 300);
		that.sessionInfoScrollGallery.setContents(contents);
	}
	// NOTE:  Ajax query would be here
	makeSessionInfoData(data.sessionInfo);
}
