//******************************************************
//  UpdateCSS
//
//******************************************************
ScanViewerBox.prototype.updateCSS = function (args) {


	ScanViewerBox.superClass_.updateCSS.call(this, args);
	var that = this;
	

	//
	//  CONTENT DIVIDER
	//
	// The ContentDivider dictates the position of all of the
	// other widgets in the ScanViewerBox
	
	
	//
	//  Onload case: this only happens once.
	//
	if (!this.ContentDivider.dragging) {
		
		//
		//  If there's a change in the width of the widget, proceed
		//
		var dimChange = !(utils.css.dims(this.ContentDivider.containmentDiv, 'width') === this.widgetDims.width);
		if (dimChange) {

			//
			//  Determine the top of the content divider and its containment
			//
			var t = GLOBALS.minFrameViewerHeight;		
			var h = this.widgetDims.height - t - utils.css.dims(this.ContentDivider.widget, 'height') - GLOBALS.minScanTabHeight + 5;	
			
			utils.css.setCSS(this.ContentDivider.widget, {
				top: GLOBALS.minContentDividerTop(this.widgetDims.height) - 1
			});
			
			utils.css.setCSS(this.ContentDivider.containmentDiv, {
				top: t,			
				left: 0,
				height: h,
				width: this.widgetDims.width	
			})
			
		}
	}

	
	
	
	var cDivDims = utils.css.dims(this.ContentDivider.widget);
	var contentDividerHeight = cDivDims['height'];
	
	var scanTabTop = cDivDims.top + contentDividerHeight;
	var scanTabHeight = this.widgetDims.height - scanTabTop;
	var sliderTop = cDivDims.top - utils.css.dims(this.FrameSlider.getWidget(), 'height') - 5;
	
	var tempWidth = sliderTop - 10;
	if (tempWidth > this.widgetDims.width) {
		tempWidth = this.widgetDims.width;
		this.viewerSubtractor = sliderTop - tempWidth
	}
	
	var viewerWidth = sliderTop - this.viewerSubtractor;
	var viewerHeight = viewerWidth;
	var viewerLeft = this.widgetDims.width/2 - viewerWidth/2;




	
	
	
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
	 	width: this.widgetDims.width - 10,
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
		left: this.widgetDims.width - 30
	});	 
}