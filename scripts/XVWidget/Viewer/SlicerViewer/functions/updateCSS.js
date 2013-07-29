goog.require('SlicerViewer');
goog.provide('SlicerViewer.updateCSS');
//******************************************************
//  UpdateCSS
//******************************************************
SlicerViewer.prototype.updateCSS = function (args) {
	SlicerViewer.superClass_.updateCSS.call(this, args);

	var that = this;
	

	//
	//  CONTENT DIVIDER
	//
	// The ContentDivider dictates the position of all of the
	// other widgets in the SlicerViewer
	
	
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
			var t = XVGlobals.minFrameHolderHeight;	
			
			var h = this.widgetDims.height - t - utils.css.dims(this.ContentDivider.widget, 'height') - XVGlobals.minScanTabHeight + 5;	
			
			utils.css.setCSS(this.ContentDivider.widget, {
				top: XVGlobals.minContentDividerTop(this.widgetDims.height) - 1
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

	var threeDHolderDims = {};
	threeDHolderDims.width = ((cDivDims.top - 15) > this.widgetDims.width) ? 
							this.widgetDims.width : (cDivDims.top - 15);
//	threeDHolderDims.height = this.widgetDims.height - scanTabHeight;
	threeDHolderDims.height = threeDHolderDims.width;
	threeDHolderDims.top = 0;
	threeDHolderDims.left = this.widgetDims.width/2 - threeDHolderDims.width/2;


	
	//----------------------------------
	// TABS
	//----------------------------------	
	this.ScanTabs.updateCSS({
		left: 0,//marginLeft,
		top: scanTabTop,
		width: '100%'
	});
	
    
    //----------------------------------
	// FRAME VIEWER
	//----------------------------------
	this.ThreeDHolder.updateCSS({
		
 	    left: threeDHolderDims.left,
        top: threeDHolderDims.top,
 	 	width: threeDHolderDims.width,
 	  	height: threeDHolderDims.height
 	  	
	});
	 


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
goog.exportProperty(SlicerViewer.prototype, 'updateCSS', SlicerViewer.prototype.updateCSS);