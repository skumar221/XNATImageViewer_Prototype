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
	
	
	
	this.viewerBoxDragDrop['dragover'] = function(event) {
		if (event.dragSourceItem.element.className.indexOf(GLOBALS.classNames.ViewerBox) > -1) {
			
			var target = event.dropTargetItem.element;
			var source = event.dragSourceItem.element;
			var sDims = utils.css.dims(source).position;
			var tDims = utils.css.dims(target).position;

			
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


			utils.css.setCSS(target, sDims);
			utils.css.setCSS(source, tDims);

			XV.Viewers({'swap' : [source, target]});
		}
		
	}
	
	
	
	
	this.viewerBoxDragDrop['dragOut'] = function(event) {
		event.dropTargetItem.element.style.borderColor = event.dropTargetItem.element.prevBorder;
	}
	
	
	
	
	this.viewerBoxDragDrop['drop'] = function(event) {
		if (event.dragSourceItem.element.className.indexOf(GLOBALS.classNames.ViewerBox) > -1) {
			XV.Viewers(function(viewer){
				utils.fx.fadeIn(viewer.widget, 0);	
			})	
		}
	}
	
	
	
	/*
	 * @type {function(goog.ui.event)}
	 */	
	this.viewerBoxDragDrop['dragstart'] = function(event) {
		utils.fx.fadeOut(event.dragSourceItem.element, GLOBALS.animFast);
	}	
	
}



/*
 * @type {function()}
 * @protected
 */
Modal.prototype.setViewerBoxDragAndDrop = function () {

	var that = this;
	var viewerLen = XV.Viewers("total");

	if (viewerLen > 1) {
		//	
	    // Set valid targets for this.draggableWidgets
		//
		XV.Viewers(function (viewer) {
			
			XV.Viewers(function (w) {
				if (viewer !== w) { 
					viewer.addTarget(w);
				}
			});
		
		})
	
		XV.Viewers(function (viewer) {
			viewer.init();
			goog.events.listen(viewer, 'dragstart', that.viewerBoxDragDrop['dragstart']);	
			goog.events.listen(viewer, 'drop', that.viewerBoxDragDrop['drop']);	
			goog.events.listen(viewer, 'dragover', that.viewerBoxDragDrop['dragover']);	
		})		
	}

}