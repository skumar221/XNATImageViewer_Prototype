

goog.provide(GLOBALS.classNames.XVWidget);

/*
 * @constructor
 */
XVWidget = function (args) {
	
	utils.oo.init(this, this.defaultArgs, args);	
	this.widget.id += "_" + utils.dom.uniqueId();
	
}

XVWidget.prototype.defaultArgs = {
	id: GLOBALS.classNames.XVWidget + utils.dom.uniqueId(),
	className: GLOBALS.classNames.XVWidget,
	parent: document.body
}
