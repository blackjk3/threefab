/**
 * @autor itooamaneatguy http://kadrmasconcepts.com/blog/
 * @author mr.doob / http://mrdoob.com/
 */

THREEFAB.PointLightContainer = function ( scene, hex, intensity, distance ) {
	
	var geometry = new THREE.SphereGeometry( 6, 6, 6 ),
		material = new THREE.MeshBasicMaterial( { color: 0xfff1a6, wireframe: true }),
		mesh = new THREE.Mesh(geometry, material);
		
	var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push( new THREE.Vector3() );
	lineGeometry.vertices.push( new THREE.Vector3( 0, 30, 1 ) );
	
	var line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0xFFFFFF } ) );
	line.rotation.z = - Math.PI;
	mesh.add( line );
	mesh.name = "THREE.PointLightContainer." + mesh.id;
	
	
	var light = new THREE.PointLight(hex, intensity, distance);
	light.name = 'THREE.PointLight';
	
	// Link light position and rotation to the fake holder object.
	light.position = mesh.position;
	light.rotation = mesh.rotation;
	
	mesh.light = light;
	mesh.add(light);

  this.mesh = mesh;
	scene.add(mesh);
};