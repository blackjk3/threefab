/**
 * @class THREEFAB.Ui
 *
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Sets up ui components for threefab.  Dependency on dat.gui.
 * @param [THREEFAB.Viewport] viewport The instance of the viewport class.
 *
 */
 
THREEFAB.Ui = function(viewport) {
	
	var _viewport = viewport,
		materialModel = new THREEFAB.MaterialModel();
		
	this.materialView = new THREEFAB.MaterialView({ model: materialModel, selected: viewport._SELECTED });
	this.transformView = new THREEFAB.TransformView({ viewport: viewport });
	this.timelineView = new THREEFAB.TimelineView();
	
	this.materialView.render();
	this.transformView.render();
	this.timelineView.render();

	this.menu = $('.menu');
	this.menu.bind('click', menuClicked);

	function menuClicked(e) {
		var target = e.target || e.srcElement,
			id = target.id;

		if(id === 'menu-animate') {
			$.publish(THREEFAB.Events.SPACEBAR_PRESSED);
		} else if(id === 'menu-delete') {
			$.publish(THREEFAB.Events.DELETE_PRESSED);
		}
	}
};

/**
 * Utils object that has shared functions.
 * @private utils
 */

THREEFAB.Ui.utils = {
	
	addProperties: function(object, list, folder, view) {
		
		for(var i=0, len=list.length; i < len; i++) {
			
			// Make sure the property is defined.
			if(object[list[i].prop] !== undefined) {
				var args = [object, list[i].prop],
				tmp_controller;
				
				if(list[i].min !== undefined) {
					args.push(list[i].min);
				}
				if(list[i].max !== undefined) {
					args.push(list[i].max);
				}
				if(list[i].values !== undefined) {
					args.push(list[i].values);
				}
				
				tmp_controller = folder.add.apply(folder, args);
							
				if(list[i].step !== undefined) {
					tmp_controller.step(list[i].step);
				}
			}
		
		}
	},

	removeFolderControllers: function(folder) {

		for (var i in folder.__controllers) {
			folder.__controllers[i].remove();
		}
		
		folder.__controllers = [];

	}
	
};


	