



//******************************************************
//  
//
//******************************************************
scanViewer.prototype.addLinkMenu = function(){

	var that = this;	
	
	var iconStartTop = 5;
	var imgDiv = 7;
	var iconDimSmall = 25;
	var iconDimMed = 35;
	var iconStartLeft = $(this.widget).width() - 20;
	var spacer = iconDimMed/2;	
	
	
	
	var iconVals = { 
					 1: { 
					 		images: ["Chain-Closed", "Chain-Closed_GroupPlus", "Chain-Closed_Group"],
					 		titles: ["Link slider to current group", "Link slider to new group", "Link slider to selected group"],
					 	},
					 2: {
					 		images: ["Chain-Broken_Minus",  "Chain-Broken_GroupMinus", "Broom_Minus" ],
					 		titles: ["Unlink from group", "Remove group", "Clear all groups"],
					 	},
					 3: {
							images: ["Eye"],
							titles: ["View all groups", ],
						}

					}
					
	
	// Calculate Width of subMenu
	var maxColumns = 0;
	var subMenuHeight = 0;
	for (var i in iconVals){
		if (maxColumns < iconVals[i].images.length){
			maxColumns = iconVals[i].images.length;
		}
		subMenuHeight += iconDimMed ;
	}	
	var subMenuWidth = maxColumns * (iconDimMed + spacer) + iconDimMed;


	//------------------------------
	// ADD Menu div
	//------------------------------	
	this.linkMenu = __makeElement__("div", this.widget, "linkMenu",{
		position: "absolute",
		left: iconStartLeft,
		top: iconStartTop,// + spacer*i,
		height: iconDimMed , 
		width: iconDimMed,
		//border: "sold 1px rgba(100,100,100,1)"
	});
	this.linkMenu.closed = false;
	
	
	
	//------------------------------
	// ADD Menu img (child of Menu DIV)
	//------------------------------	
	this.linkMenu.icon = __makeElement__("img", this.linkMenu, "icon",{
		position: "absolute",
		left: 0,
		top: 0,// + spacer*i,
		height: iconDimSmall , 
		width: iconDimSmall ,
		cursor: "pointer", 
	});	
	this.linkMenu.icon.src = "./icons/linkMenu/Chain-Broken.png";
	that.linkMenu.iconHovered = false;



	//------------------------------
	// SUB MENU
	//------------------------------	
	this.linkMenu.subMenu = __makeElement__("div", this.linkMenu, "subMenu",{
		position: "absolute",
		left: -subMenuWidth + iconDimMed,
		top: 0,
		height: subMenuHeight, 
		width: subMenuWidth,
		cursor: "pointer",
		//border: "solid 1px rgba(100,100,100,1)"
	});	
	// For onclick purposes
	this.linkMenu.subMenu.pinned = false;



	//------------------------------
	// ADD MENU ICONS
	//------------------------------
	this.linkMenu.subMenu.icons = [];	
	
	for (var i in iconVals){
		for (var j=0; j<iconVals[i].images.length; j++){

			var icon = __makeElement__("img", this.linkMenu.subMenu, "icon_" + iconVals[i].images[j],{
				position: "absolute",
				top: iconDimMed  * (i-1),
				// Right justify
				left: (subMenuWidth - iconDimMed*2 - spacer) - (j)*(iconDimMed + spacer),
				height: iconDimMed , 
				width: iconDimMed ,
				cursor: "pointer", 
			});	
			
			icon.src = "./icons/linkMenu/" + iconVals[i].images[j] + ".png";
			icon.title = iconVals[i].titles[j];
			
			this.linkMenu.subMenu.icons.push(icon);	
			
			if (icon.title == "Link slider to selected group"){
				
			}	
			
			
			else if (icon.title == "Link slider to current group"){
				icon.onclick = function(event){	

					event.stopPropagation();

					Globals.sliderLinker.addLinkMenuPopup(that);
				}				
			}
			
			
			else if (icon.title == "Link slider to new group"){
				icon.onclick = function(event){	

					
					event.stopPropagation();
					Globals.sliderLinker.addGroup();
					Globals.sliderLinker.lastViewerSelected = that;
					Globals.sliderLinker.setScanViewerClickListen(that);
					Globals.sliderLinker.lastViewerSelected.selectorBox.onclick();
					Globals.sliderLinker.lastViewerSelected.selectorBox.onclick();
					$(Globals.sliderLinker.linkMenu_Popup).fadeIn(Globals.animFast);
					
				}				
			}
			
			
			else if (icon.title == "Unlink from group"){
				icon.onclick = function(event){	
					
					Globals.sliderLinker.flashExisting();
					
					if (that.selectorBox && that.selectorBox.selected){
						Globals.sliderLinker.removeFromGroup(that, true);
					}

				}				
			}
			
			else if (icon.title == "Remove group"){
				icon.onclick = function(event){	
					
					Globals.sliderLinker.flashExisting();
					
					if (that.selectorBox && that.selectorBox.selected){
						Globals.sliderLinker.removeGroup(that);
					}

				}				
			}
			
			
			else if (icon.title == "Clear all groups"){
				icon.onclick = function(event){	
					
					alert("Are you sure you want to clear all groups?")
					Globals.sliderLinker.showExisting();
					//Globals.sliderLinker.clearAll();
					//if (that.selectorBox && that.selectorBox.selected){
					//	Globals.sliderLinker.removeGroup(that);
					//}

				}				
			}
			
			else if (icon.title == "View all groups"){
				icon.onclick = function(event){	
					
					if (typeof icon.viewAll === 'undefined'){
						icon.viewAll = false;
					}
					
					icon.viewAll = !icon.viewAll;
					
					if (icon.viewAll){
						Globals.sliderLinker.showExisting();
						subMenuIconBind(icon, false);
					}
					else{
						Globals.sliderLinker.hideExisting();
						subMenuIconBind(icon, true);
					}
				}				
			}
	

		}
	}	
	


	//
	//  SUB MENU - mouseleave
	//	
	function subMenuIconBind(icon, bind){
		if (bind){
			
			$(icon).bind('mouseenter.default', function(){
				if (that.linkMenu.iconHovered){
					$(this).stop().fadeTo(Globals.animFast, 1);
				}			
			})
			
			$(icon).bind('mouseleave.default', function(){
				if (that.linkMenu.iconHovered){
					$(this).stop().fadeTo(Globals.animFast, .5);
				}	
			});	
					
		}
		else{
			
			$(icon).unbind('mouseenter.default');
			$(icon).unbind('mouseleave.default');

		}	
	}
	



	//
	//  SUB MENU - mouseleave
	//	
	function subLeave(){
		
		$(that.linkMenu.subMenu).fadeOut(Globals.animFast);
		$(that.linkMenu.icon).fadeTo(Globals.animFast, .5);
		that.linkMenu.iconHovered = false;
				
	}
	
	
	//
	//  MAIN MENU - mouseenter
	//	
	function mainEnter(){

		if (that.linkMenu.iconHovered){
			
			$(that.linkMenu.icon).fadeTo(Globals.animFast, 1);
			$(that.linkMenu.subMenu).fadeIn(Globals.animFast);
						
		}	
	}
	
	
	
		
	//
	//  MAIN BINDING FUNCTION
	//
	function superBind(subMenuPinned){
		if (subMenuPinned){
			//
			// Unbind hover events to pin the subMenu
			//
			$(that.linkMenu.subMenu).unbind('mouseleave.link');
			$(that.linkMenu).unbind('mouseenter.link');				
		}
		else{
			//
			// Bind the hover events to unpin subMenu
			//
			$(that.linkMenu.subMenu).bind('mouseleave.link', subLeave);
			$(that.linkMenu).bind('mouseenter.link', mainEnter);
		}	
	}
	
	
	//------------------------------
	// 
	//------------------------------		
	function setHoverEvents(){
		
		//
		// MAIN MENU ICON - default fade state
		//
		$(that.linkMenu.icon).fadeTo(0,.5);
		
		
		//
		// SUB MENU - default fade state
		//		
		$(that.linkMenu.subMenu).fadeOut(0);
		
		
		//
		//  MAIN MENU ICON - mouseenter
		//
		$(that.linkMenu.icon).mouseenter(function(){
			that.linkMenu.iconHovered = true;
			mainEnter();
		})
		
		
		//
		// SUB MENU ICONS - mouseenter, mouseleave
		//
		for (var i=0;i<that.linkMenu.subMenu.icons.length; i++){
			
			var icon = that.linkMenu.subMenu.icons[i];
			$(icon).fadeTo(0,.5);
			subMenuIconBind(icon, true);

		}

		superBind(false);
	}	

	setHoverEvents();
}