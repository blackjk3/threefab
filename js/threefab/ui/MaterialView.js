/** 
 * @class THREEFAB.MaterialView
 * 
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Setup for material view.
 * 
 */


THREEFAB.MaterialView = Backbone.View.extend({
	
	el: '#gui-materials-container',
	gui: {},
	selected: {},
	
	folders: {
		materials:{},
		lights:{},
		textures:{},
	},
	
	initialize: function() {
		
		_.bindAll(this);

		this.el = $(this.el);
		this.selected = arguments[0].selected;
	
		$.subscribe('viewport/mesh/selected', this.meshChanged);
		$.subscribe('viewport/light/selected', this.lightChanged);

	},
	
	/**
	 *  Renders the current material dat.GUI view.
	 */
	
	render: function() {
		
		// Create materials GUI
		this.gui = new dat.GUI({ autoPlace: false, hide:false });
		this.el.append(this.gui.domElement);
		
		// Add Folders
		this.folders.materials = this.gui.addFolder('Material');
		this.folders.lights = this.gui.addFolder('Light');
		this.folders.textures = this.gui.addFolder('Texture');
		
		this.folders.materials.open();
		this.addMaterialOptions();

	},

	/**
	 * Listens to when the mesh changes and updates the material panel.
	 * @function meshChanged
	 * @param {THREE.Mesh} object
	 *
	 */

	meshChanged: function(object) {

		this.selected = object;

		this.folders.lights.close();

		this.resetControllers();
		this.addMaterialOptions();
		
		this.folders.materials.open();
	 	
	 	
		//this.rebuildMaterial();

	},

	/**
	 * Listens to when the light changes and updates the material panel.
	 * @function lightChanged
	 * @param {THREE.Mesh} object
	 *
	 */

	lightChanged: function(object) {
		
			
		this.folders.materials.close();
		this.resetControllers();
		
		THREEFAB.Ui.utils.addProperties( object, this.model.lightList, this.folders.lights );
		
		this.folders.lights.open();

	},

	resetControllers: function() {
		
		THREEFAB.Ui.utils.removeFolderControllers( this.folders.lights );
		THREEFAB.Ui.utils.removeFolderControllers( this.folders.materials );

	},
	
	/**
	 * Loops through the materialList from model and adds values to ui. 
	 * 
	 * @function MaterialView.addMaterialOptions
	 * @see MaterialModel
	 */
	
	addMaterialOptions: function() {
		
		// Add Material shader options.
		this.folders.materials.add(this.selected.material, 'name', {Basic: 'MeshBasicMaterial', Phong:'MeshPhongMaterial', Lambert: 'MeshLambertMaterial'}).onChange( this.rebuildMaterial );
	
		// Loop and add material properties.
		THREEFAB.Ui.utils.addProperties(this.selected.material, this.model.materialList, this.folders.materials);
		
		// Add color stuff.
		// TODO: Fix this later with some sort of UI color util.
		this.folders.materials.addColor(this.selected.material, 'color').onChange(function(e) {
			this.selected.material.color = new THREE.Color().setRGB(e.r/255, e.g/255, e.b/255);
		});
		
	},
	
	rebuildMaterial: function(matName){
		var mat;
	
		if(matName === undefined) {
			matName = this.selected.material.name;
		}
	
		// We can make a generic function constructor based on the material name.
		mat = new THREE[matName]();
		mat.name = matName;
		
		this.copyMaterialAttributes(mat);
		
		this.selected.material.program = false;
		this.selected.material = mat;
	},
	
	copyMaterialAttributes: function(mat) {
		
		for(var i = 0, len = this.model.materialList.length; i < len; i++) {
			if(this.selected.material[this.model.materialList[i].prop] !== undefined) {
				mat[this.model.materialList[i].prop] = this.selected.material[this.model.materialList[i].prop];
			}
		}
		
		// Copy the map and color manually.
		mat['map'] = this.selected.material['map'];
		mat['color'] = this.selected.material['color'];
		mat['ambient'] = this.selected.material['ambient'];
		
	}
	
});