//******************************************************
//  Update CSS.
//
//******************************************************
xmiv.prototype.updateCSS = function(args){

	

    //----------------------------------
	//	CSS: RESIZE THE MODAL
	//----------------------------------
	modalDims = this.modalDims();
	$(this.modal).css(modalDims);	
	if(args){$(this.modal).css(args);}	
	
	
	
	//----------------------------------
	//	CSS: SCROLL GALLERY
	//----------------------------------
	this.scrollGallery.updateCSS(modalDims.scrollGallery);


 
 	//----------------------------------
	//	CSS: SCAN VIEWERS
	//----------------------------------		
	for (var i=0; i<this.scanViewers.length; i++){	
		for (var j=0; j<this.scanViewers[i].length; j++){ 	
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
	//	CSS: CLOSE BUTTON
	//----------------------------------
	__setCSS__(this.closeButton, modalDims.closeButton);		

	
	
	
	//----------------------------------
	//	CSS: HORIZONTAL EXPAND BUTTON
	//----------------------------------
	if (this.horizontalExpandButtons){
		for (var i=0; i<this.horizontalExpandButtons.length; i++){
			$(this.horizontalExpandButtons[i]).css({
				left: modalDims["horizontalExpandButtons"].left,
				height: modalDims["horizontalExpandButtons"].height,
				top: modalDims["horizontalExpandButtons"].tops[i][0],
				width: Globals.expandButtonWidth
			})		
		}		
	}	
	
	
	
	//----------------------------------
	//	CSS: VERTICAL EXPAND BUTTONS
	//----------------------------------
	if (this.verticalExpandButtons){
		for (var j=0; j<this.verticalExpandButtons.length; j++){
				
			var nullCount = 0;
			var i = 0;
			for (var k=0; k<this.scanViewers.length; k++){
				if (!this.scanViewers[k][j]) { nullCount++; }
				else { i = k; }
			}
			
			if (nullCount == this.scanViewers.length){
				throw "Encountered an error in updateCSS: check management of scanViewers"
			}
			
			
			console.log("vertical expand css i: ", i, " j:", j);
			$(this.verticalExpandButtons[j]).css({
				left:  $(this.scanViewers[i][j].widget).position().left,
				height: Globals.expandButtonWidth,
				width: $(this.scanViewers[i][j].widget).width(),
				top: $(this.scanViewers[i][j].widget).position().top + $(this.scanViewers[i][j].widget).height(),// - Globals.expandButtonWidth,
			})	
		}
			
	}	
	
	
	
	//----------------------------------
	//	CSS: SCROLL LINKS
	//----------------------------------
	for (var i=0;i<this.scrollLinks.length;i++){
		__setCSS__(this.scrollLinks[i], {
			left: modalDims.scrollLink.lefts[i],
			top: modalDims.scrollLink.tops[i],
		})	
	}
	
	
}
