/* =============================================================================

 Author: Jason Kadrmas
 Company: KadrmasConceps LLC

========================================================================== */

(function(){
	
	// Ready
	$(document).ready(function(){

		var dragDrop = new THREEFAB.DragDropLoader(),
			viewport = new THREEFAB.Viewport(),
			ui = new THREEFAB.Ui(viewport),
			toolbox = new THREEFAB.Toolbox(),
			exporter = new THREEFAB.Exporter();

		// App Resize
		window.addEventListener('resize', function(event) {
			viewport.setSize( window.innerWidth, window.innerHeight );
		}, false);
		
		
		// Start animating viewport
		viewport.animate();
		viewport.setSize( window.innerWidth, window.innerHeight );

		//exporter.generate(viewport);
<<<<<<< HEAD
		$.subscribe(THREEFAB.Events.EXPORTER_GENERATE, function(){
=======
		$.subscribe(THREEFAB.Events.EXPORTER_GENERATE, function() {
>>>>>>> gh-pages
			exporter.generate(viewport);
		});

		$('#hide-button').on('click', function() {
			$('.code-container').hide();
		});

	});
	
})();