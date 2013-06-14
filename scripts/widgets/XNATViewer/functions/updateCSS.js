//******************************************************
//  Update CSS.
//
//******************************************************
XNATViewer.prototype.updateCSS = function (args) {

	
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
	if (this.ScrollGallery) { 
		this.ScrollGallery.updateCSS(modalDims.ScrollGallery);
	}


 
 	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------	
	if (XV) {
		XV.Viewers( function(ScanViewer, i, j) { 
					
			XV.Viewers( function(ScanViewer) { 	
	
				$(ScanViewer.widget).stop().fadeTo(0, 1);
				$(ScanViewer.widget.childNodes).stop().fadeTo(0, 1);
			});
			
			ScanViewer.updateCSS({
				
				height: modalDims.ScanViewer.height,// - this.args.marginTop*2,
				width: modalDims.ScanViewer.width,
				left: modalDims.ScanViewer.lefts[i][j],
				top: modalDims.ScanViewer.tops[i][j]
				
			});	
			
			if (ScanViewer.selectorBox) {
				
				utils.css.setCSS(ScanViewer.selectorBox, {
					height: modalDims.ScanViewer.height,// - this.args.marginTop*2,
					width: modalDims.ScanViewer.width,
					left: modalDims.ScanViewer.lefts[i][j],
					top: modalDims.ScanViewer.tops[i][j]
				});				
			} 	
			
		}); 		
	}	


    
	
		
	//----------------------------------
	//	CLOSE BUTTON
	//----------------------------------
	if (this.closeButton) {
		utils.css.setCSS(this.closeButton, modalDims.closeButton);		
	}
	

	
	
	
	//----------------------------------
	//	HORIZONTAL EXPAND BUTTON
	//----------------------------------
	if (this.ColumnMenu && this.RowMenu) {
		
		$(this.ColumnMenu).css({
			
			top: modalDims["ColumnMenu"].top,
			left: modalDims["ColumnMenu"].left,
			height: modalDims["ColumnMenu"].height,
			width: modalDims["ColumnMenu"].width				
				
		})

		
		//----------------------------------
		//	VERTICAL EXPAND BUTTONS
		//----------------------------------
		$(this.RowMenu).css({
			
			top: modalDims["RowMenu"].top,
			left: modalDims["RowMenu"].left,
			height: modalDims["RowMenu"].height,
			width: modalDims["RowMenu"].width				
				
		})		
		
	}

}
