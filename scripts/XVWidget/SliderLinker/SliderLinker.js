//******************************************************
//  Init
//
//******************************************************
var SliderLinker = function (args) {
	
	var that = this;
	
	this.maxGroups = GLOBALS.maxScrollLinkGroups;
	
	var ViewerBoxs = [];
	
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
	

	
	var groups = [];
	var prevGroups = [];
	
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

	
	this.addToLastGroup = function (ViewerBox) {

		//("ADD TO LAST GROUP: ", ViewerBox.widget.id)
		//
		//  Remove the scan viewer from group if it exists
		//
		this.removeFromGroup(ViewerBox, false);
		
		
		//
		//  1. Add the ViewerBox to the last group
		//
		if (groups[groups.length - 1].Viewers.indexOf(ViewerBox) === -1) {
		
			//("HERE - last group: ", this.lastGroup().border)
			groups[groups.length - 1].Viewers.push(ViewerBox);
			
			//
			//  Set the border color
			//
			ViewerBox.selectorBox.style.border = this.lastGroup().border;
			$(ViewerBox.selectorBox).fadeTo(GLOBALS.animFast, 1);
			//(ViewerBox.selectorBox.style.border)

		}
	
	}
	
	this.clearSelectorBox = function (ViewerBox) {
		
		//("CLEARING SELECTOR BOX of ", ViewerBox.widget.id)
		ViewerBox.selectorBox.style.border = "none";		

		$(ViewerBox.widget).unbind('mouseenter.sliderlink');
		$(ViewerBox.widget).unbind('mouseleave.sliderlink');
		
		for (var i = 0, len = ViewerBox.widget.defaultMouseEvents.length; i < len; i++) {			
			ViewerBox.widget.defaultMouseEvents[i]();
			
		}
		ViewerBox.FrameSlider.clearLinked();		
	}
	
	
	
	this.removeFromGroup = function (ViewerBox, clearSelectorBox) {

		var tempInd;
		for (var i = 0, len = groups.length; i < len; i++) {			
			tempInd = groups[i].Viewers.indexOf(ViewerBox);
			
			if (tempInd > -1) {
				
				//("removing ", ViewerBox.widget.id, " from group ", groups[i].groupID)
				
				var viewer = groups[i].Viewers[tempInd];
				groups[i].Viewers.splice(tempInd, 1);		
				
				if (clearSelectorBox) {
					this.clearSelectorBox(viewer);						
				}
	
				return true;		
			}
		}
		return false;
	}
	
	
	this.removeGroup = function (ViewerBox) {

		var tempInd;
		for (var i = 0, len = groups.length; i < len; i++) {			
			tempInd = groups[i].Viewers.indexOf(ViewerBox);
			
			if (tempInd > -1) {
				
				for (var j = 0, len2 = groups[i].Viewers.length; j < len2; j++) {					
					var viewer = groups[i].Viewers[j];						

					this.clearSelectorBox(viewer);						
				}

				if (i>0) {
					groups.splice(i, 1);
				}
				else{
					groups[i].Viewers = [];
				}
				return;
			
			}
		}
	}

	
	this.addSelectorBox = function (parent, Top, Left, Height, Width) {
		var box =  utils.dom.makeElement("div", parent, "selectorBox", {
			position: "absolute",
			top: Top,
			left: Left,
			height: Height,
			width: Width,
			border: "solid 3px rgba(255,0,0,1)",
			cursor: "pointer"
		})
		return box;
	}	
	
	
	this.clearAll = function () {
			
		
		XV.Viewers( function (ViewerBox) {
				that.removeFromGroup(ViewerBox, true);
		});

		groups = [];
		this.addGroup();
	}
	
	
	
	this.getViewerSetFromID = function (ID) {
		for (var i = 0, len = groups.length; i < len; i++) {			
			for (var j = 0, len2 = groups[i].Viewers.length; j < len2; j++) {				
				if (groups[i].Viewers[j].widget.id === ID) {
					return {
						viewer: groups[i].Viewers[j],
						viewerset: groups[i].Viewers
					}
				}
			}
		}		
	}
	
	
	this.showExisting = function (delay ) {
		
		var delayVal = (delay) ? delay: 0;

		for (var i = 0, len = groups.length; i < len; i++) {			
			for (var j = 0, len2 = groups[i].Viewers.length; j < len2; j++) {				
				var viewer = groups[i].Viewers[j];
				
				$(viewer.selectorBox).delay(delayVal).fadeTo(GLOBALS.animFast, 1)
				
			}
		}
	}
	
	
	this.hideExisting = function (delay) {
		
		var delayVal = (delay) ? delay: 0;
		
		if (!this.stayVisible) { 
			for (var i = 0, len = groups.length; i < len; i++) {				
				for (var j = 0, len2 = groups[i].Viewers.length; j < len2; j++) {					
					var viewer = groups[i].Viewers[j];
					
					$(viewer.selectorBox).delay(delayVal).fadeTo(GLOBALS.animFast, 0)
					
				}
			}		
		};

	}
	
	
	this.flashExisting = function (delay) {
		
		var delayVal = (delay) ? delay: 500;
		
		for (var i = 0, len = groups.length; i < len; i++) {			
			for (var j = 0, len2 = groups[i].Viewers.length; j < len2; j++) {				
				var viewer = groups[i].Viewers[j];
				
				$(viewer.selectorBox).fadeTo(GLOBALS.animFast, 1).delay(delayVal).fadeTo(GLOBALS.animFast, 0)
				
			}
		}
	}
	
	
	
	this.disableSelectorBox = function (selectorBox) {
		utils.css.setCSS( selectorBox, {'pointer-events': 'none'});		
	}
	
	

	this.enableSelectorBox = function (selectorBox) {
		
		utils.css.setCSS( selectorBox, {'pointer-events': 'auto'});		
	
	}
	

	
	this.takeSnapshot = function () {
		
		for (var i = 0, len = groups.length; i < len; i++) {			
			for (var j = 0, len2 = groups[i].Viewers.length; j < len2; j++) {				
				var viewer = groups[i].Viewers[j];
				groups[i].prevViewers.push(viewer);
				
			}
		}
			
	}
	
	this.cancel = function () {
		
		for (var i = 0, len = groups.length; i < len; i++) {			
			for (var j = 0, len2 = groups[i].Viewers.length; j < len2; j++) {				
				this.clearSelectorBox(groups[i].Viewers[j]);
				
			}
			
			groups[i].Viewers = groups[i].prevViewers;
			groups[i].prevViewers = [];		

			this.hideExisting();
		}	
		

		this.processGroups();			
	}
	
	this.processGroups = function () {
		
		
		//
		//  Clear all mouse-related events from selectorBoxes
		//
		XV.Viewers( function (ViewerBox) {
			
			that.disableSelectorBox(ViewerBox.selectorBox);
			that.hideExisting(500);
							
		});

		
		
		//
		//  PRocess viewers that are in an existing groups
		//
		for (var i = 0, len = groups.length; i < len; i++) {			
			for (var j = 0, len2 = groups[i].Viewers.length; j < len2; j++) {
				var ViewerBox = groups[i].Viewers[j];
				var viewerSet = groups[i].Viewers;

				
				$(ViewerBox.widget).bind('mouseenter.sliderlink', function () {
					
					var set = GLOBALS.SliderLinker.getViewerSetFromID(this.id);					
					var ViewerBox = set.viewer;
					var viewerGroup = set.viewerset;
					

					
					for (var k = 0, len3 = viewerGroup.length; k < len3; k++) {											
						if (viewerGroup[k] !== ViewerBox) {

							ViewerBox.FrameSlider.linkSlider(viewerGroup[k].FrameSlider);	
												
						}
						
					}	
					

				}).bind('mouseleave.sliderlink', function () {	
					
					var set = GLOBALS.SliderLinker.getViewerSetFromID(this.id);
					if (set) {
						var ViewerBox = set.viewer;					
						ViewerBox.FrameSlider.clearLinked();						
					}

					
				});	
			}
			
		}
	}

		
	this.addGroup();
	
}
