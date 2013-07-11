//******************************************************
//  Init
//
//******************************************************
goog.require('XVGlobals');

goog.provide('SliderLinker');

SliderLinker = function (args) {
	
	var that = this;



	/**
	 * @type {Array.<Array.<number>>}
	 * @private
	 */		
	this.borderColorSet_ = [
		[155,205,5,1],
		[21,2,200,1],
		[25,200,55,1],
		[200,5,200,1],
		[0,255,0,1],
		[0,200,0,1],
		[0,0,200,1],
		[200,0,0,1],
		[200,200,0,1]
	];
	
	/**
	 * @type {Array}
	 * @private
	 */	
	this.groups_ = [];


		
	this.addGroup();	
}


goog.exportSymbol('SliderLinker', SliderLinker);



/**
 * @type {number}
 * @const
 */		
SliderLinker.MAX_GROUPS = XVGlobals.MAX_SCROLL_LINK_GROUPS;
	
/**
 * @type {Object} 
 * @const
 * @private
 */
SliderLinker.popupArgs = {
	widgetCSS: {
  		fontFamily: utils.globals.fontFamily,
  		fontSize: utils.globals.fontSizeM,
  		color: "rgba(255,255,255,1)",
  		border: "solid",
  		borderWidth: 1,
  		borderColor: "rgba(255,255,255,1)",
  		backgroundColor: "rgba(0,0,0,1)",
  		borderRadius: 0,
  		zIndex: 10000
  	},
  	
  	buttonCSS: {
  		height: utils.globals.fontSizeM * 2,
  		position: "absolute",
  		border: "solid",
  		color: "rgba(255,255,255,1)",	  		
  		borderWidth: 1,
  		borderColor: "rgba(255,255,255,1)",
  		backgroundColor: "rgba(125,125,125,1)",
  		borderRadius: 0,
  		cursor: "pointer"
  	}
}


/**
 * @expose
 * @return {Array}
 */
SliderLinker.prototype.getGroups = function () {
	return this.groups_;
}


/**
 * @expose
 * @ return {Object}
 */
SliderLinker.prototype.lastGroup = function () {
	return this.groups_[this.groups_.length - 1];
}	 


/**
 * @expose
 */
SliderLinker.prototype.addGroup = function () {

	this.groups_.push({
		border: "solid 2px rgba(" + this.borderColorSet_[this.groups_.length].toString() + ")",
		groupID: "linkGroup_" + this.groups_.length,
		Viewers: [],
		prevViewers: []
	})		

}


/**
 * @param {Object}
 * @private
 */		
SliderLinker.prototype.addToLastGroup = function (Viewer) {
	//
	//  Remove the scan viewer from group if it exists
	//
	this.removeFromGroup(Viewer, false);
	
	
	//
	//  1. Add the Viewer to the last group
	//
	if (this.groups_[this.groups_.length - 1].ViewerManager.indexOf(Viewer) === -1) {
	
		//("HERE - last group: ", this.lastGroup().border)
		this.groups_[this.groups_.length - 1].ViewerManager.push(Viewer);
		
		//
		//  Set the border color
		//
		Viewer.selectorBox.style.border = this.lastGroup().border;
		utils.fx.fadeTo(Viewer.selectorBox, XVGlobals.animFast, 1);
		//(Viewer.selectorBox.style.border)

	}

}


/**
 * @param {Object}
 * @private
 */	
SliderLinker.prototype.clearSelectorBox = function (Viewer) {
	
	//("CLEARING SELECTOR BOX of ", Viewer.widget.id)
	Viewer.selectorBox.style.border = "none";		
	
	goog.events.unlisten(Viewer.widget, goog.events.EventType.MOUSEOVER, that.sliderlink_mouseover);
	goog.events.unlisten(Viewer.widget, goog.events.EventType.MOUSEOUT, that.sliderlink_mouseout);
	
	utils.array.forEach(Viewer.widget.defaultMouseEvents, function(event) {
		event();		
	})

	Viewer.FrameSlider.clearLinked();		
}




/**
 * @param {Object}
 * @param {boolean=}
 * @return {boolean}
 */		
SliderLinker.prototype.removeFromGroup = function (viewerInGroup, clearSelectorBox) {

	var tempInd, viewer;
	var removed = false;
	
	
	utils.array.forEach(this.groups_,  function(group){
		
		if (!removed) {
			
			tempInd = group.ViewerManager.indexOf(viewerInGroup);	
			
			if (tempInd > -1) {

				if (clearSelectorBox) {
					that.clearSelectorBox(group.ViewerManager[tempInd]);						
				}					
				group.ViewerManager.splice(tempInd, 1);		

				removed = true;	
			}									
		}							
	})
	
	
	return removed;
}


/**
 * @param {Object}
 */		
SliderLinker.prototype.removeGroup = function (viewerInGroup) {

	var tempInd, findIndex, removed;
	
	
	that.forEach_({
		
		before: function(group, groups) {
			if (!removed) {
				tempInd = group.ViewerManager.indexOf(viewerInGroup);					
			}
		},
		
		during: function(viewer, group) {
			if (tempInd > -1 && !removed) {
				that.clearSelectorBox(viewer);
			}													
		},
		
		after: function(group, groups) {
			if (tempInd > -1 && !removed)  {
				
				findIndex = groups.indexOf(group);
				if (i>0) {
					groups.splice(findIndex, 1);
				} else {
					group.ViewerManager = [];
				}
				removed = true;
			}				
		}	
	})
}




/**
 * @param {Element}
 * @param {Object}
 * @return {Element}
 */		
SliderLinker.prototype.addSelectorBox = function (parent, dims) {
	
	var newDims = utils.dom.mergeArgs(dims, {
		position: "absolute",
		border: "solid 3px rgba(255,0,0,1)",
		cursor: "pointer"
	})
	var box =  utils.dom.makeElement("div", parent, "selectorBox", newDims);
	return box;
	
}	




/**
 * @private
 */		
SliderLinker.prototype.clearAll_ = function () {
		
	
	XV.ViewerManager( function (Viewer) {
			that.removeFromGroup(Viewer, true);
	});

	this.groups_ = [];
	this.addGroup();
}




/**
 * @param {string}
 */		
SliderLinker.prototype.getViewerSetFromID = function (ID) {
	
	that.forEach_(function(viewer, group) {		
					
		if (viewer.widget.id === ID) {
			return {
				viewer: viewer,
				viewerset: group.ViewerManager
			}
		}
		
	})	
		
}




/**
 * @param{number=}
 */			
SliderLinker.prototype.showExisting = function (delay ) {
	
	var delayVal = (delay) ? delay: 0;

	that.forEach_(function(viewer, group) {					
		
		var fadeIn = function() {	
			utils.fx.fadeIn(viewer, XVGlobals.animFast);		
		}
	    var delayAnim = new goog.async.Delay(fadeIn, delayVal);
        delayAnim.start();
		
	})
}




/**
 * @param{number=}
 */		
SliderLinker.prototype.hideExisting = function (delay) {
	
	var delayVal = (delay) ? delay: 0;
	
	if (!this.stayVisible) { 
		that.forEach_(function(viewer, group) {				
			
			var fadeOut = function() {	
				utils.fx.fadeOut(viewer, XVGlobals.animFast);		
			}
		    var delayAnim = new goog.async.Delay(fadeOut, delayVal);
	        delayAnim.start();
	
		})		
	}
	
}




/**
 * @param{number=}
 */
SliderLinker.prototype.flashExisting = function (delay) {
	
	var delayVal = (delay) ? delay: 500;
	
	that.forEach_(function(viewer, group) {
		
		utils.fx.fadeIn(viewer.selectorBox, XVGlobals.animFast, function() {
			
			var fadeOut = function() {	
				utils.fx.fadeOut(viewer, XVGlobals.animFast);		
			}
		    var delayAnim = new goog.async.Delay(fadeOut, delayVal);
	        delayAnim.start();
	        
		});

	})			
}




/**
 * @param {Element}
 * @private
 */	
SliderLinker.prototype.disableSelectorBox_ = function (selectorBox) {
	utils.css.setCSS( selectorBox, {'pointer-events': 'none'});		
}




/**
 * @param {Element}
 * @private
 */	
SliderLinker.prototype.enableSelectorBox_ = function (selectorBox) {
	utils.css.setCSS( selectorBox, {'pointer-events': 'auto'});		
}




/**
 * @private
 */
SliderLinker.prototype.takeSnapshot_ = function () {
	that.forEach_(function(viewer) {
		group.prevViewers.push(viewer);		
	})
}




/**
 * @param {(function|object)}
 * @private
 */
 SliderLinker.prototype.forEach_ = function(callbacks) {

	var callbacks_ = {};

	if (typeof callbacks === 'function') {
	
		callbacks_.during = callbacks;
	
	} else if (typeof callbacks === 'object') {
	
		callbacks_ = {};
	
	}
	utils.array.forEach(groups,  function(group){
		
		if (callbacks_.before) { 
			callbacks_.before(group, groups);
		}
		
		
		utils.array.forEach(group.ViewerManager,  function(viewer){
		
			if (callbacks_.during) { 
				callbacks_.during(viewer, group, groups);
			}
		
		})
		
		
		if (callbacks_.after) { 
			callbacks_.after(group, groups);
		}
		
	})	
}
	
	
/**
 * @protected
 */	
SliderLinker.prototype.cancel = function () {
	
	that.forEach_({
		
		'during' : function(viewer) {
			that.clearSelectorBox(viewer);			
		},
		
		'after' : function(group) {
			group.ViewerManager = this.groups_[i].prevViewers;
			group.prevViewers = [];		
			that.hideExisting();					
		}
		
	})

	

	this.processGroups();			
}


/**
 * @private
 */
SliderLinker.prototype.processGroups = function () {
	

	//
	//  Clear all mouse-related events from selectorBoxes
	//
	XV.ViewerManager( function (Viewer) {
		
		that.disableSelectorBox_(Viewer.selectorBox);
		that.hideExisting(500);
						
	});

	
	
	//
	//  Process viewers that are in an existing groups
	//
	that.forEach_(function(viewer) {

		goog.events.listen(viewer.widget, goog.events.EventType.MOUSEOVER, that.sliderlink_mouseover);
		goog.events.listen(viewer.widget, goog.events.EventType.MOUSEOUT, that.sliderlink_mouseout);

	})
	
}

/**
 * @param {goog.events.Event}
 * @private
 */
SliderLinker.prototype.sliderlink_mouseover = function (event) {	
	console.log('sliderlink - mouseover', event);	
	//
	//  Get the linked set based on the event.currentTarget.id
	//
	var set = XVGlobals.SliderLinker.getViewerSetFromID(event.currentTarget.id);		
	//
	//  Get the viewer that's being hovered
	//			
	var mouseoverViewer = set.viewer;
	//
	//  Get the set of the viewer that's associated with the hovered viewer
	//
	var viewerGroup = set.viewerset;
	//
	//  Loop through viewergroup, apply "linkSlider" rule on !mouseoverViewer viewers
	//
	utils.array.forEach( viewerGroup, function(otherViewer) { 
		if (otherViewer !== mouseoverViewer) {
			mouseoverViewer.FrameSlider.linkSlider(otherViewer.FrameSlider);	
		}		
	})
}



/**
 * @param {goog.events.Event}
 * @private
 */
SliderLinker.prototype.sliderlink_mouseout =  function (event) {	
	console.log('sliderlink - mouseout: ', event);				
	var set = XVGlobals.SliderLinker.getViewerSetFromID(event.currentTarget.id);
	
	if (set) {				
		set.viewer.FrameSlider.clearLinked();						
	}
}