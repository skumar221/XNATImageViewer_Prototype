goog.require('SlicerParser');
goog.provide('SlicerParser.extractCamera');

SlicerParser.prototype.extractCamera = function(scene) {
    
    var pos = scene.getElementsByTagName('Camera')[0].getAttribute('position').split(' ');
    var up = scene.getElementsByTagName('Camera')[0].getAttribute('viewUp').split(' ');
    for (var i = 0; i < pos.length; ++i) {
        pos[i] = parseFloat(pos[i], 10);
        up[i] = parseFloat(up[i], 10);
    }
    
    
    return [pos, up];
    
}
goog.exportProperty(SlicerParser.prototype, 'extractCamera', SlicerParser.prototype.extractCamera);