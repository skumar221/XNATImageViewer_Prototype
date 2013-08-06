goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.addToMenu');

// for master controls
// if at least one of the objects is deselected, the master cb should be deselected
// if at least one of the objects is selected, the master opacity should be visible

ThreeDHolder.prototype.addToMenu = function(newObj, label, filetype) {

    var m2 = this.Viewer.Menu2D;
    var m3 = this.Viewer.Menu3D;
    
    var file = label || newObj.file;
    var filetype = filetype || this.SlicerParser.getFileObjectType(file);
    if (file[0].length > 1) file = file[0];
    var folder;
    
    // annotation
    if (filetype === 'sphere') {
        // create menu folder if it doesn't exist
        if (! this.annotations) {
            this.annotations = m3.addFolder('Annotations');
            this.annoMaster = m3.add('checkbox', this.annotations, 'HIDE ALL', true, 'Annotations');
            m3.add('spacer', this.annotations);
            this.setListenerMaster(this.annoMaster, this.annotationMenuComponents);
        }
        folder = this.annotations;
        
        // if new object is deselected and master is selected, deselect master
        if (! newObj.visible && this.annoMaster[0].checked) {
            this.annoMaster[0].checked = '';
            this.annoMaster[1].innerHTML = 'DISPLAY ALL';
        }
        
        // add component
        var visible = m3.add('checkbox', folder, label, newObj.visible, label);
        m3.add('newline', folder);
        
        // set listener
        this.setListenerVisible(newObj, visible[0], []);
        
        // save object and components
        this.annotationMenuComponents.push({
            'object': newObj,
            'visible': visible,
        });
        
    }
    
    
    // volume
    else if (filetype === 'volume') {
        // create menu folders if they don't exist
        if (! this.voluContent && ! this.twoDcontent) {
            this.twoDcontent = m2.addFolder('Volume to Display in 2D Renderers');
            this.voluContent = m3.addFolder('Volumes');
            
            this.voluMaster = m3.add('checkbox', this.voluContent, 'HIDE ALL', true, 'Volumes');
            var masterSlider = m3.add('slider', this.voluContent, 'Master Opacity', [0, 1, 0.01, 1]);
            m3.add('spacer', this.voluContent);
            
            this.voluMaster = this.voluMaster.concat(masterSlider);
            
            this.setListenerMaster(this.voluMaster, this.volumeMenuComponents, masterSlider);
            this.setListenerMasterOpacity(masterSlider[0], this.volumeMenuComponents);
        }
        folder2D = this.twoDcontent;
        folder3D = this.voluContent;
        
        // if new object is deselected and master is selected, deselect master
        if (! newObj.visible && this.voluMaster[0].checked) {
            this.voluMaster[0].checked = '';
            this.voluMaster[1].innerHTML = 'DISPLAY ALL';
//            this.voluMaster[2].getElement().style.display = 'none';
//            this.voluMaster[3].style.display = 'none';
        }
        
        // if new object is selected and master opacity is invisible, set to be visible
        
        
        var radio = m2.add('radio', folder2D, file, true, '');
        m2.add('newline', folder2D);
        
        var visible = m3.add('checkbox', folder3D, file, newObj.visible, '');
        var opacity = m3.add('slider', folder3D, 'Opacity', [0, 1, 0.01, newObj.opacity]);
        var spacer = m3.add('newline', folder3D);
        
        // add components
        var render = m3.add('checkbox', folder3D, 'Volume Rendering', newObj.volumeRendering, file.split('/3D/')[1]);
        var thresh = m3.add('ttslider', folder3D, 'Threshold', [newObj.min, newObj.max, newObj.lowerThreshold, newObj.upperThreshold]);
        spacer = [spacer].concat( m3.add('spacer', folder3D));
        
        var toggleOnVisible = [];
        toggleOnVisible = toggleOnVisible.concat(spacer);
        toggleOnVisible = toggleOnVisible.concat(render);
        toggleOnVisible = toggleOnVisible.concat(opacity);
        toggleOnVisible = toggleOnVisible.concat(thresh);
        
        // set listeners
        this.setListenerRadio  (newObj, radio[0]);
        this.setListenerVisible(newObj, visible[0], toggleOnVisible);
        this.setListenerRender (newObj, render[0]);
        this.setListenerOpacity(newObj, opacity[0]);
        this.setListenerThresh (newObj, thresh[0]);
        
        // save object and components
        this.volumeMenuComponents.push({
            'object': newObj,
            'visible': visible,
            'render': render,
            'opacity': opacity,
            'thresh': thresh,
            'spacer': spacer,
        });
        
    }
    
    
    // mesh or fiber
    else {
        var comp;
        // create menu folder if it doesn't exist
        if (filetype === 'mesh') {
            if (! this.meshContent) {
                this.meshContent = m3.addFolder('Meshes');
                this.meshMaster = m3.add('checkbox', this.meshContent, 'HIDE ALL', true, '');
                var masterSlider = m3.add('slider', this.meshContent, 'Master Opacity', [0, 1, 0.01, 1]);
                m3.add('spacer', this.meshContent);
            
                this.meshMaster = this.meshMaster.concat(masterSlider);
                
                this.setListenerMaster(this.meshMaster, this.meshMenuComponents, masterSlider);
                this.setListenerMasterOpacity(masterSlider[0], this.meshMenuComponents);
            }
            folder = this.meshContent;
            master = this.meshMaster;
            comp = this.meshMenuComponents;
        }
        if (filetype === 'fiber') {
            if (! this.fibrContent) {
                this.fibrContent = m3.addFolder('Fibers');
                this.fibrMaster = m3.add('checkbox', this.fibrContent, 'HIDE ALL', true, '');
                var masterSlider = m3.add('slider', this.fibrContent, 'Master Opacity', [0, 1, 0.01, 1]);
                m3.add('spacer', this.fibrContent);
            
                this.fibrMaster = this.fibrMaster.concat(masterSlider);
                
                this.setListenerMaster(this.fibrMaster, this.fiberMenuComponents, masterSlider);
                this.setListenerMasterOpacity(masterSlider[0], this.meshMenuComponents);
            }
            folder = this.fibrContent;
            master = this.fibrMaster;
            comp = this.fiberMenuComponents;
        }
        
        // if new object is deselected and master is selected, deselect master
        if (! newObj.visible && master[0].checked) {
            master[0].checked = '';
            master[1].innerHTML = 'DISPLAY ALL';
//            master[2].getElement().style.display = 'none';
//            master[3].style.display = 'none';
        }
        
        // add components
        var visible = m3.add('checkbox', folder, file, newObj.visible, file.split('/3D/')[1]);
        var opacity = m3.add('slider', folder, 'Opacity', [0, 1, 0.01, newObj.opacity]);
        var newline = m3.add('newline', folder);
        
        // set listeners
        this.setListenerVisible(newObj, visible[0], [newline].concat(opacity));
        this.setListenerOpacity(newObj, opacity[0]);
        
        // save object and components
        comp.push({
            'object': newObj,
            'visible': visible,
            'opacity': opacity,
            'newline': newline,
        });
        
    }
    
    this.updateCSS();
}
goog.exportProperty(ThreeDHolder.prototype, 'addToMenu', ThreeDHolder.prototype.addToMenu);
