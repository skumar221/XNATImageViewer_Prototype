
var defaultArgs_scanViewer = {
	id: "scanViewer",
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



	 //----------------------------------
	 // FRAME VIEWER
	 //----------------------------------
	 this.frameViewer = new frameViewer({
	 	id: this.args.id + "_frameViewer",
	 	parent: this.widget,
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
	this.frameSlider = new __Slider__(__MergeArgs__(this.args._frameslidercss, {
		id: this.args.id + "_frameSlider", 
		parent: this.widget,
	}));


	// Tell frameslider how to behave...	
	this.frameSlider.addSlideCallback(function(_slider){  		
		var subtractor = (that.frameSlider.args["sliderMin"] > 0) ? that.frameSlider.args["sliderMin"] : 0;


		// Update any displayable data
		if (that.displayableData && that.displayableData.frameNumber){
			that.displayableData.frameNumber.innerHTML = "Frame: "+(that.frameSlider.currValue + 1) + " / " + that.frameViewer.frames.length	
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
	});

	

	//----------------------------------
	// BRIGHNESS AND CONTRAST SLIDERS
	//----------------------------------	
	  var sliderSetArgs = {
	    id: this.args.sliderSet + "_styleSliderSet",
	    parent: that.scanTabs.getTab("Adjust"),
	    CSS:{
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


	// Append slider set to frame viewer
	 for (var j=0;j<ss.sliders.length;j++){
	    var sl = ss.sliders[j];
	    if (j==0){
			sl.addSlideCallback(function(_slider){
					that.frameViewer.imageAdjust("brightness", _slider.currValue);
		    });
	    }
	    else if (j==1){
			sl.addSlideCallback(function(_slider){
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
	this.displayableData.frameNumber = __MakeElement__("div", this.frameViewer.widget, this.args.id + "_frameDisplay");
	$(this.displayableData.frameNumber).css(this.textCSS_small);		
		
		
		
		
	//----------------------------------
	// Synchronize current frame number with display
	//----------------------------------	
	this.frameViewer.addOnloadCallback(function(){
		that.displayableData.frameNumber.innerHTML = "Slice: "+ (that.frameViewer.currFrame) + " / " + that.frameViewer.frames.length	
	});
	
	this.updateCSS();
}



scanViewer.prototype.updateCSS = function(){

	var tabsHeight = 180;
	var marginLeft = 10;
	var marginTop = 10;
	var marginLeft = 10; 


	var scanTabTop = $(this.widget).height() - tabsHeight - marginTop;
	var sliderTop = scanTabTop - this.frameSlider.args.height - marginTop*1.5;
	var viewerWidth = sliderTop - marginTop*2;
	var viewerHeight = viewerWidth;
	
	

	$(this.widget).css({
		width: viewerWidth + marginLeft * 2
	})
	
	
	
	//----------------------------------
	// SCAN TABS
	//----------------------------------	
	$(this.scanTabs.widget).css({
 		left: marginLeft,
 	  	top: scanTabTop,
 	  	width: viewerWidth,
 	  	height: tabsHeight,
	});	 
   this.scanTabs.updateCSS();



	//----------------------------------
	// FRAME SLIDER
	//----------------------------------		
	$(this.frameSlider.widget).css({
		top : sliderTop,
		left : marginLeft,
		width : viewerWidth,
	});
   //this.frameSlider.updateCSS();
	
		 
	 //----------------------------------
	 // FRAME VIEWER
	 //----------------------------------
	 $(this.frameViewer.widget).css({
 	    left: marginLeft,
 		top: marginTop,
 	  	width: viewerWidth,
 	  	height: viewerHeight,
	 });
	 this.frameViewer.updateCSS();
	 


	 //----------------------------------
	 // FRAME NUMBER DISPLAY
	 //----------------------------------	 
	 $(this.displayableData.frameNumber).css({
	 		top: $(this.frameViewer.widget).height() - __Globals__.fontSizeSmall -5,
	 });
	 
	 
	 
	 
	 this.frameViewer.drawFrame(this.frameSlider.currValue, true);
   	
}

scanViewer.prototype.populateData = function(data){	
	var that = this;

	//----------------------------------
	// DATA: VIEW TYPE DATA
	//----------------------------------
	function makeDisplayableData(labelObj){
		var counter = 0;
		for (i in labelObj){
//			console.log(labelObj[i])
			var noSpace = labelObj[i]["label"].replace(/\s+/g, ' ');
			var currTop = (that.textCSS_small.fontSize * (2.5*counter+1) + 30);
			that.displayableData[noSpace] = __MakeElement__("div", that.scanTabs.getTab("View Type"), that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace]).css(__MergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 15
			}));
			that.displayableData[noSpace].innerHTML = labelObj[i].label;		

			that.displayableData[noSpace + "_dropdown"] = __MakeElement__("select", that.scanTabs.tabs[0], that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace + "_dropdown"]).css(__MergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 110,
				width: "10em",
				backgroundColor: "rgba(0,0,0,0)",
				borderWidth: 1,
				borderColor: __Globals__.semiactiveLineColor
			}));	
			
			for (var j=0;j<labelObj[i]["option"].length;j++){
				that.displayableData[noSpace + "_dropdown"].innerHTML += "<option>" + labelObj[i]["option"][j] + "</option>"
			}
			
			counter++;
		}
	}
	
	makeDisplayableData(data.viewTypeData);


	//----------------------------------
	// DATA: SESSION INFO DATA
	//----------------------------------
	function makeSessionInfoData(labelObj){
		//----------------------------------
		//	SCROLL GALLERY
		//----------------------------------

		that.sessionInfoScrollGallery = new scrollGallery({
			parent: that.scanTabs.getTab("Session Info"),
			id: that.args.id + ("_sessionInfoTab_data"),
			orientation: "vertical",
			CSS: {
				left: 0,
				top: 0,
				height: that.scanTabs.CSS.height * .80,
				width: 440
			}
		});	

		var contents = __MakeElement__("div", that.sessionInfoScrollGallery.scrollContent, that.args.id + "_contents");
		var counter = 0;
		for (i in labelObj){
			var noSpace = labelObj[i]["label"].replace(/\s+/g, ' ');			
			var currTop = (that.textCSS_small.fontSize * (2*counter));
			that.displayableData[noSpace] = __MakeElement__("div", contents, that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace]).css(__MergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 15
			}));
			that.displayableData[noSpace].innerHTML = labelObj[i].label + ":";		

			that.displayableData[noSpace + "_value"] = __MakeElement__("div", contents, that.args.id + "_value_" + noSpace);
			$(that.displayableData[noSpace + "_value"]).css(__MergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 160,
			}));	
			that.displayableData[noSpace + "_value"].innerHTML = labelObj[i]["value"][0]
			counter++;
		}
		
		contents.style.height = __PX__(currTop + 300);
		that.sessionInfoScrollGallery.setContents(contents);
	}
	// NOTE:  Ajax query would be here
	makeSessionInfoData(data.sessionInfo);
}
