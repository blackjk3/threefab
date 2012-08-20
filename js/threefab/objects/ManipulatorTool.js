/**
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @author mr.doob / http://mrdoob.com/
 */

/**
 * @author hughes
 */


THREE.ManipulatorTool = function () {

	THREE.Object3D.call( this );
	
  this.MODES = {
    TRANSFORM: 'transform',
    ROTATE: 'rotate',
    SCALE: 'scale'
  };

	// Init
	this.selected = {};
  this.mode = this.MODES.TRANSFORM;

  this.changeMode = function( mode ) {

  };

	// setup geometeries

	var circleGeometry = new THREE.TorusGeometry( 100, 0.5, 32, 32 ),
      lineGeometry = new THREE.Geometry(),
      coneGeometry = new THREE.CylinderGeometry( 0, 5, 25, 5, 1 );

	lineGeometry.vertices.push( new THREE.Vector3() );
	lineGeometry.vertices.push( new THREE.Vector3( 0, 100, 0 ) );

	// x manuipulator

	var x_line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0xff0000 } ) );
	x_line.rotation.z = - Math.PI / 2;
	this.add( x_line );

	this.xCone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color : 0xff0000 } ) );
	this.xCone.name = "x_manipulator";
	this.xCone.position.x = 100;
	this.xCone.rotation.z = - Math.PI / 2;
	this.add( this.xCone );

  // this.xCircle = new THREE.Mesh( circleGeometry, new THREE.MeshBasicMaterial( { color : 0xff0000 } ) );
  // this.xCircle.rotation.y = - Math.PI / 2;
  // this.xCircle.name = "x_manipulator_rotate";
  // this.add( this.xCircle );

	// y manuip

	var y_line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0x00ff00 } ) );
	this.add( y_line );

	this.yCone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color : 0x00ff00 } ) );
	this.yCone.position.y = 100;
	this.yCone.name = "y_manipulator";
	this.add( this.yCone );

  // this.yCircle = new THREE.Mesh( circleGeometry, new THREE.MeshBasicMaterial( { color : 0x00ff00 } ) );
  // this.yCircle.rotation.x = - Math.PI / 2;
  // this.yCircle.name = "y_manipulator_rotate";
  // this.add( this.yCircle );

	// z manuip

	var z_line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0x0000ff } ) );
	z_line.rotation.x = Math.PI / 2;
	this.add( z_line );

  // this.zCircle = new THREE.Mesh( circleGeometry, new THREE.MeshBasicMaterial( { color : 0x0000ff } ) );
  // //this.zCircle.rotation.x = Math.PI / 2;
  // this.zCircle.name = "z_manipulator_rotate";
  // this.add( this.zCircle );

	this.zCone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color : 0x0000ff } ) );
	this.zCone.position.z = 100;
	this.zCone.name = "z_manipulator";
  this.zCone.rotation.x = Math.PI / 2;
	this.add( this.zCone );

  var cubeGeometry = new THREE.CubeGeometry( 30, 30, 30, 1, 1, 1 );
  this.cube = new THREE.Mesh(cubeGeometry, new THREE.MeshBasicMaterial({ color : 0xccfed0, wireframe: true }));
  this.add( this.cube );
};

THREE.ManipulatorTool.prototype = new THREE.Object3D();
THREE.ManipulatorTool.prototype.constructor = THREE.ManipulatorTool;
