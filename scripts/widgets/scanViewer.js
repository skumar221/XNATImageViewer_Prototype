
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
//  Method for handling objects that are "Droppable".
//  In this case, they are the scanThumbnails.
//******************************************************

frameViewer.prototype.loadFramesByAxis = function(frameType, axisIcons){
	
	if (frameType.toLowerCase() == "sagittal")
		this.loadFrames(this.currDroppable.sagittalFrames);
	if (frameType.toLowerCase() == "transverse" || frameType.toLowerCase() == "axial")
		this.loadFrames(this.currDroppable.axialFrames);
	if (frameType.toLowerCase() == "coronal")
		this.loadFrames(this.currDroppable.coronalFrames);
	
//	console.log(axisIcons[0].axis);
	if(axisIcons){
		for (var i=0; i<axisIcons.length; i++){
			console.log(axisIcons[0].axis, axisIcons[i].axis.toLowerCase(), frameType.toLowerCase());
			if (axisIcons[i].axis.toLowerCase() == frameType.toLowerCase()){
				$(axisIcons[i]).unbind('mouseleave')
				$(axisIcons[i]).fadeTo(0,1);
				
			}
			else{
				console.log("not it")
				$(axisIcons[i]).fadeTo(0, .5);
			}
		}	
	}
}


frameViewer.prototype.loadDroppable = function(droppable){
	if (droppable.sagittalFrames){
		this.currDroppable = droppable;
		//console.log("SAG FRAMES: ", droppable.sagittalFrames)
		this.loadFramesByAxis("sagittal");
	}
	else{
		throw "FrameViewer.js: Invalid Droppable for frameViewer."
	}

}





//******************************************************
//  Init
//	
//******************************************************
var scanViewer = function(args){
  	var that = this;
	 INIT(this, defaultArgs_scanViewer, args);



    	
	 //----------------------------------
	 // FRAME VIEWER
	 //----------------------------------
	 this.frameViewer = new frameViewer({
	 	id: this.args.id + "_frameViewer",
	 	parent: this.widget,
	 	"border-width": 0,
	 });

	this.axisIcons = [];
 	this.populateViewTypeTab();
 	
 	
	// Modify the frameViewer such that it lets "this"
	// know of the currentScan when it's dropped in.
	this.frameViewer.addOnloadCallback(function(){
		if(that.frameViewer.currDroppable.scanData) {that.populateData(that.frameViewer.currDroppable.scanData)}
	})




	 //----------------------------------
	 // FRAME SLIDER
	 //----------------------------------	
	this.frameSlider = new __horizontalSlider__(__mergeArgs__(this.args._sliderCSS, {
		id: this.args.id + "_frameSlider", 
		parent: this.widget,
		round: true,
	}));


	// Tell frameslider how to behave...	
	this.frameSlider.addSlideCallback(function(_slider){ 
		var subtractor = (_slider.currArgs().max > 0) ? _slider.currArgs().min  : 0;
		
		var val = Math.round(_slider.value);
		// Update any displayable data
		if (that.displayableData && that.displayableData.frameNumber){
			that.displayableData.frameNumber.innerHTML = "Frame: "+(val + 1) + " / " + that.frameViewer.frames.length	
		}
		
		// Draw the frame
	
		that.frameViewer.drawFrame(val - subtractor, true); 
	  });


	// Bind mousewheel scrolling to slider	
	this.frameSlider.bindToMouseWheel(this.frameViewer.widget);


	// Add frameViewer callback function to synchronize with slider
	this.frameViewer.addOnloadCallback(function(){
		if (that.frameSlider){
			frameVal = 
			that.frameSlider.updateProperties({
				min : 0,
				max : that.frameViewer.frames.length-1,
				value : Math.round(that.frameViewer.frames.length/2),
			});

			that.frameViewer.drawFrame(Math.round(that.frameSlider.value), true);
		}		
		else{
			console.log("NO DRAW FRAME");
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
		"cursor": "pointer",
		width: 10,
		height: 10
	});
	this.closeButton.src = "./icons/closeX.png";

	// Its natural state -- slightly faded
	$(this.closeButton).fadeTo(0, .5);

	// What do do when the mouse leaves	
	$(this.closeButton).mouseover(function(){
	  $(that.closeButton).stop().fadeTo(200, 1);
	}).mouseleave(
		function(){ 
		$(that.closeButton).stop().fadeTo(200, .5);
    });
	
	this.closeButton.onclick = function(event){
		that.closeButtonClicked(event)
	}
	
	

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
	        "color": Globals.activeFontColor,
	        "backgroundColor": "rgba(0,0,0,0)"   
	        }
	  }

	  
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
//  UpdateCSS
//
//******************************************************
scanViewer.prototype.updateCSS = function(args){

	var that = this;
	var tabsHeight = Globals.defaultScanTabHeight;

	var widgetHeight = (args && args.height) ? args.height : $(this.widget).height();
	var widgetWidth = (args && args.width) ? args.width : $(this.widget).width();
	var widgetTop = (args && args.top) ? args.top : $(this.widget).position().top;
	var widgetLeft = (args && args.left) ? args.left : $(this.widget).position().left;


	var scanTabTop = widgetHeight  - tabsHeight -1;// - marginTop;
	var contentDivTop = scanTabTop;//	- this.contentDivider.defaultArgs().widgetCSS.height;
	var sliderTop = contentDivTop - this.frameSlider.currArgs().handleCSS.height - 10;
	var viewerWidth = sliderTop;// - marginTop*2 ;
	var viewerHeight = viewerWidth;
	
	


	//----------------------------------
	// Widget
	//----------------------------------
	this.widget.style.width = __toPx__(widgetWidth);
	this.widget.style.height = __toPx__(widgetHeight);
	this.widget.style.top = __toPx__(widgetTop);
	this.widget.style.left = __toPx__(widgetLeft);
	this.widget.style.overflow = "hidden";
	

	
	
	//----------------------------------
	// Tabs
	//----------------------------------	
	$(this.scanTabs.widget).css({
 		left: 0,//marginLeft,
 	  	top: scanTabTop,
 	  	width: widgetWidth - 2,// + marginLeft * 2,
 	  	height: tabsHeight -1,
	});	 
   this.scanTabs.updateCSS();




	//----------------------------------
	// Content Divider
	//----------------------------------
	this.contentDivider.updateCSS({
		widgetCSS:{
			left: 0,
			width: widgetWidth,
			top: contentDivTop,
			backgroundColor: "rgba(0,0,0,0)"
		},
		boundaryCSS:{
			width: widgetWidth,	
			top: Globals.minFrameViewerHeight,
			left: 0,
			height: __toInt__(this.widget.style.height) - Globals.minScanTabHeight,
		}
	});




	//----------------------------------
	// CSS: FRAME SLIDER
	//----------------------------------
    this.frameSlider.updateCSS({
    	widgetCSS:{
 			top : sliderTop,
			left : 4,//marginLeft,   		
    	},
    	trackCSS:{
    		width: Math.round(widgetWidth) - 10,// + marginLeft * 2
    	}
    })

	
		 
	 //----------------------------------
	 // CSS: FRAME VIEWER
	 //----------------------------------
	 $(this.frameViewer.widget).css({
 	    left: 0,//marginLeft,
 		top: 0,//marginTop,
 	  	width: widgetWidth - 10,
 	  	height: widgetWidth - 10,
	 });
	 this.frameViewer.updateCSS();
	 



	 //----------------------------------
	 // CSS: FRAME NUMBER DISPLAY
	 //----------------------------------	 
	 $(this.displayableData.frameNumber).css({
	 	top: $(this.frameViewer.widget).height() - Globals.fontSizeSmall,// -2,
	 });
	 
	 

	//----------------------------------
	// DRAW FRAME ON FRAMEVIEWER
	//----------------------------------
	 this.frameViewer.drawFrame(this.frameSlider.value, true);
	 
	 
	 
	//----------------------------------
	// CLOSE BUTTON
	//----------------------------------		
	__setCSS__(this.closeButton, {
		top: 3,
		left: widgetWidth - __toInt__(this.closeButton.style.width) - 3,
	});
	 
	 
	 
	 //----------------------------------
	 // Content Divider CAllback
	 //----------------------------------	 
	 this.contentDivider.clearCallbacks();
	 this.contentDivider.addMoveCallback(function(dividerElt){
	 	
		var divTop = __toInt__(dividerElt.style.top);
		var divLeft = __toInt__(dividerElt.style.left);
		var divHeight = __toInt__(dividerElt.style.height);
		var divWidth = __toInt__(dividerElt.style.width);
		
		
		//----------------------------------
		// Tabs
		//----------------------------------	
		$(that.scanTabs.widget).css({
	 	  	top: divTop + divHeight,
	 	  	height: __toInt__(that.widget.style.height) - (divTop + divHeight) - 1,
		});	 
	   that.scanTabs.updateCSS();	
	   
	   
	   
	   	//----------------------------------
		// FRAME SLIDER
		//----------------------------------
	    that.frameSlider.updateCSS({
	    	widgetCSS:{
	 			top : divTop + divHeight - that.frameSlider.currArgs().handleCSS.height - 16,	
	    	},
	    })
	
		
			 
		 //----------------------------------
		 // FRAME VIEWER
		 //----------------------------------
		 var prevHeight = __toInt__(that.frameViewer.widget.style.height);
		 var newHeight = that.frameSlider.currArgs().widgetCSS.top - 10;
		 var prevWidth = __toInt__(that.frameViewer.widget.style.width);
		 var newWidth = prevWidth * (newHeight/prevHeight);
		 var newLeft = __toInt__(that.widget.style.width)/2 - newWidth/2;
		 $(that.frameViewer.widget).css({
	 	  	height: newHeight,
	 	  	width: newWidth,
	 	  	left:  newLeft
		 });
		 that.frameViewer.updateCSS();
		 
	
	
	
		 //----------------------------------
		 // FRAME NUMBER DISPLAY
		 //----------------------------------	 
		 $(that.displayableData.frameNumber).css({
		 	top: $(that.frameViewer.widget).height() - Globals.fontSizeSmall,// -2,
		 });	
		
	 })
   	
}


//******************************************************
//******************************************************
scanViewer.prototype.closeButtonClicked = function(event){}



scanViewer.prototype.populateViewTypeTab = function(){

	// SAG : 188x275
	// TRA: 321x218
	// CRL 190x275
	
	var that = this;
	
	var iconStartLeft = 5;
	//var iconStartTop = 37;
	var iconStartTop = 5;
	var imgDiv = 7;
	var iconDim = 30;
	var spacer = iconDim*1.5;
	
	var iconVals = ['Sagittal', 'Coronal', 'Transverse', '3D'];
	
	
	for (var i=0; i<iconVals.length; i++){
		//var val = iconVals[i];
		//var icon = __makeElement__("img", this.scanTabs.getTab("View Type"), this.args.id + "_ViewTypeTab_" + iconVals[i] + "Icon",{
		var icon = __makeElement__("img", this.widget, this.args.id + "_ViewTypeTab_" + iconVals[i] + "Icon",{
			position: "absolute",
			left: iconStartLeft + spacer*i,
			top: iconStartTop,
			height: iconDim , 
			width: iconDim ,
			cursor: "pointer", 
			//border: "solid 1px rgb(255,255,255)"
		});	
		
		
		icon.src = "./icons/" + iconVals[i] + ".png";
		icon.axis = iconVals[i];
		
		var fadeVal = (iconVals[i] == "sagittal") ? 1 : .5;
		console.log(fadeVal)
		$(icon).fadeTo(0,fadeVal);
		
		$(icon).mouseover(function(){
			$(this).stop().fadeTo(300,1);
		}).mouseleave(function(){
			$(this).stop().fadeTo(0,.5);
		});	
		
		this.axisIcons.push(icon);
		
		if (icon.axis != "3D"){
			icon.onclick = function(){ 
				if (that.frameViewer.frames.length > 0){
					console.log("clicking", this.axis)
					that.frameViewer.loadFramesByAxis(this.axis, that.axisIcons)
				}; 
			};		
		}	
		
		
			
	}

	
}

//******************************************************
//  Fill in metadata -- this will likely change as it gets 
//  deployed to the web...
//******************************************************
scanViewer.prototype.populateData = function(data){	
	var that = this;


	//----------------------------------
	// DATA: VIEW TYPE DATA
	//----------------------------------
	function makeDisplayableData(labelObj){
		/*
		var counter = 0;
		for (i in labelObj){
//			console.log(labelObj[i])
			var noSpace = labelObj[i]["label"].replace(/\s+/g, ' ');
			var currTop = (that.textCSS_small.fontSize * (2.5*counter+1) + 30);
			that.displayableData[noSpace] = __makeElement__("div", that.scanTabs.getTab("View Type"), that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace]).css(__mergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 15
			}));
			that.displayableData[noSpace].innerHTML = labelObj[i].label;		

			that.displayableData[noSpace + "_dropdown"] = __makeElement__("select", that.scanTabs.tabs[0], that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace + "_dropdown"]).css(__mergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 110,
				width: "10em",
				backgroundColor: "rgba(0,0,0,0)",
				borderWidth: 1,
				borderColor: Globals.semiactiveLineColor
			}));	
			
			
			for (var j=0;j<labelObj[i]["option"].length;j++){
				that.displayableData[noSpace + "_dropdown"].innerHTML += "<option>" + labelObj[i]["option"][j] + "</option>";
			}
			

			//----------------------------------
			// When dropdown is Change the axis of the frames
			//----------------------------------			
			if (labelObj[i].label.indexOf("View") != -1){
				var dd = that.displayableData[noSpace + "_dropdown"];
				dd.innerHTML = "<option>" + "sagittal" + "</option>";
				dd.innerHTML += "<option>" + "axial" + "</option>";
				dd.innerHTML += "<option>" + "coronal" + "</option>";
				
				dd.onchange = function(){
					that.frameViewer.loadFramesByAxis(dd.value)
					//console.log(dd.value);
				}				
			}

			
			counter++;
		}
		*/
	}
	
	//makeDisplayableData(data.viewTypeData);
	//populateTab_ViewType();

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

		var contents = __makeElement__("div", that.sessionInfoScrollGallery.scrollContent, that.args.id + "_contents");
		var counter = 0;
		for (i in labelObj){
			var noSpace = labelObj[i]["label"].replace(/\s+/g, ' ');			
			var currTop = (that.textCSS_small.fontSize * (2*counter));
			that.displayableData[noSpace] = __makeElement__("div", contents, that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace]).css(__mergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 15
			}));
			that.displayableData[noSpace].innerHTML = labelObj[i].label + ":";		

			that.displayableData[noSpace + "_value"] = __makeElement__("div", contents, that.args.id + "_value_" + noSpace);
			$(that.displayableData[noSpace + "_value"]).css(__mergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 160,
			}));	
			that.displayableData[noSpace + "_value"].innerHTML = labelObj[i]["value"][0]
			counter++;
		}
		
		contents.style.height = __toPx__(currTop + 300);
		that.sessionInfoScrollGallery.setContents(contents);
	}
	// NOTE:  Ajax query would be here
	makeSessionInfoData(data.sessionInfo);
}
