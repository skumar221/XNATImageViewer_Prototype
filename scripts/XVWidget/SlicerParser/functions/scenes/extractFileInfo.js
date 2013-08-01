goog.require('SlicerParser');
goog.provide('SlicerParser.extractFileInfo');

SlicerParser.prototype.extractFileInfo = function(scene, tagName, storageNodeType) {
    var objects = [];
    
    // volume to display in 2D renderers
    var selectedVolumeID = scene.getElementsByTagName('Selection')[0].getAttribute('activeVolumeID');
    /*
    // colormap information
    var labelMapVolumeDisplay = scene.getElementsByTagName('LabelMapVolumeDisplay')[0];
    var colorTableFile;     // we want the color table...
    var colorVolumeFile;    // ...and the volume file it goes with
    
    // find volume object that corresponds to label map
    utils.array.forEach(scene.getElementsByTagName('Volume'), function (v) {
        if (v.getAttribute('displayNodeRef') == labelMapVolumeDisplay.getAttribute('id')) {
            
            // set volume file
            utils.array.forEach(scene.getElementsByTagName('VolumeArchetypeStorage'), function(s) {
                if (s.getAttribute('id') == v.getAttribute('storageNodeRef')) {
                    colorVolumeFile = s.getAttribute('fileName');
                    if (colorVolumeFile.split('/Data/')[1])
                        colorVolumeFile = 'Data/' + colorVolumeFile.split('/Data/')[1];
                }
            });
            
            // set color table file
            utils.array.forEach(scene.getElementsByTagName('ColorTable'), function(ct) {
                if (ct.getAttribute('id') == labelMapVolumeDisplay.getAttribute('colorNodeID')) {
                    utils.array.forEach(scene.getElementsByTagName('ColorTableStorage'), function(cts) {
                        if (cts.getAttribute('id') == ct.getAttribute('storageNodeRef')) {
                            colorTableFile = cts.getAttribute('fileName');
                            if (colorTableFile.split('/Data/')[1])
                                colorTableFile = 'Data/' + colorTableFile.split('/Data/')[1];
                        }
                    });
                }
            });
            
        }
    });
    */
    
    //----------------------------------
    // EXTRACT INFO 
    //----------------------------------
    utils.array.forEach(scene.getElementsByTagName(tagName), function(i) {
//        console.log(i.getAttribute('id'));
        var storageNodeRef = i.getAttribute('storageNodeRef');
        var displayNodeRef = i.getAttribute('displayNodeRef').split(' ')[0];
        var displayNodeType = displayNodeRef.split('vtkMRML')[1].split('Node')[0];
        
        if (displayNodeType == 'ScalarVolumeDisplay') displayNodeType = 'VolumeDisplay';
        if (displayNodeType.split('Fiber')[1]) displayNodeType += 'Node';
        
        var displayNode;
        var storageNode;
        
        // find corresponding tagName display component
        utils.array.forEach(scene.getElementsByTagName(displayNodeType), function(itemDisplay) {
            if (itemDisplay.getAttribute('id') == displayNodeRef) displayNode = itemDisplay;
        });
        
        // find corresponding tagName storage component
        utils.array.forEach(scene.getElementsByTagName(storageNodeType), function(itemStorage) {
            if (itemStorage.getAttribute('id') == storageNodeRef) storageNode = itemStorage;
        });
        
        
        // find corresponding tagName color table (if exists)
        var colorTableFile;
        if (displayNode.getAttribute('colorNodeID')) {
        
            utils.array.forEach(scene.getElementsByTagName('ColorTable'), function(ct) {
            
                if (ct.getAttribute('id') == displayNode.getAttribute('colorNodeID')) {
                    utils.array.forEach(scene.getElementsByTagName('ColorTableStorage'), function(cts) {
                        if (cts.getAttribute('id') == ct.getAttribute('storageNodeRef')) {
                            colorTableFile = cts.getAttribute('fileName');
                            if (colorTableFile.split('/Data/')[1])
                                colorTableFile = 'Data/' + colorTableFile.split('/Data/')[1];
                        }
                    });
                }
                
            });
            
        }
        
        
        // want relative path (full paths are incorrect)
        var fileName = storageNode.getAttribute('fileName');
        if (fileName.split('/Data/')[1])
            fileName = 'Data/' + fileName.split('/Data/')[1];
        
        
        // only selected volume should be visible
        var visibility = displayNode.getAttribute('visibility');
        var isSelectedVolume;
        if (tagName == 'Volume') {
            if (selectedVolumeID != i.getAttribute('id')) {
                visibility = false;
                isSelectedVolume = false;
            } else {
                isSelectedVolume = true;
            }
        } else {
            isSelectedVolume = false;
        }
        
        // only add if it's a 'data' volume (not just a volume used for coloring)
//        if (displayNode !== labelMapVolumeDisplay) {
            // add info to be returned
            objects.push({
                'file':             fileName,
                'isSelectedVolume': isSelectedVolume,
                
                'attributes':   {
                    'color':        displayNode.getAttribute('color'),
//                    'colorVolume':  colorVolumeFile,
                    'colorTable':   colorTableFile,
                    'opacity':      displayNode.getAttribute('opacity'),
                    'visibility':   visibility
                }
            });
//        }
    });
    
    return objects;
}
goog.exportProperty(SlicerParser.prototype, 'extractFileInfo', SlicerParser.prototype.extractFileInfo);