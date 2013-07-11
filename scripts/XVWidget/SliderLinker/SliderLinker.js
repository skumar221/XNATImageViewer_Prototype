//******************************************************
//  Init
//
//******************************************************
var SliderLinker = function (args) {
	
	var that = this;

	/**
	 * @type {number}
	 */		
	this.maxGroups = GLOBALS.maxScrollLinkGroups;

	/**
	 * @type {Array}
	 */	
	var Viewers = [];


	/**
	 * @type {Array.<Array.<number>>}
	 */		
	var borderColorSet = [
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
	 */	
	var groups = [];
	
	/**
	 * @type {Array}
	 */
	var prevGroups = [];
	
	
	/**
	 * @type {Object} 
	 * @private
	 */
	this.popupArgs = {
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



	this.getGroups = function () {
		return groups;
	}



	this.lastGroup = function () {
		return groups[groups.length - 1];
	}	 



	this.addGroup = function () {

		groups.push({
			border: "solid 2px rgba(" + borderColorSet[groups.length].toString() + ")",
			groupID: "linkGroup_" + groups.length,
			Viewers: [],
			prevViewers: []
		})		

	}


	/**
	 * @param {Object}
	 * @private
	 */		
	this.addToLastGroup = function (Viewer) {
		//
		//  Remove the scan viewer from group if it exists
		//
		this.removeFromGroup(Viewer, false);
		
		
		//
		//  1. Add the Viewer to the last group
		//
		if (groups[groups.length - 1].ViewerManager.indexOf(Viewer) === -1) {
		
			//("HERE - last group: ", this.lastGroup().border)
			groups[groups.length - 1].ViewerManager.push(Viewer);
			
			//
			//  Set the border color
			//
			Viewer.selectorBox.style.border = this.lastGroup().border;
			utils.fx.fadeTo(Viewer.selectorBox, GLOBALS.animFast, 1);
			//(Viewer.selectorBox.style.border)

		}
	
	}
	
	
	/**
	 * @param {Object}
	 * @private
	 */	
	this.clearSelectorBox = function (Viewer) {
		
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
	this.removeFromGroup = function (viewerInGroup, clearSelectorBox) {

		var tempInd, viewer;
		var removed = false;
		
		
		utils.array.forEach(groups,  function(group){
			
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
	this.removeGroup = function (viewerInGroup) {

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
	this.addSelectorBox = function (parent, dims) {
		
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
	this.clearAll_ = function () {
			
		
		XV.ViewerManager( function (Viewer) {
				that.removeFromGroup(Viewer, true);
		});

		groups = [];
		this.addGroup();
	}
	
	
	
	
	/**
	 * @param {string}
	 */		
	this.getViewerSetFromID = function (ID) {
		
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
	this.showExisting = function (delay ) {
		
		var delayVal = (delay) ? delay: 0;

		that.forEach_(function(viewer, group) {					
			
			var fadeIn = function() {	
				utils.fx.fadeIn(viewer, GLOBALS.animFast);		
			}
		    var delayAnim = new goog.async.Delay(fadeIn, delayVal);
	        delayAnim.start();
			
		})
	}
	
	
	

	/**
	 * @param{number=}
	 */		
	this.hideExisting = function (delay) {
		
		var delayVal = (delay) ? delay: 0;
		
		if (!this.stayVisible) { 
			that.forEach_(function(viewer, group) {				
				
				var fadeOut = function() {	
					utils.fx.fadeOut(viewer, GLOBALS.animFast);		
				}
			    var delayAnim = new goog.async.Delay(fadeOut, delayVal);
		        delayAnim.start();
		
			})		
		}
		
	}
	
	


	/**
	 * @param{number=}
	 */
	this.flashExisting = function (delay) {
		
		var delayVal = (delay) ? delay: 500;
		
		that.forEach_(function(viewer, group) {
			
			utils.fx.fadeIn(viewer.selectorBox, GLOBALS.animFast, function() {
				
				var fadeOut = function() {	
					utils.fx.fadeOut(viewer, GLOBALS.animFast);		
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
	this.disableSelectorBox_ = function (selectorBox) {
		utils.css.setCSS( selectorBox, {'pointer-events': 'none'});		
	}
	
	


	/**
	 * @param {Element}
	 * @private
	 */	
	this.enableSelectorBox_ = function (selectorBox) {
		utils.css.setCSS( selectorBox, {'pointer-events': 'auto'});		
	}
	


	
	/**
	 * @private
	 */
	this.takeSnapshot_ = function () {
		that.forEach_(function(viewer) {
			group.prevViewers.push(viewer);		
		})
	}




	/**
	 * @param {(function|object)}
	 * @private
	 */
	 this.forEach_ = function(callbacks) {

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
	this.cancel = function () {
		
		that.forEach_({
			
			'during' : function(viewer) {
				that.clearSelectorBox(viewer);			
			},
			
			'after' : function(group) {
				group.ViewerManager = groups[i].prevViewers;
				group.prevViewers = [];		
				that.hideExisting();					
			}
			
		})

		

		this.processGroups();			
	}
	
	
	
	/**
	 * @private
	 */
	this.processGroups = function () {
		

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

		
	this.addGroup();
	
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
	var set = GLOBALS.SliderLinker.getViewerSetFromID(event.currentTarget.id);		
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
	var set = GLOBALS.SliderLinker.getViewerSetFromID(event.currentTarget.id);
	
	if (set) {				
		set.viewer.FrameSlider.clearLinked();						
	}
}