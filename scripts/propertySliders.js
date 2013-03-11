

var defaultPropertySliderArgs = {
	id: "propertySlider",
	label: "blankLabel",
	min: "propertySlider",
	max: "propertySlider",
	step: "propertySlider",
	value: "propertySlider",
	id: "propertySlider",
};


function makePropertySliderSet(id, bindObj, args){
	if (args instanceof Array){
		
		this.sliderSet = document.createElement("div");
	  	this.sliderSet.setAttribute("id", id + "sliderSet");
	  	this.sliderSet.style.position = "absolute";
	  	this.sliderSet.style.top = (_px(50));
	  	this.sliderSet.style.left = (_px(800));
	  	this.sliderSet.style.height = (_px(500));
	  	this.sliderSet.style.width = (_px(500));
	  	this.sliderSet.style.border = "solid rgb(0,0,0)";
	  	this.sliderSet.style.overflow = "scroll";
	  	  	
	  	this.setTable = document.createElement("table");
		this.setTable.setAttribute("id", this.sliderSet.id + "_table");
		this.setTable.style.fontSize =_px(12);
		this.setTable.cellPadding =_px(12);
		this.sliderSet.appendChild(this.setTable)
		
		//var content = "<table>"
		resultIDs = []
		sliderIDs = []
		for(var i=0; i<args.length; i++){
			resultIDs.push(this.setTable.id + "_" + args[i][0] + "_result_" + i.toString());
			sliderIDs.push(this.setTable.id + "_" + args[i][0] + "_slider_" + i.toString());
		    content += '<tr>' 
		    		  + '<td style="border:1px solid black;">'+ args[i][0] + "</td>" 
		    		  + '<td width=100 id=' + resultIDs[i] + ' style="border:1px solid black;">' + "</td>" 
		    		  + '<td width=300 id=' + sliderIDs[i] + ' style="border:1px solid black;">' + "</td>" 
		    		  + '</tr>';	
		}

		$(this.setTable).append(content);
	  	document.body.appendChild(this.sliderSet);
		for (var i=0; i<args.length; i++){
			s = new propertySlider(args[i], resultIDs[i], bindObj);
			document.getElementById(sliderIDs[i]).appendChild(s.widget);
		}
	}
	else if (args instanceof Object){

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

function propertySlider(args, resultBinderID, bindObj){

	this.id;
	this.label;
	this.min = 0;
	this.max = 100;
	this.step = 1;
	this.value = 0;
	this.top = 100;
	this.left = 200;
	this.orientation = "horizontal"
	this.bindObj = bindObj;
	
	if (args instanceof Array){
		if (args.length < 1) raise("insuficcient info for property slider!")
		this.id = args[0] + "_propertySlider";
		this.label = args[0];
		
		if (args[1]) this.min = args[1];
		if (args[2]) this.max = args[2];
		if (args[3]) this.step = args[3];
		if (args[4]) this.value = args[4];
		
	}
	document.getElementById(resultBinderID).innerHTML = (this.value);
	bindObj.args[this.label] = this.value;
	bindObj.restyle();
	this.widget = document.createElement("div");
  	this.widget.setAttribute("id", this.id);
  	this.widget.style.fontSize =_px(12);

  	
	$(function() {
    	$(this.widget).slider();
  	});
  	
  	var that = this;
  	$(this.widget).slider({
	  orientation: this.orientation,
	  min: this.min,
      max: this.max,
      value: this.value,
      step: this.step,
      slide: function(e,ui){
		   document.getElementById(resultBinderID).innerHTML = (ui.value);
		   bindObj.args[that.label] = ui.value;
		   bindObj.restyle();
      },
	});
}

