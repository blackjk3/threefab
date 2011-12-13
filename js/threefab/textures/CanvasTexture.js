/**
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @author mr.doob / http://mrdoob.com/
 */

THREEFAB.CanvasTexture = function () {

	THREE.Texture.call( this );

	var canvas = document.createElement( 'canvas' );
		canvas.width = 512;
		canvas.height = 512;
	var ctx = canvas.getContext("2d");  
	    ctx.fillStyle = "rgba(255,255,255,1)";  
	    ctx.fillRect(0, 0, 512, 512);
	    
	this.image = canvas;
	this.needsUpdate = true;    
}

THREEFAB.CanvasTexture.prototype = new THREE.Texture();
THREEFAB.CanvasTexture.prototype.constructor = THREEFAB.CanvasTexture;