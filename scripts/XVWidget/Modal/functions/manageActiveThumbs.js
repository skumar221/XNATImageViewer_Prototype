//******************************************************
//  Manage Active Thumbs
//******************************************************
/**
 * @type {function(XVViewer, XVThumbnail)}
 * @ protected
 */
Modal.prototype.manageActiveThumbs = function () {

	var that = this;
	var droppableIds = [];
	var droppableId;
	
	XV.ViewerManager(function(Viewer){
		var droppable = Viewer.getThumbnail();
		if (droppable) {
			droppableIds.push(droppable.widget.id);		
		}
	})

	
	utils.array.forEach(that.dragDropThumbnails, function(thumb) {
		var found = false;
		utils.array.forEach(droppableIds, function(id) {
			if (thumb.widget.id === id) {
				thumb.setActive(true);
				found = true;
			}	
		})
		
		if (!found) {
			thumb.setActive(false);
		}
	})

	
}