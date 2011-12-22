/**
 *
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
	texture: {},
	color: {},
	light: {},
	
	folders: {
		materials:{},
		lights:{},
		textures:{}
	},

	initialize: function() {
		
		_.bindAll(this);

		this.el = $(this.el);
		this.selected = arguments[0].selected;
	
		$.subscribe(THREEFAB.Events.VIEWPORT_MESH_SELECTED, this.meshChanged);
		$.subscribe(THREEFAB.Events.VIEWPORT_LIGHT_SELECTED, this.lightChanged);
		$.subscribe(THREEFAB.Events.MATERIAL_COLOR_CHANGED, this.changeColor);
		$.subscribe(THREEFAB.Events.LIGHT_COLOR_CHANGED, this.changeColor);
	},
	
	
	render: function() {
		
		// Create materials GUI
		this.gui = new dat.GUI({ autoPlace: false, hide:false });
		this.el.append(this.gui.domElement);
		
		// Add Folders
		this.folders.materials = this.gui.addFolder('Material');
		this.folders.textures = this.gui.addFolder('Texture');
		this.folders.lights = this.gui.addFolder('Light');
		
		
		this.folders.materials.open();
		this.folders.textures.open();

		// Material Color Chips
		this.color = new THREEFAB.ColorView();
		this.folders.materials.__ul.appendChild(this.color.el[0]);

		this.addMaterialOptions();

		// Texture Panel
		this.texture = new THREEFAB.TextureView();
		this.folders.textures.__ul.appendChild(this.texture.el[0]);
		this.texture.render(this.selected);

		// Light view
		this.light = new THREEFAB.LightView();
		this.folders.lights.__ul.appendChild(this.light.el[0]);
		this.light.el.hide();
	},

	meshChanged: function(object) {

		this.selected = object;

		this.folders.lights.close();

		this.resetControllers();
		this.addMaterialOptions();
		
		this.folders.materials.open();
		this.folders.textures.open();
		this.color.el.show();
		this.texture.el.show();
		
		this.light.el.hide();
		//this.rebuildMaterial();

	},


	lightChanged: function(object) {
		
		this.light.el.show();
			
		this.folders.materials.close();
		this.color.el.hide();
		
		this.folders.textures.close();
		this.texture.el.hide();

		this.resetControllers();
		
		THREEFAB.Ui.utils.addProperties( object, this.model.lightList, this.folders.lights );
		
		this.folders.lights.open();

	},

	resetControllers: function() {
		
		THREEFAB.Ui.utils.removeFolderControllers( this.folders.lights );
		THREEFAB.Ui.utils.removeFolderControllers( this.folders.materials );

	},

	
	addMaterialOptions: function() {
		
		// Add Material shader options.
		this.folders.materials.add(this.selected.material, 'name', {Basic: 'MeshBasicMaterial', Phong:'MeshPhongMaterial', Lambert: 'MeshLambertMaterial'}).onChange( this.rebuildMaterial );
	
		// Loop and add material properties.
		THREEFAB.Ui.utils.addProperties(this.selected.material, this.model.materialList, this.folders.materials, this);
	},

	changeColor: function(c, type) {
		
		this.selected.material[type] = new THREE.Color().setRGB(c.r/255, c.g/255, c.b/255);

		if(type === 'ambient' || type === 'specular') {
			this.rebuildMaterial();
		}
	},

	changeLightColor: function(c) {
		this.selected.mesh.light.color = new THREE.Color().setRGB(c.r/255, c.g/255, c.b/255);
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
		mat.map = this.selected.material.map;
		mat.color = this.selected.material.color;
		mat.ambient = this.selected.material.ambient;
		mat.specular = this.selected.material.specular;
		
	}
	
});