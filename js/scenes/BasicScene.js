/* =============================================================================

 Name: BasicScene
 Description: Sets up basic three.js scene.
 Author: Jason Kadrmas
 Company: KadrmasConceps LLC

========================================================================== */

THREE.BasicScene = function( parameters ) {
	
	var _radius = 500,
	    _height = window.innerHeight,
		_width  = window.innerWidth,
		_this = this,
		_container = document.createElement( 'div' );
	
	_container.style.position = 'absolute';
	_container.style.overflow = 'hidden';
		
	parameters = parameters || {};
	
	this.grid = parameters.grid !== undefined ? parameters.grid : true;	
		
	// Add basic scene container
	document.body.appendChild( _container );
	
	// Setup renderer
	this.renderer = new THREE.WebGLRenderer( { clearAlpha: 1, clearColor: 0xffffff } );
	this.renderer.setSize( _width, _height );
	this.renderer.sortObjects = false;
	this.renderer.autoClear = false;
	_container.appendChild( this.renderer.domElement );
	
	// Setup camera, scene.
	this.camera = new THREE.CombinedCamera( _width/2, _height/2, 70, 1, 5000, -1000, 1000, 1000 );
	this.camera.position.x = 300;
	this.camera.position.y = 150;
	this.camera.position.z = 300;
	
	//this.camera.lookAt( new THREE.Vector3() );
	
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
	
	//
	// Functions
	//
	
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
		_this.camera.toPerspective();

		_this.renderer.setSize( width, height );
		_this.render();

	};

};

