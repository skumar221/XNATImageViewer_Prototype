

goog.provide('XVWidget');

/**
 * @constructor
 * @param{Object=}
 */
XVWidget = function (args) {
	

	/**
	 * @type {object}
	 * @protected
	 */
	this.args = (args) ? utils.dom.mergeArgs(this.defaultArgs, args) : this.defaultArgs;


	/**
	 * @type {object}
	 * @protected
	 */	
	this.CSS = (this.args.CSS) ? this.args.CSS : this.args.widgetCSS;

	/**
	 * @type {Element}
	 */	
	this.widget = utils.dom.makeElement("div", this.args.parent, this.args.className, this.CSS);

	/**
	 * @return {Element}
	 */
	this.getWidget = function() {
		return this.widget;
	}
	
	this.getDefaultArgs = function() {
		return this.defaultArgs;
	}
	
	
}

