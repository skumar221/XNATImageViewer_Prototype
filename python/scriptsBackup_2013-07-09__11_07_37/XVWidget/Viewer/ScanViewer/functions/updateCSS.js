//******************************************************
//  UpdateCSS
//
//******************************************************
ScanViewer.prototype.updateCSS = function (args) {

	ScanViewer.superClass_.updateCSS.call(this, args);

	var that = this;
	

	//
	//  CONTENT DIVIDER
	//
	// The ContentDivider dictates the position of all of the
	// other widgets in the ScanViewer
	
	
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
			var t = GLOBALS.minFrameHolderHeight;	
			
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


	var frameHolderDims = {};
	frameHolderDims.width = ((sliderTop - 10) > this.widgetDims.width) ? 
							this.widgetDims.width : (sliderTop - 10);
	frameHolderDims.height = frameHolderDims.width;
	frameHolderDims.top = 0;
	frameHolderDims.left = this.widgetDims.width/2 - frameHolderDims.width/2;


	
	//----------------------------------
	// TABS
	//----------------------------------	
	this.ScanTabs.updateCSS({
		left: 0,//marginLeft,
		top: scanTabTop,
		width: '100%'
	});
	



	//----------------------------------
	// FRAME SLIDER
	//----------------------------------	
   this.FrameSlider.updateCSS({ 
 		top : sliderTop
    })
	
	
	
	 
	 //----------------------------------
	 // FRAME VIEWER
	 //----------------------------------
	 this.FrameHolder.updateCSS({
	 	
 	    left: frameHolderDims.left,
 		top: frameHolderDims.top,
 	  	width: frameHolderDims.width,
 	  	height: frameHolderDims.height
 	  	
	 });
	 



	 //----------------------------------
	 // FRAME NUMBER DISPLAY
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
	
	
	if (this.selectorBox) {
		
		utils.css.setCSS(this.selectorBox, {
			height: this.widgetDims.height,// - this.args.marginTop*2,
			width: this.widgetDims.widget,
			left: this.widgetDims.left,
			top: this.widgetDims.top
		});				
	} 	
}