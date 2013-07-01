goog.require('goog.dom');
goog.require('goog.fx');
goog.require('goog.fx.dom');
goog.require('goog.fx.AnimationQueue');


Modal.prototype.animateModal  = function (callback) {
		
		var that = this;
		
		
		//-------------------------
		//  GET THE MODAL DIMENSIONS, 
		//-------------------------	
		 var modalDims = this.modalDims();
		
		function slide(el, a, b, duration) {
			var x = el.offsetLeft;
			var y = el.offsetTop;
			var anim = new goog.fx.dom.Slide(el, [x, y], [a, b], duration, goog.fx.easing.easeOut);
			goog.events.listen(anim, goog.fx.Transition.EventType.BEGIN, function(){

			});
			goog.events.listen(anim, goog.fx.Transition.EventType.END, function(){

			});
			anim.play();
		}
				
		function resize(el, a, b, duration) {
			
			var w = el.offsetWidth;
			var h = el.offsetHeight;
			var anim = new goog.fx.dom.Resize(el, [w, h], [a, b], duration, goog.fx.easing.easeOut);
			
			goog.events.listen(anim, goog.fx.Transition.EventType.BEGIN, function() {
				
			});
			goog.events.listen(anim, goog.fx.Transition.EventType.END, function() {
				that.updateCSS();
				callback();
			});
			anim.play();
		}
      
      	resize(this.modal, modalDims.width, modalDims.height, GLOBALS.animMed);
      	slide(this.modal, modalDims.left, modalDims.top, GLOBALS.animMed);


		//-------------------------
		// SCAN VIEWERS
		//-------------------------	
		
		XV.Viewers( function (Viewer, i, j) { 
			//
			// FADE OUT/IN: Viewer contents
			//
			 if (modalDims.Viewer.height !== utils.convert.toInt(Viewer.widget.style.height)) {
			 	utils.fx.fadeTo(Viewer.widget.childNodes, GLOBALS.animFast, 0);	
			 }		
		})
		

	

		//-------------------------
		// Animate the close button
		//-------------------------		
		 slide(this.closeButton, 
		 	   modalDims.closeButton.left, 
		 	   modalDims.closeButton.top, 
		 	   GLOBALS.animMed)
		
}