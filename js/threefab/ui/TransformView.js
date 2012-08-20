/**
 * @class THREEFAB.TransformView
 *
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Setup transform view.
 *
 */


THREEFAB.TransformView = Backbone.View.extend({
		
	el: '#gui-transform-container',
	gui: {},
	outliner: {},
	viewport: {},
	viewportView: {},
	selected: {},
	
	folders: {
		camera:{},
		outliner:{},
		viewport:{},
		transforms:{},
		animate:{}
	},
	
	initialize: function() {

		_.bindAll(this);
		this.el = $(this.el);

		this.viewport = arguments[0].viewport;

		// Listen to when an object is selected.
		$.subscribe( THREEFAB.Events.VIEWPORT_MESH_SELECTED, this.addTransformOptions );
		$.subscribe( THREEFAB.Events.VIEWPORT_LIGHT_SELECTED, this.addTransformOptions );
    $.subscribe( THREEFAB.Events.MANIPULATOR_UPDATED, this.update );
	},
	
	render: function() {
		
		// Create transform gui element.
		this.gui = new dat.GUI({ autoPlace: false, hide: false });
		this.el.append( this.gui.domElement );
		
		// Add Camera
		this.folders.camera = this.gui.addFolder('Camera')	;
		this.addCameraOptions();

		// Add target
		this.folders.viewport = this.gui.addFolder('Controls');
		this.viewportView = new THREEFAB.ViewportView();
		this.folders.viewport.__ul.appendChild(this.viewportView.el[0]);
		this.folders.viewport.open();

		// Add outliner
		this.folders.outliner = this.gui.addFolder('Outliner');
		this.outliner = new THREEFAB.OutlinerView();
		this.outliner.render( this.viewport.scene );

		this.folders.outliner.__ul.appendChild(this.outliner.el[0]);
		this.folders.outliner.open();
						
		// Add transforms
		this.folders.transforms = this.gui.addFolder('Transforms');
		this.addTransformOptions();
		this.folders.transforms.open();

    // Add Shadows
    this.folders.shadows = this.gui.addFolder('Shadows');
    this.addShadowOptions();
	},

	addCameraOptions: function() {

		this.folders.camera.add( this.viewport.camera.position, 'x' ).listen();
		this.folders.camera.add( this.viewport.camera.position, 'y' ).listen();
		this.folders.camera.add( this.viewport.camera.position, 'z' ).listen();
		
	},

	addTransformOptions: function() {

		var selected = this.viewport._SELECTED;
		var viewport = this.viewport;

		THREEFAB.Ui.utils.removeFolderControllers(this.folders.transforms);

    // Position
    this.folders.transforms.add( selected.position, 'x' ).onChange( viewport.updateManipulator );
    this.folders.transforms.add( selected.position, 'y' ).onChange( viewport.updateManipulator );
    this.folders.transforms.add( selected.position, 'z' ).onChange( viewport.updateManipulator );
		
		// Rotation
		this.folders.transforms.add( selected.rotation, 'x', -Math.PI, Math.PI ).name('Rotation X');
		this.folders.transforms.add( selected.rotation, 'y', -Math.PI, Math.PI ).name('Rotation Y');
		this.folders.transforms.add( selected.rotation, 'z', -Math.PI, Math.PI ).name('Rotation Z');
		
		if(!selected.light) {
			
			// Scale
			this.folders.transforms.add( selected.scale, 'x', 0 ).name('Scale X');
			this.folders.transforms.add( selected.scale, 'y', 0 ).name('Scale Y');
			this.folders.transforms.add( selected.scale, 'z', 0 ).name('Scale Z');
			
		}

	},

  addShadowOptions: function() {
    
    var selected = this.viewport._SELECTED;
    var viewport = this.viewport;

    this.folders.shadows.add(selected, 'castShadow');
    this.folders.shadows.add(selected, 'receiveShadow').onChange( viewport.resetMaterials );
  },

  update: function() {
    
    var trans = this.folders.transforms;
    
    for ( var i in trans.__controllers ) {
      trans.__controllers[i].updateDisplay();
    }
    
  }


});