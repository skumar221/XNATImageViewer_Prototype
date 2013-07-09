ScanViewer.prototype.linkContentDividerToScanTabs = function () {
	
	var that = this;
	var animate = true;
	
	this.ContentDivider.setDrag(function(divider) {
		
		that.updateCSS();
		
	})
	
		
	this.ScanTabs.setClickCallbacks({
		'activate' : function() {
			var ul = that.ContentDivider.getUpperLimit();
			
			that.ContentDivider.slideTo(ul + .5 * ul, animate);
		},
		'deactivate' : function() {
			that.ContentDivider.slideTo(that.ContentDivider.getLowerLimit(), animate);		
		}
	})

		
}