XNATModalImageViewer.prototype.animateModalChange = function (animLen, callbacks) {
		
		var that = this;
		
		if (!animLen && animLen != 0) { var animLen = 500; }
		
		
		
		//-------------------------
		//  GET THE MODAL DIMENSIONS, 
		//-------------------------	
		 var modalDims = this.modalDims();




		//-------------------------
		//  CHECK TO SEE IF THE VIEWERS ARE TOO SMALL 
		//-------------------------	

		
		
		
		
		//-------------------------
		// Animate the window
		//-------------------------	
		 $(this.modal).stop().animate({
		 	
		    width: modalDims.width,
		    left: modalDims.left,
		    height: modalDims.height,
		    top: modalDims.top,
		    
		  }, animLen, function () {

		    that.updateCSS();
			if (callbacks && callbacks.modal && callbacks.modal.length > 0) {
		  		for (i in callbacks.modal) { callbacks.modal[i](that); }
		  	}	
			
		 });




		//-------------------------
		// SCAN VIEWERS
		//-------------------------	
		XMIV.SCANViewers( function(ScanViewer, i, j) { 
			

			//
			// FADE OUT/IN: ScanViewer contents
			//
			 if (modalDims.ScanViewer.height != __toInt__(ScanViewer.widget.style.height)) {
			 	$(ScanViewer.widget.childNodes).stop().fadeTo(animLen, 0).fadeTo(animLen, 1);	
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
		  }, animLen, function () {
		    // Animation complete.
		 });
		 
		 		
		 		
		 		
		//-------------------------
		// Animate the horizontal expand button
		//-------------------------	
		 $(this.horizontalExpandButtons).stop().fadeOut(animLen, 0).fadeIn(animLen);	
		 
		 
		 
		//-------------------------
		// Animate the vertical expand buttons
		//-------------------------		
		 $(this.verticalExpandButtons).stop().fadeOut(animLen, 0).fadeIn(animLen);		
		
		
}