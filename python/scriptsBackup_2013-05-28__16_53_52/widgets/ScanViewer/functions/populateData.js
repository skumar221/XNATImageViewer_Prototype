//******************************************************
//  Fill in metadata -- this will likely change as it gets 
//  deployed to the web...
//******************************************************
ScanViewer.prototype.populateData = function (data) {	
	var that = this;


	//----------------------------------
	// DATA: VIEW TYPE DATA
	//----------------------------------
	function makeDisplayableData(labelObj) {
		/*
		var counter = 0;
		for (i in labelObj) {
//			console.log(labelObj[i])
			var noSpace = labelObj[i]["label"].replace(/\s+/g, ' ');
			var currTop = (that.textCSS_small.fontSize * (2.5*counter+1) + 30);
			that.displayableData[noSpace] = __makeElement__("div", that.ScanTabs.getTab("View Type"), that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace]).css(__mergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 15
			}));
			that.displayableData[noSpace].innerHTML = labelObj[i].label;		

			that.displayableData[noSpace + "_dropdown"] = __makeElement__("select", that.ScanTabs.tabs[0], that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace + "_dropdown"]).css(__mergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 110,
				width: "10em",
				backgroundColor: "rgba(0,0,0,0)",
				borderWidth: 1,
				borderColor: Globals.semiactiveLineColor
			}));	
			
			
			for (var j=0;j<labelObj[i]["option"].length;j++) {
				that.displayableData[noSpace + "_dropdown"].innerHTML += "<option>" + labelObj[i]["option"][j] + "</option>";
			}
			

			//----------------------------------
			// When dropdown is Change the axis of the frames
			//----------------------------------			
			if (labelObj[i].label.indexOf("View") != -1) {
				var dd = that.displayableData[noSpace + "_dropdown"];
				dd.innerHTML = "<option>" + "sagittal" + "</option>";
				dd.innerHTML += "<option>" + "axial" + "</option>";
				dd.innerHTML += "<option>" + "coronal" + "</option>";
				
				dd.onchange = function () {
					that.FrameViewer.loadFramesByAxis(dd.value)
					//console.log(dd.value);
				}				
			}

			
			counter++;
		}
		*/
	}
	
	//makeDisplayableData(data.viewTypeData);
	//populateTab_ViewType();

	//----------------------------------
	// DATA: SESSION INFO DATA
	//----------------------------------
	function makeSessionInfoData(labelObj) {
		//----------------------------------
		//	SCROLL GALLERY
		//----------------------------------

		that.sessionInfoScrollGallery = new ScrollGallery({
			parent: that.ScanTabs.getTab("Session Info"),
			id: that.args.id + ("_sessionInfoTab_data"),
			orientation: "vertical",
			CSS: {
				left: 0,
				top: 0,
				height: that.ScanTabs.CSS.height * .80,
				width: 440
			}
		});	

		var contents = __makeElement__("div", that.sessionInfoScrollGallery.scrollContent, that.args.id + "_contents");
		var counter = 0;
		for (i in labelObj) {
			var noSpace = labelObj[i]["label"].replace(/\s+/g, ' ');			
			var currTop = (that.textCSS_small.fontSize * (2*counter));
			that.displayableData[noSpace] = __makeElement__("div", contents, that.args.id + "_data_" + noSpace);
			$(that.displayableData[noSpace]).css(__mergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 15
			}));
			that.displayableData[noSpace].innerHTML = labelObj[i].label + ":";		

			that.displayableData[noSpace + "_value"] = __makeElement__("div", contents, that.args.id + "_value_" + noSpace);
			$(that.displayableData[noSpace + "_value"]).css(__mergeArgs__(that.textCSS_small,{
				top: currTop,
				left: 160,
			}));	
			that.displayableData[noSpace + "_value"].innerHTML = labelObj[i]["value"][0]
			counter++;
		}
		
		contents.style.height = __toPx__(currTop + 300);
		that.sessionInfoScrollGallery.setContents(contents);
	}
	// NOTE:  Ajax query would be here
	makeSessionInfoData(data.sessionInfo);
}
