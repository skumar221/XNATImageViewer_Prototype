ScanThumbnail.prototype.addDraggableMethods = function () {
	
	var that = this;


	//
	// Destroy clone
	//
	function destroy() {		
		if (that.widget.clone) {
			that.widget.clone.parentNode.removeChild(that.widget.clone);
			that.widget.clone = undefined;				
		}					
	}
					

	//
	// Revert viewer borders back to original
	//
	function revertBorders () {
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
			this.clone = $(this).clone()[0];
			
			
			//
			// Append clone do document body
			//
			document.body.appendChild(this.clone);
			
			
			//
			// Set clone position to offset
			//
			var offset = $(this).offset();
			var pDims = [$(this).width(), $(this).height()];
			
			
			//
			// Define generic mouse event end 
			//			
			this.clone.mouseEventEnd = function () {
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
			
			
			//
			// Set style
			//
			$(this.clone).css({
				
				top: offset.top,
				left: offset.left
		
			})
			
			
			
			//-----------------------------------------
			// MOUSE UP CLICK (will populate ScanViewer)
			//-----------------------------------------
			$(this.clone).dblclick(function(event) { 
				
				console.log("Nothing")
					
			});
						
			
						
			//-----------------------------------------
			// MOUSE UP CLICK (will populate ScanViewer)
			//-----------------------------------------
			$(this.clone).bind('mouseup.drag', function(event) { 
				
				var clone = this;
				var inserted = false;
				
				//
				// Try setting target to empty scan viewers
				//
				XV.ScanViewers( function (ScanViewer, i, j) {
					if (!inserted && ScanViewer.FrameViewer.frames.length == 0) {
						clone.targetId = ScanViewer.widget.id; 
						inserted = true;
					}
				});
				
				
				//
				// Utility...
				//
				function setFirstViewer() {
					GLOBALS.lastClickedTarget = XV.ScanViewers()[0][0].widget.id;
					clone.targetId = GLOBALS.lastClickedTarget;	
				}
				
				
				//
				// If all frames are occupied...
				//
				if (!inserted) { 
					if (!GLOBALS.lastClickedTarget) { setFirstViewer(); }	
					else { 
					
						var prevFound = undefined;
						
						//
						// Find viewer that is lastClicked, cycle to next viewer set it as last clicked
						//
						XV.ScanViewers( function (ScanViewer, i, j) { 
							if (GLOBALS.lastClickedTarget == ScanViewer.widget.id) {
								prevFound = true;
								return;
							}
							if (prevFound) {
								GLOBALS.lastClickedTarget = ScanViewer.widget.id;
								clone.targetId = GLOBALS.lastClickedTarget;
							}
						})
						
						//
						// If we've run out of viewers, go back to the first.
						//
						if (!prevFound) { setFirstViewer(); }
					}
				}
				
				// Invoke mouseEventEnd()
				clone.mouseEventEnd();
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
					
					this.mouseEventEnd();
				
				}	
			});
		
			
			//
			// Programatically trigger mouseDown to initiate clone drag
			//
			$(this.clone).data("ui-draggable")._mouseDown(event);
			

		}
	)	
	
}