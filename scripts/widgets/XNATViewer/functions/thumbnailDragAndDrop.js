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
		
		var dragElt;
	
		goog.array.forEach(that.dragDropThumbnails, function(thumbObj) {
			if (thumbObj.widget == event.dragSourceItem.element) {
				dragElt = thumbObj
			}
		})
		dragElt.setActive(true);
	
		var dropViewer = XV.Viewers(event.dropTargetItem.element);
		if (dropViewer) {		
			dropViewer.FrameViewer.loadDroppable(dragElt); 					
		}
	  event.dropTargetItem.element.style.borderColor = event.dropTargetItem.element.prevBorder;
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
		dragElt.setActive(true);
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
 
}