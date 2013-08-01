goog.require('Viewer');
goog.provide('Viewer.addViewPlaneMenu');
//******************************************************
//  
//
//******************************************************

//goog.provide('goog.async.Delay');

Viewer.prototype.addViewPlaneMenu = function () {

	var that = this;	
	var iconStartLeft = 7;
	var iconStartTop = 7;
	var imgDiv = 7;
	var iconDimSmall = 23;
	var iconDimMed = 23;
	var spacer = iconDimMed*1.2;	
	var iconVals = ['Sagittal', 'Coronal', 'Transverse', 'All', '3D'];
	var allIcons = [];

	
	
	
	//------------------------------
	// MAIN MENU
	//------------------------------	
	this.ViewPlaneMenu = utils.dom.makeElement("div", this.widget, "ViewPlaneMenu",{
		'position': "absolute",
		'left': iconStartLeft,
		'top': iconStartTop,
		'height': iconDimSmall , 
		'width': iconDimSmall,
		'cursor': "pointer",
		'z-index': '10'
	});
	this.ViewPlaneMenu.title  = "Select View Plane";	
	
	
	
	
	//------------------------------
	// MAIN MENU ICON
	//------------------------------	
	this.ViewPlaneMenu.mainIcon = utils.dom.makeElement("img", this.ViewPlaneMenu, "menuIcon",{
		'position': "absolute",
		'height': iconDimSmall, 
		'width': iconDimSmall,
		'cursor': "pointer" 
	});	
	this.ViewPlaneMenu.mainIcon.src = "./icons/ViewPlaneMenu/Sagittal.png";
	this.ViewPlaneMenu.mainIcon.axis = 'Sagittal';
	this.ViewPlaneMenu.mainIcon.title = 'Sagittal';
	allIcons.push(this.ViewPlaneMenu.mainIcon);



	//------------------------------
	// SUB MENU
	//------------------------------	
	this.ViewPlaneMenu.subMenu = utils.dom.makeElement("div", this.ViewPlaneMenu, "subMenu",{
		'position': "relative",
		'left': iconDimSmall * 1.5,
		'height': iconDimSmall, 
		'width': spacer * iconVals.length,
		'cursor': "pointer"
		//backgroundColor: 'rgba(200,100,100,.5)'
	});	
	// For onclick purposes
	this.ViewPlaneMenu.subMenu.pinned = false;
	



	//------------------------------
	// ADD MENU ICONS
	//------------------------------
	this.ViewPlaneMenu.subMenu.icons = [];	
	
	var startI = 0;
	utils.array.forEach(iconVals, function(iconVal) {
		
		if (iconVal != that.ViewPlaneMenu.mainIcon.axis)	{
			//
			// Icons
			//	
			var icon = utils.dom.makeElement("img", that.ViewPlaneMenu.subMenu, "Icon" , {
				'position': "absolute",
				'top': '0',
				'left': startI * iconDimSmall * 1.2,
				'height': iconDimSmall , 
				'width': iconDimSmall ,
				'cursor': "pointer" 
			});	
			
			icon.src = "./icons/ViewPlaneMenu/" + iconVal + ".png";
			icon.axis = iconVal;
			icon.title = iconVal;
			
			that.ViewPlaneMenu.subMenu.icons.push(icon);				
			allIcons.push(icon);
			startI++;
		}					
	})	
	
	
	//
	// SET onclick
	//
	utils.array.forEach(allIcons, function(icon, i) { 
		
        /*
		if (icon.axis !== "3D") {
			
			goog.events.listen(icon, goog.events.EventType.CLICK, function(event) { 
				
				utils.dom.stopPropagation(event); 
				
				if (that.FrameHolder.frames.length > 0) {
					
					that.FrameHolder.loadDroppable(that.FrameHolder.currDroppable, event.currentTarget.axis.toLowerCase());
					that.ViewPlaneMenu.activateIcon(event.currentTarget.title);
					
				} 
			});
		}*/
        
        
        goog.events.listen(icon, goog.events.EventType.CLICK, function (event) {
            var oldIcon = that.ViewPlaneMenu.mainIcon.title;
            var newIcon = event.currentTarget.title;
            
            
            
            utils.dom.stopPropagation(event);
            that.ViewPlaneMenu.activateIcon(newIcon);
            
            if (oldIcon === 'All') {
                if (newIcon === 'All') {}
                    // do nothing
                else
                    that.ThreeDHolder.changeViewManyToOne(that, newIcon);
            }
            else {
                if (newIcon === 'All')
                    that.ThreeDHolder.changeViewOneToMany(that, oldIcon);
                else {
                    if (that.FrameHolder)
                        that.FrameHolder.loadDroppable(that.FrameHolder.currDroppable, event.currentTarget.axis.toLowerCase());
                    else
                        that.ThreeDHolder.changeViewOneToOne(that, oldIcon, newIcon);
                }
            }
        });
        
        
	})


			
	function setHoverEvents() {
		
		
		
		//------------------------------------
		// MAIN MENU ICON 
		//------------------------------------
		//
		// default fade state
		//
		utils.fx.fadeTo(that.ViewPlaneMenu.mainIcon, 0, .5);
		//
		//  mouseover
		//
		goog.events.listen(that.ViewPlaneMenu.mainIcon, goog.events.EventType.MOUSEOVER, function() { 
			
			utils.fx.fadeTo(that.ViewPlaneMenu.mainIcon, XVGlobals.animFast, 1);
			utils.fx.fadeTo(that.ViewPlaneMenu.subMenu, XVGlobals.animFast, 1);
			
		});	
		//
		//  mouseout
		//		
		goog.events.listen(that.ViewPlaneMenu.mainIcon, goog.events.EventType.MOUSEOUT, function() { 
			
			function fadeOut() {
				if (!that.ViewPlaneMenu.subMenu.mouseover) {
					utils.fx.fadeTo(that.ViewPlaneMenu.mainIcon, XVGlobals.animFast, .5);
					utils.fx.fadeTo(that.ViewPlaneMenu.subMenu, XVGlobals.animFast, 0);		
				}
			}
			
			that.ViewPlaneMenu.subMenu.mouseover = false;
		    delay = new goog.async.Delay(fadeOut, 800);
	        delay.start();

		});		
		
		
		
		
		//------------------------------------
		// SUB MENU
		//------------------------------------		
		//
		// default fade state
		//		
		utils.fx.fadeOut(that.ViewPlaneMenu.subMenu , 0);
		//
		// mouseover
		//
		goog.events.listen(that.ViewPlaneMenu.subMenu, goog.events.EventType.MOUSEOVER, function(event) { 
			that.ViewPlaneMenu.subMenu.mouseover = true;
		});				
		//
		// mouseout
		//
		goog.events.listen(that.ViewPlaneMenu.subMenu, goog.events.EventType.MOUSEOUT, function(event) { 
			
			function fadeOut() {
				if (!that.ViewPlaneMenu.subMenu.mouseover) {
					utils.fx.fadeTo(that.ViewPlaneMenu.subMenu, XVGlobals.animFast, 0);		
				}
			}
			
			that.ViewPlaneMenu.subMenu.mouseover = false;
		    delay = new goog.async.Delay(fadeOut, 800);
	        delay.start();
		});		



				
		//------------------------------------
		// SUB ICONS
		//------------------------------------	
		//
		// default fade state
		//		
		utils.array.forEach(that.ViewPlaneMenu.subMenu.icons, function (icon) {
			utils.fx.fadeTo(icon, 0, .5);	
		})
		utils.array.forEach(that.ViewPlaneMenu.subMenu.icons, function (icon) {
			//
			//  mouseover
			//
			goog.events.listen(icon, goog.events.EventType.MOUSEOVER, function(event) { 
				utils.fx.fadeTo(event.currentTarget, XVGlobals.animFast, 1);
			});
			//
			//  mouseout
			//
			goog.events.listen(icon, goog.events.EventType.MOUSEOUT, function(event) { 
				utils.fx.fadeTo(event.currentTarget, XVGlobals.animFast, .5);
			});
		});


	}


	
	
	
	function setMainIcon(icon) {
		
		var tempObj = {};
		
		tempObj['src'] = that.ViewPlaneMenu.mainIcon['src'];
		tempObj['axis'] = that.ViewPlaneMenu.mainIcon['axis'];
		tempObj['title'] = that.ViewPlaneMenu.mainIcon['title'];

		that.ViewPlaneMenu.mainIcon['src'] = icon['src'];
		that.ViewPlaneMenu.mainIcon['axis'] = icon['axis'];
		that.ViewPlaneMenu.mainIcon['title'] = icon['title'];		
		
		icon['src'] = tempObj['src'];
		icon['axis'] = tempObj['axis'];
		icon['title'] = tempObj['title'];
		
		allIcons.push(that.ViewPlaneMenu.mainIcon);		
	}
	
	
	this.ViewPlaneMenu.activateIcon = function (iconName) {
		
		utils.array.forEach(that.ViewPlaneMenu.subMenu.icons, function(icon) {
			
			if (icon.title.toLowerCase() === iconName.toLowerCase()) {
				
				utils.fx.fadeTo(icon, XVGlobals.animFast, 1);
				setMainIcon(icon);

			}
			else{			
				utils.fx.fadeTo(icon, XVGlobals.animFast, .5);				
			}
		});
		
	}
	


	//
	// Function calls
	//
	setHoverEvents();

}
goog.exportProperty(Viewer.prototype, 'addViewPlaneMenu', Viewer.prototype.addViewPlaneMenu);
