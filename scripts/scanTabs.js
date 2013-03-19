defaultArgs_scanTabs = {
	parent: document.body,
	id: "tabs",
	numTabs: 2,
	scanContents: 0,
	_css: {
		top: 400,
		left: 20,
		height: 300,
		width: 300
	}
}

// These conform to the jQuery format of
// using titles.
var makeTabTitles = function(parent, titles){

	var titlesElt = makeElement("ul", parent);	
	for (var i=0;i<titles.length;i++){
		var li = makeElement("li", titlesElt);	
		var a = makeElement("a", li);

		$(a).attr('href', "#" + parent.id + "-" + (i+1).toString());
		a.innerHTML = titles[i];	
	}	
	//titlesElt.className = "menu"
	return titlesElt;
}

var tabDiv = function(parent, contentElt){
	
}

var scanTabs = function(args){
	this.args = (args) ? mergeArgs(defaultArgs_scanTabs, args) : defaultArgs_scanTabs;
	this._css = this.args._css;
	var that = this;
	
	this.widget = makeElement("div", this.args.parent, this.args.id, this.args._css);

	
	this.tabTitles = makeTabTitles(this.widget, ["Tab1", "Tab 2"]);
	
	this.tabDivs = []
	for (var i=0;i<this.args.numTabs;i++){
		var e = makeElement("div", this.widget, this.args.id + "-" + (i+1).toString());
		//e.className = "content"
		e.style.height = "300px"
		e.innerHTML = "aasdasdfasdf;aoeswfase + " + i.toString();
		this.tabDivs.push(e)
	}
	//$(function() {
	
	//});
	
		$(this.widget).tabs();
}