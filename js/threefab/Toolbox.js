
THREEFAB.Toolbox = Backbone.View.extend({
	initialize:function() {
		$('.toolbox-list').bind('click', function(event) {
			
			event.preventDefault();
			
			var target = event.target || event.srcElement,
				className;
			
			if(target.tagName.toLowerCase() === "a") {
				className = target.className;
				$.publish(THREEFAB.Events.PRIMITIVE_ADDED, target.className);
			}
		});
		
		$('.light-list').bind('click', function(event) {
			event.preventDefault();
			
			var target = event.target || event.srcElement,
				className;
			
			if(target.tagName.toLowerCase() === "a") {
				className = target.className;
				$.publish(THREEFAB.Events.LIGHT_ADDED, target.className);
			}
		});

		$('.export').bind('click', function(event) {
			$.publish(THREEFAB.Events.EXPORTER_GENERATE);
		});
	}
});
