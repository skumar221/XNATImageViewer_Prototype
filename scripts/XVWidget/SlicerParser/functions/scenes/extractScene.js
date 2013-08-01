goog.require('SlicerParser');
goog.provide('SlicerParser.extractScene');

SlicerParser.prototype.extractScene = function(mrml, sceneName) {
    
    var scene;
    
    utils.array.forEach(mrml.getElementsByTagName('SceneView'), function(s) {
        if (s.getAttribute('name') == sceneName) scene = s;
    });
    
    return scene;
    
}
goog.exportProperty(SlicerParser.prototype, 'extractScene', SlicerParser.prototype.extractScene);