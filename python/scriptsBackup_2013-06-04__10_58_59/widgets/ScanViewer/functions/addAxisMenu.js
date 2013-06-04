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
	this.AxisMenu = utils.dom.makeElement("div", this.widget, "AxisMenu",{
		position: "absolute",
		left: iconStartLeft,
		top: iconStartTop,
		height: iconDimSmall , 
		width: iconDimSmall,
	});
	this.AxisMenu.title  = "Select View Plane";	
	
	
	
	
	//------------------------------
	// MAIN MENU ICON
	//------------------------------	
	this.AxisMenu.icon = utils.dom.makeElement("img", this.AxisMenu, "menuIcon",{
		position: "absolute",
		left: 0,
		top: 0,// + spacer*i,
		height: iconDimSmall , 
		width: iconDimSmall ,
		cursor: "pointer", 
	});	
	this.AxisMenu.icon.src  = "./icons/AxisMenu/Axes.png";	
	
	



	//------------------------------
	// SUB MENU
	//------------------------------	
	this.AxisMenu.subMenu = utils.dom.makeElement("div", this.AxisMenu, "subMenu",{
		position: "absolute",
		left: 0,//iconStartLeft  + iconDimMed,
		top: 0,// + spacer*i,
		height: iconDimMed , 
		width: spacer * iconVals.length,
		cursor: "pointer"
		//border: "solid 1px rgba(100,100,100,1)"
	});	
	// For onclick purposes
	this.AxisMenu.subMenu.pinned = false;
	



	//------------------------------
	// ADD MENU ICONS
	//------------------------------
	this.AxisMenu.subMenu.icons = [];	
	
	for (var i=0; i<iconVals.length; i++) {
			
		//
		// Icons
		//	
		var icon = utils.dom.makeElement("img", this.AxisMenu.subMenu, "icon_" + iconVals[i],{
			position: "absolute",
			top: 0,
			left: iconDimMed + spacer*(i),
			height: iconDimMed , 
			width: iconDimMed ,
			cursor: "pointer", 
		});	
		
		icon.src = "./icons/AxisMenu/" + iconVals[i] + ".png";
		icon.axis = iconVals[i];
		icon.title = iconVals[i];
		
		this.AxisMenu.subMenu.icons.push(icon);				


		
		//
		// SET onclick
		//
		if (icon.axis != "3D") {
			icon.onclick = function (event) {
				utils.dom.stopPropagation(event); 
				if (that.FrameViewer.frames.length > 0) {
					
					that.FrameViewer.loadFramesByAxis(this.axis, that.axisIcons);
					that.AxisMenu.activateIcon(this.title);
				} 
			};		
		}	
	}	

	
	
	//------------------------------
	// ADD TO DEFAULT MOUSE EVENTS TO SCANVIEWER
	//------------------------------
	/*
	this.widget.defaultMouseEvents.push(function () {
		$(that.AxisMenu).fadeOut(0);
		$(that.widget).bind('mouseenter.axismenu', function () {
			$(that.AxisMenu).stop().fadeTo(GLOBALS.animFast,1);
		}).bind('mouseleave.axismenu', function () {
			$(that.AxisMenu).stop().fadeTo(GLOBALS.animFast,0);
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
		$(that.AxisMenu.icon).fadeTo(0,.5);
		
		
		//
		// SUB MENU - default fade state
		//		
		$(that.AxisMenu.subMenu).fadeOut(0);
		
		
		//
		//  MAIN MENU ICON - mouseenter
		//
		$(that.AxisMenu.icon).mouseenter(function () {
			that.AxisMenu.iconHovered = true;
			mainEnter();
		})
		
		
		//
		// SUB MENU ICONS - mouseenter, mouseleave
		//
		for (var i=0;i<that.AxisMenu.subMenu.icons.length; i++) {
			
			var icon = that.AxisMenu.subMenu.icons[i];
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
				if (that.AxisMenu.iconHovered) {
					$(this).stop().fadeTo(GLOBALS.animFast, 1);
				}			
			})
			
			$(icon).bind('mouseleave.default', function () {
				if (that.AxisMenu.iconHovered) {
					$(this).stop().fadeTo(GLOBALS.animFast, .5);
				}	
			});	
					
		}
		else{
			
			$(icon).unbind('mouseenter.default');
			$(icon).unbind('mouseleave.default');

		}
		
	}
	
	this.AxisMenu.activateIcon = function (iconName) {

		for (var i=0;i<that.AxisMenu.subMenu.icons.length; i++) {
			
			var icon = that.AxisMenu.subMenu.icons[i];
			
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

		$(that.AxisMenu.subMenu).fadeOut(GLOBALS.animFast);
		$(that.AxisMenu.icon).fadeTo(GLOBALS.animFast, .5);
		that.AxisMenu.iconHovered = false;
				
	}
	
	
	//
	//  MAIN MENU - mouseenter
	//	
	function mainEnter() {

		if (that.AxisMenu.iconHovered) {
			
			$(that.AxisMenu.icon).fadeTo(GLOBALS.animFast, 1);
			$(that.AxisMenu.subMenu).fadeIn(GLOBALS.animFast);
						
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
			$(that.AxisMenu.subMenu).unbind('mouseleave.axis');
			$(that.AxisMenu).unbind('mouseenter.axis');				
		}
		else{
			//
			// Bind the hover events to unpin subMenu
			//
			$(that.AxisMenu.subMenu).bind('mouseleave.axis', subLeave);
			$(that.AxisMenu).bind('mouseenter.axis', mainEnter);
		}	
	}
	
	
	//
	//  ONCLICK
	//
	function setOnclickEvents() {
		
		$(that.AxisMenu).click(function () {	
			
			that.AxisMenu.subMenu.pinned = !that.AxisMenu.subMenu.pinned;
			
			superBind(that.AxisMenu.subMenu.pinned)			
			
		})
	}
	
	



	//
	// Function calls
	//
	setHoverEvents();
	setOnclickEvents();
}