//******************************************************
//  
//
//******************************************************
scanViewer.prototype.addLinkMenu = function(){

	var that = this;	
	var iconStartLeft = 5;
	var iconStartTop = 25;
	var imgDiv = 7;
	var iconDimSmall = 20;
	var iconDimMed = 35;



	//------------------------------
	// ADD Menu div
	//------------------------------	
	this.linkMenu = __makeElement__("div", this.widget, this.args.id + "_ViewTypeTab_linkMenu",{
		position: "absolute",
		left: iconStartLeft,
		top: iconStartTop,// + spacer*i,
		height: iconDimMed , 
		width: iconDimMed,
		border: "sold 1px rgba(100,100,100,1)"
	});
	this.linkMenu.closed = false;
	
	
	//------------------------------
	// ADD Menu img (child of Menu DIV)
	//------------------------------	
	var linkMenu_Image = __makeElement__("img", this.linkMenu, this.args.id + "_ViewTypeTab_linkMenuImage",{
		position: "absolute",
		left: 0,
		top: 0,// + spacer*i,
		height: iconDimSmall , 
		width: iconDimSmall ,
		cursor: "pointer", 
		opacity: .5
	});	
	linkMenu_Image.src = "./icons/Chain-Broken.png";
	
	
	
	//------------------------------
	// ADD DIV DESCRIPTION
	//------------------------------	
	this.linkMenu_PopupDesc = __makeElement__("div", this.linkMenu, this.args.id + "_ViewTypeTab_PopupDesc",{
		position: "fixed",
		left: window.innerWidth/2 - 500/2,
		top: window.innerHeight/2 - 150/2,
		width: 500,
		height: 150,
		"fontSize": 40,		
		 "font-family": Globals.fontFamily,
		"color": "rgba(255,255,255,1)",
		zIndex: 50000,
		background: "rgba(100, 100, 100, 1)",
		cursor: "pointer",
	});	
	this.linkMenu_PopupDesc.innerHTML = " Select viewers to link. Click here when finished. ";
	$(this.linkMenu_PopupDesc).fadeOut(0);
	
	
	function closePopupDesc(){
		$(this.linkMenu_PopupDesc).fadeOut(300);
	}
	
	this.linkMenu_PopupDesc.onclick = function(){
		closePopupDesc();
	}
	
	
	function setScanViewerClickListen(){
		
		for (var i=0; i<that.args.parent.childNodes.length; i++){
			
			if (that.args.parent.childNodes[i].id.indexOf('xmiv_scanViewer') == 0){
				
				that.args.parent.childNodes[i].onclick = function(){
					
					this.style.border =  "solid rgba(255,255,255,1) 2px"
					that.linkMenu.onclick();
									
				}
			
			}
		}
	}
	
	function clearScanViewerClickListen(){
		
	}
	
	this.linkMenu.onclick = function(){
		that.linkMenu.closed = ! that.linkMenu.closed;
		console.log()
		linkMenu_Image.src = (that.linkMenu.closed) ? "./icons/Chain-Closed.png" : "./icons/Chain-Broken.png";	
		
		var fadeVal = (that.linkMenu.closed) ? .75 : .5;
		
		//$(linkMenu_Image).fadeTo(400, fadeVal);
		
		if (that.linkMenu.closed){
			
			if ($(that.linkMenu_PopupDesc).css('display') == 'none'){
				
				$(that.linkMenu_PopupDesc).fadeIn(500);	
			
			} 
			
			setScanViewerClickListen();
			
		}
		else{
			
			closePopupDesc();
			clearScanViewerClickListen();
		}
	}


	

}