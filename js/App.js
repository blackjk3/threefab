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
			toolbox = new THREEFAB.Toolbox();

		// App Resize
		window.addEventListener('resize', function(event) {
			viewport.setSize( window.innerWidth, window.innerHeight );
		}, false);
		
		
		// Start animating viewport
		viewport.animate();

		//var exporter = new THREEFAB.Exporter();
		//exporter.generate(viewport);
		
	});
	
})();






/*window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

function wheel(event){
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
            delta = event.wheelDelta/120;
            if (window.opera) delta = -delta;
    } else if (event.detail) {
            delta = -event.detail/3;
    }
    if (delta)
            handle(delta);
}
*/
