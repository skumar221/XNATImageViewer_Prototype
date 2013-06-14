//******************************************************
//  Manage Active Thumbs
//******************************************************
XNATViewer.prototype.manageActiveThumbs = function (thumb, args) {
	if (!this.activeThumbManager)
		this.activeThumbManager = {};
	

	// We basically want to cycle through the manager
	// so that any Thumbnail associated with args.activeTarget
	// is removed and replaced with thumb
	if (args.activeTarget) {
		
		XV.Viewers( function(ScanViewer) { 

			if (ScanViewer.FrameViewer.args.id == args.activeTarget) {
				if (this.activeThumbManager[args.activeTarget]) {
					//console.log("deactivating existing: " + this.activeThumbManager[args.activeTarget].args.id + " in " + args.activeTarget)
					this.activeThumbManager[args.activeTarget].deactivate();
				}

				this.activeThumbManager[args.activeTarget] = thumb;
				//console.log("inserting: " + thumb.args.id + " in " + args.activeTarget);
			}	
			
		});
		
	}
	
}