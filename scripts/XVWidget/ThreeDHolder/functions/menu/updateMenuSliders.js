goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.updateMenuSliders');

ThreeDHolder.prototype.updateMenuSliders = function() {
    function setVisible(o, b, l) {
        b.checked = o.visible ? 'checked' : '';
        b.style.display = 'inline-block';
        l.style.display = 'inline-block';
    }
    
    function setRender(o, b, l) {
        b.style.display = o.visible ? 'inline-block' : 'none';
        l.style.display = o.visible ? 'inline-block' : 'none';
    }
    
    function setOpacity(o, s, l) {
        s.setValue(parseFloat(o.opacity));
        s.setVisible(o.visible);
        s.getElement().style.display = o.visible ? 'inline-block' : 'none';
        l.style.display = o.visible ? 'inline-block' : 'none';
    }
    
    function setThresh(o, s, l) {
        s.setMinimum(o.min);
        s.setMaximum(o.max);
        o.lowerThreshold = o.max * 0.05 + 1;
        o.upperThreshold = o.max;
        s.setValueAndExtent(o.lowerThreshold,
                            o.upperThreshold - o.lowerThreshold);
        s.getElement().style.display = o.visible ? 'inline-block' : 'none';
        l.style.display = o.visible ? 'inline-block' : 'none';
        
    }
    
    
    // update volume portion of menu
    utils.array.forEach(this.volumeMenuComponents, function(c) {
        var object = c['object'];
        
        setVisible(object, c['visible'][0], c['visible'][1]);
        setRender (object, c['render'][0],  c['render'][1]);
        setOpacity(object, c['opacity'][0], c['opacity'][1]);
        setThresh (object, c['thresh'][0],  c['thresh'][1]);
        
        c['spacer'][0].style.display = '';
        c['spacer'][1].style.display = object.visible ? '' : 'none';
    });
    
    
    // update mesh and fiber portions of menu
    utils.array.forEach(this.meshMenuComponents.concat(this.fiberMenuComponents), function(c) {
        var object = c['object'];
        
        setVisible(object, c['visible'][0], c['visible'][1]);
        setOpacity(object, c['opacity'][0], c['opacity'][1]);
        
        c['newline'].style.display = '';
    });
    
    
    // update annotation portion of menu
    utils.array.forEach(this.annotationMenuComponents, function(c) {
        var object = c['object'];
        setVisible(object, c['visible'][0], c['visible'][1]);
    });
    
}
goog.exportProperty(ThreeDHolder.prototype, 'updateMenuSliders', ThreeDHolder.prototype.updateMenuSliders);
