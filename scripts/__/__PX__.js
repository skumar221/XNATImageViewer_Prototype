function __PX__(args){
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