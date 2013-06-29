//******************************************************
//  UpdateCSS
//
//******************************************************
ViewerBox.prototype.updateCSS = function (args) {


	var that = this;
	
	var widgetDims = utils.css.dims(this.widget);

	var widgetHeight = (args && args.height) ? args.height : widgetDims['height'];
	var widgetWidth = (args && args.width) ? args.width : widgetDims['width'];
	var widgetTop = (args && args.top) ? args.top : widgetDims['top'];
	var widgetLeft = (args && args.left) ? args.left : widgetDims['left'];


	//
	//  CONTENT DIVIDER
	//
	// The ContentDivider dictates the position of all of the
	// other widgets in the ViewerBox
	
	
	//
	//  Onload case: this only happens once.
	//
	if (!this.ContentDivider.dragging) {
		
		//
		//  If there's a change in the width of the widget, proceed
		//
		var dimChange = !(utils.css.dims(this.ContentDivider.containmentDiv, 'width') === widgetWidth);
		if (dimChange) {

			//
			//  Determine the top of the content divider and its containment
			//
			var t = GLOBALS.minFrameViewerHeight;		
			var h = widgetHeight - t - utils.css.dims(this.ContentDivider.widget, 'height') - GLOBALS.minScanTabHeight + 5;	
			
			utils.css.setCSS(this.ContentDivider.widget, {
				top: GLOBALS.minContentDividerTop(widgetHeight) - 1
			});
			
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
 	  	width: '100%',
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
	 	top: sliderTop - 15,// -2,
	 	left: 10,
	 	width: widgetWidth - 10,
	 	fontSize: GLOBALS.fontSizeSmall
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