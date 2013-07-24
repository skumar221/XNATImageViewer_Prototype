Menu.prototype.defaultArgs = {
	className: XVGlobals.classNames.Menu,
	parent: document.body,
	CSS: {
		position: 'absolute',
		height: '100%',
		width: '100%',
        top: '0%',
        left: '0%',
		'overflow': 'hidden',
        'display': 'inline',
  	}
}

Menu.prototype.folderContentCSS = {
    position: 'absolute',
    color: '#000',
    background: '#fff',
    opacity: '0.35',
    fontSize: XVGlobals.fontSizeSmall,
    fontFamily: XVGlobals.fontFamily,
    width: '24%',
    height: '80%',
    top: '10%',
    border: '1px solid #888',
    overflow: 'hidden',
}

Menu.prototype.folderHeaderCSS = {
    'font-weight': 'bold',
    'letter-spacing': '-1px',
    'border-bottom': '1px solid #888',
    background: '#999',
    color: '#000',
    fontSize: XVGlobals.fontSizeMed,
}

Menu.prototype.wrapperCSS = {
    position: 'relative',
    width: '90%',
    'margin-top': '10px',
    'margin-left': '5%',
    display: 'inline-block',
}

Menu.prototype.labelCSS = {
    width: '100%',
    'text-align': 'center',
    'text-transform': 'uppercase',
    'letter-spacing': '-1px',
}

Menu.prototype.longSliderCSS = {
    position: 'relative',
    width: '90%',
    height: '3px',
    'border-radius': '4px',
    background: '#555',
    display: 'inline-block',
    'margin-left': '5%',
    'margin-bottom': '8px',
}

Menu.prototype.filenameCSS = {
    position: 'absolute',
    top: '3px',
    height: '100%',
    width: '85%',
    'overflow': 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    display: 'inline-block',
}
