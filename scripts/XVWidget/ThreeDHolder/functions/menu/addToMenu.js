
ThreeDHolder.prototype.addToMenu = function(newObj, label, filetype) {

    var m = this.Viewer.Menu;
    var file = label || newObj.file;
    var filetype = filetype || getFileObjectType(file);
    if (file[0].length > 1) file = file[0].slice(0, -5) + '.dcm';
    var folder;
    
    // annotation
    if (filetype === 'sphere') {
        if (! this.annotations) this.annotations = this.Viewer.Menu.addFolder('Annotations');
        folder = this.annotations;
        
        // add component
        var visible = m.add('checkbox', folder, label, newObj.visible, label);
        m.add('newline', folder);
        
        // set listener
        this.setListenerVisible(newObj, visible, []);
    }
    
    
    // volume
    else if (filetype === 'volume') {
        if (! this.voluContent) this.voluContent = this.Viewer.Menu.addFolder('Volumes');
        folder = this.voluContent;
        var file = file.split('/3D/')[1];
        
        // add components
        var radio   = m.add('radio', folder, file, true, file);
        m.add('newline', folder);
        
        var visible = m.add('checkbox', folder, 'Visible', newObj.visible, file);
        var opacity = m.add('slider', folder, 'Opacity', [0, 1, 0.01, newObj.opacity]);
        m.add('newline', folder);
        
        var render  = m.add('checkbox', folder, 'Volume Rendering', newObj.volumeRendering, file);
        var thresh  = m.add('ttslider', folder, 'Threshold', [newObj.min, newObj.max, newObj.lowerThreshold, newObj.upperThreshold]);
        m.add('spacer', folder);
        
        // set listeners
        this.setListenerRadio  (newObj, radio);
        this.setListenerVisible(newObj, visible, [render, opacity, thresh]);
        this.setListenerRender (newObj, render);
        this.setListenerOpacity(newObj, opacity);
        this.setListenerThresh (newObj, thresh);
        
        // save pairs
        this.objOpacityPairs.push([newObj, opacity]);
        this.objThreshPairs.push([newObj, thresh]);
    }
    
    
    // mesh or fiber
    else {
        if (filetype === 'mesh') {
            if (! this.meshContent) this.meshContent = this.Viewer.Menu.addFolder('Meshes');
            folder = this.meshContent;
        }
        if (filetype === 'fiber') {
            if (! this.fibrContent) this.fibrContent = this.Viewer.Menu.addFolder('Fibers');
            folder = this.fibrContent;
        }
        var file = file.split('/3D/')[1];
        
        // add components
        var visible = m.add('checkbox', folder, file, newObj.visible, file);
        var opacity = m.add('slider', folder, 'Opacity', [0, 1, 0.01, newObj.opacity]);
        //m.add('spacer', folder);
        m.add('newline', folder);
        
        // set listeners
        this.setListenerVisible(newObj, visible, [opacity]);
        this.setListenerOpacity(newObj, opacity);
        
        // save pairs
        this.objOpacityPairs.push([newObj, opacity]);
    }
}
