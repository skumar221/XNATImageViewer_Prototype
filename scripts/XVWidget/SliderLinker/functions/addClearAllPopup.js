SliderLinker.prototype.addClearAllPopup = function (currViewer, message) {
	
	this.takeSnapshot_();	
	
	var that = this;
	var messageVal = (typeof message === 'undefined') ?  "Are you sure you want to clear all links?" : message;
	
	
	var b = new utils.gui.DialogBox(utils.dom.mergeArgs(that.popupArgs, {	  	
		buttons: ["Yes", "Cancel"],
		message: messageVal
  	}));
  	
	var popup = b.widget();		
	
	
	
	b.setButtonOnclick("yes", function (event) {
		utils.dom.stopPropagation(event);
		utils.fx.fadeOutAndRemove(popup, GLOBALS.animFast, function(){ 
			that.clearAll_();
		})
	});



	b.setButtonOnclick("cancel", function (event) {
		utils.dom.stopPropagation(event);
		utils.fx.fadeOutAndRemove(popup, GLOBALS.animFast, function(){ 
			that.clearAll_();
		})	
	});

	
	XV.updateCSS();	
	utils.fx.fadeOut(popup, 0, function () {
		utils.fx.fadeIn(popup, GLOBALS.animFast);
	});
		
}