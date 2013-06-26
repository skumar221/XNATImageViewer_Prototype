/*
 * @type {function()}
 * @protected
 */
Modal.prototype.initViewerBoxDragDrop = function() {
	
	var that = this;
	
	/*
	 * @type {Object.<string, function>}
	 * @protected
	 */
	this.viewerBoxDragDrop = {};
	
	
	
	this.viewerBoxDragDrop['dragOver'] = function(event) {
		event.dropTargetItem.element.prevBorder =  event.dropTargetItem.element.style.borderColor;
	    event.dropTargetItem.element.style.borderColor = 'white';
	}
	
	
	
	
	this.viewerBoxDragDrop['dragOut'] = function(event) {
		event.dropTargetItem.element.style.borderColor = event.dropTargetItem.element.prevBorder;
	}
	
	
	
	
	this.viewerBoxDragDrop['drop'] = function(event) {
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
	this.viewerBoxDragDrop['dragStart'] = function(event) {

		
		console.log("Dragging Viewer: ", event.dragSourceItem.element);

	}	
	
}



/*
 * @type {function()}
 * @protected
 */
Modal.prototype.setViewerBoxDragAndDrop = function () {

	var that = this;

	var viewerLen = XV.Viewers("total");
	console.log(viewerLen);
	if (viewerLen > 1) {
		//	
	    // Set valid targets for this.draggableWidgets
		//
		XV.Viewers(function (viewer) {
			
			XV.Viewers(function (w) {
				if (viewer !== w) { 
					console.log(viewer.widget.id + " TARGET " + w.widget.id);
					viewer.addTarget(w);
				}
			});
		
		})
	
		XV.Viewers(function (viewer) {
			console.log(viewer.widget.id + " SETUP")
			viewer.init();
			goog.events.listen(viewer, 'dragstart', that.viewerBoxDragDrop['dragStart']);	
		})		
	}

}