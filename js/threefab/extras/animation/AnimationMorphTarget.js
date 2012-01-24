/**
 * @author mikael emtinger / http://gomo.se/
 */

THREEFAB.AnimationMorphTarget = function( root, scale ) {

	this.root = root;
	
	this.currentTime = 0;
	this.timeScale = scale !== undefined ? scale : 1000;
	this.isPlaying = false;
	this.isPaused = true;
	this.loop = true;
	this.influence = 1;

	this.keyframes = 0;
	this.interpolation = 0;

	this.lastKeyframe = 0;
	this.currentKeyframe = 0;
};

/*
 * Play
 */

THREEFAB.AnimationMorphTarget.prototype.play = function( loop, startTimeMS ) {

	if( !this.isPlaying ) {

		this.isPlaying = true;
		this.loop = loop !== undefined ? loop : true;
		this.currentTime = startTimeMS !== undefined ? startTimeMS : 0;

		// setup interpolation
		this.keyframes = this.root.morphTargetInfluences.length - 1;
		this.interpolation = this.timeScale / this.keyframes;

		this.render();
	}

	this.isPaused = false;
	//THREE.AnimationHandler.addToUpdate( this );
};


/*
 * Pause
 */

THREEFAB.AnimationMorphTarget.prototype.pause = function() {

	/*if( this.isPaused ) {
		
		THREE.AnimationHandler.addToUpdate( this );
		
	} else {
		
		THREE.AnimationHandler.removeFromUpdate( this );
		
	}*/
	
	this.isPaused = !this.isPaused;
};


/*
 * Stop
 */

THREEFAB.AnimationMorphTarget.prototype.stop = function() {

	this.isPlaying = false;
	this.isPaused  = false;
	
	//THREE.AnimationHandler.removeFromUpdate( this );
	
	
	// reset JIT matrix and remove cache
	this.lastKeyframe = 0;
	this.currentKeyframe = 0;
	this.timeScale = 1000;
};


/*
 * Update
 */

THREEFAB.AnimationMorphTarget.prototype.render = function() {

	var mesh = this.root,
		time = Date.now() % this.timeScale,
		keyframe = Math.floor( time / this.interpolation ) + 1;
	
	if ( keyframe != this.currentKeyframe ) {

		mesh.morphTargetInfluences[ this.lastKeyframe ] = 0;
		mesh.morphTargetInfluences[ this.currentKeyframe ] = 1;
		mesh.morphTargetInfluences[ keyframe ] = 0;

		this.lastKeyframe = this.currentKeyframe;
		this.currentKeyframe = keyframe;

	}

	mesh.morphTargetInfluences[ keyframe ] = ( time % this.interpolation ) / this.interpolation;
	mesh.morphTargetInfluences[ this.lastKeyframe ] = 1 - mesh.morphTargetInfluences[ keyframe ];

	return keyframe;
};

THREEFAB.AnimationMorphTarget.prototype.clear = function() {
	
	var mesh = this.root;

	for(var i=0; i < this.keyframes+1; i++) {
		mesh.morphTargetInfluences[ i ] = 0;
	}

};

/*
 * Goto Frame
 */

THREEFAB.AnimationMorphTarget.prototype.gotoFrame = function( keyframe ) {
	
	var mesh = this.root;

	mesh.morphTargetInfluences[ this.currentKeyframe ] = 0;
	mesh.morphTargetInfluences[ keyframe ] = 1;

	this.lastKeyframe = this.currentKeyframe;
	this.currentKeyframe = keyframe;

};

THREEFAB.AnimationMorphTarget.prototype.updateTimeScale = function( value ) {
	this.timeScale = value;
};

