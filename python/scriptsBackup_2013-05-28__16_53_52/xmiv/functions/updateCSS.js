//******************************************************
//  Update CSS.
//
//******************************************************
XMIV.prototype.updateCSS = function (args) {

	
	var that = this;
	
	
    //----------------------------------
	//	RESIZE THE MODAL
	//----------------------------------
	modalDims = this.modalDims();
	$(this.modal).css(modalDims);	
	if(args) {$(this.modal).css(args);}	
	
	
	
	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	this.ScrollGallery.updateCSS(modalDims.ScrollGallery);


 
 	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------		
	for (var i in this.ScanViewers) {
		for (var j in this.ScanViewers[i]) { 
			
			if (this.ScanViewers[i][j]) {
				
				this.ScanViewers[i][j].updateCSS({
					height: modalDims.ScanViewer.height,// - this.args.marginTop*2,
					width: modalDims.ScanViewer.width,
					left: modalDims.ScanViewer.lefts[i][j],
					top: modalDims.ScanViewer.tops[i][j],
				});				
			} 
		}  
	} 
	
	
	
	//----------------------------------
	//	SELECTOR BOXES
	//----------------------------------		
	for (var i in this.ScanViewers) {
		for (var j in this.ScanViewers[i]) { 
			
			if (this.ScanViewers[i][j].selectorBox) {
				
				__setCSS__(this.ScanViewers[i][j].selectorBox, {
					height: modalDims.ScanViewer.height,// - this.args.marginTop*2,
					width: modalDims.ScanViewer.width,
					left: modalDims.ScanViewer.lefts[i][j],
					top: modalDims.ScanViewer.tops[i][j],
				});				
			} 
		}  
	} 
    
	
		
	//----------------------------------
	//	CLOSE BUTTON
	//----------------------------------
	__setCSS__(this.closeButton, modalDims.closeButton);		

	
	
	
	//----------------------------------
	//	HORIZONTAL EXPAND BUTTON
	//----------------------------------
	if (this.horizontalExpandButtons) {		
		for (var i in this.horizontalExpandButtons) {	
			
			$(this.horizontalExpandButtons[i]).css({
				left: modalDims["horizontalExpandButtons"].left,
				height: modalDims.height - Globals.expandButtonWidth,
				top: modalDims["horizontalExpandButtons"].tops[i][0],
				width: Globals.expandButtonWidth
			})
					
		}		
	}	
	
	
	
	//----------------------------------
	//	VERTICAL EXPAND BUTTONS
	//----------------------------------
	if (this.verticalExpandButtons) {
		for (var i in this.verticalExpandButtons) {
			
			$(this.verticalExpandButtons[0]).css({
				left:  modalDims.ScanViewer.lefts[0][0],
				height: Globals.expandButtonWidth,
				width: modalDims.width - modalDims.ScanViewer.lefts[0][0] - Globals.expandButtonWidth,
				top: modalDims.height - Globals.expandButtonWidth,
			});	
	
		}	
	}	
}
