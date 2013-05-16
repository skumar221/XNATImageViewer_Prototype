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
 	  	width: widgetWidth,
 	  	height: widgetWidth,
 	  	top: (sliderTop - widgetWidth)/2,
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