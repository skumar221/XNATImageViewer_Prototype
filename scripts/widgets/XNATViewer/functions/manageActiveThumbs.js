//******************************************************
//  Manage Active Thumbs
//******************************************************
/*
 * @type {function(XVViewer, XVThumbnail)}
 * @ protected
 */
XNATViewer.prototype.manageActiveThumbs = function (viewer, thumb) {

	var that = this;
	var t = viewer.getDroppable();
	

	if (t) {	
		var found;
		goog.array.forEach(that.dragDropThumbnails, function(thumbObj) {
			
			if (!found && thumbObj.widget.id == t) {
				thumbObj.setActive(false);
				found = true;
			}
		})
	}
	

	thumb.setActive(true);
	viewer.setDroppable(thumb.widget.id);
}