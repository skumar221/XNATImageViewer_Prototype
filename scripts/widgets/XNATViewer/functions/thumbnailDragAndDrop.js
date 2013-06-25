/*
 * @type {function()}
 * @protected
 */
XNATViewer.prototype.initThumbnailDragDrop = function() {
	
	var that = this;
	
	/*
	 * @type {Object.<string, function>}
	 * @protected
	 */
	this.thumbnailDragDrop = {};
	
	
	
	this.thumbnailDragDrop['dragOver'] = function(event) {
		event.dropTargetItem.element.prevBorder =  event.dropTargetItem.element.style.borderColor;
	    event.dropTargetItem.element.style.borderColor = 'white';
	}
	
	
	
	
	this.thumbnailDragDrop['dragOut'] = function(event) {
		event.dropTargetItem.element.style.borderColor = event.dropTargetItem.element.prevBorder;
	}
	
	
	
	
	this.thumbnailDragDrop['drop'] = function(event) {
		var dragElt, found;
		var dropViewer = XV.Viewers(event.dropTargetItem.element);
		
		//
		// Find the XVThumbnail that owns 'event.dragSourceItem.element'
		//
		goog.array.forEach(that.dragDropThumbnails, function(thumbObj) {
			if (!found && thumbObj.widget == event.dragSourceItem.element) {
				
				dragElt = thumbObj;
				that.manageActiveThumbs(dropViewer, thumbObj);
				
				found = true;
			}
		})
	
		
		if (dropViewer) {		
			dropViewer.FrameViewer.loadDroppable(dragElt); 					
		}
		
		if (event.dropTargetItem.element.prevBorder) {
			event.dropTargetItem.element.style.borderColor = event.dropTargetItem.element.prevBorder;	
		}
	}
	
	
	
	/*
	 * @type {function(goog.ui.event)}
	 */	
	this.thumbnailDragDrop['dragStart'] = function(event) {
		var dragElt;
	
		goog.array.forEach(that.dragDropThumbnails, function(thumbObj) {
			if (thumbObj.widget == event.dragSourceItem.element) {
				dragElt = thumbObj
			}
		})

	}	
}


/*
 * @type {function()}
 * @protected
 */
XNATViewer.prototype.setThumbnailDragAndDrop = function () {

	var that = this;

	
	//	
    // Set valid targets for this.draggableWidgets
	//
	XV.Viewers(function (viewer) {

		goog.array.forEach(that.dragDropThumbnails, function(thumb) {
			thumb.addTarget(viewer);	
		});

		goog.events.listen(viewer, 'dragover', that.thumbnailDragDrop['dragOver']);
		goog.events.listen(viewer, 'dragout', that.thumbnailDragDrop['dragOut']);
		goog.events.listen(viewer, 'drop', that.thumbnailDragDrop['drop']);

	})
  	

	//
	// Set additional classes used to indicate dragging
	//
	goog.array.forEach(that.dragDropThumbnails, function(srcObj) {
		
		srcObj.setSourceClass('source');
		srcObj.setTargetClass('target');
		srcObj.init();
		
 		goog.events.listen(srcObj, 'dragstart', that.thumbnailDragDrop['dragStart']);	
	});
 
 
 
 	
 
 	//
 	// Set Click
 	//
 	
 	function invokeDrop(ScanViewer, srcObj) {
		that.thumbnailDragDrop['drop']({
			dropTargetItem : {
				element : ScanViewer.widget
			},
			dragSourceItem : {
				element : srcObj.widget
			}
		}) 		
 	}
 	
 	
 	
 	//
 	// SET CLICK EVENT
 	//
 	goog.array.forEach(that.dragDropThumbnails, function(srcObj) {
		goog.events.listen(srcObj.widget, goog.events.EventType.CLICK, function(){

					var d = new Date();
					var n = d.getTime();
					var p = (srcObj.clickTime) ? srcObj.clickTime : undefined;
					var clone = this;
					var inserted = false;
					srcObj.clickTime = n;
					
					
					
					//
					//  Wierd double click events sent out...
					//
					if (p  && (n-p) < 1000) {
						return;
					}

					
					//
					// Try setting target to empty scan viewers
					//
					XV.Viewers( function (ScanViewer) {
						if (!inserted  && !ScanViewer.getDroppable()) {
							inserted = true;	
							invokeDrop(ScanViewer, srcObj);												
						}
					});
					
									
					
					//
					// If all ScanViewers have content...
					//
					if (!inserted) { 
						//
						// Find viewer that is lastClicked, cycle to next viewer set it as last clicked
						//
	
						XV.Viewers( function (ScanViewer) { 
							if (!inserted) {
								
								var newTargetViewer;
								
								if (!GLOBALS.thumbClickTarget) {
									newTargetViewer = XV.Viewers()[0][0];	
								}
								else if (GLOBALS.thumbClickTarget === ScanViewer.widget.id) {
									newTargetViewer = XV.Viewers({
										"viewerAfter" : ScanViewer
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