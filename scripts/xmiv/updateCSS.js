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
	for (var i=0; i<__numRows__(this.scanViewers); i++){	
		for (var j=0; j<__numColumns__(this.scanViewers); j++){ 	 
			this.scanViewers[i][j].updateCSS({
				height: modalDims.scanViewer.height,// - this.args.marginTop*2,
				width: modalDims.scanViewer.width,
				left: modalDims.scanViewer.lefts[i][j],
				top: modalDims.scanViewer.tops[i][j],
			});
		}  
	} 
    
	
		
	//----------------------------------
	//	CSS: CLOSE BUTTON
	//----------------------------------
	__setCSS__(this.closeButton, modalDims.closeButton);		

	
	
	
	//----------------------------------
	//	CSS: HORIZONTAL EXPAND BUTTON
	//----------------------------------
	if (this.horizontalExpandButton){
		$(this.horizontalExpandButton).css({
			left:  modalDims["width"] - Globals.expandButtonWidth,
			height: "100%",
			top: 0,
			width: Globals.expandButtonWidth
		})			
	}	
	
	
	
	//----------------------------------
	//	CSS: VERTICAL EXPAND BUTTONS
	//----------------------------------
	if (this.verticalExpandButtons){
		for (var i=0; i<__numRows__(this.scanViewers); i++){	
			for (var j=0; j<__numColumns__(this.scanViewers); j++){ 
					$(this.verticalExpandButtons[i][j]).css({
						left:  $(this.scanViewers[i][j].widget).position().left,
						height: Globals.expandButtonWidth,
						width: $(this.scanViewers[i][j].widget).width(),
						top: $(this.modal).height() - Globals.expandButtonWidth,
					})	
				}	
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
