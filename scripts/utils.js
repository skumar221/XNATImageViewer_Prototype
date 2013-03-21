var _MOUSEX = 0;
var _MOUSEY = 0;

$(document).mousemove(function(e){
	_MOUSEX = e.pageX;
	_MOUSEY = e.pageY;
});

function mergeArgs(obj1,obj2, recursionDepth){
	var recDepth = (recursionDepth) ? recursionDepth : 2; 
	// obj2 gets the priority
    var obj3 = {};
    for (var attr in obj1) { 
    	obj3[attr] = obj1[attr]; 
    }
    for (var attr in obj2) { 
    	//console.log(obj2[attr] + " " + obj2[attr].toString())
    	if (obj2[attr] && (obj2[attr].toString() === '[object Object]') && (attr in obj3)){
    		//console.log("Found an existing object within an object when merging: " + attr + " " + obj2[attr])
    		obj3[attr] = mergeArgs(obj3[attr], obj2[attr]);
    	}
    	else{
	    	obj3[attr] = obj2[attr];     		
    	}
    }
    return obj3;
}

function _px(args){
	if (args instanceof Array){
		return args.map(function(a) {return a.toString() + 'px'});
	}
	else{
		switch (typeof args){
			case 'number':
				return args.toString() + "px";
		}
	}
}

function _css(className, args){
	if (typeof args === 'object'){
		var s = (className[0] == ".") ? className : "."  + className;
		s += "{"; 
		for (var prop in args) {
	   		s+= " " + prop + ":" + " " + args[prop] + ";"
	    }
	    return s+= "}";
	}
	else{
		throw("Must pass objects to createCssClass!");
	}
}

//from: http://www.webdeveloper.com/forum/showthread.php?130717-How-to-create-CSS-styles-from-within-javascript
function newStyle(str){
	var pa= document.getElementsByTagName('head')[0] ;
	var el= document.createElement('style');
	el.type= 'text/css';
	el.media= 'screen';
	if(el.styleSheet) el.styleSheet.cssText= str;// IE method
	else el.appendChild(document.createTextNode(str));// others
	pa.appendChild(el);
	return el;
}

function _i(val){
	return parseInt(val, 10);
}

function swap(darr){
	var holder = darr[0];
	darr[0] = darr[1];
	darr[1] = holder;
	return darr;
}

function _remap1D(n, dold, dnew){

	if ((dold[0] == dold[1]) || (dnew[0] == dnew[1])){
		throw ("Remap: initial domain is equal!");
	}
	
	if (dold[0] > dold[1]){
		dold = swap(dold);
	}

	if (dnew[0] > dnew[1]){
		dold = swap(dold);
	}
	
	if (n < dold[0]){
		n = dold[0];
	}
	else if (n > dold[1]){
		n = dold[1];
	}

	return Math.round((n/(dold[1]-dold[0])) * ((dnew[1]-dnew[0])));
}

var _genericElementArgs = {
  	position: "absolute",
  	top: 0,
  	left: 0,
  	height: 200,
  	width: 200,
  	backgroundColor: "rgba(200,200,200,1)",
}
  
function makeElement(type, parent, id, css){
	if (!type){
		throw "Make Element: Need more parameters to make element! -- invalid type";
	}
	
	if (!parent){
		throw "Make Element: Need more parameters to make element -- invalid parent.";
	}
	
  var e = document.createElement(type);
  
  if (id) 
  	e.setAttribute("id", id);
  if (parent)
  	parent.appendChild(e);
  
  if (css){
 	  //var _cssargs = (css) ? mergeArgs(_genericElementArgs, css): _genericElementArgs;
  	  //$(e).css(_cssargs); 
  	  $(e).css(css)	
  }
  return e;
}

function dimCSS(object){
	console.log("DIMCSS: " + (typeof object).toString())
}

function _pct(value){
	return (value * 100).toString() + "%";
}
