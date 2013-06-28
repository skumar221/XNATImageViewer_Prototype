//******************************************************
//  Init
//
//******************************************************

goog.require(GLOBALS.classNames.XVWidget);
goog.provide(GLOBALS.classNames.ContentDivider);
/**
 * @constructor
 * @param {Object=}
 * @extends {XVWidget}
 */
ContentDivider = function (args) {

	XVWidget.call(this, args);
	var that = this;

	
	
	
	//-------------------------------
	// CONTAINER
	//-------------------------------	 
	/**
	 * @private
	 * @type {Element}
	 */
	this.containmentDiv = utils.dom.makeElement("div", 
		this.args.parent,  
		this.args.className + "Container", {
		position: "absolute",
		//backgroundColor: "rgba(255,0,0,.5)",
		"pointer-events": "none",
	});





	//-------------------------------
	// WIDGET ICON
	//-------------------------------		
	/**
	 * @private
	 * @type {Element}
	 */
	this.widgetIcon = utils.dom.makeElement("div", this.widget, 'widgetIcon', {
		position: 'absolute',	
		color: "rgba(85,85,85)",
		width: "20%",
		left: '40%',
		top: -15,
		fontSize: 25,
		textAlign: "center"
	});	
	this.widgetIcon.innerHTML = "..."	 
	 
	 
	 
	 
	//
	// UpdateCSS
	//
	/**
	 *  @param {Object=}
	 */
	this.updateCSS = function (args) {		
		if (args) { 
			this.setArgs(args) 
			utils.css.setCSS(that.widget, this.currArgs().widgetCSS);
		};

	}




	/**
	 * @type {Array}
	 * @private
	 */
	this.dragCallbacks = [];
	/**
	 * @param {function}
	 * @private
	 */
	this.setDrag = function(callback) {
		if (this.dragCallbacks.indexOf(callback) === -1) {

			this.dragCallbacks.push(callback);	
		}
	}


	//
	//  Set drag options
	//
	goog.events.listen(this.widget, goog.events.EventType.MOUSEDOWN, function(e) {
	
		utils.dom.stopPropagation(e);
		
		var cDims = utils.css.dims(that.containmentDiv);
		var d = new goog.fx.Dragger(that.widget, null, new goog.math.Rect(0, cDims.top, 0, cDims.height - GLOBALS.ContentDividerHeight));
		
		that.dragging = true;	
		
		
		
		d.addEventListener(goog.fx.Dragger.EventType.DRAG, function(e) {
			
			goog.array.forEach(that.dragCallbacks, function(callback) {
				callback(e);	
			})	
				
		});
		
		
		d.addEventListener(goog.fx.Dragger.EventType.END, function(e) {
			that.dragging = false;
			d.dispose();
		});
		
		
		d.startDrag(e);
	
	});
	
	this.updateCSS();	
}
goog.inherits(ContentDivider, XVWidget);



/**
 * @type {object}
 * @protected
 */
ContentDivider.prototype.defaultArgs = {
		className: "ContentDivider",
		parent: document.body,
		orientation: "vertical",
		className: "ContentDivider",
		widgetCSS: {
			position: 'absolute',
			top: "90%",
			left: 0,
			width: "100%",
			height: GLOBALS.ContentDividerHeight,
			cursor: "n-resize",
			backgroundColor: "rgba(40,40,40, 1)",
			opacity: 1,
			color: "rgb(85,85,85)",
			fontSize: 25,
			textAlign: "center"
		},
		boundaryCSS: {
			top: 0,
			left: 0,
			width: 650,
			height: 400
		}
}



