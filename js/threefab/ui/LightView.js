/**
 * @class THREEFAB.LightView
 *
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Setup color view.
 *
 */


THREEFAB.LightView = Backbone.View.extend({
	
	el: document.createElement('li'),
	
	types: {
		color: {}
	},

	initialize: function() {

		_.bindAll(this);
		
		this.el = $(this.el);
		this.el.css({height:55, padding:'7px 0 10px 6px'});
		
		this.types.color = $("<div class='color_preview_container'><div class='color_preview'></div>Color</div>");
		this.types.color.ColorPicker({ onChange: this.changeColor });

		this.el.append( this.types.color );

		$.subscribe( THREEFAB.Events.VIEWPORT_LIGHT_SELECTED, this.lightChanged );
	},

	lightChanged: function( event, object ) {
		
		var color = { r: object.light.color.r*255, g:object.light.color.g*255, b:object.light.color.b*255 };

		this.update( this.types.color, color );
	},

	changeColor: function( hsb, hex, rgb ) {
	
		this.update(this.types.color, rgb);
		$.publish(THREEFAB.Events.LIGHT_COLOR_CHANGED, [rgb, 'color']);
	},

	update: function(type, rgb) {
		var color = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
		type.find('.color_preview').css('backgroundColor', color);
	}

});