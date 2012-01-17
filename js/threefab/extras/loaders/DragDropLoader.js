/**
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @author mr.doob / http://mrdoob.com/
 */

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

		if(extension === "jpg" || extension === "png") {
			isImage = true;
		}

		reader.onload = function ( event ) {
			var contents = event.target.result,
				loader, mesh;
			
			if(extension === "js") {
				// We dropping in a mesh.

				loader = new THREE.JSONLoader();
				loader.createModel( JSON.parse(contents), function ( geometry ) {
					console.log(geometry);
					// This is a valid model.
					var material = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false, map: new THREEFAB.CanvasTexture() } );
					material.name = 'MeshPhongMaterial';
					

					// Check for morphing targets and add to material.
					if(geometry.morphTargets.length > 0) {
						material.morphTargets = true;
					}

					if(geometry.skinWeights.length > 0) {
						
						// Check for skinned mesh
						mesh = new THREE.SkinnedMesh( geometry, material );
						mesh.name = "THREE.SkinnedMesh." + mesh.id;
					
					} else {

						// Regular mesh.
						mesh = new THREE.Mesh( geometry, material );
						mesh.name = "THREE.JSONLoader." + mesh.id;
					}
					
					$.publish(THREEFAB.Events.MODEL_LOADED, mesh);

				});
			} else if(isImage) {

				// We are dropping in a texture.
				
				var img = new Image();
				img.src = contents;
				
				var texture = new THREE.Texture(img);
				texture.needsUpdate = true;
				
				img.onload = function() {
					$.publish(THREEFAB.Events.TEXTURE_LOADED, texture);
				};
			}
			
		};
		
		if(extension === 'js') {
			// JSON model file.
			reader.readAsText( file );
		} else if(isImage) {
			// Read image textures as a data url.
			reader.readAsDataURL(file);
		}
				
	});
};
