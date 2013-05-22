//******************************************************
//  Update CSS.
//
//******************************************************
xmiv.prototype.updateCSS = function(args){

	
	var that = this;
	
	
    //----------------------------------
	//	RESIZE THE MODAL
	//----------------------------------
	modalDims = this.modalDims();
	$(this.modal).css(modalDims);	
	if(args){$(this.modal).css(args);}	
	
	
	
	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	this.scrollGallery.updateCSS(modalDims.scrollGallery);


 
 	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------		
	for (var i in this.scanViewers){
		for (var j in this.scanViewers[i]){ 
			
			if (this.scanViewers[i][j]){
				
				this.scanViewers[i][j].updateCSS({
					height: modalDims.scanViewer.height,// - this.args.marginTop*2,
					width: modalDims.scanViewer.width,
					left: modalDims.scanViewer.lefts[i][j],
					top: modalDims.scanViewer.tops[i][j],
				});				
			} 
		}  
	} 
	
	
	
	//----------------------------------
	//	SELECTOR BOXES
	//----------------------------------		
	for (var i in this.scanViewers){
		for (var j in this.scanViewers[i]){ 
			
			if (this.scanViewers[i][j].selectorBox){
				
				__setCSS__(this.scanViewers[i][j].selectorBox, {
					height: modalDims.scanViewer.height,// - this.args.marginTop*2,
					width: modalDims.scanViewer.width,
					left: modalDims.scanViewer.lefts[i][j],
					top: modalDims.scanViewer.tops[i][j],
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
	if (this.horizontalExpandButtons){		
		for (var i in this.horizontalExpandButtons){	
			
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
	if (this.verticalExpandButtons){
		for (var i in this.verticalExpandButtons){
			
			$(this.verticalExpandButtons[0]).css({
				left:  modalDims.scanViewer.lefts[0][0],
				height: Globals.expandButtonWidth,
				width: modalDims.width - modalDims.scanViewer.lefts[0][0] - Globals.expandButtonWidth,
				top: modalDims.height - Globals.expandButtonWidth,
			});	
	
		}	
	}	
}
