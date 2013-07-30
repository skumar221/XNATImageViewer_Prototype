goog.require('Modal');
goog.provide('Modal.destroy');
//*******************************a***********************
//  Clears the modal out of the DOM.
//
//******************************************************
Modal.prototype.destroy = function (fadeOut) {
	var that = this;

	utils.dom.debug("Destroying! " + this.args.id);
	utils.fx.fadeOut(this.widget, XVGlobals.animMed, function () {
		try{
			that.args.parent.removeChild(that.widget);			
		}
		catch(e) {//do nothing
		}
	});
}
goog.exportProperty(Modal.prototype, 'destroy', Modal.prototype.destroy);
