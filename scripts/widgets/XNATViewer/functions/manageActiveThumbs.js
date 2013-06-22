//******************************************************
//  Manage Active Thumbs
//******************************************************
/*
 * @type {function(XVViewer, XVThumbnail)}
 * @ protected
 */
XNATViewer.prototype.manageActiveThumbs = function (viewer, thumb) {
	var that = this;
	var found;
	
	var t = viewer.getDroppable();
	console.log("t: ", t)
	if (t) {
		goog.array.forEach(that.dragDropThumbnails, function(thumbObj) {
			
			if (!found && thumbObj.widget.id == t) {
				console.log(t)
				thumbObj.setActive(false);
				found = true;
			}
		})
	}
	thumb.setActive(true);
	viewer.setDroppable(thumb.widget.id);
}