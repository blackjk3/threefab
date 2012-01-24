/**
 * @class THREEFAB.TimelineView
 *
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Setup timeline view.
 *
 */


THREEFAB.TimelineView = Backbone.View.extend({
		
	el: '#bottom-toolbar',
	duration: '#duration',
	container: '.timeline-container',

	canvas: document.createElement("canvas"),
	c: {},

	headerHeight:35,
	headerWidth:400,
	
	frames:20,
	currentFrame:0,
	
	isPlaying: false,

	playButton: {},

	initialize: function() {

		_.bindAll(this);
		this.el = $(this.el);

		this.container = this.el.find(this.container);
		this.duration = this.el.find(this.duration);
		
		this.duration.bind('keyup', this.durationChanged);
		this.duration.bind('keypress', this.numericOnly);

		this.canvas.width = this.headerWidth;
		this.canvas.height = this.headerHeight;
		this.c = this.canvas.getContext("2d");

		this.canvas.addEventListener('mousedown', this.mouseDown, false);
		document.body.addEventListener('mouseup', this.mouseUp, false);

		this.el.find('.back').bind('click', this.back);
		this.el.find('.forward').bind('click', this.forward);
		
		this.playButton = this.el.find('#playButton');
		this.playButton.bind('click', this.play);

		$.subscribe(THREEFAB.Events.VIEWPORT_MESH_SELECTED, this.objectChanged);
		$.subscribe(THREEFAB.Events.VIEWPORT_KEYFRAME_CHANGED, this.keyframeChanged);
		$.subscribe(THREEFAB.Events.SPACEBAR_PRESSED, this.play);
		$.subscribe(THREEFAB.Events.TIMELINE_RESET, this.reset);
	},
	
	render: function(frames) {
		this.container.append(this.canvas);

		if(frames) {
			this.frames = frames;
		}

		this.build(0, this.frames);
	},

	build: function(goto, frames, broadcast) {
		var size = Math.floor(this.canvas.width/frames),
			x = 0;

		this.c.clearRect(0, 0, this.headerWidth, this.headerHeight);
		
		this.c.fillStyle = "#666";
		this.c.fillRect(0, 0, this.headerWidth, this.headerHeight);

		for(var i=0; i < frames; i++) {
			x = i * size;

			if(i !== 0) {
				this.drawLine(x, 0, x, this.headerHeight*0.3, "#999999");
			
				this.c.fillStyle = "#ffffff";
				if(i%2) {
					this.c.fillText(i, x-3, this.headerHeight*0.8);
				}
			}
		}


		// Line marker
		this.drawLine(goto*size, 0, goto*size, this.headerHeight, "#FF0000");
		this.currentFrame = goto;

		if(broadcast) {
			$.publish(THREEFAB.Events.TIMELINE_CHANGED, this.currentFrame);
		}
	},

	reset: function() {
		this.pause();
		this.keyframeChanged(0);
	},

	objectChanged: function(object) {

		this.isPlaying = false;
		this.playButton.addClass('play');
		this.playButton.removeClass('pause');

		if(object.morphTargetInfluences) {
			if(object.morphTargetInfluences.length > 0) {
				this.frames = object.morphTargetInfluences.length;
				this.build(0, this.frames, false);
			}
		} else {
			this.build(0,20, false);
			this.frames = 20;
		}
	},

	keyframeChanged: function(goto) {
		this.build(goto, this.frames, false);
	},

	durationChanged: function() {

		var value = this.duration.val();

		if( $.isNumeric(value) ) {
			$.publish(THREEFAB.Events.TIMELINE_DURATION_CHANGED, value*1000);
		} else {
			this.duration.val("1");
		}
	},

	numericOnly: function(e) {
		var key = e.charCode || e.keyCode || 0;
		
		// Do not allow spacebar.
		if(key === 32) {
			return false;
		}
	},

	drawLine: function(x1, y1, x2, y2, color, size) {
		this.c.strokeStyle = color;
		this.c.beginPath();
		this.c.moveTo(x1+0.5, y1+0.5);
		this.c.lineTo(x2+0.5, y2+0.5);
		this.c.stroke();
	},

	mouseDown: function(e) {
		this.canvas.addEventListener('mousemove', this.mouseMove, false);
	},

	mouseUp: function() {
		this.canvas.removeEventListener('mousemove', this.mouseMove, false);
	},

	mouseMove: function(e) {
		var x = event.pageX - 120,
			y = event.pageY,
			size = Math.floor(this.canvas.width/this.frames),
			frame = Math.floor(x/size);
		
		this.build(frame, this.frames, true);
	},

	back: function() {
		this.build(0, this.frames, true);
	},
	
	play: function() {
		if(this.isPlaying) {
			
			// Pause
			$.publish(THREEFAB.Events.TIMELINE_PAUSE);
			this.pause();
		
		} else {

			// Play
			$.publish(THREEFAB.Events.TIMELINE_PLAY);
			this.isPlaying = true;
			
			this.playButton.addClass('pause');
			this.playButton.removeClass('play');
		}
	},

	pause: function() {
		this.isPlaying = false;

		this.playButton.addClass('play');
		this.playButton.removeClass('pause');
	},
	
	forward: function() {
		this.build(this.frames-1, this.frames, true);
	}
});