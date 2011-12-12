
THREEFAB.Toolbox = Backbone.View.extend({
	initialize:function() {
		$('.toolbox-list').bind('click', function(event) {
			
			event.preventDefault();
			
			var target = event.target || event.srcElement,
				className;
			
			if(target.tagName.toLowerCase() === "a") {
				className = target.className;
				$.publish('primitive/add', target.className);				
			}
		});	
		
		$('.light-list').bind('click', function(event) {
			event.preventDefault();
			
			var target = event.target || event.srcElement,
				className;
			
			if(target.tagName.toLowerCase() === "a") {
				className = target.className;
				$.publish('light/add', target.className);
			}
		});
	}
});
