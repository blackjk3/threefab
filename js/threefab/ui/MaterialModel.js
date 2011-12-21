/**
 * @class THREEFAB.MaterialModel
 *
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Sets up material model for the right hand material panel.
 *
 */

THREEFAB.MaterialModel = Backbone.Model.extend({

	materialList: [
		{
			prop:'wireframe'
		},
		{
			prop:'transparent'
		},
		{
			prop:'opacity',
			min:0,
			max:1
		},
		{
			prop:'shading',
			values:{None: 0, Flat: 1, Smooth: 2},
			onChange:'rebuildMaterial'
		},
		{
			prop:'blending',
			values:{Normal: 0, Additive: 1, Subtractive: 2, Multiply:3, AdditiveAlpha:4}
		},
		{
			prop:'reflectivity',
			min:0,
			max:5
		},
		{
			prop:'shininess'
		}
	],

	lightList: [
		{
			prop: 'intensity',
			min:0,
			max:10
		},
		{
			prop: 'castShadow'
		}
	]

});