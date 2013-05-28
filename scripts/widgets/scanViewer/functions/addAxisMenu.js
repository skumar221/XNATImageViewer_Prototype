//******************************************************
//  
//
//******************************************************
ScanViewer.prototype.addAxisMenu = function () {

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
	this.axisMenu = __makeElement__("div", this.widget, "axisMenu",{
		position: "absolute",
		left: iconStartLeft,
		top: iconStartTop,
		height: iconDimSmall , 
		width: iconDimSmall,
	});
	this.axisMenu.title  = "Select View Plane";	
	
	
	
	
	//------------------------------
	// MAIN MENU ICON
	//------------------------------	
	this.axisMenu.icon = __makeElement__("img", this.axisMenu, "menuIcon",{
		position: "absolute",
		left: 0,
		top: 0,// + spacer*i,
		height: iconDimSmall , 
		width: iconDimSmall ,
		cursor: "pointer", 
	});	
	this.axisMenu.icon.src  = "./icons/axisMenu/Axes.png";	
	
	



	//------------------------------
	// SUB MENU
	//------------------------------	
	this.axisMenu.subMenu = __makeElement__("div", this.axisMenu, "subMenu",{
		position: "absolute",
		left: 0,//iconStartLeft  + iconDimMed,
		top: 0,// + spacer*i,
		height: iconDimMed , 
		width: spacer * iconVals.length,
		cursor: "pointer"
		//border: "solid 1px rgba(100,100,100,1)"
	});	
	// For onclick purposes
	this.axisMenu.subMenu.pinned = false;
	



	//------------------------------
	// ADD MENU ICONS
	//------------------------------
	this.axisMenu.subMenu.icons = [];	
	
	for (var i=0; i<iconVals.length; i++) {
			
		//
		// Icons
		//	
		var icon = __makeElement__("img", this.axisMenu.subMenu, "icon_" + iconVals[i],{
			position: "absolute",
			top: 0,
			left: iconDimMed + spacer*(i),
			height: iconDimMed , 
			width: iconDimMed ,
			cursor: "pointer", 
		});	
		
		icon.src = "./icons/axisMenu/" + iconVals[i] + ".png";
		icon.axis = iconVals[i];
		icon.title = iconVals[i];
		
		this.axisMenu.subMenu.icons.push(icon);				


		
		//
		// SET onclick
		//
		if (icon.axis != "3D") {
			icon.onclick = function (event) {
				event.stopPropagation(); 
				if (that.FrameViewer.frames.length > 0) {
					that.FrameViewer.loadFramesByAxis(this.axis, that.axisIcons);
					that.axisMenu.activateIcon(this.title);
				} 
			};		
		}	
	}	

	
	
	//------------------------------
	// ADD TO DEFAULT MOUSE EVENTS TO SCANVIEWER
	//------------------------------
	/*
	this.widget.defaultMouseEvents.push(function () {
		$(that.axisMenu).fadeOut(0);
		$(that.widget).bind('mouseenter.axismenu', function () {
			$(that.axisMenu).stop().fadeTo(GLOBALS.animFast,1);
		}).bind('mouseleave.axismenu', function () {
			$(that.axisMenu).stop().fadeTo(GLOBALS.animFast,0);
		})		
	})
	this.widget.defaultMouseEvents[this.widget.defaultMouseEvents.length -1]();
	*/
	
	
	
	
	//------------------------------
	// 
	//------------------------------		
	function setHoverEvents() {
		
		//
		// MAIN MENU ICON - default fade state
		//
		$(that.axisMenu.icon).fadeTo(0,.5);
		
		
		//
		// SUB MENU - default fade state
		//		
		$(that.axisMenu.subMenu).fadeOut(0);
		
		
		//
		//  MAIN MENU ICON - mouseenter
		//
		$(that.axisMenu.icon).mouseenter(function () {
			that.axisMenu.iconHovered = true;
			mainEnter();
		})
		
		
		//
		// SUB MENU ICONS - mouseenter, mouseleave
		//
		for (var i=0;i<that.axisMenu.subMenu.icons.length; i++) {
			
			var icon = that.axisMenu.subMenu.icons[i];
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
				if (that.axisMenu.iconHovered) {
					$(this).stop().fadeTo(GLOBALS.animFast, 1);
				}			
			})
			
			$(icon).bind('mouseleave.default', function () {
				if (that.axisMenu.iconHovered) {
					$(this).stop().fadeTo(GLOBALS.animFast, .5);
				}	
			});	
					
		}
		else{
			
			$(icon).unbind('mouseenter.default');
			$(icon).unbind('mouseleave.default');

		}
		
	}
	
	this.axisMenu.activateIcon = function (iconName) {

		for (var i=0;i<that.axisMenu.subMenu.icons.length; i++) {
			
			var icon = that.axisMenu.subMenu.icons[i];
			
			if (icon.title.toLowerCase() == iconName.toLowerCase()) {
			
				subMenuIconBind(icon, false);				
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

		$(that.axisMenu.subMenu).fadeOut(GLOBALS.animFast);
		$(that.axisMenu.icon).fadeTo(GLOBALS.animFast, .5);
		that.axisMenu.iconHovered = false;
				
	}
	
	
	//
	//  MAIN MENU - mouseenter
	//	
	function mainEnter() {

		if (that.axisMenu.iconHovered) {
			
			$(that.axisMenu.icon).fadeTo(GLOBALS.animFast, 1);
			$(that.axisMenu.subMenu).fadeIn(GLOBALS.animFast);
						
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
			$(that.axisMenu.subMenu).unbind('mouseleave.axis');
			$(that.axisMenu).unbind('mouseenter.axis');				
		}
		else{
			//
			// Bind the hover events to unpin subMenu
			//
			$(that.axisMenu.subMenu).bind('mouseleave.axis', subLeave);
			$(that.axisMenu).bind('mouseenter.axis', mainEnter);
		}	
	}
	
	
	//
	//  ONCLICK
	//
	function setOnclickEvents() {
		
		$(that.axisMenu).click(function () {	
			
			that.axisMenu.subMenu.pinned = !that.axisMenu.subMenu.pinned;
			
			superBind(that.axisMenu.subMenu.pinned)			
			
		})
	}
	
	



	//
	// Function calls
	//
	setHoverEvents();
	setOnclickEvents();
}