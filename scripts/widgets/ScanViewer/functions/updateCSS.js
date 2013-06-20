//******************************************************
//  UpdateCSS
//
//******************************************************
ScanViewer.prototype.updateCSS = function (args) {


	var that = this;
	
	var widgetDims = utils.css.dims(this.widget)
	var widgetHeight = (args && args.height) ? args.height : widgetDims['height'];
	var widgetWidth = (args && args.width) ? args.width : widgetDims['width'];
	var widgetTop = (args && args.top) ? args.top : widgetDims['top'];
	var widgetLeft = (args && args.left) ? args.left : widgetDims['left'];


	
	
	/*
	 * CONTENT DIVIDER
	 * 
	 * The ContentDivider dictates the position of all of the
	 * other widgets in the ScanViewer
	 */
	
	//  Onload case: this only happens once


	if (!this.ContentDivider.widget.dragging) {

		var dimChange = !(utils.css.dims(this.ContentDivider.containmentDiv, 'width') === widgetWidth);
		if (dimChange) {

			utils.css.setCSS(this.ContentDivider.widget, {
				top: GLOBALS.minContentDividerTop(widgetHeight)
			});
			
			
			var t = GLOBALS.minFrameViewerHeight		
			
			var h = widgetHeight - t - utils.css.dims(this.ContentDivider.widget, 'height') - GLOBALS.minScanTabHeight + 5;	
			
			utils.css.setCSS(this.ContentDivider.containmentDiv, {
				top: t,			
				left: 0,
				height: h,
				width: widgetWidth	
			})
			
		}
	}

	
	
	
	
	var cDivDims = utils.css.dims(this.ContentDivider.widget);
	var contentDividerPos = cDivDims['position'];
	var contentDividerHeight = cDivDims['height'];
	
	var scanTabTop = contentDividerPos.top + contentDividerHeight;
	var scanTabHeight = widgetHeight - scanTabTop;
	var sliderTop = contentDividerPos.top - utils.css.dims(this.FrameSlider.getWidget(), 'height') - 5;
	
	var tempWidth = sliderTop - 10;
	if (tempWidth > widgetWidth) {
		tempWidth = widgetWidth;
		this.viewerSubtractor = sliderTop - tempWidth
	}
	
	var viewerWidth = sliderTop - this.viewerSubtractor;
	var viewerHeight = viewerWidth;
	var viewerLeft = widgetWidth/2 - viewerWidth/2;


	//----------------------------------
	// Widget
	//----------------------------------
	utils.css.setCSS(this.widget, {
		width: widgetWidth,
		height: widgetHeight,
		top: widgetTop,
		left: widgetLeft,
		overflow: "hidden",
		border: this.args.CSS.border,
	});

	
	//----------------------------------
	// Tabs
	//----------------------------------	
	utils.css.setCSS(this.ScanTabs.widget, {
 		left: 0,//marginLeft,
 	  	top: scanTabTop,
 	  	width: widgetWidth - 2,// + marginLeft * 2,
 	  	height: scanTabHeight -1
	});
   this.ScanTabs.updateCSS();


	//----------------------------------
	// CSS: FRAME SLIDER
	//----------------------------------	
    utils.css.setCSS(this.FrameSlider.getWidget(), { 
 		top : sliderTop,
    })
	
	
	 
	 //----------------------------------
	 // CSS: FRAME VIEWER
	 //----------------------------------
	 utils.css.setCSS(this.FrameViewer.widget, {
 	    left: viewerLeft,
 		top: 0,
 	  	width: viewerWidth,
 	  	height: viewerWidth
	 });
	 this.FrameViewer.updateCSS();
	 



	 //----------------------------------
	 // CSS: FRAME NUMBER DISPLAY
	 //----------------------------------	 
	 utils.css.setCSS(this.displayableData.frameNumber, {
	 	top: utils.css.dims(this.FrameViewer.widget, 'height') - 20,// -2,
	 	left: 10
	 });
	 
	 

	//----------------------------------
	// DRAW FRAME ON FRAMEVIEWER
	//----------------------------------	
	/*
	 * For redraw purposes incase the size of the 
	 * frame viewer changes, programatically triggers a slide.
	 */
	this.FrameSlider.dispatchEvent(goog.ui.Component.EventType.CHANGE);



	//----------------------------------
	// LINK MENU
	//----------------------------------		
	utils.css.setCSS(this.LinkMenu, {
		left: widgetWidth - 30
	});	 
}