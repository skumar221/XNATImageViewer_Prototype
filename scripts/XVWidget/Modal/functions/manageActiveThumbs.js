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
	
	XV.Viewers(function(Viewer){
		var droppableId = Viewer.getDroppable();
		if (droppableId) {
			droppableIds.push(droppableId)		
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