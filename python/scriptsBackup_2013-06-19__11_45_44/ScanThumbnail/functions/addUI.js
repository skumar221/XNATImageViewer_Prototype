ScanThumbnail.prototype.addUI = function () {
	
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
		var viewers = XV.Viewers("widgets");
		for (var i = 0, len = viewers.length; i < len; i++) {			
			if (viewers[i].prevBorder) {

				viewers[i].style.border = viewers[i].prevBorder;
				viewers[i].prevBorder = undefined;
			}
			
		}
	}
	

	
	$(this.widget).bind('mousedown.drag', function (event) {
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
				
				this.dragging = false;
				
				var clone = this;

				revertBorders();					
				
				if (!this.targetId) {
					
					//  Fly back to original position
					$(this).animate({
						top: offset.top,
						left: offset.left
					}, GLOBALS.animFast, function () {
						destroy();
					})		
									
				}
				else {
					
					// Load the thumbnail into the ScanViewer
					var v = XV.Viewers(this.targetId);
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
			utils.css.setCSS( this.clone, {
				
				top: offset.top,
				left: offset.left
		
			})
			
			
			
			//-----------------------------------------
			// DOUBLE CLICK (will populate ScanViewer)
			//-----------------------------------------
			$(this.clone).dblclick(function (event) { 
				
				utils.dom.debug("Nothing")
					
			});
						
			
						
			//-----------------------------------------
			// MOUSE UP CLICK (will populate ScanViewer)
			//-----------------------------------------
			$(this.clone).bind('mouseup.click', function (event) { 
				
				if (!this.dragging) {
					var clone = this;
					var inserted = false;
					
					//
					// Try setting target to empty scan viewers
					//
					XV.Viewers( function (ScanViewer, i, j) {
						if (!ScanViewer.loaded && !inserted) {

							clone.targetId = ScanViewer.widget.id; 
							ScanViewer.loaded = true;
							inserted = true;
						}
					});
					
					
	
					
					
					//
					// If all ScanViewers have content...
					//
					if (!inserted) { 
	
						//
						// Find viewer that is lastClicked, cycle to next viewer set it as last clicked
						//
						XV.Viewers( function (ScanViewer, i, j) { 
							if ((GLOBALS.thumbClickTarget === ScanViewer.widget.id)  && !inserted) {

								clone.targetId = ScanViewer.widget.id;
								var newTargetViewer = XV.Viewers({
									"viewerAfter" : ScanViewer
								});
								
								GLOBALS.thumbClickTarget = newTargetViewer.widget.id;
								inserted = true;
								
							}
						})
	
					}			
					// Invoke mouseEventEnd()
					clone.mouseEventEnd();		
				}
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
					this.dragging = true;
					this.targetId = undefined;
					var collidables = $(this).collision(XV.Viewers("widgets"));
					
					for (var i = 0, len = collidables.length; i < len; i++) {						
						revertBorders(); 
						
						var collideDiv = $(this).collision(collidables[i], {as : "<div />"});	
						var collisionArea = $(collideDiv).width() * $(collideDiv).height()
						var draggableArea = $(this).height() * $(this).width();
												
						if (collisionArea/draggableArea > .6) {
				
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