/**
 * @type {function()}
 * @protected
 */
Modal.prototype.initThumbnailDragDrop = function() {
	
	var that = this;
	
	/**
	 * @type {Object.<string, function>}
	 * @protected
	 */
	this.thumbnailDragDrop = {};
	
	
	
	this.thumbnailDragDrop['dragOver'] = function(event) {
		if (event.dragSourceItem.element.className.indexOf(GLOBALS.classNames.Thumbnail) > -1) {
			event.dropTargetItem.element.prevBorder =  event.dropTargetItem.element.style.borderColor;
		    event.dropTargetItem.element.style.borderColor = 'white';
	   }
	}
	
	
	
	
	this.thumbnailDragDrop['dragOut'] = function(event) {
		if (event.dragSourceItem.element.className.indexOf(GLOBALS.classNames.Thumbnail) > -1) {
			event.dropTargetItem.element.style.borderColor = event.dropTargetItem.element.prevBorder;
		}
		
	}
	
	
	
	
	this.thumbnailDragDrop['drop'] = function(event) {
		
		if (event.dragSourceItem.element.className.indexOf(GLOBALS.classNames.Thumbnail) > -1) {
			var dragThumb, found, newViewer;
			var dropViewer = XV.Viewers(event.dropTargetItem.element);
			
			
			//
			// Find the XVThumbnail that owns 'event.dragSourceItem.element'
			//
			utils.array.forEach(that.dragDropThumbnails, function(thumbObj) {
				
				if (!found && thumbObj.widget == event.dragSourceItem.element) {
					
					dragThumb = thumbObj;			
					found = true;
					
				}
				
			})
		
			
			if (dropViewer) {		

				XV.Viewers.adaptAndLoad(dropViewer, dragThumb);
				that.updateCSS();
									
			}
			
			if (event.dropTargetItem.element.prevBorder) {
				event.dropTargetItem.element.style.borderColor = event.dropTargetItem.element.prevBorder;	
			}	
					
		}		

	}
	
	
	
	/**
	 * @type {function(goog.ui.event)}
	 */	
	this.thumbnailDragDrop['dragStart'] = function(event) {
		
		var dragThumb;
	
		utils.array.forEach(that.dragDropThumbnails, function(thumbObj) {
			if (thumbObj.widget == event.dragSourceItem.element) {
				dragThumb = thumbObj
			}
		})

	}	
}


/**
 * @type {function()}
 * @protected
 */
Modal.prototype.setThumbnailDragAndDrop = function () {

	var that = this;

	
	//	
    // Set valid targets for this.draggableWidgets
	//
	XV.Viewers(function (viewer) {

		utils.array.forEach(that.dragDropThumbnails, function(thumb) {
			thumb.addTarget(viewer);	
		});

		goog.events.listen(viewer, 'dragover', that.thumbnailDragDrop['dragOver']);
		goog.events.listen(viewer, 'dragout', that.thumbnailDragDrop['dragOut']);
		goog.events.listen(viewer, 'drop', that.thumbnailDragDrop['drop']);

	})
  	

	//
	// Set additional classes used to indicate dragging
	//
	utils.array.forEach(that.dragDropThumbnails, function(thumb) {

		//thumb.setTargetClass('ThumbnailTarget');
		thumb.init();
 		goog.events.listen(thumb, 'dragstart', that.thumbnailDragDrop['dragStart']);	
 		
	});
 
 
 
 	
 
 	//
 	// Set Click
 	//
 	
 	function invokeDrop(Viewer, srcObj) {
		that.thumbnailDragDrop['drop']({
			dropTargetItem : {
				element : Viewer.widget
			},
			dragSourceItem : {
				element : srcObj.widget
			}
		}) 		
 	}
 	
 	
 	
 	//
 	// SET CLICK EVENT
 	//
 	utils.array.forEach(that.dragDropThumbnails, function(srcObj) {
		goog.events.listen(srcObj.widget, goog.events.EventType.CLICK, function(){

			var d = new Date();
			var n = d.getTime();
			var p = (srcObj.clickTime) ? srcObj.clickTime : undefined;
			var clone = this;
			var inserted = false;
			srcObj.clickTime = n;

			
			
			//
			//  Weird double click events sent out...
			//
			if (p  && ((n-p) < 1000)) {
				return;
			}

			
			//
			// Try setting target to empty scan viewers
			//
			XV.Viewers( function (Viewer) {
				if (!inserted  && !Viewer.getDroppable()) {
					inserted = true;	
					invokeDrop(Viewer, srcObj);												
				}
			});
			
							
			
			//
			// If all Viewers have content...
			//
			if (!inserted) { 
				//
				// Find viewer that is lastClicked, cycle to next viewer set it as last clicked
				//

				XV.Viewers( function (Viewer) { 
					if (!inserted) {
						
						var newTargetViewer;
						
						if (!GLOBALS.thumbClickTarget) {
							newTargetViewer = XV.Viewers()[0][0];	
						}
						else if (GLOBALS.thumbClickTarget === Viewer.widget.id) {
							newTargetViewer = XV.Viewers({
								"viewerAfter" : Viewer
							});
						}
						else {
							return;
						}	
						
						GLOBALS.thumbClickTarget = newTargetViewer.widget.id;
						invokeDrop(newTargetViewer, srcObj);
						inserted = true;
					}
				})

			}										
		});
	});
}