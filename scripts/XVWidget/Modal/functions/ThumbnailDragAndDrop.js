goog.require('Modal');
goog.provide('Modal.setThumbnailDragAndDrop');
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
		if (event.dragSourceItem.element.className.indexOf(XVGlobals.classNames.Thumbnail) > -1) {
			event.dropTargetItem.element.prevBorder =  event.dropTargetItem.element.style.borderColor;
		    event.dropTargetItem.element.style.borderColor = 'white';
	   }
	}
	
	
	
	
	this.thumbnailDragDrop['dragOut'] = function(event) {
		if (event.dragSourceItem.element.className.indexOf(XVGlobals.classNames.Thumbnail) > -1) {
			event.dropTargetItem.element.style.borderColor = event.dropTargetItem.element.prevBorder;
		}
		
	}
	
	
	
	
	this.thumbnailDragDrop['drop'] = function(event) {
		
		if (event.dragSourceItem.element.className.indexOf(XVGlobals.classNames.Thumbnail) > -1) {
			var dragThumb, found, newViewer;
			var dropViewer = that.ViewerManager(event.dropTargetItem.element);
			
			
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
				if (!event.isClick &&
                    event.dragSourceItem.element.className === XVGlobals.classNames.SlicerThumbnail &&
                    event.dropTargetItem.element.className === XVGlobals.classNames.SlicerViewer) {
                    XV.ViewerManager.keepAndLoad(dropViewer, dragThumb);
                } else {
                    XV.ViewerManager.adaptAndLoad(dropViewer, dragThumb);
                }
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
 * @expose
 */
Modal.prototype.setThumbnailDragAndDrop = function () {

	var that = this;

	
	//	
    // Set valid targets for this.draggableWidgets
	//
	
	
	that.ViewerManager(function (viewer) {

		
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
//        console.log('clicked');
		that.thumbnailDragDrop['drop']({
			'dropTargetItem' : {
				element : Viewer.widget
			},
			'dragSourceItem' : {
				element : srcObj.widget
			},
            'isClick' : true
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
			if (p  && ((n-p) < 1500)) {
//                console.log('double click thing');
				return;
			}

			
			//
			// Try setting target to empty scan viewers
			//
			that.ViewerManager( function (Viewer) {
				if (!inserted  && !Viewer.getThumbnail()) {
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

				that.ViewerManager( function (Viewer) { 
					if (!inserted) {
						
						var newTargetViewer;
						
						if (!XVGlobals.thumbClickTarget) {
							newTargetViewer = that.ViewerManager()[0][0];	
						}
						else if (XVGlobals.thumbClickTarget === Viewer.widget.id) {
							newTargetViewer = that.ViewerManager({
								"viewerAfter" : Viewer
							});
						}
						else {
							return;
						}	
						
						XVGlobals.thumbClickTarget = newTargetViewer.widget.id;
						invokeDrop(newTargetViewer, srcObj);
						inserted = true;
					}
				})

			}
            
		});
	});
}
goog.exportProperty(Modal.prototype, 'setThumbnailDragAndDrop', Modal.prototype.setThumbnailDragAndDrop);
