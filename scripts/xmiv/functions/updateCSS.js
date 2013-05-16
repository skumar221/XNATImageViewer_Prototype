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
				height: modalDims["horizontalExpandButtons"].height,
				top: modalDims["horizontalExpandButtons"].tops[i][0],
				width: Globals.expandButtonWidth
			})		
		}		
	}	
	
	
	
	//----------------------------------
	//	VERTICAL EXPAND BUTTONS
	//----------------------------------
	if (this.verticalExpandButtons){
		for (var j = 0; j<this.verticalExpandButtons.length; j++){
			
			//console.log("VER EXPAND: ", j)
			var nullCount = 0;
			var i = 0;
			
			for (var k=0; k<this.scanViewers.length; k++){
				if (!arrayValueValid(this.scanViewers , k , j)) { 
					
					nullCount++;
					 
				}
				else { 
					
					i = k; 
					
				}
			}
			
			if (nullCount == this.scanViewers.length){
				
				throw "Encountered an error in updatecheck management of scanViewers"
				
			}
			

			$(this.verticalExpandButtons[j]).css({
				left:  $(this.scanViewers[i][j].widget).position().left,
				height: Globals.expandButtonWidth,
				width: $(this.scanViewers[i][j].widget).width(),
				top: $(this.modal).height() - Globals.expandButtonWidth,
			})	
		}
			
	}	
	
	
	
	//----------------------------------
	//	SCROLL LINKS
	//----------------------------------
	/*
	for (var i=0;i<this.scrollLinks.length;i++){
		__setCSS__(this.scrollLinks[i], {
			left: modalDims.scrollLink.lefts[i],
			top: modalDims.scrollLink.tops[i],
		})	
	}
	*/
	
}
