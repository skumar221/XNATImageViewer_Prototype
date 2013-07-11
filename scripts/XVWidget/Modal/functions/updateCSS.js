//******************************************************
//  Update CSS.
//
//******************************************************
Modal.prototype.updateCSS = function (args) {

	
	var that = this;


	
    //----------------------------------
	//	RESIZE THE MODAL
	//----------------------------------

	modalDims = this.modalDims();

	utils.css.setCSS( this.modal, modalDims);	
	if (args) {  utils.css.setCSS( this.modal, args);}	
	

	
	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	
	if (this.ScrollGallery) { 
		this.ScrollGallery.updateCSS(modalDims.ScrollGallery);
	}
	


 
 	//----------------------------------
	//	VIEWERS
	//----------------------------------	
	if (XV) {
		XV.ViewerManager( function (Viewer, i, j) { 

			Viewer.updateCSS({
				
				height: modalDims.Viewer.height,// - this.args.marginTop*2,
				width: modalDims.Viewer.width,
				left: modalDims.Viewer.lefts[i][j],
				top: modalDims.Viewer.tops[i][j]
				
			});	
			
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
		
		utils.css.setCSS( this.ColumnMenu, {
			
			top: modalDims["ColumnMenu"].top,
			left: modalDims["ColumnMenu"].left,
			height: modalDims["ColumnMenu"].height,
			width: modalDims["ColumnMenu"].width				
				
		})

		
		//----------------------------------
		//	VERTICAL EXPAND BUTTONS
		//----------------------------------
		utils.css.setCSS( this.RowMenu, {
			
			top: modalDims["RowMenu"].top,
			left: modalDims["RowMenu"].left,
			height: modalDims["RowMenu"].height,
			width: modalDims["RowMenu"].width				
				
		})		
		
	}
	
	
}
