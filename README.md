## Overview





__ toolkit:
The first phase entails rewriting the __Slider__.js widget to be jQueryGUI free.
Now there will be two widgets called __horizontalSlider__.js and __verticalSlider__.js


### Workflow

A general overview of the XNATModalImageViewer flow is as follows:

	1. XNATModalImageViewer.js (Holds a "scrollGallery" and multiple "scanViewers"):
Manages all of the various "widgets" that comprise the viewer.
This is where AJAX calls would be.  Right now, we're working with a very basic
data set called TESTSCANDATA_1 found in the ./TESTSCANS directory


	2. scrollGallery.js (Holds "scanThumbnails"):
Mousewheel responsive filmstrip gallery that hosts "scanThumbnails", which are
"__Draggable__" widgets that can be dropped into "__DropZones__". 


	3. scanThumbnail.js  (is a "__Draggable__"):
A quasi-intelligent JavaScript object (comprised of several elements, mostly divs)
that contains the basic information of the scan itself, and its metadata.  The images
are themselves not loaded onto the thumbnail, but their paths are.


	4. scanViewer.js (Holds: frameViewer, scanTabs and a slider):
This is the "view" widget thats comprised of the metadata tabs, the frame slider and 
the frameViewer


	5. frameViewer.js (is a "__DropZone__"):
Holds a number of Image elements (frames) that are subsequently drawn onto an html5 canvas
using the drawImage function. 


	6. imageManip.js:
Contains utility methods for brightness and contrast.


	7. scanTabs.js:
Modified jQueryUI tabs for hosting metadata/

	8. The "__" toolkit:
jQuery + JavaScript toolkit, developed by Sunil Kumar.  Contains a lot of useful stuff.


