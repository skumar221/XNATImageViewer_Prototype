/**
 * @protected
 */
Modal.prototype.initViewerDragDrop = function() {
	
	var that = this;
	
	/**
	 * @type {Object.<string, function(goog.ui.event)>}
	 * @protected
	 */
	this.viewerBoxDragDrop = {};


	this.viewerBoxDragDrop['dragover'] = function(event) {
		
		if (event.dragSourceItem.element.className.indexOf(GLOBALS.classNames.Viewer) > -1) {
			
			var target = event.dropTargetItem.element;
			var source = event.dragSourceItem.element;
			var sDims = utils.css.dims(source);
			var tDims = utils.css.dims(target);

			
			var d = new Date();
			var n = d.getTime();
			var p = (source.clickTime) ? source.clickTime : undefined;
			var clone = this;
			var inserted = false;
			source.clickTime = n;
			
			//
			//  Weird double events sent out..
			//
			if (p  && (n-p) < 200) {
				return;
			}
			

			utils.css.setCSS(source, tDims);
			target.oldDims = sDims;
			source.oldDims = tDims;
						
			var slide = new goog.fx.dom.Slide(target, [tDims.left, tDims.top], 
													  [sDims.left, sDims.top], 
													  GLOBALS.animFast);
			slide.play();

			goog.events.listen(slide, goog.fx.Transition.EventType.END, function() {
				utils.css.setCSS(target, sDims);			
			});

			
			XV.ViewerManager({'swap' : [source, target]});
		}
		
	}
	
	
	this.viewerBoxDragDrop['dragOut'] = function(event) {

		event.dropTargetItem.element.style.borderColor = event.dropTargetItem.element.prevBorder;
	}
	
	
	this.viewerBoxDragDrop['drop'] = function(event) {
		
		if (event.dragSourceItem.element.className.indexOf(GLOBALS.classNames.Viewer) > -1) {

		}
	}
	
	
	
	this.viewerBoxDragDrop['dragstart'] = function(event) {
		//
		//  Doesn't cleanup the clones when you drag a child
		//  of the Viewer.  In this case, when you drag a slider, 
		//  and don't want the viewer to drag, you need to remove the clone
		//  still.
		//
		
		event.dragSourceItem.element.isCloneable = true;
		
		if (event.dragSourceItem.currentDragElement_.className.toLowerCase().indexOf('slider') > -1) {
		
			that.disableViewerDragAndDrop();	
			event.dragSourceItem.element.isCloneable = false;
			
		}
		else {
			
			that.enableViewerDragAndDrop();
			utils.fx.fadeOut(event.dragSourceItem.element, GLOBALS.animFast);

			//
			//  set the 'oldDims'
			//
			XV.ViewerManager(function(viewer){
				viewer.widget.oldDims = utils.css.dims(viewer.widget);
			})
							
		}
	}	
	

	this.viewerBoxDragDrop['dragend'] = function(event) {

			var relPos = goog.style.getRelativePosition(event.dragSourceItem.element, event.currentTarget.dragEl_);
			var targPos = utils.css.dims(event.dragSourceItem.element);
			var newPos = {
				top: targPos.top - relPos.y,
				left: targPos.left - relPos.x
			}
			var anim = new goog.fx.dom.Slide(event.dragSourceItem.element, 
											 [newPos.left, newPos.top], 
										 	 [targPos.left, targPos.top], 
										 	 GLOBALS.animFast);



		    utils.css.setCSS(event.dragSourceItem.element, newPos);
		    event.dragSourceItem.element.style.opacity = 1;
		    
			goog.events.listen(anim, 'end', function() { 
				XV.updateCSS();		
			})
			anim.play();

	}	
}



/**
 * @protected
 */
Modal.prototype.setViewerDragAndDrop = function () {

	var that = this;
	var viewerLen = XV.ViewerManager("total");

	if (viewerLen > 1) {
		
		//	
	    // Set valid targets for this.draggableWidgets
		//
		XV.ViewerManager(function (viewer) {
			
			XV.ViewerManager(function (w) {
				if (viewer !== w) { 
					viewer.addTarget(w);
				}
			});
			goog.events.listen(viewer, 'dragstart', that.viewerBoxDragDrop['dragstart']);	
		})
	
		that.enableViewerDragAndDrop();	
		
	}

}



Modal.prototype.disableViewerDragAndDrop = function () {
	
	var that = this;
	
	XV.ViewerManager(function (viewer) {

		goog.events.unlisten(viewer, 'drop', that.viewerBoxDragDrop['drop']);	
		goog.events.unlisten(viewer, 'dragover', that.viewerBoxDragDrop['dragover']);	
		goog.events.unlisten(viewer, 'dragend', that.viewerBoxDragDrop['dragend']);	

	})		
	

}



Modal.prototype.enableViewerDragAndDrop = function () {
	
	var that = this;

	XV.ViewerManager(function (viewer) {
		viewer.init();
		goog.events.listen(viewer, 'drop', that.viewerBoxDragDrop['drop']);	
		goog.events.listen(viewer, 'dragover', that.viewerBoxDragDrop['dragover']);	
		goog.events.listen(viewer, 'dragend', that.viewerBoxDragDrop['dragend']);	

	})		
	

}