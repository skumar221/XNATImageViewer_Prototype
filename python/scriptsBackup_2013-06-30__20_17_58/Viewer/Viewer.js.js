//******************************************************
//  Init
//	
//******************************************************
goog.require('goog.fx.DragDrop');
goog.require('goog.fx.DragDropGroup');
goog.require('goog.array');
goog.require(GLOBALS.classNames.XVWidget);

goog.provide(GLOBALS.classNames.ViewerBox);

/**
 * @constructor
 * @extends {XVWidget}
 */
ViewerBox = function (args) {
  	
	XVWidget.call(this, utils.dom.mergeArgs(ViewerBox.prototype.defaultArgs, args));
	goog.fx.DragDrop.call(this, this.widget, undefined);
	
	
	/**
	 * @type {string}
	 * @private
	 */
	this.currDroppableId = undefined;
	/**
	 * @param {string}
	 */	
	this.setDroppable = function(dId) {
		this.currDroppableId = dId;
	}
	/**
	 * @return {string}
	 */	
	this.getDroppable = function() {
		return this.currDroppableId;
	}

    this.setHoverEvents();
}
goog.inherits(ViewerBox, XVWidget);
goog.inherits(ViewerBox, goog.fx.DragDrop);





/*
 * @type {object}
 * @protected
 */
ViewerBox.prototype.defaultArgs = {
	parent: document.body,
	className: GLOBALS.classNames.ViewerBox,
	widgetCSS: {
		top: 0,
		left: 80,
		width: 500,
		height: 500,
		border: "solid rgba(90,90,90,1) 1px",
		//backgroundColor: "rgba(208,123, 92, .3)",
		position: "absolute",
	 	overflow: "hidden",
	 	"overflow-x": "visible",
	 	"overflow-y": "visible"
	},
}



ViewerBox.prototype.updateCSS = function(args) {

	/**
	 * @type {Object}
	 * @protected
	 */
	this.widgetDims = utils.css.dims(this.widget);


	//----------------------------------
	// Widget
	//----------------------------------
	args = (args) ? args : {};
	utils.css.setCSS(this.widget, utils.dom.mergeArgs({
		
		width: this.widgetDims.width,
		height: this.widgetDims.height,
		top: this.widgetDims.top,
		left: this.widgetDims.left,
		overflow: "hidden",
		
	}, args));
	

}

/**
 * @private
 */
ViewerBox.prototype.setHoverEvents = function () {
	
	var that = this;
	var keeperClasses = [
		GLOBALS.classNames.FrameViewer
	]
	
	this.hoverOut = function() {
		utils.array.forEach(that.widget.childNodes, function (node) { 
			
			var found = false;
			utils.array.forEach(keeperClasses, function (keeper) { 
				if (node.className.indexOf(keeper) > -1) {
					found = true;
				}	
			});
			
			if (!found) {
				utils.fx.fadeOut(node, 0);
			}
		})		
	}
	
	this.hoverIn = function() {
		utils.array.forEach(that.widget.childNodes, function (node) { 
			utils.fx.fadeIn(node, 0);
		})
	}
	
	goog.events.listen(this.widget, goog.events.EventType.MOUSEOVER, function() { that.hoverIn() });
	goog.events.listen(this.widget, goog.events.EventType.MOUSEOUT,  function() { that.hoverOut() });

	that.hoverOut();
}

