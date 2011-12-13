/* =============================================================================

 Name: Ui
 Description: Sets up ui components for threefab.  Uses dat.gui
 Author: Jason Kadrmas
 Company: KadrmasConceps LLC

========================================================================== */

THREEFAB.Ui = function(viewport) {
	var _viewport = viewport,
		_transform_gui = new dat.GUI({ autoPlace: false, hide:false }),
		_materials_gui = new dat.GUI({ autoPlace: false, hide:false }),
		transformContainer = document.getElementById('gui-transform-container'),
		materialsContainer = document.getElementById('gui-materials-container');
	
	transformContainer.appendChild(_transform_gui.domElement);
	materialsContainer.appendChild(_materials_gui.domElement);
	
	// =============================================================================
	// ADD :: Camera controls.
	// =============================================================================
	
	var f1 = _transform_gui.addFolder('Camera');
		f1.add(_viewport.camera.position, 'x').listen();
		f1.add(_viewport.camera.position, 'y').listen();
		f1.add(_viewport.camera.position, 'z').listen();
	
	// =============================================================================
	// ADD :: Scene controls.
	// =============================================================================
	
	var folder_scene = _transform_gui.addFolder('Scene / Outliner');
	var scene_select = document.createElement('select');
	
	function addOptions() {
		for(var i=0, len = _viewport.scene.children.length; i < len; i++) {
		
			if(_viewport.scene.children[i].name) {   	
			   var opt = document.createElement('option');
			      opt.innerHTML = _viewport.scene.children[i].name;
			      opt.setAttribute('value', _viewport.scene.children[i].id);
			      scene_select.appendChild(opt);
			}
			
		}
	}
	
	addOptions();
	
	var li_scene = document.createElement('li');
	li_scene.appendChild(scene_select);
	
	folder_scene.__ul.appendChild(li_scene);
	folder_scene.open();
	
	// =============================================================================
	// ADD :: Transform controls.
	// =============================================================================
	
	var folder_transforms = _transform_gui.addFolder('Transform');
		
	addTransforms(folder_transforms);	
	folder_transforms.open();	
	
	// =============================================================================
	// ADD :: Geometry controls.
	// =============================================================================
	
	//var folder_geometry = _transform_gui.addFolder('Geometry');


	// =============================================================================
	// Add / Edit materials / textures
	// =============================================================================
	
	var folder_materials = _materials_gui.addFolder('Material');
	var folder_light = _materials_gui.addFolder('Light');	
	
	var folder_textures = _materials_gui.addFolder('Textures');
	
	var materialList = [
	 {
	 	prop:'wireframe'
	 },
	 {
	 	prop:'transparent'
	 },
	 {
	 	prop:'opacity', 
	 	min:0, 
	 	max:1
	 },
	 {
	 	prop:'shading', 
	 	values:{None: 0, Flat: 1, Smooth: 2}
	 },
	 {
	 	prop:'blending', 
	 	values:{Normal: 0, Additive: 1, Subtractive: 2, Multiply:3, AdditiveAlpha:4}
	 },
	 {
	 	prop:'reflectivity',
	 	min:0,
	 	max:5
	 },
	 {
	 	prop:'shininess'
	 }
	];
	
	var lightList = [
		{
			prop: 'intensity', 
			min:0, 
			max:10
		},
		{
			prop: 'castShadow'
		}
	];
	
	addMaterials(folder_materials);
	folder_materials.open();	
	
	//_materials_gui.__folders = {};
	//materialsContainer.removeChild(_materials_gui.domElement);
	
	$.subscribe('viewport/mesh/selected', buildMeshMenus);
	$.subscribe('viewport/light/selected', buildLightMenu);
	
	
	function buildLightMenu() {
		console.log("UI :: LIGHT SELECTED ");
		
		folder_materials.close();
		
		removeFolderControllers(folder_light);
		removeFolderControllers(folder_transforms);
		removeFolderControllers(folder_materials);
		
		addLight(folder_light);
		addTransforms(folder_transforms);
		
		folder_light.open();
	}
	
	function buildMeshMenus() {
		
		folder_light.close();
		
		console.log("UI :: MESH SELECTED ");
		
		removeFolderControllers(folder_light);
		removeFolderControllers(folder_transforms);
		removeFolderControllers(folder_materials);
		
		addTransforms(folder_transforms);
		addMaterials(folder_materials);
		
		folder_materials.open();
	}
	
	// =============================================================================
	// Misc helper functions to add to a folder.
	// =============================================================================
	
	function addMaterials(folder) {
		// TODO: Change color, mat_color = f3.addColor(_viewport._SELECTED.material, 'color');
		console.log(_viewport._SELECTED);
		
		folder.add(_viewport._SELECTED.material, 'name', {Basic: 'MeshBasicMaterial', Phong:'MeshPhongMaterial', Lambert: 'MeshLambertMaterial'}).onChange(function(matName){
			rebuildMaterial(matName);
			//removeFolderControllers(folder_materials);
			//addMaterials(folder_materials);
		});
		
		// Loop and add material properties.
		
		addProperties(_viewport._SELECTED.material, materialList, folder);
		
		folder.addColor(_viewport._SELECTED.material, 'color').onChange(function(e) {
			
			//var hex = '0x' + dat.color.math.rgb_to_hex(Math.floor(e.r), Math.floor(e.g), Math.floor(e.b)).toString(16);
			//console.log("COLOR :: " + hex);
			_viewport._SELECTED.material.color = new THREE.Color().setRGB(e.r/255, e.g/255, e.b/255);
			
			//var color = THREE.Color().setRGB(e.r, e.g, e.b);
			//_viewport._SELECTED.material.color.r = e.r / 255;
			//_viewport._SELECTED.material.color.g = e.g / 255;
			//_viewport._SELECTED.material.color.b = e.b / 255;
		});
	}
	
	function rebuildMaterial(matName) {
		
		var mat;
	
		// We can make a generic function constructor based on the material name.
		mat = new THREE[matName]();
		mat.name = matName;
		copyMaterialAttributes(mat);
		_viewport._SELECTED.material.program = false;
		_viewport._SELECTED.material = mat;
		
		console.log(_viewport._SELECTED);
	}
	
	function copyMaterialAttributes(mat) {
		
		for(var i=0, len=materialList.length; i < len; i++) {
			if(_viewport._SELECTED.material[materialList[i].prop] !== undefined) {
				mat[materialList[i].prop] = _viewport._SELECTED.material[materialList[i].prop];
			}
		}
		
		// Copy the map and color manually.
		mat['map'] = _viewport._SELECTED.material['map'];
		mat['color'] = _viewport._SELECTED.material['color'];
		mat['ambient'] = _viewport._SELECTED.material['ambient'];
		
	}
	
	function addLight(folder) {
		addProperties(_viewport._SELECTED.light, lightList, folder);
	}
	
	function addProperties(object, list, folder) {
		
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
				
				folder.add.apply(folder, args);
							
				if(list[i].step !== undefined) {
					tmp_controller.step(list[i].step);
				}
			}
		}
		
	}
	
	function addTransforms(folder) {
		folder.add(_viewport._SELECTED.position, 'x').listen().onChange(function(){
			_viewport.updateManipulator();
		});
		folder.add(_viewport._SELECTED.position, 'y').listen().onChange(function(){
			_viewport.updateManipulator();
		});
		folder.add(_viewport._SELECTED.position, 'z').listen().onChange(function(){
			_viewport.updateManipulator();
		});
		
		// Rotation
		folder.add(_viewport._SELECTED.rotation, 'x', -Math.PI, Math.PI);
		folder.add(_viewport._SELECTED.rotation, 'y', -Math.PI, Math.PI);
		folder.add(_viewport._SELECTED.rotation, 'z', -Math.PI, Math.PI);
		
		if(!_viewport._SELECTED.light) {
			
			// Scale 
			folder.add(_viewport._SELECTED.scale, 'x', 0);
			folder.add(_viewport._SELECTED.scale, 'y', 0);
			folder.add(_viewport._SELECTED.scale, 'z', 0);
			
		}
		
		folder.add(_viewport._SELECTED, 'castShadow');
		folder.add(_viewport._SELECTED, 'receiveShadow').onChange(function() {
			// TODO: Find the actual shader.
			_viewport.rebuildMaterial("MeshPhongMaterial");
		});
	}
	
	function removeFolderControllers(folder) {
		for (var i in folder.__controllers) {
			folder.__controllers[i].remove();
		}
		
		folder.__controllers = [];
	}
}
	