ScanThumbnail.prototype.addDraggableMethods = function () {
	
	var that = this;


	function destroy() {		
		if (that.widget.clone) {
			that.widget.clone.parentNode.removeChild(that.widget.clone);
			that.widget.clone = undefined;				
		}					
	}
					
						
	function revertBorders () {
		//
		// Revert viewer borders back to original
		//
		var viewers = XV.ScanViewers("widgets");
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
			var modal = XV.widget;
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
			
			
			this.clone.stopper = function () {
				var clone = this;

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
					var v = XV.ScanViewers(this.targetId);
					if (v) {

						v.FrameViewer.loadDroppable(that); 
						if (v.widget.prevBorder) {
							v.widget.style.border = v.widget.prevBorder;	
						}							
					}
					destroy();
				}
			}
			
			
			
			$(this.clone).css({
				
				top: offset.top,
				left: offset.left,
		
			})
			
			
			
			
			$(this.clone).bind('mouseup.drag', function(event) { 
				
				var clone = this;
				var v = XV.ScanViewers( function (ScanViewer, i, j) {
					
					if (i==0) {
						console.log(ScanViewer.widget.id)
						clone.targetId = ScanViewer.widget.id; 
					}
					
				});
				
				clone.stopper();

			})
			
			

			


			//
			// Define clone draggable
			//			
			$(this.clone).draggable({
				
				opacity: .7, 
				
				containment: [ 
					modalOffset.left, 
					modalOffset.top, 
					modalOffset.left + $(modal).width() - pDims[0] -1, 
					modalOffset.top + $(modal).height() - pDims[1] -1
					
				],
				
				start: function () {

				},
				
				drag: function () {
					
					this.targetId = undefined;
					var collidables = $(this).collision(XV.ScanViewers("widgets"));
					
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
					
					this.stopper();
				}	
			});

			//--------------------------------
			// DOUBLE CLICK
			//--------------------------------
			//$(this.clone).dblclick(function () {

			//})			
			
			//
			// Programatically trigger mouseDown to initiate clone drag
			//
			$(this.clone).data("ui-draggable")._mouseDown(event);
			

		}
	)	
	
}