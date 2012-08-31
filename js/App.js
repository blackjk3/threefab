/* =============================================================================

 Author: Jason Kadrmas
 Company: KadrmasConceps LLC

========================================================================== */

(function(){
	
	// Ready
	$(document).ready(function(){

		var viewport = new THREEFAB.Viewport(),
      dragDrop = new THREEFAB.DragDropLoader(),
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
		$.subscribe(THREEFAB.Events.EXPORTER_GENERATE, function() {
			exporter.generate(viewport);
		});

		$('#hide-button').on('click', function() {
			$('.code-container').hide();
		});

	});
	
})();