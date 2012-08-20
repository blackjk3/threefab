/**
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @author mr.doob / http://mrdoob.com/
 */

THREEFAB.PrepareCollada = function(collada) {
    
    var sceneBSCenter = null;
    var sceneBSRadius = null;

    THREE.SceneUtils.traverseHierarchy( collada.scene, function (object) {
        if (object instanceof THREE.Mesh) {
            var radius = object.geometry.boundingSphere.radius;

            // Object center in world space
            var objectCenterLocal = object.position.clone();
            var objectCenterWorld = object.matrixWorld.multiplyVector3(objectCenterLocal);
            
            if (sceneBSCenter === null) {
                sceneBSCenter = objectCenterWorld;
                sceneBSRadius = radius;
                return;
            }
            
            // New center in world space
            var newCenter = new THREE.Vector3();
            newCenter.add(sceneBSCenter, objectCenterWorld);
            newCenter.divideScalar(2.0);

            // New radius in world space
            var dCenter = newCenter.distanceTo(sceneBSCenter);
            var newRadius = Math.max(dCenter + radius, dCenter + sceneBSRadius);
            sceneBSCenter = newCenter;
            sceneBSRadius = newRadius;
        }
    });
    
    var mesh = collada.scene;
    mesh.name = 'THREE.ColladaLoader.' + mesh.id;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 100 / sceneBSRadius;
    
    return mesh;
};

THREEFAB.DragDropLoader = function() {
	
	window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
	window.URL = window.URL || window.webkitURL || window.mozURL;
	
	// Need to prevent these events since the Drag and Drop API is weird.
	document.addEventListener('dragover', function (event) { event.preventDefault(); }, false );
	document.addEventListener('dragleave', function (event ) { event.preventDefault(); }, false );
	
	document.addEventListener('drop', function (event) {

		event.stopPropagation();
		event.preventDefault();

		var file = event.dataTransfer.files[ 0 ];

		if(file === undefined) { return false; }

		var extension = file.name.split( '.' )[1].toLowerCase();
		var reader = new FileReader();
		var isImage = false;

		if( extension === 'jpg' || extension === 'png' ) {
			isImage = true;
		}

		reader.onload = function ( event ) {
			var contents = event.target.result,
          loader, mesh, json, collada;
			
			if(extension === 'js') {
				
				// We dropping in a mesh.
				json = JSON.parse(contents);
	
				loader = new THREE.JSONLoader();
				loader.createModel( json, function ( geometry ) {

					// This is a valid model.
					var material;

					// Make sure this model has UV coordinates.
					if(json.uvs[0].length > 0) {
						material = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false, map: new THREEFAB.CanvasTexture() } );
					} else {
						material = new THREE.MeshPhongMaterial();
					}
					material.name = 'MeshPhongMaterial';

					// Check for morphing targets and add to material.
					if(geometry.morphTargets.length > 0) {
						material.morphTargets = true;
					}

					if(geometry.skinWeights.length > 0) {
						
						// Check for skinned mesh
						mesh = new THREE.SkinnedMesh( geometry, material );
						mesh.name = 'THREE.SkinnedMesh.' + mesh.id;
					
					} else {

						// Regular mesh.
						mesh = new THREE.Mesh( geometry, material );
						mesh.name = 'THREE.JSONLoader.' + mesh.id;
					}
					
					if(json.scale) {
						mesh.scale.x = mesh.scale.y = mesh.scale.z = json.scale;
					}

					$.publish(THREEFAB.Events.MODEL_LOADED, mesh);

				});
			} else if(extension === 'dae') {

        loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        collada = loader.parse( $.parseXML( contents ) );

        mesh = THREEFAB.PrepareCollada(collada);

        $.publish(THREEFAB.Events.MODEL_LOADED, mesh);

      } else if(extension === 'obj') {

        loader = new THREE.OBJLoader();
        mesh = loader.parse( contents );
        mesh.name = 'THREE.OBJLoader.' + mesh.id;

        $.publish(THREEFAB.Events.MODEL_LOADED, mesh);

			} else if(isImage) {

				// We are dropping in a texture.
				
				var img = new Image();
				img.src = contents;
				
				var texture = new THREE.Texture(img);
				texture.needsUpdate = true;
				
				img.onload = function() {
          console.log(texture);
					$.publish(THREEFAB.Events.TEXTURE_LOADED, texture);
				};
			}
			
		};
		
		if(extension === 'js' || extension === 'dae' || extension === 'obj') {
			// JSON model file.
			reader.readAsText( file );
		} else if(isImage) {
			// Read image textures as a data url.
			reader.readAsDataURL(file);
		}
				
	});
};
