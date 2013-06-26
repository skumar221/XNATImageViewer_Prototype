

goog.provide(GLOBALS.classNames.XVWidget);

/*
 * @constructor
 */
XVWidget = function (args) {
	
	utils.oo.init(this, this.defaultArgs, args);	
	
}

XVWidget.prototype.defaultArgs = {
	id: GLOBALS.classNames.XVWidget + utils.dom.uniqueId(),
	className: GLOBALS.classNames.XVWidget,
	parent: document.body
}
