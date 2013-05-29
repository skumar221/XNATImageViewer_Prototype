//******************************************************
//  UpdateCSS
//
//******************************************************
ScanViewer.prototype.updateCSS = function (args) {


	var that = this;
	
	
	var widgetHeight = (args && args.height) ? args.height : $(this.widget).height();
	var widgetWidth = (args && args.width) ? args.width : $(this.widget).width();
	var widgetTop = (args && args.top) ? args.top : $(this.widget).position().top;
	var widgetLeft = (args && args.left) ? args.left : $(this.widget).position().left;

	
	/*
	 * CONTENT DIVIDER
	 * 
	 * The ContentDivider dictates the position of all of the
	 * other widgets in the ScanViewer
	 */
	
	//  Onload case: this only happens once


	if (!this.ContentDivider.widget.dragging){

		var dimChange = !(__toInt__(this.ContentDivider.containmentDiv.style.width) === widgetWidth);
		if (dimChange){

			$(this.ContentDivider.widget).css( {
				top: GLOBALS.minContentDividerTop(widgetHeight),
			});
			
			
			var t = GLOBALS.minFrameViewerHeight			
			var h = widgetHeight - t - $(this.ContentDivider.widget).height() - GLOBALS.minScanTabHeight + 5;			
			$(this.ContentDivider.containmentDiv).css({
				top: t,			
				left: 0,
				height: h,
				width: widgetWidth,			
			})
			
		}
	}

	
	
	
	
	
	var contentDividerPos = $(this.ContentDivider.widget).position();
	var contentDividerHeight = $(this.ContentDivider.widget).height();
	
	var scanTabTop = contentDividerPos.top + contentDividerHeight;
	var scanTabHeight = widgetHeight - scanTabTop;
	var sliderTop = contentDividerPos.top - this.frameSlider.currArgs().handleCSS.height - 5;
	
	var viewerWidth = sliderTop;
	var viewerHeight = viewerWidth;
	var viewerLeft = widgetWidth/2 - viewerWidth/2;
	
	



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
	$(this.ScanTabs.widget).css({
 		left: 0,//marginLeft,
 	  	top: scanTabTop,
 	  	width: widgetWidth - 2,// + marginLeft * 2,
 	  	height: scanTabHeight -1,
	});	 
   this.ScanTabs.updateCSS();





	


	


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
	 $(this.FrameViewer.widget).css({
 	    left: viewerLeft,
 		top: 0,
 	  	width: viewerWidth,
 	  	height: viewerWidth,
	 });
	 this.FrameViewer.updateCSS();
	 



	 //----------------------------------
	 // CSS: FRAME NUMBER DISPLAY
	 //----------------------------------	 
	 $(this.displayableData.frameNumber).css({
	 	top: $(this.FrameViewer.widget).height() -  20,// -2,
	 	left: 10,
	 });
	 
	 

	//----------------------------------
	// DRAW FRAME ON FRAMEVIEWER
	//----------------------------------
	 this.FrameViewer.drawFrame(this.frameSlider.value, true);
	 
	 
	 
	//----------------------------------
	// CLOSE BUTTON
	//----------------------------------		
	__setCSS__(this.closeButton, {
		top: 3,
		left: widgetWidth - __toInt__(this.closeButton.style.width) - 3,
	});
	


	//----------------------------------
	// LINK MENU
	//----------------------------------		
	__setCSS__(this.linkMenu, {
		left: widgetWidth - 30
	});
	 
	 
	 

}