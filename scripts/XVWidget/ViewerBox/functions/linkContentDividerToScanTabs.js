ViewerBox.prototype.linkContentDividerToScanTabs = function () {
	
	var that = this;
	var animate = true;
	
	this.ContentDivider.setDrag(function(divider) {
		
		that.updateCSS();
		
	})
	
		
	this.ScanTabs.setClickCallbacks({
		'activate' : function() {
			that.ContentDivider.slideTo(that.ContentDivider.getUpperLimit(), animate);
		},
		'deactivate' : function() {
			that.ContentDivider.slideTo(that.ContentDivider.getLowerLimit(), animate);		
		}
	})

		
}