SliderLinker.prototype.addLinkMenuPopup = function (currViewer, message) {
	
	this.takeSnapshot_();
	this.lastViewerSelected = currViewer;		
	this.setViewerClickListen(currViewer);
	
	
	var that = this;
	var messageVal = (typeof message === 'undefined') ?  "Select viewers to link. Click 'Done' when finished." : message;	
	var b = new utils.gui.DialogBox(utils.dom.mergeArgs(that.popupArgs, {	  	
		buttons: ["DONE", "Cancel"],
		message: messageVal
  	}));
	var popup = b.widget();	

	
	b.setButtonOnclick("done", function (event) {
		utils.dom.stopPropagation(event);
		utils.fx.fadeOutAndRemove(popup, GLOBALS.animFast, function(){ 
			that.clearAll_();
		})
		that.processGroups();
	});


	b.setButtonOnclick("cancel", function (event) {		
		utils.dom.stopPropagation(event);
		utils.fx.fadeOutAndRemove(popup, GLOBALS.animFast, function(){ 
			that.clearAll_();
		})
		that.cancel();
	});

	
	XV.updateCSS();
	
	
	utils.fx.fadeOut(popup, 0, function () {
		utils.fx.fadeIn(popup, GLOBALS.animFast);
	});

}