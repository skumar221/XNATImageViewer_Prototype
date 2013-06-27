//*******************************a***********************
//  Clears the modal out of the DOM.
//
//******************************************************
Modal.prototype.destroy = function (fadeOut) {
	var that = this;

	utils.dom.debug("Destroying! " + this.args.id);
	utils.fx.fadeOut(this.widget, GLOBALS.animMed, function () {
		try{
			that.args.parent.removeChild(that.widget);			
		}
		catch(e) {//do nothing
		}
	});
}