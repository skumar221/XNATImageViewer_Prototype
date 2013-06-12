XNATViewer.prototype.animateModal  = function (callback) {
		
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

		    $.when(that.updateCSS()).then(function(){
				
				$.when(callback()).then(function() { 
					
					XV.ScanViewers( function(ScanViewer) { 	

						$(ScanViewer.widget).stop().fadeTo(0, 1);
						$(ScanViewer.widget.childNodes).stop().fadeTo(0, 1);	
						ScanViewer.setJQueryEvents();
					
					}); 						
					
					
				});
			  	    	
		    });
		
		 });




		//-------------------------
		// SCAN VIEWERS
		//-------------------------	
		
		XV.ScanViewers( function(ScanViewer, i, j) { 
			//$(ScanViewer.widget).stop().fadeTo( GLOBALS.animMed, 0);
			
			//
			// FADE OUT/IN: ScanViewer contents
			//
			 if (modalDims.ScanViewer.height != utils.convert.toInt(ScanViewer.widget.style.height)) {
			 	$(ScanViewer.widget.childNodes).stop().fadeTo(GLOBALS.animFast, 0);	
			 }
			 

			//
			// ANIMATE: ScanViewer widget
			//

			 $(ScanViewer.widget).draggable( "destroy").unbind().stop().animate({
			    
			    left: modalDims.ScanViewer.lefts[i][j],
			    top: modalDims.ScanViewer.tops[i][j],
			    width: modalDims.ScanViewer.width,
			    height: modalDims.ScanViewer.height
			    
			  }, GLOBALS.animMed, function () {	});		
			  		
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