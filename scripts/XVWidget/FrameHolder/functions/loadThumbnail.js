goog.require('FrameHolder');
goog.require('utils.fx.fadeOut');
goog.require('utils.fx.fadeIn');

goog.provide('FrameHolder.loadCurrViewPlane');
FrameHolder.prototype.loadCurrViewPlane = function () {
	
	
	var that = this;
	var cCount = that.currDroppable[that.currViewPlane + "FrameCount"];
	var preload = that.currDroppable.getFrames({
		'viewPlane' : that.currViewPlane,
		'filter' : 'img'
	});
	
	//utils.dom.debug(cCount, preload.length, that.loaded)
	
	if ((preload.length >= cCount ) && !that.loaded) {
		
		that.loaded = true;
		// Show canvas
		that.progBar.hide();	
		utils.fx.fadeIn(that.canvas, XVGlobals.animFast);
		
		// Load Frames By ViewPlane
		
		that.loadFramesByViewPlane(that.currViewPlane);		
				
	}		
	
}
goog.exportProperty(FrameHolder.prototype, 'loadCurrViewPlane', FrameHolder.prototype.loadCurrViewPlane);

goog.provide('FrameHolder.loadThumbnail');
FrameHolder.prototype.loadThumbnail = function (droppable, viewPlane) {

	var that = this;
	
	if (droppable.frames) {

		var that = this;		
		this.currDroppable = droppable;		
		this.currViewPlane = (viewPlane) ? viewPlane : "sagittal";
		
	 	
		//---------------------------------
		// asyc Image loading
		//---------------------------------			
		this.currDroppable.loadFramesToDOM({
			
			"viewPlane" : that.currViewPlane,
			
			"before" : function (setLength) {
				
				// Exists to prevent reloading things on onload 
				that.loaded = false;

						
				//---------------------------------
				// Update progress bar
				//---------------------------------
				that.progBar.update({
					"max" : setLength,
					"clear": true
				});
				utils.fx.fadeOut(that.canvas, 0);
				that.progBar.show();	
				
			},
			
			"load" : function (img) {
			
				var mPath = that.currDroppable.pathMolder(img.src);
				
				
				var preload = that.currDroppable.getFrames({
					'viewPlane' : that.currViewPlane,
					'filter' : 'img'
				});
				
				
				var viewPlaneStr = "<b>" + that.currViewPlane.charAt(0).toUpperCase() + that.currViewPlane.slice(1) + "</b>";	
				var loadStr = "<br> Scan " + (that.currDroppable.scanData['sessionInfo']["Scan"]['value']).toString() + " - " + viewPlaneStr + "<br>";
					
				//---------------------------------
				// Update progress bar
				//---------------------------------
				that.progBar.update({
					'label': "Loading...  " + loadStr + " " + preload.length.toString() + " / " + that.currDroppable[that.currViewPlane + "FrameCount"]
				});
				
				// this makes sure that we're putting the image back
				// with the correct scanThumbnail
				if (that.currDroppable.frames[mPath]) {
					
					// increments
					that.currDroppable.frames[mPath]['img'] = img;			
					that.progBar.update({"add": 1});
					
				}
				
			},
			
			"complete" : function () {
				
				that.loadCurrViewPlane();
				
			}
		})
	}
	else{
		throw "FrameHolder.js: Invalid Droppable for FrameHolder."
	}

}
goog.exportProperty(FrameHolder.prototype, 'loadThumbnail', FrameHolder.prototype.loadThumbnail);

