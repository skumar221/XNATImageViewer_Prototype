

goog.provide(GLOBALS.classNames.XVWidget);

/*
 * @constructor
 */
XVWidget = function (args) {
	
	utils.oo.init(this, this.defaultArgs, args);	
	
	this.getWidget = function() {
		return this.widget;
	}
	
}

XVWidget.prototype.defaultArgs = {
	className: GLOBALS.classNames.XVWidget,
	parent: document.body
}
