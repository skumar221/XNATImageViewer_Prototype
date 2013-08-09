goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.setListenerMaster');
goog.provide('ThreeDHolder.setListenerMasterOpacity');
goog.provide('ThreeDHolder.setListenerRadio');
goog.provide('ThreeDHolder.setListenerVisible');
goog.provide('ThreeDHolder.setListenerRender');
goog.provide('ThreeDHolder.setListenerOpacity');
goog.provide('ThreeDHolder.setListenerThresh');


ThreeDHolder.prototype.setListenerMaster = function(master, collection, slider) {
    var that = this;
    goog.events.listen(master[0], goog.ui.Component.EventType.CHANGE, function(event) {
        var checked = this.checked;
        
        master[1].innerHTML = checked ? 'HIDE ALL' : 'DISPLAY ALL';
        
        if (slider) {
//            slider[0].getElement().style.display = checked ? 'inline-block' : 'none';
//            slider[1].style.display = checked ? 'inline-block' : 'none';
        }
        
        utils.array.forEach(collection, function(item) {
            var object = item['object'];
            var button = item['visible'][0];
            
            button.checked = checked;
            object.visible = checked;
            object.modified();
            
            // ...and set rest of associated components to be visible/invisible
            if (item['opacity']) {
                item['opacity'][0].getElement().style.display = checked ? 'inline-block' : 'none';
                item['opacity'][1].style.display = checked ? 'inline-block' : 'none';
            }
            
            if (item['render']) {
                item['render'][0].style.display = checked ? 'inline-block' : 'none';
                item['render'][1].style.display = checked ? 'inline-block' : 'none';
            }
            
            if (item['thresh']) {
                item['thresh'][0].getElement().style.display = checked ? 'inline-block' : 'none';
                item['thresh'][1].style.display = checked ? 'inline-block' : 'none';
            }
            
            // this is for volumes
            if (item['spacer']) {
                //  ['spacer'][0] is the newline -- we always want that displayed
                item['spacer'][1].style.display = checked ? '' : 'none';
            }
        });
        
    });
    
};


ThreeDHolder.prototype.setListenerMasterOpacity = function(slider, collection) {
    goog.events.listen(slider, goog.ui.Component.EventType.CHANGE, function(event) {
        var opacity = slider.getValue();
        
        utils.array.forEach(collection, function(item) {
            var object = item['object'];
            
            // ...and set rest of associated components to be visible/invisible
            if (item['opacity']) {
                object.opacity = opacity;
                item['opacity'][0].setValue(opacity);
            }
            
        });
    });
    
};


ThreeDHolder.prototype.setListenerRadio = function(newObj, radio) {
    var that = this;
    goog.events.listen(radio, goog.ui.Component.EventType.CHANGE, function(event) {
//        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
//        that.currentVolObject.visible = false;  ////////////////
//        newObj.visible = true;  /////////////////////
        
        that.update2Drenderers(newObj);
    });
}


ThreeDHolder.prototype.setListenerVisible = function(newObj, visible, toggle) {
    var that = this;
    var type = this.SlicerParser.getFileObjectType(newObj.file);
    var master;
    
    if (type == 'sphere') master = this.annoMaster;
    if (type == 'volume') master = this.voluMaster;
    if (type == 'fiber')  master = this.fibrMaster;
    if (type == 'mesh')   master = this.meshMaster;
    
    goog.events.listen(visible, goog.ui.Component.EventType.CHANGE, function(event) {
        
        newObj.visible = this.checked;
        newObj.modified();
        var checked = this.checked;
        
        // disable/enable other options
        utils.array.forEach(toggle, function(e) {
            // if js component
            if (e.nodeType == 1) {
                if (e.getAttribute('class') == 'Newline') {
                    e.style.display = '';
                }
                else
                    e.style.display = (checked) ? 'inline-block' : 'none';
            }
            
            // if goog component
            else {
                e.setVisible(checked);
                e.getElement().style.display = (checked) ? 'inline-block' : 'none';
            }
        });
        
        // if master is still selected and this object is now invisible, deselect master
        if (!checked && master[0].checked) {
            master[0].checked = '';
            master[1].innerHTML = 'DISPLAY ALL';
//            master[2].getElement().style.display = 'none';
//            master[3].style.display = 'none';
        }
    });
}


ThreeDHolder.prototype.setListenerRender = function(newObj, render) {
    goog.events.listen(render, goog.ui.Component.EventType.CHANGE, function(event) {
        newObj.volumeRendering = this.checked;
    });
}


ThreeDHolder.prototype.setListenerOpacity = function(newObj, opacity) {
    goog.events.listen(opacity, goog.ui.Component.EventType.CHANGE, function(event) {
        newObj.opacity = opacity.getValue();
    });
}


ThreeDHolder.prototype.setListenerThresh = function(newObj, thresh) {
    goog.events.listen(thresh, goog.ui.Component.EventType.CHANGE, function(event) {
        newObj.lowerThreshold = thresh.getValue();
        newObj.upperThreshold = thresh.getValue() + thresh.getExtent();
    });
}


goog.exportProperty(ThreeDHolder.prototype, 'setListenerMaster', ThreeDHolder.prototype.setListenerMaster);
goog.exportProperty(ThreeDHolder.prototype, 'setListenerMasterOpacity', ThreeDHolder.prototype.setListenerMasterOpacity);
goog.exportProperty(ThreeDHolder.prototype, 'setListenerRadio', ThreeDHolder.prototype.setListenerRadio);
goog.exportProperty(ThreeDHolder.prototype, 'setListenerVisible', ThreeDHolder.prototype.setListenerVisible);
goog.exportProperty(ThreeDHolder.prototype, 'setListenerRender', ThreeDHolder.prototype.setListenerRender);
goog.exportProperty(ThreeDHolder.prototype, 'setListenerOpacity', ThreeDHolder.prototype.setListenerOpacity);
goog.exportProperty(ThreeDHolder.prototype, 'setListenerThresh', ThreeDHolder.prototype.setListenerThresh);
