/**
 * @class THREEFAB.TextureView
 *
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Setup texture view.
 *
 */


THREEFAB.TextureView = Backbone.View.extend({
	
	el: document.createElement('li'),
	texture: document.createElement('img'),
	label: document.createElement('span'),

	initialize: function() {

		_.bindAll(this);
		

		this.el = $(this.el);
		this.el.css({height:40, paddingTop:'5px'});
		this.texture.width = this.texture.height = 30;
		this.texture = $(this.texture);
		this.texture.addClass('texture-container');

		this.label = $(this.label);
		this.label.html('X');
		this.label.addClass('button fr hidden');
		this.label.bind('click', this.clear);

		this.el.append(this.texture);
		this.el.append(this.label);

		$.subscribe(THREEFAB.Events.VIEWPORT_MESH_SELECTED, this.render);
		$.subscribe(THREEFAB.Events.VIEWPORT_LIGHT_SELECTED, this.render);
		$.subscribe(THREEFAB.Events.VIEWPORT_OBJECT_TEXTURE_ADDED, this.render);
	},


	render: function(object) {
				
		var texture;

		if(object.material.map) {

			texture = object.material.map;
			
			if(object.material.map.image instanceof HTMLImageElement ) {
				
				this.texture.attr('src', object.material.map.image.src);
				this.label.removeClass('hidden');
				
			} else {
				this.reset();
			}

			this.el.show();
			
		} else {
			this.el.hide();
			this.reset();
		}
	},

	clear: function() {
		
		this.reset();

		$.publish(THREEFAB.Events.TEXTURE_CLEAR);

	},

	reset: function() {

		this.texture.attr('src', 'img/blank_texture.jpg');
		this.label.addClass('hidden');
	
	}


});