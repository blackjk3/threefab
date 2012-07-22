/**
 * @autor itooamaneatguy http://kadrmasconcepts.com/blog/
 * @author mr.doob / http://mrdoob.com/
 */

THREEFAB.AmbientLightContainer = function ( scene, hex) {
	
	var geometry = new THREE.SphereGeometry( 6, 6, 6 ),
		material = new THREE.MeshBasicMaterial( { color: 0xfff1a6, wireframe: true }),
		mesh = new THREE.Mesh(geometry, material);
		
	var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push( new THREE.Vector3() );
	lineGeometry.vertices.push( new THREE.Vector3( 0, 15, 1 ) );
	
	var lineMat = new THREE.LineBasicMaterial( { color : 0xFFFFFF } );
	
	
	for(var i=0; i < 10; i++) {
		var line = new THREE.Line( lineGeometry, lineMat);
	
		line.rotation.z = -Math.PI * (i/10) * 2;
		mesh.add( line );
	}
	
	mesh.name = "THREE.AmbientLightContainer." + mesh.id;
	
	
	var light = new THREE.AmbientLight(hex);
	light.name = 'THREE.AmbientLight';
	
	// Link light position and rotation to the fake holder object.
	light.position = mesh.position;
	light.rotation = mesh.rotation;
	
	mesh.light = light;
	
	scene.add(mesh);
	scene.add(light);
	
	
	this.mesh = mesh;
};