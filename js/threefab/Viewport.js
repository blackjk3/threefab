/* =============================================================================

 Name: Viewport
 Description: Sets up basic three.js viewport.
 Author: Jason Kadrmas
 Company: KadrmasConceps LLC

========================================================================== */

THREEFAB.Viewport = function( parameters ) {
	
	var _radius = 500,
		_height = window.innerHeight,
		_width  = window.innerWidth,
		_this = this,
		_container = document.createElement( 'div' ),
		_mouse = { x: 0, y: 0 },
		_prev_mouse = { x: 0, y: 0 },
		_prev_camera,
		_SELECTED_DOWN = false,
		_SELECTED_AXIS,
		_projector = new THREE.Projector(),
		SHADOW_MAP_WIDTH = 2048,
		SHADOW_MAP_HEIGHT = 1024;
	
	_container.style.position = 'absolute';
	_container.style.overflow = 'hidden';

	parameters = parameters || {};
	
	this.grid = parameters.grid !== undefined ? parameters.grid : true;
		
	// Add basic scene container
	document.body.appendChild( _container );
	
	// Setup camera, scene.
	//this.camera = new THREE.CombinedCamera( _width/2, _height/2, 70, 1, 5000, -1000, 1000, 1000 );
	//this.camera.position.x = 300;
	//this.camera.position.y = 150;
	//this.camera.position.z = 300;

	this.camera = new THREE.PerspectiveCamera( 50, 1, 1, 5000 );
	this.camera.position.x = 500;
	this.camera.position.y = 250;
	this.camera.position.z = 500;
	this.camera.lookAt( new THREE.Vector3() );
	
	// Setup renderer
	this.renderer = new THREE.WebGLRenderer( { clearAlpha: 1, clearColor: 0x808080 } );
	this.renderer.setSize( _width, _height );
	this.renderer.shadowCameraNear = 3;
	this.renderer.shadowCameraFar = this.camera.far;
	this.renderer.shadowCameraFov = 50;

	this.renderer.shadowMapBias = 0.0039;
	this.renderer.shadowMapDarkness = 0.5;
	this.renderer.shadowMapWidth = SHADOW_MAP_WIDTH;
	this.renderer.shadowMapHeight = SHADOW_MAP_HEIGHT;

	this.renderer.shadowMapEnabled = true;
	this.renderer.shadowMapSoft = true;
	
	_container.appendChild( this.renderer.domElement );
	
	// Add trackball this.controls.
	this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );
	this.controls.rotateSpeed = 1.0;
	this.controls.zoomSpeed = 1.2;
	this.controls.panSpeed = 0.2;
	this.controls.noZoom = false;
	this.controls.noPan = false;
	this.controls.staticMoving = false;
	this.controls.dynamicDampingFactor = 0.3;
	this.controls.minDistance = 0;
	this.controls.maxDistance = _radius * 100;
	this.controls.keys = [ 65, 83, 68 ]; // [ rotateKey, zoomKey, panKey ]
	
	// Scene
	this.scene = new THREE.Scene();
	
	//Grid
	if(this.grid) {
		this.grid = new THREE.Grid();
		this.scene.add(this.grid);
			
		// Axis
		this.manipulator = new THREE.ManipulatorTool();
		this.scene.add(this.manipulator);
	}
	
	// Drag and drop functionality
	$.subscribe(THREEFAB.Events.MODEL_LOADED, $.proxy(this.addModel, this));
	$.subscribe(THREEFAB.Events.TEXTURE_LOADED, $.proxy(this.addTexture, this));
	$.subscribe(THREEFAB.Events.PRIMITIVE_ADDED, $.proxy(this.addPrimitive, this));
	$.subscribe(THREEFAB.Events.LIGHT_ADDED, $.proxy(this.addLight, this));
	$.subscribe(THREEFAB.Events.TEXTURE_CLEAR, $.proxy(this.clearTexture, this));

	$.subscribe(THREEFAB.Events.OUTLINER_CHANGED, outlinerChanged);

	// =============================================================================
	// DEFAULT Light, Cube.  JUST LIKE BLENDER
	// =============================================================================
	
	this.setupDefaultScene.apply(this);
	//this.addParticleSystem.apply(this);
	
	// =============================================================================
	// Public Functions
	// =============================================================================
	
	this.render = function() {
		_this.controls.update();
		_this.renderer.render( _this.scene, _this.camera );
	};
	
	this.animate = function() {
		requestAnimationFrame( _this.animate );
		_this.render();
	};
	
	this.setSize = function ( width, height ) {

		_width = width;
		_height = height;

		_this.camera.aspect = width / height;
		//_this.camera.toPerspective();
		_this.camera.updateProjectionMatrix();

		_this.renderer.setSize( width, height );
		_this.render();

	};
	
	this.selected = function(object) {
		
		// Remove the current overdraw
		if(_this._SELECTED) {
			_this._SELECTED.material.program = null;
			_this._SELECTED.material.overdraw = false;
		}
		
		_this._SELECTED = object;
		
		if(!_this._SELECTED.light) {
			// It's a mesh!
			$.publish(THREEFAB.Events.VIEWPORT_MESH_SELECTED, object);
		} else {
			// It's a light!
			$.publish(THREEFAB.Events.VIEWPORT_LIGHT_SELECTED, object);
			_this._SELECTED.material.program = null;
			_this._SELECTED.material.overdraw = true;
		}

		_this.updateManipulator();
	};
	
	this.deselect = function() {
		
		_this.controls.noRotate = false;
		_SELECTED_AXIS = null;
		_SELECTED_DOWN = false;
		
	};
	
	this.updateManipulator = function() {
		_this.manipulator.position.copy( _this._SELECTED.position );
	};


	function outlinerChanged(name) {
		
		var child = _this.scene.getChildByName(name);
		_this.selected(child);
	}
	
	
	// =============================================================================
	//
	//  Mouse Functions
	//
	// =============================================================================
	
	// ----------------------------------------
	// Mouse Down
	// ----------------------------------------
	
	this.renderer.domElement.addEventListener( 'mousedown', function ( event ) {
		
		event.preventDefault();
		
		// find intersections
		
		var vector = new THREE.Vector3( _mouse.x, _mouse.y, 1 );
		_projector.unprojectVector( vector, _this.camera );

		var ray = new THREE.Ray( _this.camera.position, vector.subSelf( _this.camera.position ).normalize() );

		var intersects = ray.intersectScene( _this.scene );

		if ( intersects.length > 0 ) {
			
			// Are we already selected?
			if ( _SELECTED_AXIS != intersects[ 0 ].object  && (intersects[ 0 ].object.name === "x_manipulator" || intersects[ 0 ].object.name === "y_manipulator" || intersects[ 0 ].object.name === "z_manipulator")) {

				_this.controls.noRotate = true;
				_SELECTED_AXIS = intersects[0].object;
				
			} else {
				
				// This is an object and not a grid handle.
				_this.selected(intersects[0].object);
				_SELECTED_DOWN = true;

			}

		}
		
		// Log the camera postion. If it moves then don't deselect any selected items.
		_prev_camera = _this.camera;
	});

	// ----------------------------------------
	// Mouse up
	// ----------------------------------------
	
	this.renderer.domElement.addEventListener('mouseup', function(event) {
		
		event.preventDefault();
		_this.deselect();
		
	});

	// ----------------------------------------
	// Mouse move
	// ----------------------------------------
	
	this.renderer.domElement.addEventListener('mousemove', function(event) {
	
		event.preventDefault();
		
		_prev_mouse.x = _mouse.x;
		_prev_mouse.y = _mouse.y;
	
		_mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		_mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
		
		if ( _SELECTED_AXIS && _this._SELECTED ) {
	
			var tx = (_mouse.x - _prev_mouse.x) * 1000;
			var ty = (_mouse.y - _prev_mouse.y) * 1000;
			
			if(_SELECTED_AXIS.name === "x_manipulator") {
				_this.manipulator.translateX(tx);
			} else if(_SELECTED_AXIS.name === "y_manipulator") {
				_this.manipulator.translateY(ty);
			} else if(_SELECTED_AXIS.name === "z_manipulator") {
				_this.manipulator.translateZ(-ty);
			}
			
			if ( _this._SELECTED  ) {
				_this._SELECTED.position.copy( _this.manipulator.position );
			}
		}
	});
	
	// ----------------------------------------
	// Keyboard Support
	// ----------------------------------------
	
	window.addEventListener('keydown', function(e) {
		
		var code;
		
		if (!e) { e = window.event; }
		if (e.keyCode) {
			code = e.keyCode;
		} else if (e.which) {
			code = e.which;
		}
		
		if (code === 88) {
			if(_this._SELECTED) {
				
				if(_this._SELECTED.light) {
					_this.scene.remove(_this._SELECTED.light);
				}
				
				_this.scene.remove(_this._SELECTED);

				// Get the next mesh and select that one
				for(var i=0, len = _this.scene.children.length; i < len; i++) {
		
					if(_this.scene.children[i].name) {
						_this.selected(_this.scene.children[i]);
						break;
					}
				}

				$.publish(THREEFAB.Events.VIEWPORT_OBJECT_REMOVED, _this.scene);
			}
		}
	});
};

THREEFAB.Viewport.prototype = {

	addPrimitive: function(type) {
		
		var material,
			geometry,
			mesh,
			meshName,
			rotation,
			doubleSided = false;
		
		
		material = new THREE.MeshPhongMaterial( { wireframe: false, map: new THREEFAB.CanvasTexture(), shading: THREE.SmoothShading, overdraw:false } );
		material.name = 'MeshPhongMaterial';
				
		if(type === "sphere") {
			geometry = new THREE.SphereGeometry(100,16,16);
			meshName = 'THREE.SphereGeometry';
		} else if(type === "cube") {
			geometry = new THREE.CubeGeometry(100,100,100,1,1,1);
			meshName = 'THREE.CubeGeometry';
		} else if(type === "cylinder") {
			geometry = new THREE.CylinderGeometry(50, 50, 100, 16);
			meshName = 'THREE.CylinderGeometry';
		} else if(type === "cone") {
			geometry = new THREE.CylinderGeometry( 0, 50, 100, 16, 1 );
			meshName = 'THREE.ConeGeometry';
		} else if(type === "plane") {
			geometry = new THREE.PlaneGeometry( 200, 200, 3, 3 );
			meshName = 'THREE.PlaneGeometry';
			rotation = new THREE.Vector3(-Math.PI/2,0,0);
			doubleSided = true;
		} else if(type === "torus") {
			geometry = new THREE.TorusGeometry();
			rotation = new THREE.Vector3(-Math.PI/2,0,0);
			meshName = 'THREE.TorusGeometry';
		}
		
		geometry.dynamic = true;
		mesh = new THREE.Mesh(geometry, material);
		mesh.name = meshName + "." + mesh.id;
		
		if(rotation) {
			mesh.rotation.copy(rotation);
		}
		if(doubleSided) {
			mesh.doubleSided = true;
		}
		
		this.scene.add(mesh);

		$.publish(THREEFAB.Events.VIEWPORT_OBJECT_ADDED, this.scene);
		
		return mesh;
	},
	
	addParticleSystem: function() {
		// create the particle variables
		var particleCount = 1800,
			particles = new THREE.Geometry(),
			pMaterial = new THREE.ParticleBasicMaterial({ color: 0xFFFFFF, size: Math.random() * 25 + 10, map: THREE.ImageUtils.loadTexture( "img/particle.png" ), blending: THREE.AdditiveBlending, transparent: true });
		
		// now create the individual particles
		for(var p = 0; p < particleCount; p++) {
		
			// create a particle with random
			// position values, -250 -> 250
			var pX = Math.random() * 500 - 250,
				pY = Math.random() * 500 - 250,
				pZ = Math.random() * 500 - 250,
				particle = new THREE.Vertex( new THREE.Vector3(pX, pY, pZ) );
		
			// add it to the geometry
			particles.vertices.push(particle);
		}
		
		// create the particle system
		var particleSystem = new THREE.ParticleSystem( particles, pMaterial);
		
		particleSystem.sortParticles = true;
		
		// add it to the scene
		this.scene.add(particleSystem);
	},
	
	addModel:function(mesh) {
		this.scene.add(mesh);
		this.selected(mesh);
		$.publish(THREEFAB.Events.VIEWPORT_OBJECT_ADDED, this.scene);
		
		return mesh;
	},
	
	addLight:function(type) {
		
		var lightmesh;
		
		if(type === "point") {
			lightmesh = new THREEFAB.PointLightContainer(this.scene);
		} else if(type === "spot") {
			lightmesh = new THREEFAB.SpotLightContainer(this.scene);
		} else if(type === "ambient") {
			lightmesh = new THREEFAB.AmbientLightContainer(this.scene);
		}
		
		lightmesh.mesh.position.y = 150;
		lightmesh.mesh.position.x = 100;
		
		this.resetMaterials();

		$.publish(THREEFAB.Events.VIEWPORT_OBJECT_ADDED, this.scene);
		
		return lightmesh;
	},
	
	addTexture: function(tex) {
		
		this._SELECTED.material.program = null;
		this._SELECTED.material.map = tex;

		this._SELECTED.material.program = null;
		this._SELECTED.material.map = tex;

		$.publish(THREEFAB.Events.VIEWPORT_OBJECT_TEXTURE_ADDED, this._SELECTED);
	},

	clearTexture: function() {
		
		this._SELECTED.material.program = null;
		this._SELECTED.material.map = new THREEFAB.CanvasTexture();

	},
	
	resetMaterials: function() {
		
		for(var i=0, len = this.scene.children.length; i < len; i++) {
			var child = this.scene.children[i], cached_mat;
			if(child.material && child instanceof THREE.Mesh) {
				cached_mat = child.material;
				child.material.program = false;
				child.material = null;
				child.material = cached_mat;
			}
		}
		
	},
	
	setupDefaultScene: function() {
		var mesh = this.addPrimitive.call(this, 'cube');
		var lightmesh = this.addLight.call(this, 'point');
		
		this._SELECTED = mesh;

		$.publish(THREEFAB.Events.VIEWPORT_MESH_SELECTED, mesh);
	}
};
	
