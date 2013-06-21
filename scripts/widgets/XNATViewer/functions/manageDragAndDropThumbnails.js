//****************************************************

function DraggableThumbnail(element, opt_data) {

	goog.fx.DragDrop.call(this, element, opt_data);

}
goog.inherits(DraggableThumbnail, goog.fx.DragDrop);


DraggableThumbnail.prototype.createDragElement = function(sourceEl) {

	var e = sourceEl.cloneNode(false);
	if (e.tagName === 'CANVAS') { 
		var context = e.getContext("2d");
		context.drawImage(sourceEl, 0, 0);		  
	    context.fillStyle = "white";
	    context.font = "bold 18px " + GLOBALS.fontFamily;
	    context.fillText(sourceEl.metaText[0], e.width - 20, 20);
	  	e.style.opacity = .5;
	} 	
	return e;
};

XNATViewer.prototype.initThumbnailDragDropMethods = function() {
	
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
	
		var dropViewer = XV.Viewers(event.dropTargetItem.element);
		if (dropViewer) {		
			dropViewer.FrameViewer.loadDroppable(dragElt); 					
		}
	  event.dropTargetItem.element.style.borderColor = event.dropTargetItem.element.prevBorder;
	}
	
	this.thumbnailDragDrop['dragStart'] = function(event) {
		//event.dragSource.createDragElement(event.dragSourceItem.element)
	}	
}

//****************************************************



XNATViewer.prototype.manageDragAndDrop = function () {

	var that = this;
	var viewers = XV.Viewers();
	//var thumbs = goog.dom.getElementsByClass('XVThumbnail');	


	this.targetViewers = (this.targetViewers) ? this.targetViewers : /**@protected*/ [];
	
	//
	// Adjust between array and individual object
	//
	if (typeof viewers === 'object' && !viewers.length) {
		viewers = [viewers];
	}

	
	
	//	
    // Set valid targets for this.draggableWidgets
	//
	XV.Viewers(function (viewer) {
		
		if (!viewer.targeted) {
			viewerTarget = new goog.fx.DragDrop(viewer.widget, 'Viewer');
			
			goog.array.forEach(that.dragDropThumbnail, function(thumb) {
				thumb.addTarget(viewerTarget);	
			});
			
			viewerTarget.setSourceClass('source');
			viewerTarget.setTargetClass('target'); 			
			viewerTarget.init();
	
			goog.events.listen(viewerTarget, 'dragover', that.thumbnailDragDrop['dragOver']);
			goog.events.listen(viewerTarget, 'dragout', that.thumbnailDragDrop['dragOut']);
			goog.events.listen(viewerTarget, 'drop', that.thumbnailDragDrop['drop']);			
		}

					
				
	})
  	


	// Set additional classes used to indicate dragging
	goog.array.forEach(that.draggableObjects, function(srcObj) {
		srcObj.setSourceClass('source');
		srcObj.setTargetClass('target');
		srcObj.init();
 		goog.events.listen(srcObj, 'dragstart', that.thumbnailDragDrop['dragStart']);	
	});
 
}