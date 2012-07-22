/**
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Grid = function () {

	THREE.Object3D.call( this );
	
	/*var geometry = new THREE.Geometry();
	geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( - 500, 0, 0 ) ) );
	geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( 500, 0, 0 ) ) );

	for ( var i = 0; i <= 20; i ++ ) {

		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
		line.position.z = ( i * 50 ) - 500;
		this.add( line );

		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
		line.position.x = ( i * 50 ) - 500;
		line.rotation.y = 90 * Math.PI / 180;
		this.add( line );

	}*/
	
	var _grid = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000, 20, 20 ), new THREE.MeshBasicMaterial( { color: 0x606060, wireframe: true, transparent: true } ) );
	_grid.rotation.y = Math.PI / 2;
	
	this.add(_grid);
	
	var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push( new THREE.Vector3( ) );
	lineGeometry.vertices.push( new THREE.Vector3( 0, 1000, 1 ) );
	
	// x
	var line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0xff0000 } ) );
	line.rotation.z = - Math.PI / 2;
	line.position.x = -500;
	this.add( line );
	
	//z
	var line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0x0000ff } ) );
	line.rotation.x = Math.PI / 2;
	line.position.z = -500;
	this.add( line );

};

THREE.Grid.prototype = new THREE.Object3D();
THREE.Grid.prototype.constructor = THREE.Grid;