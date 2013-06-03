//*******************************a***********************
//  Clears the modal out of the DOM.
//
//******************************************************
XNATViewer.prototype.destroy = function (fadeOut) {
	var fadeOut = (fadeOut) ? fadeOut: 500;	
	console.log("Destroying! " + this.args.id);
	var that = this;
	$(this.widget).fadeOut(fadeOut, function () {
		try{
			that.args.parent.removeChild(that.widget);			
		}
		catch(e) {//do nothing
			}
	});
}