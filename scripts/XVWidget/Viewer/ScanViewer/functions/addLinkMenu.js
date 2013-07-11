



//******************************************************
//  
//
//******************************************************
ScanViewer.prototype.addLinkMenu = function () {

	var that = this;	
	
	var iconStartTop = 5;
	var imgDiv = 7;
	var iconDimSmall = 25;
	var iconDimMed = 35;
	var iconStartLeft = utils.css.dims(this.widget, 'width') - 20;
	var spacer = iconDimMed/2;	
	
	
	
	var iconVals = { 
					 1: { 
					 		images: ["Chain-Closed", "Chain-Closed_GroupPlus", "Chain-Closed_Group"],
					 		titles: ["Link slider to current group", "Link slider to new group", "Link slider to selected group"]
					 	},
					 2: {
					 		images: ["Chain-Broken_Minus",  "Chain-Broken_GroupMinus", "Broom_Minus" ],
					 		titles: ["Unlink from group", "Remove group", "Clear all groups"]
					 	},
					 3: {
							images: ["Eye"],
							titles: ["View all groups"]
						}

					}
					
	
	// Calculate Width of subMenu
	var maxColumns = 0;
	var subMenuHeight = 0;
	for (var i in iconVals) {
		if (maxColumns < iconVals[i].images.length) {
			maxColumns = iconVals[i].images.length;
		}
		subMenuHeight += iconDimMed ;
	}	
	var subMenuWidth = maxColumns * (iconDimMed + spacer) + iconDimMed;


	//------------------------------
	// ADD Menu div
	//------------------------------	
	this.LinkMenu = utils.dom.makeElement("div", this.widget, "LinkMenu",{
		position: "absolute",
		left: iconStartLeft,
		top: iconStartTop,// + spacer*i,
		height: iconDimMed , 
		width: iconDimMed
		//border: "sold 1px rgba(100,100,100,1)"
	});
	this.LinkMenu.closed = false;
	
	
	
	//------------------------------
	// ADD Menu img (child of Menu DIV)
	//------------------------------	
	this.LinkMenu.icon = utils.dom.makeElement("img", this.LinkMenu, "icon",{
		position: "absolute",
		left: 0,
		top: 0,// + spacer*i,
		height: iconDimSmall , 
		width: iconDimSmall ,
		cursor: "pointer"
	});	
	this.LinkMenu.icon.src = "./icons/LinkMenu/Chain-Broken.png";
	that.LinkMenu.iconHovered = false;



	//------------------------------
	// SUB MENU
	//------------------------------	
	this.LinkMenu.subMenu = utils.dom.makeElement("div", this.LinkMenu, "subMenu",{
		position: "absolute",
		left: -subMenuWidth + iconDimMed,
		top: 0,
		height: subMenuHeight, 
		width: subMenuWidth,
		cursor: "pointer"
		//border: "solid 1px rgba(100,100,100,1)"
	});	
	// For onclick purposes
	this.LinkMenu.subMenu.pinned = false;



	//------------------------------
	// ADD MENU ICONS
	//------------------------------
	this.LinkMenu.subMenu.icons = [];	
	
	var i, j, iconImage, icon;
	
	for (i in iconVals) {
		
		utils.array.forEach(iconVals[i].images, function(iconImage, j) {
			
			var icon = utils.dom.makeElement("img", this.LinkMenu.subMenu, "Icon_" + iconImage,{
				position: "absolute",
				top: iconDimMed  * (i-1),
				left: (subMenuWidth - iconDimMed*2 - spacer) - (j)*(iconDimMed + spacer),
				height: iconDimMed , 
				width: iconDimMed ,
				cursor: "pointer" 
			});	
			
			icon.src = "./icons/LinkMenu/" + iconImage + ".png";
			icon.title = iconVals[i].titles[j];
			
			this.LinkMenu.subMenu.icons.push(icon);	
			
			if (icon.title === "Link slider to selected group") {
				
			}	
			
			
			else if (icon.title === "Link slider to current group") {
				icon.onclick = function (event) {	

					utils.dom.stopPropagation(event);
					GLOBALS.SliderLinker.addLinkMenuPopup(that);
					that.LinkMenu.childNodes[0].src = "./icons/LinkMenu/Chain-Closed.png";
				}				
			}
			
			
			else if (icon.title === "Link slider to new group") {
				icon.onclick = function (event) {	

					
					utils.dom.stopPropagation(event);
					GLOBALS.SliderLinker.addGroup();				
					GLOBALS.SliderLinker.addLinkMenuPopup(that, "Select viewers for new link group.  Click 'Done' when finished.");
					that.LinkMenu.childNodes[0].src = "./icons/LinkMenu/Chain-Closed.png";
					
				}				
			}
			
			
			else if (icon.title === "Unlink from group") {
				icon.onclick = function (event) {	
					
					GLOBALS.SliderLinker.flashExisting();
					
					if (that.selectorBox) {
						GLOBALS.SliderLinker.removeFromGroup(that, true);
						that.LinkMenu.childNodes[0].src = "./icons/LinkMenu/Chain-Broken.png";
					}

				}				
			}
			
			else if (icon.title === "Remove group") {
				icon.onclick = function (event) {	
					
					GLOBALS.SliderLinker.flashExisting();
					
					if (that.selectorBox) {
						GLOBALS.SliderLinker.removeGroup(that);
						that.LinkMenu.childNodes[0].src = "./icons/LinkMenu/Chain-Broken.png";
					}

				}				
			}
			
			
			else if (icon.title === "Clear all groups") {
				icon.onclick = function (event) {	

					GLOBALS.SliderLinker.showExisting();
					GLOBALS.SliderLinker.addClearAllPopup(that);
					
					XV.ViewerManager( function (Viewer) {
						if (Viewer.type == 'ScanViewer') {
							Viewer.LinkMenu.childNodes[0].src = "./icons/LinkMenu/Chain-Broken.png";
						}		
					});

				}				
			}
			
			else if (icon.title === 'View all groups') {
				icon.onclick = function (event) {	
					
					// Create the viewAll parameter
					if (typeof icon.viewAll === 'undefined') { 
						icon.viewAll = false; 
					}	
					
					// Invert		
					icon.viewAll = !icon.viewAll;
					
					// If there is an event...
					if (typeof event !== 'undefined') {
						// Initiate global view
						if (icon.viewAll) {
							GLOBALS.SliderLinker.stayVisible = true;
							GLOBALS.SliderLinker.showExisting();
						}
						else{
							GLOBALS.SliderLinker.stayVisible = false;
							GLOBALS.SliderLinker.hideExisting();
						}	
						
						// Re-invert on the button pressed
						var icons;
						
						icon.viewAll = !icon.viewAll;
						XV.ViewerManager( function (Viewer) { 
							
							// CAll onclick on all Viewer eye buttons
							// this will send you below
							if (Viewer.type === 'ScanViewer') {
								icons = Viewer.LinkMenu.subMenu.icons;
								
								utils.array.forEach(icons, function(icon) {
									if (icon.title === 'View all groups') {
										icon.onclick();
									}								
								})
																
							}

							
						})					
					}
					else {
						if (icon.viewAll === true) {
							subMenuIconBind(icon, false); 
							utils.fx.FadeIn(this, 0); 
						}
						else {
							subMenuIconBind(icon, true); 
							utils.fx.FadeTo(this, 0, .5); 
						}
					}

				}				
			}
	

		});
	}	
	


}