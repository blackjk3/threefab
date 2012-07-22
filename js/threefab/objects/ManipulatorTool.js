/**
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @author mr.doob / http://mrdoob.com/
 */

THREE.ManipulatorTool = function () {

	THREE.Object3D.call( this );
	
	// Init
	this.selected = {};
	
	// setup geometery
	
	var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push( new THREE.Vector3() );
	lineGeometry.vertices.push( new THREE.Vector3( 0, 100, 0 ) );

	var coneGeometry = new THREE.CylinderGeometry( 0, 5, 25, 5, 1 );

	// x

	var line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0xff0000 } ) );
	line.rotation.z = - Math.PI / 2;
	this.add( line );

	this.xCone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color : 0xff0000 } ) );
	this.xCone.name = "x_manipulator";
	this.xCone.position.x = 100;
	this.xCone.rotation.z = - Math.PI / 2;
	this.add( this.xCone );

	// y

	var line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0x00ff00 } ) );
	this.add( line );

	this.yCone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color : 0x00ff00 } ) );
	this.yCone.position.y = 100;
	this.yCone.name = "y_manipulator";
	this.add( this.yCone );

	// z

	var line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0x0000ff } ) );
	line.rotation.x = Math.PI / 2;
	this.add( line );

	this.zCone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color : 0x0000ff } ) );
	this.zCone.position.z = 100;
	this.zCone.name = "z_manipulator";
	this.zCone.rotation.x = Math.PI / 2;
	this.add( this.zCone );
};

THREE.ManipulatorTool.prototype = new THREE.Object3D();
THREE.ManipulatorTool.prototype.constructor = THREE.ManipulatorTool;
