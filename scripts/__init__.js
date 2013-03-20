

var __init__ = function(obj, defaultArgs, args, initRoutine){
	obj.defaultArgs = defaultArgs;
	obj.args = (args) ? mergeArgs(obj.defaultArgs, args) : obj.defaultArgs;
	obj._css = obj.args._css;
	obj.widget = makeElement("div", obj.args.parent, obj.args.id, obj._css);
	$(window).resize(function() {
	  obj.restyle();
	});
	
	initRoutine();
	
	
	if(obj.restyle) 
		obj.restyle();
}
