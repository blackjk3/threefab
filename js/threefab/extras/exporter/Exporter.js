/**
 * @class THREEFAB.ExporterUtil
 *
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Sets up exporter for threefab.
 *
 */
 
THREEFAB.Exporter = function() {

	THREEFAB.Exporter.Templates.material = $(THREEFAB.Exporter.Templates.material);
	
	this.generate = function(viewport) {
		
			var html = THREEFAB.Exporter.Utils.privates();
			html += THREEFAB.Exporter.Utils.container();
			html += THREEFAB.Exporter.Utils.camera(viewport.camera);
			html += THREEFAB.Exporter.Utils.scene();
			html += THREEFAB.Exporter.Utils.renderer();
			
			html += THREEFAB.Exporter.Utils.sceneObjects(viewport.scene);
			
		
		$(document.body).append('<div class="code-container"><pre>' + html + '</pre></div>');
	};
};

THREEFAB.Exporter.Templates = {
	material: '#material'
};


THREEFAB.Exporter.Utils = {

	privates: function() {
		return "var container = document.createElement( 'div' ),\nwidth = window.innerWidth,\nheight = window.innerHeight,\ncamera,\nscene,\nrenderer,\nSHADOW_MAP_WIDTH = 2048,\nSHADOW_MAP_HEIGHT = 1024;\n\n";
	},

	container: function() {
		return "container = document.body.appendChild( container );\n\n";
	},

	addConatiner: function() {
		return "container.appendChild( this.renderer.domElement )";
	},
	
	camera: function (cam) {
	
		var str = ["camera = new THREE.CombinedCamera( width/2, height/2, 70, 1, 5000, -1000, 1000, 1000 );"];

		str.push('camera.position.x = ' + cam.position.x + ';');
		str.push('camera.position.y = ' + cam.position.y + ';');
		str.push('camera.position.z = ' + cam.position.z + ';');

		return str.join('\n');
	},

	scene: function() {
		return '\n\nscene = new THREE.Scene();';
	},

	renderer: function() {

		var str = ["\n\nrenderer = new THREE.WebGLRenderer( { clearAlpha: 1, clearColor: 0x808080 } );"];

		str.push('renderer.setSize( width, height );');
		str.push('renderer.shadowCameraNear = 3;');
		str.push('renderer.shadowCameraFar = this.camera.far');
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
			str = [];

		for(var i=0, len = children.length; i < len; i++) {
		
			
			if(children[i].name) {
				
				if(children[i].light) {
					// Light
					console.log(children[i].name);
				} else {
					// Mesh
					console.log(children[i].name);
					name_split = children[i].name.split('.');

					var namespace = name_split[0],
						meshtype = name_split[1],
						id = name_split[2];
					
					if(meshtype === "CubeGeometry") {
						str.push(THREEFAB.Exporter.Utils.geometries.cube(children[i]));
						console.log(children[i]);
					}

					//str.push( THREEFAB.Exporter.Utils.material(children[i]) );
					THREEFAB.Exporter.Utils.material(children[i].material);


					str.push('var mesh = new THREE.Mesh(geometry, material);');
					THREEFAB.Exporter.Utils.transforms(children[i], str);
					

					str.push('scene.add( mesh );');
				}
			}

		}

		return str.join('\n');
	},

	material: function(material) {
		
		//var 'var material = new ' + ;
		console.log(material);
		var html = THREEFAB.Exporter.Templates.material.tmpl(material);
		console.log(html);
		//return ;
	},

	geometries: {
		cube: function(mesh) {
			return 'var geometry = new THREE.CubeGeometry( 100,100,100,1,1,1 );';
		}
	},

	transforms: function(child, str) {
	
		if ( child.position.x !== 0 ) str.push('mesh.position.x = ' + child.position.x + ';');
		if ( child.position.y !== 0 ) str.push('mesh.position.y = ' + child.position.y + ';');
		if ( child.position.z !== 0 ) str.push('mesh.position.z = ' + child.position.z + ';');

		if ( child.rotation.x !== 0 ) str.push('mesh.rotation.x = ' + child.rotation.x + ';');
		if ( child.rotation.y !== 0 ) str.push('mesh.rotation.y = ' + child.rotation.y + ';');
		if ( child.rotation.z !== 0 ) str.push('mesh.rotation.z = ' + child.rotation.z + ';');

		if ( child.scale.x != 1 ) str.push('mesh.scale.x = ' + child.scale.x + ';');
		if ( child.scale.y != 1 ) str.push('mesh.scale.y = ' + child.scale.y + ';');
		if ( child.scale.z != 1 ) str.push('mesh.scale.z = ' + child.scale.z + ';');
	}
};






