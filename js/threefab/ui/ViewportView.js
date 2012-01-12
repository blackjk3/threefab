/**
 * @class THREEFAB.OutlinerView
 *
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Setup outliner view.
 *
 */


THREEFAB.ViewportView = Backbone.View.extend({
	
	el: document.createElement('li'),

	initialize: function() {

		_.bindAll(this);
		
		this.el = $(this.el);
		this.el.append('<button class="center button">Center</button>');
		this.el.find('.center').bind('click', this.clicked);
	},

	clicked: function() {
		$.publish(THREEFAB.Events.VIEWPORT_TARGET_CENTER);
	}

});