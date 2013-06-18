//******************************************************
//  
//
//******************************************************
ScanViewer.prototype.addViewPlaneMenu = function () {

	var that = this;	
	var iconStartLeft = 7;
	var iconStartTop = 7;
	var imgDiv = 7;
	var iconDimSmall = 23;
	var iconDimMed = 35;
	var spacer = iconDimMed*1.2;	
	var iconVals = ['Sagittal', 'Coronal', 'Transverse'];//, '3D'];

	
	
	
	//------------------------------
	// MAIN MENU
	//------------------------------	
	this.ViewPlaneMenu = utils.dom.makeElement("div", this.widget, "ViewPlaneMenu",{
		position: "absolute",
		left: iconStartLeft,
		top: iconStartTop,
		height: iconDimSmall , 
		width: iconDimSmall,
		cursor: "pointer"
	});
	this.ViewPlaneMenu.title  = "Select View Plane";	
	
	
	
	
	//------------------------------
	// MAIN MENU ICON
	//------------------------------	
	this.ViewPlaneMenu.icon = utils.dom.makeElement("img", this.ViewPlaneMenu, "menuIcon",{
		position: "absolute",
		left: 0,
		top: 0,// + spacer*i,
		height: iconDimSmall , 
		width: iconDimSmall ,
		cursor: "pointer" 
	});	
	this.ViewPlaneMenu.icon.src  = "./icons/ViewPlaneMenu/Axes.png";	
	
	



	//------------------------------
	// SUB MENU
	//------------------------------	
	this.ViewPlaneMenu.subMenu = utils.dom.makeElement("div", this.ViewPlaneMenu, "subMenu",{
		position: "absolute",
		left: 0,//iconStartLeft  + iconDimMed,
		top: 0,// + spacer*i,
		height: iconDimMed , 
		width: spacer * iconVals.length,
		cursor: "pointer"
		//border: "solid 1px rgba(100,100,100,1)"
	});	
	// For onclick purposes
	this.ViewPlaneMenu.subMenu.pinned = false;
	



	//------------------------------
	// ADD MENU ICONS
	//------------------------------
	this.ViewPlaneMenu.subMenu.icons = [];	
	
	for (var i=0; i<iconVals.length; i++) {
			
		//
		// Icons
		//	
		var icon = utils.dom.makeElement("img", this.ViewPlaneMenu.subMenu, "icon_" + iconVals[i],{
			position: "absolute",
			top: 0,
			left: iconDimMed + spacer*(i),
			height: iconDimMed , 
			width: iconDimMed ,
			cursor: "pointer" 
		});	
		
		icon.src = "./icons/ViewPlaneMenu/" + iconVals[i] + ".png";
		icon.axis = iconVals[i];
		icon.title = iconVals[i];
		
		this.ViewPlaneMenu.subMenu.icons.push(icon);				


		
		//
		// SET onclick
		//
		if (icon.axis !== "3D") {
			icon.onclick = function (event) {
				utils.dom.stopPropagation(event); 
				if (that.FrameViewer.frames.length > 0) {
					that.FrameViewer.loadDroppable(that.FrameViewer.currDroppable, this.axis.toLowerCase());
					that.ViewPlaneMenu.activateIcon(this.title);
				} 
			};		
		}	
	}	


	
	
	//------------------------------
	// 
	//------------------------------		
	function setHoverEvents() {
		
		//
		// MAIN MENU ICON - default fade state
		//
		$(that.ViewPlaneMenu.icon).fadeTo(0,.5);
		
		
		//
		// SUB MENU - default fade state
		//		
		$(that.ViewPlaneMenu.subMenu).fadeOut(0);
		
		
		//
		//  MAIN MENU ICON - mouseenter
		//
		$(that.ViewPlaneMenu.icon).mouseenter(function () {

			that.ViewPlaneMenu.iconHovered = true;
			mainEnter();
		})
		
		
		//
		// SUB MENU ICONS - mouseenter, mouseleave
		//
		for (var i=0;i<that.ViewPlaneMenu.subMenu.icons.length; i++) {
			
			var icon = that.ViewPlaneMenu.subMenu.icons[i];
			$(icon).fadeTo(0,.5);
			subMenuIconBind(icon, true);

		}

		superBind(false);
	}


	
	
	//
	//  SUB MENU - mouseleave
	//	
	function subMenuIconBind(icon, bind) {
		
		if (bind) {
			
			$(icon).bind('mouseenter.default', function () {
				if (that.ViewPlaneMenu.iconHovered) {
					$(this).stop().fadeTo(GLOBALS.animFast, 1);
				}			
			})
			
			$(icon).bind('mouseleave.default', function () {
				if (that.ViewPlaneMenu.iconHovered) {
					$(this).stop().fadeTo(GLOBALS.animFast, .5);
				}	
			});	
					
		}
		else{
			
			$(icon).unbind('mouseenter.default');
			$(icon).unbind('mouseleave.default');

		}
		
	}
	
	this.ViewPlaneMenu.activateIcon = function (iconName) {

		for (var i=0;i<that.ViewPlaneMenu.subMenu.icons.length; i++) {
			
			var icon = that.ViewPlaneMenu.subMenu.icons[i];
			
			if (icon.title.toLowerCase() === iconName.toLowerCase()) {
			
				subMenuIconBind(icon, true);				
				$(icon).stop().fadeTo(GLOBALS.animFast, 1);

			}
			else{
				subMenuIconBind(icon, true);				
				$(icon).stop().fadeTo(GLOBALS.animFast, .5);				
			}
		}
		
	}
	
	
	
	
	//
	//  SUB MENU - mouseleave
	//	
	function subLeave() {

		$(that.ViewPlaneMenu.subMenu).fadeOut(GLOBALS.animFast);
		$(that.ViewPlaneMenu.icon).fadeTo(GLOBALS.animFast, .5);
		that.ViewPlaneMenu.iconHovered = false;
				
	}
	
	
	//
	//  MAIN MENU - mouseenter
	//	
	function mainEnter() {

		if (that.ViewPlaneMenu.iconHovered) {
			
			$(that.ViewPlaneMenu.icon).fadeTo(GLOBALS.animFast, 1);
			$(that.ViewPlaneMenu.subMenu).fadeIn(GLOBALS.animFast);
						
		}	
	}
	
	
	//
	//  MAIN BINDING FUNCTION
	//
	function superBind(subMenuPinned) {
		if (subMenuPinned) {
			//
			// Unbind hover events to pin the subMenu
			//
			$(that.ViewPlaneMenu.subMenu).unbind('mouseleave.axis');
			$(that.ViewPlaneMenu).unbind('mouseenter.axis');				
		}
		else{
			//
			// Bind the hover events to unpin subMenu
			//
			$(that.ViewPlaneMenu.subMenu).bind('mouseleave.axis', subLeave);
			$(that.ViewPlaneMenu).bind('mouseenter.axis', mainEnter);
		}	
	}
	
	
	//
	//  ONCLICK
	//
	function setOnclickEvents() {
		
		$(that.ViewPlaneMenu).click(function () {	
			
			that.ViewPlaneMenu.subMenu.pinned = !that.ViewPlaneMenu.subMenu.pinned;
			
			superBind(that.ViewPlaneMenu.subMenu.pinned)			
			
		})
	}
	
	



	//
	// Function calls
	//
	setHoverEvents();
	setOnclickEvents();
}