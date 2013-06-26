Modal.prototype.animateModal  = function (callback) {
		
		var that = this;
		
		
		//-------------------------
		//  GET THE MODAL DIMENSIONS, 
		//-------------------------	
		 var modalDims = this.modalDims();
		
		
		
		//-------------------------
		// Animate the window
		//-------------------------	
		 $(this.modal).stop().animate({
		 	
		    width: modalDims.width,
		    left: modalDims.left,
		    height: modalDims.height,
		    top: modalDims.top
		    
		  }, GLOBALS.animMed, function () {

		    $.when(that.updateCSS()).then(function () {
				
				$.when(callback()).then(function () { 
					
					XV.Viewers( function (ViewerBox) { 	

						$(ViewerBox.widget).stop().fadeTo(0, 1);
						$(ViewerBox.widget.childNodes).stop().fadeTo(0, 1);	
						//ViewerBox.setJQueryEvents();
					
					}); 						
					
					
				});
			  	    	
		    });
		
		 });




		//-------------------------
		// SCAN VIEWERS
		//-------------------------	
		
		XV.Viewers( function (ViewerBox, i, j) { 
			//$(ViewerBox.widget).stop().fadeTo( GLOBALS.animMed, 0);
			
			//
			// FADE OUT/IN: ViewerBox contents
			//
			 if (modalDims.ViewerBox.height !== utils.convert.toInt(ViewerBox.widget.style.height)) {
			 	$(ViewerBox.widget.childNodes).stop().fadeTo(GLOBALS.animFast, 0);	
			 }
			 

			//
			// ANIMATE: ViewerBox widget
			//
			
			/*
			 $(ViewerBox.widget).draggable( "destroy").unbind().stop().animate({
			    
			    left: modalDims.ViewerBox.lefts[i][j],
			    top: modalDims.ViewerBox.tops[i][j],
			    width: modalDims.ViewerBox.width,
			    height: modalDims.ViewerBox.height
			    
			  }, GLOBALS.animMed, function () {	});	
			  */	
			  		
		})
		

	

		//-------------------------
		// Animate the close button
		//-------------------------		
		 $(this.closeButton).stop().animate({
		    left: modalDims.closeButton.left,
		    top: modalDims.closeButton.top
		  }, GLOBALS.animMed, function () {
		    // Animation complete.
		 })
		
}