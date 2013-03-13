var defaultArgs_sliderSet = {
	id: "sliderSet",
	parent: document.body,
	fitToContent: "true",
	layout: "rowDiv_1",
	inputEditable: true,
	showGenButton: true,
	rowHeight : 40,
	_css: {
			"position": 'absolute',
			"top": 0,
			"left": 0,
			"height": 500,
			"width": 500,	
			"fontSize": 12,		
			"overflow-y": "hidden",
			"overflow-x": "hidden",
		    "font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
		    "border" : "solid",
			"border-color": "rgba(220,220,220,1)",
			"color": "rgba(0,0,0,1)",
		  	"background-color" : "rgba(220,220,220,1)",
		  	"border-width" : 0,
		  	"border-radius": 0,	 
  		 },
}

function sliderSet(args, sliderArgs){

	this.args = mergeArgs(defaultArgs_sliderSet, args);
	this.args._css = mergeArgs(defaultArgs_sliderSet._css, args._css);
	this._css = this.args._css;

//	console.log("SLDIER SET ID: " + this.args["id"])
	this.widget = document.createElement("div");
  	this.widget.setAttribute("id", this.args["id"]);
  	this.args.parent.appendChild(this.widget)
	$(this.widget).css(this._css);
	
	this.labels = [sliderArgs.length];
	this.values = [sliderArgs.length];
	this.sliders = [sliderArgs.length];
	this.sliderRows = [sliderArgs.length];
	//this.sliderCols = [sliderArgs.length];
	
	this.sliderArgs = sliderArgs;
	for (var i=0; i<this.sliderArgs.length; i++){
		if (this.args.layout  == "rowDiv_1") this.slider_rowDiv1(i);
	}
	
	// gen button
	if (this.args.showGenButton){
		this.genButton = document.createElement('input');
		this.genButton.setAttribute('type','button');
		this.genButton.setAttribute('name','Generate slider Parameters');
		this.genButton.setAttribute('value','Generate slider Parameters');
	  	$(this.genButton).css({ 
	  		"position": this._css["position"],
	  		"left": this._css["left"],
	  		"top": this._css["top"] + this._css["height"] + 10,
		});
		var that = this;
		this.genButton.onclick = function(){
			var pStr = "{\n";
			for(var i=0; i<sliderArgs.length; i++){
				pStr += "\t'" + that.sliders[i].args["corollary"] + "' : " + that.values[i].innerHTML + ",\n";
			}
			pStr += "}"
			console.log(pStr);
		};
		document.body.appendChild(this.genButton);
	}
}



function addTable() {
    var c, r, t;
    t = document.createElement('table');
    r = t.insertRow(0); 
    c = r.insertCell(0);
    c.innerHTML = 123;
    c = r.insertCell(1);
    c.innerHTML = 456;
    document.getElementById("addtable").appendChild(t);
}

sliderSet.prototype.slider_rowDiv1 = function(i){
	
	var labelMargin = 10;
	var sliderLeft = labelMargin + 100;
	var valueLeft = labelMargin + 400;
	
	this.sliderRows[i] = document.createElement("div");
  	this.sliderRows[i].setAttribute("id",  this.args["id"] + "_sliderRow");
  	//this.sliderRows[i].style.left = _px(labelMargin);
  	this.widget.appendChild(this.sliderRows[i])
	
	var hPos = i*this.args.rowHeight + 10;

	s = new modSlider(mergeArgs(this.sliderArgs[i], {
		parent: this.sliderRows[i],
		id: this.args["id"] + "_" + this.sliderArgs[i]["id"],
		displayLabel: this.sliderArgs[i]["id"],
		corollary: this.sliderArgs[i]["id"],
		top: hPos,
		left: 0
	}));
	this.sliders[i] = s;
			
	this.labels[i] = document.createElement("div");
  	this.labels[i].setAttribute("id",  s.args["id"] + "_label");
  	this.labels[i].innerHTML = s.args["displayLabel"].substring(0,12);
  	this.sliderRows[i].appendChild(this.labels[i])
	this.labels[i].style.position = 'absolute';
	this.labels[i].style.top = _px(hPos);
	this.labels[i].style.left = _px(labelMargin);
	
	this.values[i] = document.createElement("div");
  	this.values[i].setAttribute("id",  s.args["id"] + "_value");
  	this.values[i].innerHTML = s.currValue;
  	this.sliderRows[i].appendChild(this.values[i])
	this.values[i].style.position = 'absolute';
	this.values[i].style.top = _px(hPos);
	
	s.args.left = sliderLeft;
	s.restyle();
	
	var that = this;
	s.addSlideFunction(function(_slider){
	  	that.values[i].innerHTML = _slider.currValue;
	});
  
	this.values[i].style.left = _px(valueLeft);
}

