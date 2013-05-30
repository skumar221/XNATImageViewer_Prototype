ScanThumbnail.prototype.addDraggableMethods = function () {
	
	var that = this;
	
	function revertBorders () {
		//
		// Revert viewer borders back to original
		//
		var viewers = $("div[id*=" + "ScanViewer" + "]");;
		for (var i=0; i<viewers.length; i++){
			if (viewers[i].prevBorder){

				viewers[i].style.border = viewers[i].prevBorder;
				viewers[i].prevBorder = undefined;
			}
			
		}
	}
	
	
	$(this.widget).bind('mousedown.drag', function(event) {
	
			
			//
			// Get modal dims
			//
			var modal = $(this).closest("div[id*=" + GLOBALS.ModalID + "]");
			var modalOffset = $(modal).offset();
	
			
			//
			// Create clone
			//
			this.clone = $(this).clone()[0]
			
			
			//
			// Append clone do document body
			//
			document.body.appendChild(this.clone);
			
			
			//
			// Set clone position to offset
			//
			var offset = $(this).offset();
			var pDims = [$(this).width(), $(this).height()];
			
			$(this.clone).css({
				
				top: offset.top,
				left: offset.left,
			
			
			//
			// Define clone draggable
			//
			}).draggable({
				
				opacity: .7, 
				
				containment: [ 
					modalOffset.left, 
					modalOffset.top, 
					modalOffset.left + $(modal).width() - pDims[0] -1, 
					modalOffset.top + $(modal).height() - pDims[1] -1
					
				],
				
				drag: function () {

					var viewers = $(this).collision("div[id*=" + "ScanViewer" + "]");
					this.viewerObj = undefined;
					
					if (viewers && viewers.length > 0){
						
						revertBorders();
						
						var currViewer = viewers[viewers.length -1];
						
						$(currViewer).mouseenter();
						
						if (!currViewer.prevBorder){
							currViewer.prevBorder = viewers[viewers.length -1].style.border;	
						}
						
						currViewer.style.border = "solid rgba(255,255,255,1) 1px"
						
						this.viewerObj = GLOBALS.getScanViewerById(currViewer.id);
						

					}
				},
				
				stop: function () {
					
					var clone = this;
					
					function destroy() {
						
						clone.parentNode.removeChild(clone);
						that.widget.clone = undefined;						
						
					}


					
					
					revertBorders();
					
					
					
					if (!this.viewerObj){
						$(this).animate({
							top: offset.top,
							left: offset.left
						}, GLOBALS.animFast, function() {
						
							destroy();
						})						
					}
					else{
						destroy();
						this.viewerObj.FrameViewer.loadDroppable(that);
					}
				}	
			});
			
			
			//
			// Programatically trigger mouseDown to initiate clone drag
			//
			$(this.clone).data("ui-draggable")._mouseDown(event);
		}
	)	
	
}