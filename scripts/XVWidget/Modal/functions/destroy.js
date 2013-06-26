//*******************************a***********************
//  Clears the modal out of the DOM.
//
//******************************************************
Modal.prototype.destroy = function (fadeOut) {
	var that = this;
	var fadeOut = (fadeOut) ? fadeOut: 500;	
	utils.dom.debug("Destroying! " + this.args.id);

	$(this.widget).fadeOut(fadeOut, function () {
		try{
			that.args.parent.removeChild(that.widget);			
		}
		catch(e) {//do nothing
			}
	});
}