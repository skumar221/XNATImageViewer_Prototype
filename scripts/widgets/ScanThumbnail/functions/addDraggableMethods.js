ScanThumbnail.prototype.addDraggableMethods = function () {
	
	var that = this;
	
	function revertBorders () {
		//
		// Revert viewer borders back to original
		//
		var viewers = GLOBALS.XMIV.SCANViewers("widgets");
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
			var modal = GLOBALS.XMIV.widget;
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
					
					this.targetId = undefined;
					var collidables = $(this).collision(GLOBALS.XMIV.SCANViewers("widgets"));
					
					for (var i=0; i<collidables.length; i++) {
						
						revertBorders(); 
						
						var collideDiv = $(this).collision(collidables[i], {as : "<div />"});	
						var collisionArea = $(collideDiv).width() * $(collideDiv).height()
						var draggableArea = $(this).height() * $(this).width();
												
						if (collisionArea/draggableArea > .6){
				
							$(collidables[i]).mouseenter();
							
							if (!collidables[i].prevBorder) {
								collidables[i].prevBorder = collidables[i].style.border;	
							}
							
							collidables[i].style.border = "solid rgba(255,255,255,1) 1px"
							this.targetId = collidables[i].id;							
						}
						
						
					}
				},
				
				stop: function () {
					
					var clone = this;
					
					function destroy() {					
						clone.parentNode.removeChild(clone);
						that.widget.clone = undefined;						
					}

					
					revertBorders();					
					
					if (!this.targetId) {
						
						//  Fly back to original position
						$(this).animate({
							top: offset.top,
							left: offset.left
						}, GLOBALS.animFast, function() {
							destroy();
						})		
										
					}
					else {
						
						// Load the thumbnail into the ScanViewer
						GLOBALS.XMIV.ScanViewer(this.targetId).FrameViewer.loadDroppable(that);
						destroy();
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