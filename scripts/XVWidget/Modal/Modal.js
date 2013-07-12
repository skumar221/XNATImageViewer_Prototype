//******************************************************
//  Init
//
//******************************************************
goog.require('XVGlobals');
goog.require('XVWidget');


goog.provide('Modal');

/**
 * @constructor
 * @extends {XVWidget}
 */
Modal = function (args) {

	var that = this;
	XVWidget.call(this, utils.dom.mergeArgs(Modal.prototype.defaultArgs, args));

	
	//----------------------------------
	//	WIDGET
	//----------------------------------			
	this.widget.onclick = function () { 
		that.destroy();
	}	
	
	window.onresize = function () {
		that.updateCSS();
	};
	
	
	
	//----------------------------------
	//	MODAL
	//----------------------------------
	/**
	* @type {Element}
	*/	
	this.modal = utils.dom.makeElement("div", this.widget, XVGlobals.ModalId, this.args.modalCSS);	
	utils.css.setCSS( this.modal, {
		"overflow-x": "hidden",
		"overflow-y": "hidden"
	})
	
	// Don't destroy when clicking on window (i.e. don't propagate)				
	this.modal.onclick = function (event, element) {

		 utils.dom.stopPropagation(event);   // W3C model
	
	}

	utils.css.setCSS( this.modal,  {
		height: "50%",
		width: "50%"
	});
	
	
	
	//----------------------------------
	//	CLOSE BUTTON
	//----------------------------------
	/**
	* @type {Element}
	*/	
	this.closeButton = utils.dom.makeElement("img", this.widget, "closeIcon", {
		position: "absolute", 
		cursor: "pointer",
		width: 10,
		height: 10,
		zIndex: 103
	});	
	this.closeButton.src = "./icons/closeX.png";


	
	//----------------------------------
	//SCAN DATA PATHS - AJAX QUERY HERE
	//
	// FOR PROTOTYPING PURPOSES
	//----------------------------------	
	this.scanDataPaths = demoScanData;

	
	
	/**
	 * @type {Array.<Object>}
	 * @protected
	 */
	this.dragDropThumbnails = [];
	
	
	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	that.addScrollGallery();	
	
	//----------------------------------
	//	ROW MENU
	//----------------------------------	
	that.addRowMenu();

	
	//----------------------------------
	//	COLUMN MENU
	//----------------------------------
	that.addColumnMenu();
	


	that.initThumbnailDragDrop();
	that.initViewerDragDrop();
	

	


	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------	
	that.addViewerManager();
	that.ViewerManager({
		'addViewersChangedCallback' : function() {
			that.setThumbnailDragAndDrop();
			that.setViewerDragAndDrop();
		}
	})
	that.ViewerManager({
		"insert" : "column",
		"animate" : "off"
	});
	that.ViewerManager({
		"insert" : "column",
		"animate" : "off"
	});
	

	
	
	
	that.updateCSS();
	
	
}

goog.inherits(Modal, XVWidget);
goog.exportSymbol('Modal', Modal);


/**
 * @const
 * @protected
 */
Modal.prototype.defaultArgs = {
	className: XVGlobals.classNames.Modal,
	layout: "all_columns",
	numViewers: 1,
	parent: document.body,
	minLeft: 50,
	minTop: 20,
	compressWidth: .33,
	expandWidth: .9,
	expanded: false,
	gutter: 10,
	marginWidth: 50,
	marginTop: 10,
	marginLeft: 10,
	expandButtonWidth: 30,
	galleryWidth: 100,
	MINIMUMHEIGHT: 400,
	heightPct: .90,
	CSS: {
		position: "fixed",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0,0,0,.5)",
		//"overflow-x": "hidden",
		//"overflow-y": "hidden",
		"display": "inline-block",
		"font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif'
	},
	modalCSS: {
		position: "absolute",
		backgroundColor: "rgba(0,0,0,1)",
		//border: "solid rgba(95, 95, 95, 1) 2px",
		border: "none",
		"border-radius": "20px"	
		// for height mins and maxes, see below
	}
}


