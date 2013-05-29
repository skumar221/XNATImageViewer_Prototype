function __stopPropagation__(e) {
	if (!e) var e = window.event;
		e.cancelBubble = true;
	if (e.stopPropagation) 
		e.stopPropagation();
}
