/**
 * @class THREEFAB.ExporterUtil
 *
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Sets up exporter for threefab.
 *
 */
 
THREEFAB.Exporter = function() {

	var code_container = $('.code-container');
	
	this.generate = function(viewport) {
		
			var html = THREEFAB.Exporter.Utils.privates();
			html += THREEFAB.Exporter.Utils.container();
			html += THREEFAB.Exporter.Utils.camera(viewport.camera);
			html += THREEFAB.Exporter.Utils.scene();
			html += THREEFAB.Exporter.Utils.renderer();
			
			html += THREEFAB.Exporter.Utils.sceneObjects(viewport.scene);

			html += THREEFAB.Exporter.Utils.animate();
			
		
		code_container.find('pre').html( html );
		code_container.show();
	};
};

THREEFAB.Exporter.Templates = {
	material: '#material'
};


THREEFAB.Exporter.Utils = {

	privates: function() {
		return "var container = document.createElement( 'div' ),\nwidth = " + window.innerWidth + ",\nheight = " + window.innerHeight + ",\ncamera,\nscene,\nrenderer,\nSHADOW_MAP_WIDTH = 2048,\nSHADOW_MAP_HEIGHT = 1024;\n\n";
	},

	container: function() {
		return "container = document.body.appendChild( container );\n\n";
	},

	addConatiner: function() {
		return "container.appendChild( this.renderer.domElement )";
	},
	
	camera: function (cam) {
	
		var str = ["camera = new THREE.PerspectiveCamera( 50, 1, 1, 5000 );"];

		str.push('camera.position.set(' + cam.position.x + ',' + cam.position.y + ',' + cam.position.z + ');');
		str.push('camera.rotation.set(' + cam.rotation.x + ',' + cam.rotation.y + ',' + cam.rotation.z + ');');

		str.push('camera.aspect = width / height;');
		str.push('camera.updateProjectionMatrix();');

		return str.join('\n');
	},

	scene: function() {
		var str = ['\n\nscene = new THREE.Scene();'];
		
		str.push('scene.add( camera );');
		
		return str.join('\n');
	},

	renderer: function() {

		var str = ["\n\nrenderer = new THREE.WebGLRenderer( { clearAlpha: 1, clearColor: 0x808080 } );"];

		str.push('renderer.setSize( width, height );');
		str.push('renderer.shadowCameraNear = 3;');
		str.push('renderer.shadowCameraFar = camera.far;');
		str.push('renderer.shadowCameraFov = 50;');
		str.push('renderer.shadowMapBias = 0.0039;');
		str.push('renderer.shadowMapDarkness = 0.5;');
		str.push('renderer.shadowMapWidth = SHADOW_MAP_WIDTH;');
		str.push('renderer.shadowMapHeight = SHADOW_MAP_HEIGHT;');
		str.push('renderer.shadowMapEnabled = true;');
		str.push('renderer.shadowMapSoft = true;');

		str.push('container.appendChild( renderer.domElement );\n\n');

		return str.join('\n');
	},

	sceneObjects: function(scene) {

		var children = scene.children,
			name_split,
			str = [],
			materialModel = new THREEFAB.MaterialModel(),
			loaderUsed = false;

		for(var i=0, len = children.length; i < len; i++) {
		
			
			if(children[i].name) {
				
				if( children[i].name === 'THREE.PointLight' || children[i].name === 'THREE.AmbientLight' || children[i].name === 'THREE.SpotLight' ) {
					
					// Light
					str.push( THREEFAB.Exporter.Utils.light(children[i], materialModel.lightList) );
					THREEFAB.Exporter.Utils.transforms(children[i], str);
					// Add light
					str.push('scene.add( mesh );');

				} else if( !children[i].light ) {
					
					// Mesh
					name_split = children[i].name.split('.');

					var namespace = name_split[0],
						meshtype = name_split[1],
						id = name_split[2];
					
					// Check for primitive geometry
					if(meshtype === "CubeGeometry") {
						str.push( THREEFAB.Exporter.Utils.geometries.cube(children[i]) );
					} else if(meshtype === "SphereGeometry") {
						str.push( THREEFAB.Exporter.Utils.geometries.sphere(children[i]) );
					} else if(meshtype === "CylinderGeometry") {
						str.push( THREEFAB.Exporter.Utils.geometries.cylinder(children[i]) );
					} else if(meshtype === "ConeGeometry") {
						str.push( THREEFAB.Exporter.Utils.geometries.cone(children[i]) );
					} else if(meshtype === "PlaneGeometry") {
						str.push( THREEFAB.Exporter.Utils.geometries.plane(children[i]) );
					} else if(meshtype === "TorusGeometry") {
						str.push( THREEFAB.Exporter.Utils.geometries.torus(children[i]) );
					} else if(meshtype === "JSONLoader" || meshtype === "SkinnedMesh") {
						if(!loaderUsed) {
							str.push('\nvar loader = new THREE.JSONLoader();');
						}
						
						str.push('loader.load( "path/to/model.js", function(geometry) {');
					} else if (meshtype === 'ColladaLoader') {
					    loader = new THREE.ColladaLoader();
		                
		                if(!loaderUsed) {
                            str.push('\nvar collada_loader = new THREE.ColladaLoader();');
                            str.push('\ncollada_loader.options.convertUpAxis = true;');
                        }
                        
                        var importURL = "path/to/model.dae";
                        if (children[i].importURL) {
                            importURL = children[i].importURL;
                        }
                        str.push('collada_loader.load( "' + importURL + '", function(dae) {');
					} else {
					    continue;
					}
					
					// Material
					str.push( THREEFAB.Exporter.Utils.material(children[i].material, materialModel.materialList) );

					if(children[i].geometry && children[i].geometry.morphTargets.length > 0) {
						str.push('material.morphTargets = true;');
					}

					// Mesh
					if(meshtype === "SkinnedMesh") {
						str.push('var mesh = new THREE.SkinnedMesh(geometry, material);');
					} else if( meshtype == "ColladaLoader") {
					    str.push('var mesh = dae.scene;');
					} else {
						str.push('var mesh = new THREE.Mesh(geometry, material);');
					}

					THREEFAB.Exporter.Utils.transforms(children[i], str);

					// Add child
					str.push('scene.add( mesh );');
					
					if(meshtype === "JSONLoader" || meshtype === "SkinnedMesh" || meshtype == "ColladaLoader") {
                        str.push('});');
                    }
				}

			}

		}

		return str.join('\n');
	},

	light: function(light, lightList) {

		var type = light.name.replace('THREE.',''),
			lght = new THREE[type](),
			html = '\nvar mesh = new ' + light.name + '();\n';

		for(var i = 0, len = lightList.length; i < len; i++) {
			if(lght[lightList[i]] !== lightList[i].prop) {
				html += 'mesh.' + lightList[i].prop + ' = ' + light[lightList[i].prop] + ';\n';
			}
		}

		// Add light color
		html+= 'mesh.color = new THREE.Color().setRGB(' + light.color.r + ',' + light.color.g + ',' + light.color.b + ');';

		return html;
	},

	material: function(material, materialList) {
		if (!(material && material.name)) {
		    return '';
		}
		
 		var mat = new THREE[material.name](),
			html = 'var material = new THREE.' + material.name + '();\n';

		for(var i = 0, len = materialList.length; i < len; i++) {

			// Make sure material has at least changed from the default.
			if(material[materialList[i].prop] !== undefined && material[materialList[i].prop] !== mat[materialList[i].prop]) {
				html+= 'material.' + materialList[i].prop + ' = ' + material[materialList[i].prop] + ';\n';
			}

		}

		// Colors
		// Do colors manually since they are currently not in the material list.
		var color_props = ['color', 'ambient', 'specular'];
		
		for(var j = 0, clen = color_props.length; j < clen; j++) {
			if(mat[color_props[j]] !== material[color_props[j]]) {
				html+= 'material.' + color_props[j] + ' = new THREE.Color().setRGB(' + material[color_props[j]].r+','+material[color_props[j]].g+','+material[color_props[j]].b+');\n';
			}
		}

		if(material.map instanceof THREEFAB.CanvasTexture) {} else {
			html += 'material.map = THREE.ImageUtils.loadTexture("path/to/texture.jpg");\n';
		}

		return html;
	},

	geometries: {
		cube: function(mesh) {
			return 'var geometry = new THREE.CubeGeometry( 100,100,100,1,1,1 );';
		},
		sphere: function(mesh) {
			return 'var geometry = new THREE.SphereGeometry(100,16,16);';
		},
		cylinder: function(mesh) {
			return 'var geometry = new THREE.CylinderGeometry(50, 50, 100, 16);';
		},
		cone: function(mesh) {
			return 'var geometry = new THREE.CylinderGeometry( 0, 50, 100, 16, 1 );';
		},
		plane: function(mesh) {
			return 'var geometry = new THREE.PlaneGeometry( 200, 200, 3, 3 );';
		},
		torus: function(mesh) {
			return 'var geometry = new THREE.TorusGeometry();';
		}
	},

	transforms: function(child, str) {

		var pos = { x:0, y:0, z:0 },
			rot = { x:0, y:0, z:0 },
			scale = { x:1, y:1, z:1 };
		
		if ( child.position.x !== 0 ) pos.x = child.position.x;
		if ( child.position.y !== 0 ) pos.y = child.position.y;
		if ( child.position.z !== 0 ) pos.z = child.position.z;

		if ( child.rotation.x !== 0 ) rot.x = child.rotation.x;
		if ( child.rotation.y !== 0 ) rot.y = child.rotation.y;
		if ( child.rotation.z !== 0 ) rot.z = child.rotation.z;

		if ( child.scale.x != 1 ) scale.x = child.scale.x;
		if ( child.scale.y != 1 ) scale.y = child.scale.y;
		if ( child.scale.z != 1 ) scale.z = child.scale.z;

		str.push('mesh.position.set(' + pos.x + ',' + pos.y + ',' + pos.z + ');');
		str.push('mesh.rotation.set(' + rot.x + ',' + rot.y + ',' + rot.z + ');');
		str.push('mesh.scale.set(' + scale.x + ',' + scale.y + ',' + scale.z + ');');
	},

	animate: function() {
		var html = '\n\nfunction animate() {\n';
			html += '\trequestAnimationFrame( animate );\n';
			html += '\trenderer.render( scene, camera );\n';
			html += '}\n\n';
			html += 'animate();';
		return html;
	}
};






