//goog.provide('goog.fx.dom');
//goog.provide('goog.fx.AnimationQueue');


Modal.prototype.animateModal  = function (callback) {
		
		var that = this;
		var modalDims = this.modalDims();
		var animQueue = new goog.fx.AnimationParallelQueue();

				
		
		function slide(el, a, b, duration) {
			return new goog.fx.dom.Slide(el, [el.offsetLeft, el.offsetTop], 
					   		[a, b], duration, goog.fx.easing.easeOut);
		}
				
				
				
		function resize(el, a, b, duration) {			
			return new goog.fx.dom.Resize(el, [el.offsetWidth, el.offsetHeight], 
							[a, b], duration, goog.fx.easing.easeOut);
		} 
      	
      	
      	
      	//-----------------------
      	// MODAL
      	//-----------------------
      	animQueue.add(resize(this.modal, modalDims.width, 
      						 modalDims.height, GLOBALS.animMed));
      	animQueue.add(slide(this.modal, modalDims.left, 
      						 modalDims.top, GLOBALS.animMed));
      	
      	
      	
      	//-----------------------
      	// CLOSE BUTTON
      	//-----------------------
		animQueue.add(slide(this.closeButton, modalDims.closeButton.left, 
							modalDims.closeButton.top, GLOBALS.animMed));



		//-----------------------
		// VIEWERS
		//-----------------------
		XV.Viewers( function (Viewer, i, j) { 

			animQueue.add(slide(Viewer.widget, modalDims.Viewer.lefts[i][j], 
								modalDims.Viewer.tops[i][j], GLOBALS.animMed));	
			animQueue.add(resize(Viewer.widget, modalDims.Viewer.width, 
								modalDims.Viewer.height, GLOBALS.animMed));	
			
		})



		//-----------------------
		// ROW + COLUMN MENU
		//-----------------------
		utils.array.forEach(['ColumnMenu', 'RowMenu'], function(menuType) {
			utils.array.forEach(goog.dom.getElementsByClass(menuType), function(menuElt) {
	
				animQueue.add(slide(menuElt, modalDims[menuType].left, 
									modalDims[menuType].top, GLOBALS.animMed));	
	
			})
		})
		

		
		//-----------------------
		// ANIM END
		//-----------------------
		goog.events.listen(animQueue, 'end', function() {
			//
			//  Update + trickle down modalCSS
			//
			that.updateCSS();
			//
			// Fade in new viewers
			//
			XV.Viewers( function (Viewer, i, j) { 
				if (Viewer.widget.style.opacity == 0) {
					utils.fx.fadeIn(Viewer.widget, GLOBALS.animFast);
				}
			})
			//
			// run callback
			//
			if (callback) { callback() };
		})
		
		
		
		
		
		
		animQueue.play();
}