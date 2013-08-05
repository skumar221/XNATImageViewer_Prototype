goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.addToMenu');

ThreeDHolder.prototype.addToMenu = function(newObj, label, filetype) {

    var m2 = this.Viewer.Menu2D;
    var m3 = this.Viewer.Menu3D;
    
    var file = label || newObj.file;
    var filetype = filetype || this.SlicerParser.getFileObjectType(file);
    if (file[0].length > 1) file = file[0].slice(0, -5) + '.dcm';
    var folder;
    
    // annotation
    if (filetype === 'sphere') {
        // create folder if it doesn't exist
        if (! this.annotations) {
            this.annotations = m3.addFolder('Annotations');
//            var master = m3.add('checkbox', this.annotations, 'MASTER CONTROL', true, '');
//            m3.add('spacer', this.annotations);
//            this.setListenerMaster(master[0]);
        }
        folder = this.annotations;
        
        // add component
        var visible = m3.add('checkbox', folder, label, newObj.visible, label);
        m3.add('newline', folder);
        
        // set listener
        this.setListenerVisible(newObj, visible[0], []);
    }
    
    
    // volume
    else if (filetype === 'volume') {
        // create folders if they don't exist
        if (! this.voluContent && ! this.twoDcontent) {
            this.twoDcontent = m2.addFolder('Volume to Display in 2D Renderers');
            this.voluContent = m3.addFolder('Volumes');
            
//            var master = m3.add('checkbox', this.voluContent, 'MASTER CONTROL', true, '');
//            m3.add('slider', this.voluContent, 'Opacity', [0, 1, 0.01, 1]);
//            m3.add('spacer', this.voluContent);
//            this.setListenerMaster(master[0]);
        }
        folder2D = this.twoDcontent;
        folder3D = this.voluContent;
        
        // add components
        var file = file.split('/3D/')[1];
        
        var radio = m2.add('radio', folder2D, file, true, file);
        m2.add('newline', folder2D);
        
        var visible = m3.add('checkbox', folder3D, file, newObj.visible, file);
        var opacity = m3.add('slider', folder3D, 'Opacity', [0, 1, 0.01, newObj.opacity]);
        var spacer = m3.add('newline', folder3D);
        
        var render = m3.add('checkbox', folder3D, 'Volume Rendering', newObj.volumeRendering, file);
        var thresh = m3.add('ttslider', folder3D, 'Threshold', [newObj.min, newObj.max, newObj.lowerThreshold, newObj.upperThreshold]);
        spacer = [spacer].concat( m3.add('spacer', folder3D));
        
        // set listeners
        this.setListenerRadio  (newObj, radio[0]);
        this.setListenerVisible(newObj, visible[0], spacer.concat(render.concat(opacity.concat(thresh))));
        this.setListenerRender (newObj, render[0]);
        this.setListenerOpacity(newObj, opacity[0]);
        this.setListenerThresh (newObj, thresh[0]);
        
        // save pairs
        this.objRadioPairs.push(   [newObj, radio[0]] );
        this.objVisiblePairs.push( [newObj].concat(visible.concat(spacer)) );
        this.objRenderPairs.push(  [newObj].concat(render) );
        this.objOpacityPairs.push( [newObj].concat(opacity) );
        this.objThreshPairs.push(  [newObj].concat(thresh) );
        
    }
    
    
    // mesh or fiber
    else {
        // create folder if it doesn't exist
        if (filetype === 'mesh') {
            if (! this.meshContent) {
                this.meshContent = m3.addFolder('Meshes');
//                var master = m3.add('checkbox', this.meshContent, 'MASTER CONTROL', true, '');
//                m3.add('slider', this.meshContent, 'Opacity', [0, 1, 0.01, 1]);
//                m3.add('spacer', this.meshContent);
//                this.setListenerMaster(master[0]);
            }
            folder = this.meshContent;
        }
        if (filetype === 'fiber') {
            if (! this.fibrContent) {
                this.fibrContent = m3.addFolder('Fibers');
//                var master = m3.add('checkbox', this.fibrContent, 'MASTER CONTROL', true, '');
//                m3.add('slider', this.fibrContent, 'Opacity', [0, 1, 0.01, 1]);
//                m3.add('spacer', this.fibrContent);
//                this.setListenerMaster(master[0]);
            }
            folder = this.fibrContent;
        }
        var file = file.split('/3D/')[1];
        
        // add components
        var visible = m3.add('checkbox', folder, file, newObj.visible, file);
        var opacity = m3.add('slider', folder, 'Opacity', [0, 1, 0.01, newObj.opacity]);
        var newline = m3.add('newline', folder);
        
        // set listeners
        this.setListenerVisible(newObj, visible[0], [newline].concat(opacity));
        this.setListenerOpacity(newObj, opacity[0]);
        
        
        // save pairs
        this.objVisiblePairs.push( [newObj].concat(visible.concat([newline])) );
        this.objOpacityPairs.push( [newObj].concat(opacity) );
    }
    
    this.updateCSS();
}
goog.exportProperty(ThreeDHolder.prototype, 'addToMenu', ThreeDHolder.prototype.addToMenu);
