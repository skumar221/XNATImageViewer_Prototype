XNATModalImageViewer.prototype.animateModal  = function (callback) {
		
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
		    top: modalDims.top,
		    
		  }, GLOBALS.animMed, function () {
			
			
		    $.when(that.updateCSS()).then(function(){
				if (typeof callback === 'function') {
					callback();
			  	}		    	
		    });
	
			
		 });




		//-------------------------
		// SCAN VIEWERS
		//-------------------------	
		XMIV.SCANViewers( function(ScanViewer, i, j) { 
			

			//
			// FADE OUT/IN: ScanViewer contents
			//
			 if (modalDims.ScanViewer.height != __toInt__(ScanViewer.widget.style.height)) {
			 	$(ScanViewer.widget.childNodes).stop().fadeTo(GLOBALS.animMed, 0).fadeTo(GLOBALS.animMed, 1);	
			 }
			 

			//
			// ANIMATE: ScanViewer widget
			//

			 $(ScanViewer.widget).draggable( "destroy").off().stop().animate({
			    
			    left: modalDims.ScanViewer.lefts[i][j],
			    top: modalDims.ScanViewer.tops[i][j],
			    width: modalDims.ScanViewer.width,
			    height: modalDims.ScanViewer.height,
			    
			  }, GLOBALS.animSlow, function () {	

			  	 XMIV.SCANViewers( function(ScanViewer) { 	

					ScanViewer.setJQueryEvents();
				
				 });  	
			 
			  });				
		});


	

		//-------------------------
		// Animate the close button
		//-------------------------		
		 $(this.closeButton).stop().animate({
		    left: modalDims.closeButton.left,
		    top: modalDims.closeButton.top
		  }, GLOBALS.animMed, function () {
		    // Animation complete.
		 });
		
}