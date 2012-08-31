/*
 * jQuery Tiny Pub/Sub - v0.6 - 1/10/2011
 * http://benalman.com/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

(function($) {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}(jQuery));

// (function($){
//   var a=$("<b/>");
//   $.subscribe=function(b,c){
//     function d(){
//       return c.apply(this,Array.prototype.slice.call(arguments,1));
//     }

//     d.guid=c.guid=c.guid||($.guid?$.guid++:$.event.guid++);
//     a.bind(b,d);
//   };
//   $.unsubscribe=function(){a.unbind.apply(a,arguments)};
//   $.publish = function() {
//     a.trigger.apply(a,arguments);
//   };
// })(jQuery);

/*
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},i=0,c=0,l=[];function g(g,d,h,e){var c={data:e||(e===0||e===false)?e:d?d.data:{},_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};g&&a.extend(c,g,{nodes:[],parent:d});if(h){c.tmpl=h;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++i;(l.length?f:b)[i]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a(i[h])[d](k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,m,k){if(d[0]&&a.isArray(d[0])){var g=a.makeArray(arguments),h=d[0],j=h.length,i=0,f;while(i<j&&!(f=a.data(h[i++],"tmplItem")));if(f&&c)g[2]=function(b){a.tmpl.afterManip(this,b,k)};r.apply(this,g)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var i,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(j(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);i=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(j(c,null,i)):i},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function j(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:j(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=k(c).concat(b);if(d)b=b.concat(k(d))});return b?b:k(c)}function k(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,k,g,b,c,d){var j=a.tmpl.tag[k],i,e,f;if(!j)throw"Unknown template tag: "+k;i=j._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=h(b);d=d?","+h(d)+")":c?")":"";e=c?b.indexOf(".")>-1?b+h(c):"("+b+").call($item"+d:b;f=c?e:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else f=e=i.$1||"null";g=h(g);return"');"+j[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(f).split("$1").join(e).split("$2").join(g||i.$2||"")+"__.push('"})+"');}return __;")}function n(c,b){c._wrap=j(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function h(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,h;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(h=j.length-1;h>=0;h--)m(j[h]);m(k)}function m(j){var p,h=j,k,e,m;if(m=j.getAttribute(d)){while(h.parentNode&&(h=h.parentNode).nodeType===1&&!(p=h.getAttribute(d)));if(p!==m){h=h.parentNode?h.nodeType===11?0:h.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[h]||f[h]);e.key=++i;b[i]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;h=a.data(j.parentNode,"tmplItem");h=h?h.key:0}if(e){k=e;while(k&&k.key!=h){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);


/**
 *
 * Color picker
 * Author: Stefan Petre www.eyecon.ro
 * 
 * Dual licensed under the MIT and GPL licenses
 * 
 */
(function ($) {
	var ColorPicker = function () {
		var
			ids = {},
			inAction,
			charMin = 65,
			visible,
			tpl = '<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',
			defaults = {
				eventName: 'click',
				onShow: function () {},
				onBeforeShow: function(){},
				onHide: function () {},
				onChange: function () {},
				onSubmit: function () {},
				color: 'ff0000',
				livePreview: true,
				flat: false
			},
			fillRGBFields = function  (hsb, cal) {
				var rgb = HSBToRGB(hsb);
				$(cal).data('colorpicker').fields
					.eq(1).val(rgb.r).end()
					.eq(2).val(rgb.g).end()
					.eq(3).val(rgb.b).end();
			},
			fillHSBFields = function  (hsb, cal) {
				$(cal).data('colorpicker').fields
					.eq(4).val(hsb.h).end()
					.eq(5).val(hsb.s).end()
					.eq(6).val(hsb.b).end();
			},
			fillHexFields = function (hsb, cal) {
				$(cal).data('colorpicker').fields
					.eq(0).val(HSBToHex(hsb)).end();
			},
			setSelector = function (hsb, cal) {
				$(cal).data('colorpicker').selector.css('backgroundColor', '#' + HSBToHex({h: hsb.h, s: 100, b: 100}));
				$(cal).data('colorpicker').selectorIndic.css({
					left: parseInt(150 * hsb.s/100, 10),
					top: parseInt(150 * (100-hsb.b)/100, 10)
				});
			},
			setHue = function (hsb, cal) {
				$(cal).data('colorpicker').hue.css('top', parseInt(150 - 150 * hsb.h/360, 10));
			},
			setCurrentColor = function (hsb, cal) {
				$(cal).data('colorpicker').currentColor.css('backgroundColor', '#' + HSBToHex(hsb));
			},
			setNewColor = function (hsb, cal) {
				$(cal).data('colorpicker').newColor.css('backgroundColor', '#' + HSBToHex(hsb));
			},
			keyDown = function (ev) {
				var pressedKey = ev.charCode || ev.keyCode || -1;
				if ((pressedKey > charMin && pressedKey <= 90) || pressedKey == 32) {
					return false;
				}
				var cal = $(this).parent().parent();
				if (cal.data('colorpicker').livePreview === true) {
					change.apply(this);
				}
			},
			change = function (ev) {
				var cal = $(this).parent().parent(), col;
				if (this.parentNode.className.indexOf('_hex') > 0) {
					cal.data('colorpicker').color = col = HexToHSB(fixHex(this.value));
				} else if (this.parentNode.className.indexOf('_hsb') > 0) {
					cal.data('colorpicker').color = col = fixHSB({
						h: parseInt(cal.data('colorpicker').fields.eq(4).val(), 10),
						s: parseInt(cal.data('colorpicker').fields.eq(5).val(), 10),
						b: parseInt(cal.data('colorpicker').fields.eq(6).val(), 10)
					});
				} else {
					cal.data('colorpicker').color = col = RGBToHSB(fixRGB({
						r: parseInt(cal.data('colorpicker').fields.eq(1).val(), 10),
						g: parseInt(cal.data('colorpicker').fields.eq(2).val(), 10),
						b: parseInt(cal.data('colorpicker').fields.eq(3).val(), 10)
					}));
				}
				if (ev) {
					fillRGBFields(col, cal.get(0));
					fillHexFields(col, cal.get(0));
					fillHSBFields(col, cal.get(0));
				}
				setSelector(col, cal.get(0));
				setHue(col, cal.get(0));
				setNewColor(col, cal.get(0));
				cal.data('colorpicker').onChange.apply(cal, [col, HSBToHex(col), HSBToRGB(col)]);
			},
			blur = function (ev) {
				var cal = $(this).parent().parent();
				cal.data('colorpicker').fields.parent().removeClass('colorpicker_focus');
			},
			focus = function () {
				charMin = this.parentNode.className.indexOf('_hex') > 0 ? 70 : 65;
				$(this).parent().parent().data('colorpicker').fields.parent().removeClass('colorpicker_focus');
				$(this).parent().addClass('colorpicker_focus');
			},
			downIncrement = function (ev) {
				var field = $(this).parent().find('input').focus();
				var current = {
					el: $(this).parent().addClass('colorpicker_slider'),
					max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
					y: ev.pageY,
					field: field,
					val: parseInt(field.val(), 10),
					preview: $(this).parent().parent().data('colorpicker').livePreview					
				};
				$(document).bind('mouseup', current, upIncrement);
				$(document).bind('mousemove', current, moveIncrement);
			},
			moveIncrement = function (ev) {
				ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val + ev.pageY - ev.data.y, 10))));
				if (ev.data.preview) {
					change.apply(ev.data.field.get(0), [true]);
				}
				return false;
			},
			upIncrement = function (ev) {
				change.apply(ev.data.field.get(0), [true]);
				ev.data.el.removeClass('colorpicker_slider').find('input').focus();
				$(document).unbind('mouseup', upIncrement);
				$(document).unbind('mousemove', moveIncrement);
				return false;
			},
			downHue = function (ev) {
				var current = {
					cal: $(this).parent(),
					y: $(this).offset().top
				};
				current.preview = current.cal.data('colorpicker').livePreview;
				$(document).bind('mouseup', current, upHue);
				$(document).bind('mousemove', current, moveHue);
			},
			moveHue = function (ev) {
				change.apply(
					ev.data.cal.data('colorpicker')
						.fields
						.eq(4)
						.val(parseInt(360*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.y))))/150, 10))
						.get(0),
					[ev.data.preview]
				);
				return false;
			},
			upHue = function (ev) {
				fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				$(document).unbind('mouseup', upHue);
				$(document).unbind('mousemove', moveHue);
				return false;
			},
			downSelector = function (ev) {
				var current = {
					cal: $(this).parent(),
					pos: $(this).offset()
				};
				current.preview = current.cal.data('colorpicker').livePreview;
				$(document).bind('mouseup', current, upSelector);
				$(document).bind('mousemove', current, moveSelector);
			},
			moveSelector = function (ev) {
				change.apply(
					ev.data.cal.data('colorpicker')
						.fields
						.eq(6)
						.val(parseInt(100*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.pos.top))))/150, 10))
						.end()
						.eq(5)
						.val(parseInt(100*(Math.max(0,Math.min(150,(ev.pageX - ev.data.pos.left))))/150, 10))
						.get(0),
					[ev.data.preview]
				);
				return false;
			},
			upSelector = function (ev) {
				fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				$(document).unbind('mouseup', upSelector);
				$(document).unbind('mousemove', moveSelector);
				return false;
			},
			enterSubmit = function (ev) {
				$(this).addClass('colorpicker_focus');
			},
			leaveSubmit = function (ev) {
				$(this).removeClass('colorpicker_focus');
			},
			clickSubmit = function (ev) {
				var cal = $(this).parent();
				var col = cal.data('colorpicker').color;
				cal.data('colorpicker').origColor = col;
				setCurrentColor(col, cal.get(0));
				cal.data('colorpicker').onSubmit(col, HSBToHex(col), HSBToRGB(col), cal.data('colorpicker').el);
			},
			show = function (ev) {
				var cal = $('#' + $(this).data('colorpickerId'));
				cal.data('colorpicker').onBeforeShow.apply(this, [cal.get(0)]);
				var pos = $(this).offset();
				var viewPort = getViewport();
				var top = pos.top + this.offsetHeight;
				var left = pos.left;
				if (top + 176 > viewPort.t + viewPort.h) {
					top -= this.offsetHeight + 176;
				}
				if (left + 356 > viewPort.l + viewPort.w) {
					left -= 356;
				}
				// JK: Hack to align perfect.
				left += 40;
				cal.css({left: left + 'px', top: top + 'px'});
				if (cal.data('colorpicker').onShow.apply(this, [cal.get(0)]) != false) {
					cal.show();
				}
				$(document).bind('mousedown', {cal: cal}, hide);
				return false;
			},
			hide = function (ev) {
				if (!isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
					if (ev.data.cal.data('colorpicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
						ev.data.cal.hide();
					}
					$(document).unbind('mousedown', hide);
				}
			},
			isChildOf = function(parentEl, el, container) {
				if (parentEl == el) {
					return true;
				}
				if (parentEl.contains) {
					return parentEl.contains(el);
				}
				if ( parentEl.compareDocumentPosition ) {
					return !!(parentEl.compareDocumentPosition(el) & 16);
				}
				var prEl = el.parentNode;
				while(prEl && prEl != container) {
					if (prEl == parentEl)
						return true;
					prEl = prEl.parentNode;
				}
				return false;
			},
			getViewport = function () {
				var m = document.compatMode == 'CSS1Compat';
				return {
					l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
					t : window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
					w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
					h : window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
				};
			},
			fixHSB = function (hsb) {
				return {
					h: Math.min(360, Math.max(0, hsb.h)),
					s: Math.min(100, Math.max(0, hsb.s)),
					b: Math.min(100, Math.max(0, hsb.b))
				};
			}, 
			fixRGB = function (rgb) {
				return {
					r: Math.min(255, Math.max(0, rgb.r)),
					g: Math.min(255, Math.max(0, rgb.g)),
					b: Math.min(255, Math.max(0, rgb.b))
				};
			},
			fixHex = function (hex) {
				var len = 6 - hex.length;
				if (len > 0) {
					var o = [];
					for (var i=0; i<len; i++) {
						o.push('0');
					}
					o.push(hex);
					hex = o.join('');
				}
				return hex;
			}, 
			HexToRGB = function (hex) {
				var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
				return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
			},
			HexToHSB = function (hex) {
				return RGBToHSB(HexToRGB(hex));
			},
			RGBToHSB = function (rgb) {
				var hsb = {
					h: 0,
					s: 0,
					b: 0
				};
				var min = Math.min(rgb.r, rgb.g, rgb.b);
				var max = Math.max(rgb.r, rgb.g, rgb.b);
				var delta = max - min;
				hsb.b = max;
				if (max != 0) {
					
				}
				hsb.s = max != 0 ? 255 * delta / max : 0;
				if (hsb.s != 0) {
					if (rgb.r == max) {
						hsb.h = (rgb.g - rgb.b) / delta;
					} else if (rgb.g == max) {
						hsb.h = 2 + (rgb.b - rgb.r) / delta;
					} else {
						hsb.h = 4 + (rgb.r - rgb.g) / delta;
					}
				} else {
					hsb.h = -1;
				}
				hsb.h *= 60;
				if (hsb.h < 0) {
					hsb.h += 360;
				}
				hsb.s *= 100/255;
				hsb.b *= 100/255;
				return hsb;
			},
			HSBToRGB = function (hsb) {
				var rgb = {};
				var h = Math.round(hsb.h);
				var s = Math.round(hsb.s*255/100);
				var v = Math.round(hsb.b*255/100);
				if(s == 0) {
					rgb.r = rgb.g = rgb.b = v;
				} else {
					var t1 = v;
					var t2 = (255-s)*v/255;
					var t3 = (t1-t2)*(h%60)/60;
					if(h==360) h = 0;
					if(h<60) {rgb.r=t1;	rgb.b=t2; rgb.g=t2+t3}
					else if(h<120) {rgb.g=t1; rgb.b=t2;	rgb.r=t1-t3}
					else if(h<180) {rgb.g=t1; rgb.r=t2;	rgb.b=t2+t3}
					else if(h<240) {rgb.b=t1; rgb.r=t2;	rgb.g=t1-t3}
					else if(h<300) {rgb.b=t1; rgb.g=t2;	rgb.r=t2+t3}
					else if(h<360) {rgb.r=t1; rgb.g=t2;	rgb.b=t1-t3}
					else {rgb.r=0; rgb.g=0;	rgb.b=0}
				}
				return {r:Math.round(rgb.r), g:Math.round(rgb.g), b:Math.round(rgb.b)};
			},
			RGBToHex = function (rgb) {
				var hex = [
					rgb.r.toString(16),
					rgb.g.toString(16),
					rgb.b.toString(16)
				];
				$.each(hex, function (nr, val) {
					if (val.length == 1) {
						hex[nr] = '0' + val;
					}
				});
				return hex.join('');
			},
			HSBToHex = function (hsb) {
				return RGBToHex(HSBToRGB(hsb));
			},
			restoreOriginal = function () {
				var cal = $(this).parent();
				var col = cal.data('colorpicker').origColor;
				cal.data('colorpicker').color = col;
				fillRGBFields(col, cal.get(0));
				fillHexFields(col, cal.get(0));
				fillHSBFields(col, cal.get(0));
				setSelector(col, cal.get(0));
				setHue(col, cal.get(0));
				setNewColor(col, cal.get(0));
			};
		return {
			init: function (opt) {
				opt = $.extend({}, defaults, opt||{});
				if (typeof opt.color == 'string') {
					opt.color = HexToHSB(opt.color);
				} else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
					opt.color = RGBToHSB(opt.color);
				} else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
					opt.color = fixHSB(opt.color);
				} else {
					return this;
				}
				return this.each(function () {
					if (!$(this).data('colorpickerId')) {
						var options = $.extend({}, opt);
						options.origColor = opt.color;
						var id = 'collorpicker_' + parseInt(Math.random() * 1000);
						$(this).data('colorpickerId', id);
						var cal = $(tpl).attr('id', id);
						if (options.flat) {
							cal.appendTo(this).show();
						} else {
							cal.appendTo(document.body);
						}
						options.fields = cal
											.find('input')
												.bind('keyup', keyDown)
												.bind('change', change)
												.bind('blur', blur)
												.bind('focus', focus);
						cal
							.find('span').bind('mousedown', downIncrement).end()
							.find('>div.colorpicker_current_color').bind('click', restoreOriginal);
						options.selector = cal.find('div.colorpicker_color').bind('mousedown', downSelector);
						options.selectorIndic = options.selector.find('div div');
						options.el = this;
						options.hue = cal.find('div.colorpicker_hue div');
						cal.find('div.colorpicker_hue').bind('mousedown', downHue);
						options.newColor = cal.find('div.colorpicker_new_color');
						options.currentColor = cal.find('div.colorpicker_current_color');
						cal.data('colorpicker', options);
						cal.find('div.colorpicker_submit')
							.bind('mouseenter', enterSubmit)
							.bind('mouseleave', leaveSubmit)
							.bind('click', clickSubmit);
						fillRGBFields(options.color, cal.get(0));
						fillHSBFields(options.color, cal.get(0));
						fillHexFields(options.color, cal.get(0));
						setHue(options.color, cal.get(0));
						setSelector(options.color, cal.get(0));
						setCurrentColor(options.color, cal.get(0));
						setNewColor(options.color, cal.get(0));
						if (options.flat) {
							cal.css({
								position: 'relative',
								display: 'block'
							});
						} else {
							$(this).bind(options.eventName, show);
						}
					}
				});
			},
			showPicker: function() {
				return this.each( function () {
					if ($(this).data('colorpickerId')) {
						show.apply(this);
					}
				});
			},
			hidePicker: function() {
				return this.each( function () {
					if ($(this).data('colorpickerId')) {
						$('#' + $(this).data('colorpickerId')).hide();
					}
				});
			},
			setColor: function(col) {
				if (typeof col == 'string') {
					col = HexToHSB(col);
				} else if (col.r != undefined && col.g != undefined && col.b != undefined) {
					col = RGBToHSB(col);
				} else if (col.h != undefined && col.s != undefined && col.b != undefined) {
					col = fixHSB(col);
				} else {
					return this;
				}
				return this.each(function(){
					if ($(this).data('colorpickerId')) {
						var cal = $('#' + $(this).data('colorpickerId'));
						cal.data('colorpicker').color = col;
						cal.data('colorpicker').origColor = col;
						fillRGBFields(col, cal.get(0));
						fillHSBFields(col, cal.get(0));
						fillHexFields(col, cal.get(0));
						setHue(col, cal.get(0));
						setSelector(col, cal.get(0));
						setCurrentColor(col, cal.get(0));
						setNewColor(col, cal.get(0));
					}
				});
			}
		};
	}();
	$.fn.extend({
		ColorPicker: ColorPicker.init,
		ColorPickerHide: ColorPicker.hidePicker,
		ColorPickerShow: ColorPicker.showPicker,
		ColorPickerSetColor: ColorPicker.setColor
	});
})(jQuery);

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);

/*
 * jQuery Impromptu
 * By: Trent Richardson [http://trentrichardson.com]
 * Version 4.0.1
 * Last Modified: 03/03/2012
 * 
 * Copyright 2012 Trent Richardson
 * Dual licensed under the MIT and GPL licenses.
 * http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
 * http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
 * 
 */
(function($){$.prompt=function(message,options){$.prompt.options=$.extend({},$.prompt.defaults,options);$.prompt.currentPrefix=$.prompt.options.prefix;$.prompt.currentStateName="";var ie6=($.browser.msie&&$.browser.version<7);var $body=$(document.body);var $window=$(window);$.prompt.options.classes=$.trim($.prompt.options.classes);if($.prompt.options.classes!='')$.prompt.options.classes=' '+$.prompt.options.classes;var msgbox='<div class="'+$.prompt.options.prefix+'box'+$.prompt.options.classes+'" id="'+$.prompt.options.prefix+'box">';if($.prompt.options.useiframe&&(($('object, applet').length>0)||ie6)){msgbox+='<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="'+$.prompt.options.prefix+'fade" id="'+$.prompt.options.prefix+'fade"></iframe>';}else{if(ie6){$('select').css('visibility','hidden');}msgbox+='<div class="'+$.prompt.options.prefix+'fade" id="'+$.prompt.options.prefix+'fade"></div>';}msgbox+='<div class="'+$.prompt.options.prefix+'" id="'+$.prompt.options.prefix+'"><div class="'+$.prompt.options.prefix+'container"><div class="';msgbox+=$.prompt.options.prefix+'close">X</div><div id="'+$.prompt.options.prefix+'states"></div>';msgbox+='</div></div></div>';$.prompt.jqib=$(msgbox).appendTo($body);$.prompt.jqi=$.prompt.jqib.children('#'+$.prompt.options.prefix);$.prompt.jqif=$.prompt.jqib.children('#'+$.prompt.options.prefix+'fade');if(message.constructor==String){message={state0:{html:message,buttons:$.prompt.options.buttons,focus:$.prompt.options.focus,submit:$.prompt.options.submit}};}var states="";$.each(message,function(statename,stateobj){stateobj=$.extend({},$.prompt.defaults.state,stateobj);message[statename]=stateobj;var arrow="";if(stateobj.position.arrow!==null)arrow='<div class="'+$.prompt.options.prefix+'arrow '+$.prompt.options.prefix+'arrow'+stateobj.position.arrow+'"></div>';states+='<div id="'+$.prompt.options.prefix+'_state_'+statename+'" class="'+$.prompt.options.prefix+'_state" style="display:none;">'+arrow+'<div class="'+$.prompt.options.prefix+'message">'+stateobj.html+'</div><div class="'+$.prompt.options.prefix+'buttons">';$.each(stateobj.buttons,function(k,v){if(typeof v=='object')states+='<button name="'+$.prompt.options.prefix+'_'+statename+'_button'+v.title.replace(/[^a-z0-9]+/gi,'')+'" id="'+$.prompt.options.prefix+'_'+statename+'_button'+v.title.replace(/[^a-z0-9]+/gi,'')+'" value="'+v.value+'">'+v.title+'</button>';else states+='<button name="'+$.prompt.options.prefix+'_'+statename+'_button'+k+'" id="'+$.prompt.options.prefix+'_'+statename+'_button'+k+'" value="'+v+'">'+k+'</button>';});states+='</div></div>';});$.prompt.states=message;$.prompt.jqi.find('#'+$.prompt.options.prefix+'states').html(states).children('.'+$.prompt.options.prefix+'_state:first').css('display','block');$.prompt.jqi.find('.'+$.prompt.options.prefix+'buttons:empty').css('display','none');$.each(message,function(statename,stateobj){var $state=$.prompt.jqi.find('#'+$.prompt.options.prefix+'_state_'+statename);if($.prompt.currentStateName==="")$.prompt.currentStateName=statename;$state.bind('promptsubmit',stateobj.submit);$state.children('.'+$.prompt.options.prefix+'buttons').children('button').click(function(){var msg=$state.children('.'+$.prompt.options.prefix+'message');var clicked=stateobj.buttons[$(this).text()];if(clicked==undefined){for(var i in stateobj.buttons)if(stateobj.buttons[i].title==$(this).text())clicked=stateobj.buttons[i].value;}if(typeof clicked=='object')clicked=clicked.value;var forminputs={};$.each($.prompt.jqi.find('#'+$.prompt.options.prefix+'states :input').serializeArray(),function(i,obj){if(forminputs[obj.name]===undefined){forminputs[obj.name]=obj.value;}else if(typeof forminputs[obj.name]==Array||typeof forminputs[obj.name]=='object'){forminputs[obj.name].push(obj.value);}else{forminputs[obj.name]=[forminputs[obj.name],obj.value];}});var promptsubmite=new $.Event('promptsubmit');promptsubmite.stateName=statename;promptsubmite.state=$state;$state.trigger(promptsubmite,[clicked,msg,forminputs]);if(!promptsubmite.isDefaultPrevented()){$.prompt.close(true,clicked,msg,forminputs);}});$state.find('.'+$.prompt.options.prefix+'buttons button:eq('+stateobj.focus+')').addClass($.prompt.options.prefix+'defaultbutton');});var fadeClicked=function(){if($.prompt.options.persistent){var offset=($.prompt.options.top.toString().indexOf('%')>=0?($window.height()*(parseInt($.prompt.options.top,10)/100)):parseInt($.prompt.options.top,10)),top=parseInt($.prompt.jqi.css('top').replace('px',''),10)-offset;$('html,body').animate({scrollTop:top},'fast',function(){var i=0;$.prompt.jqib.addClass($.prompt.options.prefix+'warning');var intervalid=setInterval(function(){$.prompt.jqib.toggleClass($.prompt.options.prefix+'warning');if(i++>1){clearInterval(intervalid);$.prompt.jqib.removeClass($.prompt.options.prefix+'warning');}},100);});}else{$.prompt.close(true);}};var keyPressEventHandler=function(e){var key=(window.event)?event.keyCode:e.keyCode;if(key==27){fadeClicked();}if(key==9){var $inputels=$(':input:enabled:visible',$.prompt.jqib);var fwd=!e.shiftKey&&e.target==$inputels[$inputels.length-1];var back=e.shiftKey&&e.target==$inputels[0];if(fwd||back){setTimeout(function(){if(!$inputels)return;var el=$inputels[back===true?$inputels.length-1:0];if(el)el.focus();},10);return false;}}};$.prompt.position();$.prompt.style();$.prompt.jqif.click(fadeClicked);$window.resize({animate:false},$.prompt.position);$.prompt.jqib.bind("keydown keypress",keyPressEventHandler);$.prompt.jqi.find('.'+$.prompt.options.prefix+'close').click($.prompt.close);$.prompt.jqib.bind('promptloaded',$.prompt.options.loaded);$.prompt.jqib.bind('promptclose',$.prompt.options.callback);$.prompt.jqib.bind('promptstatechanging',$.prompt.options.statechanging);$.prompt.jqib.bind('promptstatechanged',$.prompt.options.statechanged);$.prompt.jqif.fadeIn($.prompt.options.overlayspeed);$.prompt.jqi[$.prompt.options.show]($.prompt.options.promptspeed,function(){$.prompt.jqib.trigger('promptloaded');});$.prompt.jqi.find('#'+$.prompt.options.prefix+'states .'+$.prompt.options.prefix+'_state:first .'+$.prompt.options.prefix+'defaultbutton').focus();if($.prompt.options.timeout>0)setTimeout($.prompt.close,$.prompt.options.timeout);return $.prompt.jqib;};$.prompt.defaults={prefix:'jqi',classes:'',buttons:{Ok:true},loaded:function(e){},submit:function(e,v,m,f){},callback:function(e,v,m,f){},statechanging:function(e,from,to){},statechanged:function(e,to){},opacity:0.6,zIndex:999,overlayspeed:'slow',promptspeed:'fast',show:'fadeIn',focus:0,useiframe:false,top:'15%',persistent:true,timeout:0,state:{html:'',buttons:{Ok:true},focus:0,position:{container:null,x:null,y:null,arrow:null},submit:function(e,v,m,f){return true;}}};$.prompt.currentPrefix=$.prompt.defaults.prefix;$.prompt.currentStateName="";$.prompt.setDefaults=function(o){$.prompt.defaults=$.extend({},$.prompt.defaults,o);};$.prompt.setStateDefaults=function(o){$.prompt.defaults.state=$.extend({},$.prompt.defaults.state,o);};$.prompt.position=function(e){var restoreFx=$.fx.off,$window=$(window),bodyHeight=$(document.body).outerHeight(true),windowHeight=$(window).height(),documentHeight=$(document).height(),height=bodyHeight>windowHeight?bodyHeight:windowHeight,top=parseInt($window.scrollTop(),10)+($.prompt.options.top.toString().indexOf('%')>=0?(windowHeight*(parseInt($.prompt.options.top,10)/100)):parseInt($.prompt.options.top,10));if(e!==undefined&&e.data.animate===false)$.fx.off=true;$.prompt.jqib.css({position:"absolute",height:height,width:"100%",top:0,left:0,right:0,bottom:0});$.prompt.jqif.css({position:"absolute",height:height,width:"100%",top:0,left:0,right:0,bottom:0});if($.prompt.states[$.prompt.currentStateName].position.container!==null){var pos=$.prompt.states[$.prompt.currentStateName].position,offset=$(pos.container).offset();$.prompt.jqi.css({position:"absolute"});$.prompt.jqi.animate({top:offset.top+pos.y,left:offset.left+pos.x,marginLeft:0,width:(pos.width!==undefined)?pos.width:null});top=(offset.top+pos.y)-($.prompt.options.top.toString().indexOf('%')>=0?(windowHeight*(parseInt($.prompt.options.top,10)/100)):parseInt($.prompt.options.top,10));$('html,body').animate({scrollTop:top},'slow','swing',function(){});}else{$.prompt.jqi.css({position:"absolute",top:top,left:'50%',marginLeft:(($.prompt.jqi.outerWidth()/2)*-1)});}if(e!==undefined&&e.data.animate===false)$.fx.off=restoreFx;};$.prompt.style=function(){$.prompt.jqif.css({zIndex:$.prompt.options.zIndex,display:"none",opacity:$.prompt.options.opacity});$.prompt.jqi.css({zIndex:$.prompt.options.zIndex+1,display:"none"});$.prompt.jqib.css({zIndex:$.prompt.options.zIndex});};$.prompt.getStateContent=function(state){return $('#'+$.prompt.currentPrefix+'_state_'+state);};$.prompt.getCurrentState=function(){return $('.'+$.prompt.currentPrefix+'_state:visible');};$.prompt.getCurrentStateName=function(){var stateid=$.prompt.getCurrentState().attr('id');return stateid.replace($.prompt.currentPrefix+'_state_','');};$.prompt.goToState=function(state,callback){var promptstatechanginge=new $.Event('promptstatechanging');$.prompt.jqib.trigger(promptstatechanginge,[$.prompt.currentStateName,state]);if(!promptstatechanginge.isDefaultPrevented()){$.prompt.currentStateName=state;$('.'+$.prompt.currentPrefix+'_state').slideUp('slow').find('.'+$.prompt.currentPrefix+'arrow').fadeOut();$('#'+$.prompt.currentPrefix+'_state_'+state).slideDown('slow',function(){var $t=$(this);$t.find('.'+$.prompt.currentPrefix+'defaultbutton').focus();$t.find('.'+$.prompt.currentPrefix+'arrow').fadeIn('slow');if(typeof callback=='function'){$.prompt.jqib.bind('promptstatechanged.tmp',callback);}$.prompt.jqib.trigger('promptstatechanged',[state]);if(typeof callback=='function'){$.prompt.jqib.unbind('promptstatechanged.tmp');}});$.prompt.position();}};$.prompt.nextState=function(callback){var $next=$('#'+$.prompt.currentPrefix+'_state_'+$.prompt.currentStateName).next();$.prompt.goToState($next.attr('id').replace($.prompt.currentPrefix+'_state_',''),callback);};$.prompt.prevState=function(callback){var $prev=$('#'+$.prompt.currentPrefix+'_state_'+$.prompt.currentStateName).prev();$.prompt.goToState($prev.attr('id').replace($.prompt.currentPrefix+'_state_',''),callback);};$.prompt.close=function(callCallback,clicked,msg,formvals){$.prompt.jqib.fadeOut('fast',function(){if(callCallback){$.prompt.jqib.trigger('promptclose',[clicked,msg,formvals]);}$.prompt.jqib.remove();$('window').unbind('resize',$.prompt.position);if(($.browser.msie&&$.browser.version<7)&&!$.prompt.options.useiframe){$('select').css('visibility','visible');}});};$.fn.extend({prompt:function(options){if(options==undefined)options={};if(options.withDataAndEvents==undefined)options.withDataAndEvents=false;$.prompt($(this).clone(options.withDataAndEvents).html(),options);},promptDropIn:function(speed,callback){var $t=$(this);if($t.css("display")=="none"){var eltop=$t.css('top');$t.css({top:$(window).scrollTop(),display:'block'}).animate({top:eltop},speed,'swing',callback);}}});})(jQuery);

// Generated by CoffeeScript 1.3.3

/*
Copyright 2012 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


(function() {
  var $, BorderDropHint, DragAndDropHandler, DragElement, FolderElement, GhostDropHint, JqTreeWidget, MouseWidget, Node, NodeElement, Position, SaveStateHandler, SelectNodeHandler, SimpleWidget, Tree, html_escape, indexOf, json_escapable, json_meta, json_quote, json_str,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = this.jQuery;

  SimpleWidget = (function() {

    SimpleWidget.prototype.defaults = {};

    function SimpleWidget(el, options) {
      this.$el = $(el);
      this.options = $.extend({}, this.defaults, options);
    }

    SimpleWidget.prototype.destroy = function() {
      return this._deinit();
    };

    SimpleWidget.prototype._init = function() {
      return null;
    };

    SimpleWidget.prototype._deinit = function() {
      return null;
    };

    SimpleWidget.register = function(widget_class, widget_name) {
      var callFunction, createWidget, destroyWidget, getDataKey;
      getDataKey = function() {
        return "simple_widget_" + widget_name;
      };
      createWidget = function($el, options) {
        var data_key, el, widget, _i, _len;
        data_key = getDataKey();
        for (_i = 0, _len = $el.length; _i < _len; _i++) {
          el = $el[_i];
          widget = new widget_class(el, options);
          if (!$.data(el, data_key)) {
            $.data(el, data_key, widget);
          }
          widget._init();
        }
        return $el;
      };
      destroyWidget = function($el) {
        var data_key, el, widget, _i, _len, _results;
        data_key = getDataKey();
        _results = [];
        for (_i = 0, _len = $el.length; _i < _len; _i++) {
          el = $el[_i];
          widget = $.data(el, data_key);
          if (widget && (widget instanceof SimpleWidget)) {
            widget.destroy();
          }
          _results.push($.removeData(el, data_key));
        }
        return _results;
      };
      callFunction = function($el, function_name, args) {
        var el, result, widget, widget_function, _i, _len;
        result = null;
        for (_i = 0, _len = $el.length; _i < _len; _i++) {
          el = $el[_i];
          widget = $.data(el, getDataKey());
          if (widget && (widget instanceof SimpleWidget)) {
            widget_function = widget[function_name];
            if (widget_function && (typeof widget_function === 'function')) {
              result = widget_function.apply(widget, args);
            }
          }
        }
        return result;
      };
      return $.fn[widget_name] = function() {
        var $el, args, argument1, function_name, options;
        argument1 = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        $el = this;
        if (argument1 === void 0 || typeof argument1 === 'object') {
          options = argument1;
          return createWidget($el, options);
        } else if (typeof argument1 === 'string' && argument1[0] !== '_') {
          function_name = argument1;
          if (function_name === 'destroy') {
            return destroyWidget($el);
          } else {
            return callFunction($el, function_name, args);
          }
        }
      };
    };

    return SimpleWidget;

  })();

  this.SimpleWidget = SimpleWidget;

  /*
  This widget does the same a the mouse widget in jqueryui.
  */


  MouseWidget = (function(_super) {

    __extends(MouseWidget, _super);

    function MouseWidget() {
      return MouseWidget.__super__.constructor.apply(this, arguments);
    }

    MouseWidget.is_mouse_handled = false;

    MouseWidget.prototype._init = function() {
      this.$el.bind('mousedown.mousewidget', $.proxy(this._mouseDown, this));
      return this.is_mouse_started = false;
    };

    MouseWidget.prototype._deinit = function() {
      var $document;
      this.$el.unbind('mousedown.mousewidget');
      $document = $(document);
      $document.unbind('mousemove.mousewidget');
      return $document.unbind('mouseup.mousewidget');
    };

    MouseWidget.prototype._mouseDown = function(e) {
      var $document;
      if (MouseWidget.is_mouse_handled) {
        return;
      }
      if (!this.is_mouse_started) {
        this._mouseUp(e);
      }
      if (e.which !== 1) {
        return;
      }
      if (!this._mouseCapture(e)) {
        return;
      }
      this.mouse_down_event = e;
      $document = $(document);
      $document.bind('mousemove.mousewidget', $.proxy(this._mouseMove, this));
      $document.bind('mouseup.mousewidget', $.proxy(this._mouseUp, this));
      e.preventDefault();
      this.is_mouse_handled = true;
      return true;
    };

    MouseWidget.prototype._mouseMove = function(e) {
      if (this.is_mouse_started) {
        this._mouseDrag(e);
        return e.preventDefault();
      }
      this.is_mouse_started = this._mouseStart(this.mouse_down_event) !== false;
      if (this.is_mouse_started) {
        this._mouseDrag(e);
      } else {
        this._mouseUp(e);
      }
      return !this.is_mouse_started;
    };

    MouseWidget.prototype._mouseUp = function(e) {
      var $document;
      $document = $(document);
      $document.unbind('mousemove.mousewidget');
      $document.unbind('mouseup.mousewidget');
      if (this.is_mouse_started) {
        this.is_mouse_started = false;
        this._mouseStop(e);
      }
      return false;
    };

    MouseWidget.prototype._mouseCapture = function(e) {
      return true;
    };

    MouseWidget.prototype._mouseStart = function(e) {
      return null;
    };

    MouseWidget.prototype._mouseDrag = function(e) {
      return null;
    };

    MouseWidget.prototype._mouseStop = function(e) {
      return null;
    };

    return MouseWidget;

  })(SimpleWidget);

  /*
  Copyright 2012 Marco Braak
  
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */


  this.Tree = {};

  $ = this.jQuery;

  indexOf = function(array, item) {
    var i, value, _i, _len;
    if (array.indexOf) {
      return array.indexOf(item);
    } else {
      for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
        value = array[i];
        if (value === item) {
          return i;
        }
      }
      return -1;
    }
  };

  this.Tree.indexOf = indexOf;

  if (!((this.JSON != null) && (this.JSON.stringify != null) && typeof this.JSON.stringify === 'function')) {
    json_escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    json_meta = {
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"': '\\"',
      '\\': '\\\\'
    };
    json_quote = function(string) {
      json_escapable.lastIndex = 0;
      if (json_escapable.test(string)) {
        return '"' + string.replace(json_escapable, function(a) {
          var c;
          c = json_meta[a];
          return (typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4));
        }) + '"';
      } else {
        return '"' + string + '"';
      }
    };
    json_str = function(key, holder) {
      var i, k, partial, v, value, _i, _len;
      value = holder[key];
      switch (typeof value) {
        case 'string':
          return json_quote(value);
        case 'number':
          if (isFinite(value)) {
            return String(value);
          } else {
            return 'null';
          }
        case 'boolean':
        case 'null':
          return String(value);
        case 'object':
          if (!value) {
            return 'null';
          }
          partial = [];
          if (Object.prototype.toString.apply(value) === '[object Array]') {
            for (i = _i = 0, _len = value.length; _i < _len; i = ++_i) {
              v = value[i];
              partial[i] = json_str(i, value) || 'null';
            }
            return (partial.length === 0 ? '[]' : '[' + partial.join(',') + ']');
          }
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = json_str(k, value);
              if (v) {
                partial.push(json_quote(k) + ':' + v);
              }
            }
          }
          return (partial.length === 0 ? '{}' : '{' + partial.join(',') + '}');
      }
    };
    if (!(this.JSON != null)) {
      this.JSON = {};
    }
    this.JSON.stringify = function(value) {
      return json_str('', {
        '': value
      });
    };
  }

  html_escape = function(string) {
    return ('' + string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
  };

  Position = {
    getName: function(position) {
      return Position.strings[position - 1];
    },
    nameToIndex: function(name) {
      var i, _i, _ref;
      for (i = _i = 1, _ref = Position.strings.length; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        if (Position.strings[i - 1] === name) {
          return i;
        }
      }
      return 0;
    }
  };

  Position.BEFORE = 1;

  Position.AFTER = 2;

  Position.INSIDE = 3;

  Position.NONE = 4;

  Position.strings = ['before', 'after', 'inside', 'none'];

  this.Tree.Position = Position;

  Node = (function() {

    function Node(o) {
      this.setData(o);
      this.children = [];
      this.parent = null;
    }

    Node.prototype.setData = function(o) {
      var key, value, _results;
      if (typeof o !== 'object') {
        return this.name = o;
      } else {
        _results = [];
        for (key in o) {
          value = o[key];
          if (key === 'label') {
            _results.push(this.name = value);
          } else {
            _results.push(this[key] = value);
          }
        }
        return _results;
      }
    };

    Node.prototype.initFromData = function(data) {
      var addChildren, addNode,
        _this = this;
      addNode = function(node_data) {
        _this.setData(node_data);
        if (node_data.children) {
          return addChildren(node_data.children);
        }
      };
      addChildren = function(children_data) {
        var child, node, _i, _len;
        for (_i = 0, _len = children_data.length; _i < _len; _i++) {
          child = children_data[_i];
          node = new Node('');
          node.initFromData(child);
          _this.addChild(node);
        }
        return null;
      };
      addNode(data);
      return null;
    };

    /*
        Create tree from data.
    
        Structure of data is:
        [
            {
                label: 'node1',
                children: [
                    { label: 'child1' },
                    { label: 'child2' }
                ]
            },
            {
                label: 'node2'
            }
        ]
    */


    Node.prototype.loadFromData = function(data) {
      var node, o, _i, _len;
      this.children = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        o = data[_i];
        node = new Node(o);
        this.addChild(node);
        if (typeof o === 'object' && o.children) {
          node.loadFromData(o.children);
        }
      }
      return null;
    };

    /*
        Add child.
    
        tree.addChild(
            new Node('child1')
        );
    */


    Node.prototype.addChild = function(node) {
      this.children.push(node);
      return node._setParent(this);
    };

    /*
        Add child at position. Index starts at 0.
    
        tree.addChildAtPosition(
            new Node('abc'),
            1
        );
    */


    Node.prototype.addChildAtPosition = function(node, index) {
      this.children.splice(index, 0, node);
      return node._setParent(this);
    };

    Node.prototype._setParent = function(parent) {
      this.parent = parent;
      this.tree = parent.tree;
      return this.tree.addNodeToIndex(this);
    };

    /*
        Remove child.
    
        tree.removeChild(tree.children[0]);
    */


    Node.prototype.removeChild = function(node) {
      this.children.splice(this.getChildIndex(node), 1);
      return this.tree.removeNodeFromIndex(node);
    };

    /*
        Get child index.
    
        var index = getChildIndex(node);
    */


    Node.prototype.getChildIndex = function(node) {
      return $.inArray(node, this.children);
    };

    /*
        Does the tree have children?
    
        if (tree.hasChildren()) {
            //
        }
    */


    Node.prototype.hasChildren = function() {
      return this.children.length !== 0;
    };

    Node.prototype.isFolder = function() {
      return this.hasChildren() || this.load_on_demand;
    };

    /*
        Iterate over all the nodes in the tree.
    
        Calls callback with (node, level).
    
        The callback must return true to continue the iteration on current node.
    
        tree.iterate(
            function(node, level) {
               console.log(node.name);
    
               // stop iteration after level 2
               return (level <= 2);
            }
        );
    */


    Node.prototype.iterate = function(callback) {
      var _iterate,
        _this = this;
      _iterate = function(node, level) {
        var child, result, _i, _len, _ref;
        if (node.children) {
          _ref = node.children;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            result = callback(child, level);
            if (_this.hasChildren() && result) {
              _iterate(child, level + 1);
            }
          }
          return null;
        }
      };
      _iterate(this, 0);
      return null;
    };

    /*
        Move node relative to another node.
    
        Argument position: Position.BEFORE, Position.AFTER or Position.Inside
    
        // move node1 after node2
        tree.moveNode(node1, node2, Position.AFTER);
    */


    Node.prototype.moveNode = function(moved_node, target_node, position) {
      if (moved_node.isParentOf(target_node)) {
        return;
      }
      moved_node.parent.removeChild(moved_node);
      if (position === Position.AFTER) {
        return target_node.parent.addChildAtPosition(moved_node, target_node.parent.getChildIndex(target_node) + 1);
      } else if (position === Position.BEFORE) {
        return target_node.parent.addChildAtPosition(moved_node, target_node.parent.getChildIndex(target_node));
      } else if (position === Position.INSIDE) {
        return target_node.addChildAtPosition(moved_node, 0);
      }
    };

    /*
        Get the tree as data.
    */


    Node.prototype.getData = function() {
      var getDataFromNodes,
        _this = this;
      getDataFromNodes = function(nodes) {
        var data, k, node, tmp_node, v, _i, _len;
        data = [];
        for (_i = 0, _len = nodes.length; _i < _len; _i++) {
          node = nodes[_i];
          tmp_node = {};
          for (k in node) {
            v = node[k];
            if ((k !== 'parent' && k !== 'children' && k !== 'element' && k !== 'tree') && Object.prototype.hasOwnProperty.call(node, k)) {
              tmp_node[k] = v;
            }
          }
          if (node.hasChildren()) {
            tmp_node.children = getDataFromNodes(node.children);
          }
          data.push(tmp_node);
        }
        return data;
      };
      return getDataFromNodes(this.children);
    };

    Node.prototype.getNodeByName = function(name) {
      var result;
      result = null;
      this.iterate(function(node) {
        if (node.name === name) {
          result = node;
          return false;
        } else {
          return true;
        }
      });
      return result;
    };

    Node.prototype.addAfter = function(node_info) {
      var child_index, node;
      if (!this.parent) {
        return null;
      } else {
        node = new Node(node_info);
        child_index = this.parent.getChildIndex(this);
        this.parent.addChildAtPosition(node, child_index + 1);
        return node;
      }
    };

    Node.prototype.addBefore = function(node_info) {
      var child_index, node;
      if (!this.parent) {
        return null;
      } else {
        node = new Node(node_info);
        child_index = this.parent.getChildIndex(this);
        return this.parent.addChildAtPosition(node, child_index);
      }
    };

    Node.prototype.addParent = function(node_info) {
      var child, new_parent, original_parent, _i, _len, _ref;
      if (!this.parent) {
        return null;
      } else {
        new_parent = new Node(node_info);
        new_parent._setParent(this.tree);
        original_parent = this.parent;
        _ref = original_parent.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          new_parent.addChild(child);
        }
        original_parent.children = [];
        original_parent.addChild(new_parent);
        return new_parent;
      }
    };

    Node.prototype.remove = function() {
      if (this.parent) {
        this.parent.removeChild(this);
        return this.parent = null;
      }
    };

    Node.prototype.append = function(node_info) {
      var node;
      node = new Node(node_info);
      this.addChild(node);
      return node;
    };

    Node.prototype.prepend = function(node_info) {
      var node;
      node = new Node(node_info);
      this.addChildAtPosition(node, 0);
      return node;
    };

    Node.prototype.isParentOf = function(node) {
      var parent;
      parent = node.parent;
      while (parent) {
        if (parent === this) {
          return true;
        }
        parent = parent.parent;
      }
      return false;
    };

    return Node;

  })();

  Tree = (function(_super) {

    __extends(Tree, _super);

    function Tree(o) {
      Tree.__super__.constructor.call(this, o, null, true);
      this.id_mapping = {};
      this.tree = this;
    }

    Tree.prototype.getNodeById = function(node_id) {
      return this.id_mapping[node_id];
    };

    Tree.prototype.addNodeToIndex = function(node) {
      if (node.id) {
        return this.id_mapping[node.id] = node;
      }
    };

    Tree.prototype.removeNodeFromIndex = function(node) {
      if (node.id) {
        return delete this.id_mapping[node.id];
      }
    };

    return Tree;

  })(Node);

  this.Tree.Tree = Tree;

  JqTreeWidget = (function(_super) {

    __extends(JqTreeWidget, _super);

    function JqTreeWidget() {
      return JqTreeWidget.__super__.constructor.apply(this, arguments);
    }

    JqTreeWidget.prototype.defaults = {
      autoOpen: false,
      saveState: false,
      dragAndDrop: false,
      selectable: false,
      onCanSelectNode: null,
      onSetStateFromStorage: null,
      onGetStateFromStorage: null,
      onCreateLi: null,
      onIsMoveHandle: null,
      onCanMove: null,
      onCanMoveTo: null,
      autoEscape: true,
      dataUrl: null
    };

    JqTreeWidget.prototype.toggle = function(node) {
      if (node.is_open) {
        return this.closeNode(node);
      } else {
        return this.openNode(node);
      }
    };

    JqTreeWidget.prototype.getTree = function() {
      return this.tree;
    };

    JqTreeWidget.prototype.selectNode = function(node, must_open_parents) {
      return this.select_node_handler.selectNode(node, must_open_parents);
    };

    JqTreeWidget.prototype.getSelectedNode = function() {
      return this.selected_node || false;
    };

    JqTreeWidget.prototype.toJson = function() {
      return JSON.stringify(this.tree.getData());
    };

    JqTreeWidget.prototype.loadData = function(data, parent_node) {
      var child, subtree, _i, _len, _ref;
      this._triggerEvent('tree.load_data', {
        tree_data: data
      });
      if (!parent_node) {
        this._initTree(data);
      } else {
        subtree = new Node('');
        subtree._setParent(parent_node.tree);
        subtree.loadFromData(data);
        _ref = subtree.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          parent_node.addChild(child);
        }
        this._refreshElements(parent_node.parent);
      }
      if (this.is_dragging) {
        return this.dnd_handler.refreshHitAreas();
      }
    };

    JqTreeWidget.prototype.getNodeById = function(node_id) {
      return this.tree.getNodeById(node_id);
    };

    JqTreeWidget.prototype.getNodeByName = function(name) {
      return this.tree.getNodeByName(name);
    };

    JqTreeWidget.prototype.openNode = function(node, skip_slide) {
      return this._openNode(node, skip_slide);
    };

    JqTreeWidget.prototype._openNode = function(node, skip_slide, on_finished) {
      var folder_element;
      if (node.isFolder()) {
        if (node.load_on_demand) {
          return this._loadFolderOnDemand(node, skip_slide, on_finished);
        } else {
          folder_element = new FolderElement(node, this);
          folder_element.open(on_finished, skip_slide);
          return this._saveState();
        }
      }
    };

    JqTreeWidget.prototype._loadFolderOnDemand = function(node, skip_slide, on_finished) {
      var $li, data_url, folder_element,
        _this = this;
      node.load_on_demand = false;
      data_url = this._getDataUrl(node);
      folder_element = new FolderElement(node, this);
      if (data_url && folder_element) {
        $li = folder_element.getLi();
        $li.addClass('jqtree-loading');
        return this._loadDataFromServer(data_url, function(data) {
          $li.removeClass('loading');
          _this.loadData(data, node);
          return _this._openNode(node, skip_slide, on_finished);
        });
      }
    };

    JqTreeWidget.prototype.closeNode = function(node, skip_slide) {
      if (node.isFolder()) {
        new FolderElement(node, this).close(skip_slide);
        return this._saveState();
      }
    };

    JqTreeWidget.prototype.isDragging = function() {
      return this.is_dragging;
    };

    JqTreeWidget.prototype.refreshHitAreas = function() {
      return this.dnd_handler.refreshHitAreas();
    };

    JqTreeWidget.prototype.addNodeAfter = function(new_node_info, existing_node) {
      var new_node;
      new_node = existing_node.addAfter(new_node_info);
      this._refreshElements(existing_node.parent);
      return new_node;
    };

    JqTreeWidget.prototype.addNodeBefore = function(new_node_info, existing_node) {
      var new_node;
      new_node = existing_node.addBefore(new_node_info);
      this._refreshElements(existing_node.parent);
      return new_node;
    };

    JqTreeWidget.prototype.addParentNode = function(new_node_info, existing_node) {
      var new_node;
      new_node = existing_node.addParent(new_node_info);
      this._refreshElements(new_node.parent);
      return new_node;
    };

    JqTreeWidget.prototype.removeNode = function(node) {
      var parent;
      parent = node.parent;
      if (parent) {
        node.remove();
        return this._refreshElements(parent.parent);
      }
    };

    JqTreeWidget.prototype.appendNode = function(new_node_info, parent_node) {
      var is_already_root_node, node;
      if (!parent_node) {
        parent_node = this.tree;
      }
      is_already_root_node = parent_node.isFolder();
      node = parent_node.append(new_node_info);
      if (is_already_root_node) {
        this._refreshElements(parent_node);
      } else {
        this._refreshElements(parent_node.parent);
      }
      return node;
    };

    JqTreeWidget.prototype.prependNode = function(new_node_info, parent_node) {
      var node;
      if (!parent_node) {
        parent_node = this.tree;
      }
      node = parent_node.prepend(new_node_info);
      this._refreshElements(parent_node);
      return node;
    };

    JqTreeWidget.prototype.updateNode = function(node, data) {
      node.setData(data);
      this._refreshElements(node.parent);
      return this.select_node_handler.selectCurrentNode();
    };

    JqTreeWidget.prototype.moveNode = function(node, target_node, position) {
      var position_index;
      position_index = Position.nameToIndex(position);
      this.tree.moveNode(node, target_node, position_index);
      return this._refreshElements();
    };

    JqTreeWidget.prototype.getStateFromStorage = function() {
      return this.save_state_handler.getStateFromStorage();
    };

    JqTreeWidget.prototype._init = function() {
      JqTreeWidget.__super__._init.call(this);
      this.element = this.$el;
      this.selected_node = null;
      this.save_state_handler = new SaveStateHandler(this);
      this.select_node_handler = new SelectNodeHandler(this);
      this.dnd_handler = new DragAndDropHandler(this);
      this._initData();
      this.element.click($.proxy(this._click, this));
      return this.element.bind('contextmenu', $.proxy(this._contextmenu, this));
    };

    JqTreeWidget.prototype._deinit = function() {
      this.element.empty();
      this.element.unbind();
      this.tree = null;
      return JqTreeWidget.__super__._deinit.call(this);
    };

    JqTreeWidget.prototype._initData = function() {
      var data_url,
        _this = this;
      if (this.options.data) {
        return this.loadData(this.options.data);
      } else {
        data_url = this._getDataUrl();
        if (data_url) {
          return this._loadDataFromServer(data_url, function(data) {
            return _this.loadData(data);
          });
        }
      }
    };

    JqTreeWidget.prototype._getDataUrl = function(node) {
      var data_url;
      data_url = this.options.dataUrl || this.element.data('url');
      if ($.isFunction(data_url)) {
        return data_url(node);
      } else {
        if (node) {
          data_url += "?node=" + node.id;
        }
        return data_url;
      }
    };

    JqTreeWidget.prototype._loadDataFromServer = function(data_url, on_success) {
      var _this = this;
      return $.ajax({
        url: data_url,
        cache: false,
        success: function(response) {
          var data;
          if ($.isArray(response) || typeof response === 'object') {
            data = response;
          } else {
            data = $.parseJSON(response);
          }
          return on_success(data);
        }
      });
    };

    JqTreeWidget.prototype._initTree = function(data) {
      this.tree = new Tree();
      this.tree.loadFromData(data);
      this._openNodes();
      this._refreshElements();
      this.select_node_handler.selectCurrentNode();
      return this._triggerEvent('tree.init');
    };

    JqTreeWidget.prototype._openNodes = function() {
      var max_level;
      if (this.options.saveState) {
        if (this.save_state_handler.restoreState()) {
          return;
        }
      }
      if (this.options.autoOpen === false) {
        return;
      } else if (this.options.autoOpen === true) {
        max_level = -1;
      } else {
        max_level = parseInt(this.options.autoOpen);
      }
      return this.tree.iterate(function(node, level) {
        node.is_open = true;
        return level !== max_level;
      });
    };

    JqTreeWidget.prototype._refreshElements = function(from_node) {
      var $element, createFolderLi, createLi, createNodeLi, createUl, doCreateDomElements, escapeIfNecessary, is_root_node, node_element,
        _this = this;
      if (from_node == null) {
        from_node = null;
      }
      escapeIfNecessary = function(value) {
        if (_this.options.autoEscape) {
          return html_escape(value);
        } else {
          return value;
        }
      };
      createUl = function(is_root_node) {
        var class_string;
        if (is_root_node) {
          class_string = ' class="jqtree-tree"';
        } else {
          class_string = '';
        }
        return $("<ul" + class_string + "></ul>");
      };
      createLi = function(node) {
        var $li;
        if (node.isFolder()) {
          $li = createFolderLi(node);
        } else {
          $li = createNodeLi(node);
        }
        if (_this.options.onCreateLi) {
          _this.options.onCreateLi(node, $li);
        }
        return $li;
      };
      createNodeLi = function(node) {
        var escaped_name;
        escaped_name = escapeIfNecessary(node.name);
        return $("<li><div><span class=\"jqtree-title\">" + escaped_name + "</span></div></li>");
      };
      createFolderLi = function(node) {
        var button_class, escaped_name, folder_class, getButtonClass, getFolderClass;
        getButtonClass = function() {
          var classes;
          classes = ['jqtree-toggler'];
          if (!node.is_open) {
            classes.push('jqtree-closed');
          }
          return classes.join(' ');
        };
        getFolderClass = function() {
          var classes;
          classes = ['jqtree-folder'];
          if (!node.is_open) {
            classes.push('jqtree-closed');
          }
          return classes.join(' ');
        };
        button_class = getButtonClass();
        folder_class = getFolderClass();
        escaped_name = escapeIfNecessary(node.name);
        return $("<li class=\"" + folder_class + "\"><div><a class=\"" + button_class + "\">&raquo;</a><span class=\"jqtree-title\">" + escaped_name + "</span></div></li>");
      };
      doCreateDomElements = function($element, children, is_root_node, is_open) {
        var $li, $ul, child, _i, _len;
        $ul = createUl(is_root_node);
        $element.append($ul);
        for (_i = 0, _len = children.length; _i < _len; _i++) {
          child = children[_i];
          $li = createLi(child);
          $ul.append($li);
          child.element = $li[0];
          $li.data('node', child);
          if (child.hasChildren()) {
            doCreateDomElements($li, child.children, false, child.is_open);
          }
        }
        return null;
      };
      if (from_node && from_node.parent) {
        is_root_node = false;
        node_element = this._getNodeElementForNode(from_node);
        node_element.getUl().remove();
        $element = node_element.$element;
      } else {
        from_node = this.tree;
        $element = this.element;
        $element.empty();
        is_root_node = true;
      }
      doCreateDomElements($element, from_node.children, is_root_node, is_root_node);
      return this._triggerEvent('tree.refresh');
    };

    JqTreeWidget.prototype._click = function(e) {
      var $target, node;
      if (e.ctrlKey) {
        return;
      }
      $target = $(e.target);
      if ($target.is('.jqtree-toggler')) {
        node = this._getNode($target);
        if (node) {
          this.toggle(node);
          e.preventDefault();
          return e.stopPropagation();
        }
      } else if ($target.is('div') || $target.is('span')) {
        node = this._getNode($target);
        if (node) {
          if ((!this.options.onCanSelectNode) || this.options.onCanSelectNode(node)) {
            // JK: Wait to make sure. this.selectNode(node);
            return this._triggerEvent('tree.click', {
              node: node,
              capturedTarget: $target
            });
          }
        }
      }
    };

    JqTreeWidget.prototype._getNode = function($element) {
      var $li;
      $li = $element.closest('li');
      if ($li.length === 0) {
        return null;
      } else {
        return $li.data('node');
      }
    };

    JqTreeWidget.prototype._getNodeElementForNode = function(node) {
      if (node.isFolder()) {
        return new FolderElement(node, this);
      } else {
        return new NodeElement(node, this);
      }
    };

    JqTreeWidget.prototype._getNodeElement = function($element) {
      var node;
      node = this._getNode($element);
      if (node) {
        return this._getNodeElementForNode(node);
      } else {
        return null;
      }
    };

    JqTreeWidget.prototype._contextmenu = function(e) {
      var $div, node;
      $div = $(e.target).closest('ul.tree div');
      if ($div.length) {
        node = this._getNode($div);
        if (node) {
          e.preventDefault();
          e.stopPropagation();
          this._triggerEvent('tree.contextmenu', {
            node: node,
            click_event: e
          });
          return false;
        }
      }
    };

    JqTreeWidget.prototype._saveState = function() {
      if (this.options.saveState) {
        return this.save_state_handler.saveState();
      }
    };

    JqTreeWidget.prototype._mouseCapture = function(event) {
      if (this.options.dragAndDrop) {
        return this.dnd_handler.mouseCapture(event);
      } else {
        return false;
      }
    };

    JqTreeWidget.prototype._mouseStart = function(event) {
      if (this.options.dragAndDrop) {
        return this.dnd_handler.mouseStart(event);
      } else {
        return false;
      }
    };

    JqTreeWidget.prototype._mouseDrag = function(event) {
      if (this.options.dragAndDrop) {
        return this.dnd_handler.mouseDrag(event);
      } else {
        return false;
      }
    };

    JqTreeWidget.prototype._mouseStop = function() {
      if (this.options.dragAndDrop) {
        return this.dnd_handler.mouseStop();
      } else {
        return false;
      }
    };

    JqTreeWidget.prototype._triggerEvent = function(event_name, values) {
      var event;
      event = $.Event(event_name);
      $.extend(event, values);
      this.element.trigger(event);
      return event;
    };

    JqTreeWidget.prototype.testGenerateHitAreas = function(moving_node) {
      this.dnd_handler.current_item = this._getNodeElementForNode(moving_node);
      this.dnd_handler.generateHitAreas();
      return this.dnd_handler.hit_areas;
    };

    return JqTreeWidget;

  })(MouseWidget);

  SimpleWidget.register(JqTreeWidget, 'tree');

  GhostDropHint = (function() {

    function GhostDropHint(node, $element, position) {
      this.$element = $element;
      this.node = node;
      this.$ghost = $('<li class="jqtree-ghost"><span class="jqtree-circle"></span><span class="jqtree-line"></span></li>');
      if (position === Position.AFTER) {
        this.moveAfter();
      } else if (position === Position.BEFORE) {
        this.moveBefore();
      } else if (position === Position.INSIDE) {
        if (node.isFolder() && node.is_open) {
          this.moveInsideOpenFolder();
        } else {
          this.moveInside();
        }
      }
    }

    GhostDropHint.prototype.remove = function() {
      return this.$ghost.remove();
    };

    GhostDropHint.prototype.moveAfter = function() {
      return this.$element.after(this.$ghost);
    };

    GhostDropHint.prototype.moveBefore = function() {
      return this.$element.before(this.$ghost);
    };

    GhostDropHint.prototype.moveInsideOpenFolder = function() {
      return $(this.node.children[0].element).before(this.$ghost);
    };

    GhostDropHint.prototype.moveInside = function() {
      this.$element.after(this.$ghost);
      return this.$ghost.addClass('jqtree-inside');
    };

    return GhostDropHint;

  })();

  BorderDropHint = (function() {

    function BorderDropHint($element) {
      var $div, width;
      $div = $element.children('div');
      width = $element.width() - 4;
      this.$hint = $('<span class="jqtree-border"></span>');
      $div.append(this.$hint);
      this.$hint.css({
        width: width,
        height: $div.height() - 4
      });
    }

    BorderDropHint.prototype.remove = function() {
      return this.$hint.remove();
    };

    return BorderDropHint;

  })();

  NodeElement = (function() {

    function NodeElement(node, tree_widget) {
      this.init(node, tree_widget);
    }

    NodeElement.prototype.init = function(node, tree_widget) {
      this.node = node;
      this.tree_widget = tree_widget;
      return this.$element = $(node.element);
    };

    NodeElement.prototype.getUl = function() {
      return this.$element.children('ul:first');
    };

    NodeElement.prototype.getSpan = function() {
      return this.$element.children('div').find('span.jqtree-title');
    };

    NodeElement.prototype.getLi = function() {
      return this.$element;
    };

    NodeElement.prototype.addDropHint = function(position) {
      if (position === Position.INSIDE) {
        return new BorderDropHint(this.$element);
      } else {
        return new GhostDropHint(this.node, this.$element, position);
      }
    };

    NodeElement.prototype.select = function() {
      return this.getLi().addClass('jqtree-selected');
    };

    NodeElement.prototype.deselect = function() {
      return this.getLi().removeClass('jqtree-selected');
    };

    return NodeElement;

  })();

  FolderElement = (function(_super) {

    __extends(FolderElement, _super);

    function FolderElement() {
      return FolderElement.__super__.constructor.apply(this, arguments);
    }

    FolderElement.prototype.open = function(on_finished, skip_slide) {
      var doOpen,
        _this = this;
      if (!this.node.is_open) {
        this.node.is_open = true;
        this.getButton().removeClass('jqtree-closed');
        doOpen = function() {
          _this.getLi().removeClass('jqtree-closed');
          if (on_finished) {
            on_finished();
          }
          return _this.tree_widget._triggerEvent('tree.open', {
            node: _this.node
          });
        };
        if (skip_slide) {
          this.getUl().show();
          return doOpen();
        } else {
          return this.getUl().slideDown('fast', doOpen);
        }
      }
    };

    FolderElement.prototype.close = function(skip_slide) {
      var doClose,
        _this = this;
      if (this.node.is_open) {
        this.node.is_open = false;
        this.getButton().addClass('jqtree-closed');
        doClose = function() {
          _this.getLi().addClass('jqtree-closed');
          return _this.tree_widget._triggerEvent('tree.close', {
            node: _this.node
          });
        };
        if (skip_slide) {
          this.getUl().hide();
          return doClose();
        } else {
          return this.getUl().slideUp('fast', doClose);
        }
      }
    };

    FolderElement.prototype.getButton = function() {
      return this.$element.children('div').find('a.jqtree-toggler');
    };

    FolderElement.prototype.addDropHint = function(position) {
      if (!this.node.is_open && position === Position.INSIDE) {
        return new BorderDropHint(this.$element);
      } else {
        return new GhostDropHint(this.node, this.$element, position);
      }
    };

    return FolderElement;

  })(NodeElement);

  DragElement = (function() {

    function DragElement(node, offset_x, offset_y, $tree) {
      this.offset_x = offset_x;
      this.offset_y = offset_y;
      this.$element = $("<span class=\"jqtree-title jqtree-dragging\">" + node.name + "</span>");
      this.$element.css("position", "absolute");
      $tree.append(this.$element);
    }

    DragElement.prototype.move = function(page_x, page_y) {
      return this.$element.offset({
        left: page_x - this.offset_x,
        top: page_y - this.offset_y
      });
    };

    DragElement.prototype.remove = function() {
      return this.$element.remove();
    };

    return DragElement;

  })();

  SaveStateHandler = (function() {

    function SaveStateHandler(tree_widget) {
      this.tree_widget = tree_widget;
    }

    SaveStateHandler.prototype.saveState = function() {
      if (this.tree_widget.options.onSetStateFromStorage) {
        return this.tree_widget.options.onSetStateFromStorage(this.getState());
      } else if (typeof localStorage !== "undefined" && localStorage !== null) {
        return localStorage.setItem(this.getCookieName(), this.getState());
      } else if ($.cookie) {
        return $.cookie(this.getCookieName(), this.getState(), {
          path: '/'
        });
      }
    };

    SaveStateHandler.prototype.restoreState = function() {
      var state;
      state = this.getStateFromStorage();
      if (state) {
        this.setState(state);
        return true;
      } else {
        return false;
      }
    };

    SaveStateHandler.prototype.getStateFromStorage = function() {
      if (this.tree_widget.options.onGetStateFromStorage) {
        return this.tree_widget.options.onGetStateFromStorage();
      } else if (typeof localStorage !== "undefined" && localStorage !== null) {
        return localStorage.getItem(this.getCookieName());
      } else if ($.cookie) {
        return $.cookie(this.getCookieName(), {
          path: '/'
        });
      } else {
        return null;
      }
    };

    SaveStateHandler.prototype.getState = function() {
      var open_nodes, selected_node,
        _this = this;
      open_nodes = [];
      this.tree_widget.tree.iterate(function(node) {
        if (node.is_open && node.id && node.hasChildren()) {
          open_nodes.push(node.id);
        }
        return true;
      });
      selected_node = '';
      if (this.tree_widget.selected_node) {
        selected_node = this.tree_widget.selected_node.id;
      }
      return JSON.stringify({
        open_nodes: open_nodes,
        selected_node: selected_node
      });
    };

    SaveStateHandler.prototype.setState = function(state) {
      var data, open_nodes, selected_node_id,
        _this = this;
      data = $.parseJSON(state);
      if (data) {
        open_nodes = data.open_nodes;
        selected_node_id = data.selected_node;
        return this.tree_widget.tree.iterate(function(node) {
          if (node.id && node.hasChildren() && (indexOf(open_nodes, node.id) >= 0)) {
            node.is_open = true;
          }
          if (selected_node_id && (node.id === selected_node_id)) {
            _this.tree_widget.selected_node = node;
          }
          return true;
        });
      }
    };

    SaveStateHandler.prototype.getCookieName = function() {
      if (typeof this.tree_widget.options.saveState === 'string') {
        return this.tree_widget.options.saveState;
      } else {
        return 'tree';
      }
    };

    return SaveStateHandler;

  })();

  SelectNodeHandler = (function() {

    function SelectNodeHandler(tree_widget) {
      this.tree_widget = tree_widget;
    }

    SelectNodeHandler.prototype.selectNode = function(node, must_open_parents) {
      var parent;
      if (this.tree_widget.options.selectable) {
        if (this.tree_widget.selected_node) {
          this.tree_widget._getNodeElementForNode(this.tree_widget.selected_node).deselect();
          this.tree_widget.selected_node = null;
        }
        if (node) {
          this.tree_widget._getNodeElementForNode(node).select();
          this.tree_widget.selected_node = node;
          if (must_open_parents) {
            parent = this.tree_widget.selected_node.parent;
            while (parent) {
              if (!parent.is_open) {
                this.tree_widget.openNode(parent, true);
              }
              parent = parent.parent;
            }
          }
        }
        if (this.tree_widget.options.saveState) {
          return this.tree_widget.save_state_handler.saveState();
        }
      }
    };

    SelectNodeHandler.prototype.selectCurrentNode = function() {
      var node_element;
      if (this.tree_widget.selected_node) {
        node_element = this.tree_widget._getNodeElementForNode(this.tree_widget.selected_node);
        if (node_element) {
          return node_element.select();
        }
      }
    };

    return SelectNodeHandler;

  })();

  DragAndDropHandler = (function() {

    function DragAndDropHandler(tree_widget) {
      this.tree_widget = tree_widget;
      this.hovered_area = null;
      this.$ghost = null;
      this.hit_areas = [];
      this.is_dragging = false;
    }

    DragAndDropHandler.prototype.mouseCapture = function(event) {
      var $element, node_element;
      $element = $(event.target);
      if (this.tree_widget.options.onIsMoveHandle && !this.tree_widget.options.onIsMoveHandle($element)) {
        return null;
      }
      node_element = this.tree_widget._getNodeElement($element);
      if (node_element && this.tree_widget.options.onCanMove) {
        if (!this.tree_widget.options.onCanMove(node_element.node)) {
          node_element = null;
        }
      }
      this.current_item = node_element;
      return this.current_item !== null;
    };

    DragAndDropHandler.prototype.mouseStart = function(event) {
      var offsetX, offsetY, _ref;
      this.refreshHitAreas();
      _ref = this.getOffsetFromEvent(event), offsetX = _ref[0], offsetY = _ref[1];
      this.drag_element = new DragElement(this.current_item.node, offsetX, offsetY, this.tree_widget.element);
      this.is_dragging = true;
      this.current_item.$element.addClass('jqtree-moving');
      return true;
    };

    DragAndDropHandler.prototype.mouseDrag = function(event) {
      var area, position_name;
      this.drag_element.move(event.pageX, event.pageY);
      area = this.findHoveredArea(event.pageX, event.pageY);
      if (area && this.tree_widget.options.onCanMoveTo) {
        position_name = Position.getName(area.position);
        if (!this.tree_widget.options.onCanMoveTo(this.current_item.node, area.node, position_name)) {
          area = null;
        }
      }
      if (!area) {
        this.removeDropHint();
        this.removeHover();
        this.stopOpenFolderTimer();
      } else {
        if (this.hovered_area !== area) {
          this.hovered_area = area;
          this.updateDropHint();
        }
      }
      return true;
    };

    DragAndDropHandler.prototype.mouseStop = function() {
      this.moveItem();
      this.clear();
      this.removeHover();
      this.removeDropHint();
      this.removeHitAreas();
      this.current_item.$element.removeClass('jqtree-moving');
      this.is_dragging = false;
      return false;
    };

    DragAndDropHandler.prototype.getOffsetFromEvent = function(event) {
      var element_offset;
      element_offset = $(event.target).offset();
      return [event.pageX - element_offset.left, event.pageY - element_offset.top];
    };

    DragAndDropHandler.prototype.refreshHitAreas = function() {
      this.removeHitAreas();
      return this.generateHitAreas();
    };

    DragAndDropHandler.prototype.removeHitAreas = function() {
      return this.hit_areas = [];
    };

    DragAndDropHandler.prototype.clear = function() {
      this.drag_element.remove();
      return this.drag_element = null;
    };

    DragAndDropHandler.prototype.removeDropHint = function() {
      if (this.previous_ghost) {
        return this.previous_ghost.remove();
      }
    };

    DragAndDropHandler.prototype.removeHover = function() {
      return this.hovered_area = null;
    };

    DragAndDropHandler.prototype.generateHitAreas = function() {
      var addPosition, getTop, groupPositions, handleAfterOpenFolder, handleClosedFolder, handleFirstNode, handleNode, handleOpenFolder, hit_areas, last_top, positions,
        _this = this;
      positions = [];
      last_top = 0;
      getTop = function($element) {
        return $element.offset().top;
      };
      addPosition = function(node, position, top) {
        positions.push({
          top: top,
          node: node,
          position: position
        });
        return last_top = top;
      };
      groupPositions = function(handle_group) {
        var group, position, previous_top, _i, _len;
        previous_top = -1;
        group = [];
        for (_i = 0, _len = positions.length; _i < _len; _i++) {
          position = positions[_i];
          if (position.top !== previous_top) {
            if (group.length) {
              handle_group(group, previous_top, position.top);
            }
            previous_top = position.top;
            group = [];
          }
          group.push(position);
        }
        return handle_group(group, previous_top, _this.tree_widget.element.offset().top + _this.tree_widget.element.height());
      };
      handleNode = function(node, next_node, $element) {
        var top;
        top = getTop($element);
        if (node === _this.current_item.node) {
          addPosition(node, Position.NONE, top);
        } else {
          addPosition(node, Position.INSIDE, top);
        }
        if (next_node === _this.current_item.node || node === _this.current_item.node) {
          return addPosition(node, Position.NONE, top);
        } else {
          return addPosition(node, Position.AFTER, top);
        }
      };
      handleOpenFolder = function(node, $element) {
        if (node === _this.current_item.node) {
          return false;
        }
        if (node.children[0] !== _this.current_item.node) {
          addPosition(node, Position.INSIDE, getTop($element));
        }
        return true;
      };
      handleAfterOpenFolder = function(node, next_node, $element) {
        if (node === _this.current_item.node || next_node === _this.current_item.node) {
          return addPosition(node, Position.NONE, last_top);
        } else {
          return addPosition(node, Position.AFTER, last_top);
        }
      };
      handleClosedFolder = function(node, next_node, $element) {
        var top;
        top = getTop($element);
        if (node === _this.current_item.node) {
          return addPosition(node, Position.NONE, top);
        } else {
          addPosition(node, Position.INSIDE, top);
          if (next_node !== _this.current_item.node) {
            return addPosition(node, Position.AFTER, top);
          }
        }
      };
      handleFirstNode = function(node, $element) {
        if (node !== _this.current_item.node) {
          return addPosition(node, Position.BEFORE, getTop($(node.element)));
        }
      };
      this.iterateVisibleNodes(handleNode, handleOpenFolder, handleClosedFolder, handleAfterOpenFolder, handleFirstNode);
      hit_areas = [];
      groupPositions(function(positions_in_group, top, bottom) {
        var area_height, area_top, position, _i, _len;
        area_height = (bottom - top) / positions_in_group.length;
        area_top = top;
        for (_i = 0, _len = positions_in_group.length; _i < _len; _i++) {
          position = positions_in_group[_i];
          hit_areas.push({
            top: area_top,
            bottom: area_top + area_height,
            node: position.node,
            position: position.position
          });
          area_top += area_height;
        }
        return null;
      });
      return this.hit_areas = hit_areas;
    };

    DragAndDropHandler.prototype.iterateVisibleNodes = function(handle_node, handle_open_folder, handle_closed_folder, handle_after_open_folder, handle_first_node) {
      var is_first_node, iterate,
        _this = this;
      is_first_node = true;
      iterate = function(node, next_node) {
        var $element, child, children_length, i, must_iterate_inside, _i, _len, _ref;
        must_iterate_inside = (node.is_open || !node.element) && node.hasChildren();
        if (node.element) {
          $element = $(node.element);
          if (!$element.is(':visible')) {
            return;
          }
          if (is_first_node) {
            handle_first_node(node, $element);
            is_first_node = false;
          }
          if (!node.hasChildren()) {
            handle_node(node, next_node, $element);
          } else if (node.is_open) {
            if (!handle_open_folder(node, $element)) {
              must_iterate_inside = false;
            }
          } else {
            handle_closed_folder(node, next_node, $element);
          }
        }
        if (must_iterate_inside) {
          children_length = node.children.length;
          _ref = node.children;
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            child = _ref[i];
            if (i === (children_length - 1)) {
              iterate(node.children[i], null);
            } else {
              iterate(node.children[i], node.children[i + 1]);
            }
          }
          if (node.is_open) {
            return handle_after_open_folder(node, next_node, $element);
          }
        }
      };
      return iterate(this.tree_widget.tree);
    };

    DragAndDropHandler.prototype.findHoveredArea = function(x, y) {
      var area, high, low, mid, tree_offset;
      tree_offset = this.tree_widget.element.offset();
      if (x < tree_offset.left || y < tree_offset.top || x > (tree_offset.left + this.tree_widget.element.width()) || y > (tree_offset.top + this.tree_widget.element.height())) {
        return null;
      }
      low = 0;
      high = this.hit_areas.length;
      while (low < high) {
        mid = (low + high) >> 1;
        area = this.hit_areas[mid];
        if (y < area.top) {
          high = mid;
        } else if (y > area.bottom) {
          low = mid + 1;
        } else {
          return area;
        }
      }
      return null;
    };

    DragAndDropHandler.prototype.updateDropHint = function() {
      var node, node_element;
      this.stopOpenFolderTimer();
      if (!this.hovered_area) {
        return;
      }
      node = this.hovered_area.node;
      if (node.isFolder() && !node.is_open && this.hovered_area.position === Position.INSIDE) {
        this.startOpenFolderTimer(node);
      }
      this.removeDropHint();
      node_element = this.tree_widget._getNodeElementForNode(this.hovered_area.node);
      return this.previous_ghost = node_element.addDropHint(this.hovered_area.position);
    };

    DragAndDropHandler.prototype.startOpenFolderTimer = function(folder) {
      var openFolder,
        _this = this;
      openFolder = function() {
        return _this.tree_widget._openNode(folder, false, function() {
          _this.refreshHitAreas();
          return _this.updateDropHint();
        });
      };
      return this.open_folder_timer = setTimeout(openFolder, 500);
    };

    DragAndDropHandler.prototype.stopOpenFolderTimer = function() {
      if (this.open_folder_timer) {
        clearTimeout(this.open_folder_timer);
        return this.open_folder_timer = null;
      }
    };

    DragAndDropHandler.prototype.moveItem = function() {
      var doMove, event, moved_node, position, previous_parent, target_node,
        _this = this;
      if (this.hovered_area && this.hovered_area.position !== Position.NONE) {
        moved_node = this.current_item.node;
        target_node = this.hovered_area.node;
        position = this.hovered_area.position;
        previous_parent = moved_node.parent;
        if (position === Position.INSIDE) {
          this.hovered_area.node.is_open = true;
        }
        doMove = function() {
          _this.tree_widget.tree.moveNode(moved_node, target_node, position);
          _this.tree_widget.element.empty();
          return _this.tree_widget._refreshElements();
        };
        event = this.tree_widget._triggerEvent('tree.move', {
          move_info: {
            moved_node: moved_node,
            target_node: target_node,
            position: Position.getName(position),
            previous_parent: previous_parent,
            do_move: doMove
          }
        });
        if (!event.isDefaultPrevented()) {
          return doMove();
        }
      }
    };

    return DragAndDropHandler;

  })();

  this.Tree.Node = Node;

}).call(this);