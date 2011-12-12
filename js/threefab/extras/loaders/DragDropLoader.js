/**
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @author mr.doob / http://mrdoob.com/
 */

THREEFAB.DragDropLoader = function() {
	
	window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
	window.URL = window.URL || window.webkitURL || window.mozURL;
	
	document.addEventListener('dragover', function (event) { event.preventDefault(); }, false );
	document.addEventListener('dragleave', function (event ) { event.preventDefault(); }, false );
	
	document.addEventListener('drop', function (event) {

		event.stopPropagation();
		event.preventDefault();

		var file = event.dataTransfer.files[ 0 ];
		var extension = file.name.split( '.' )[1].toLowerCase();
		var reader = new FileReader();

		reader.onload = function ( event ) {
			var contents = event.target.result,
				loader;
			
			if(extension === "js") {
				    
			    loader = new THREE.JSONLoader();
				loader.createModel( JSON.parse(contents), function ( geometry ) {

					var material = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false } );
					var mesh = new THREE.Mesh( geometry, material );
					
					$.publish('model/loaded', mesh);

				});
			}
			
		};
		
		reader.readAsText( file );
				
	});				
};
