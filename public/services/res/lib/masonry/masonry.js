/*!
 * Masonry PACKAGED v4.1.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.0
 * MIT license
 */

/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */

/**
 * matchesSelector v2.0.1
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/**
 * Fizzy UI utils v2.0.1
 * MIT license
 */

/*!
 * Outlayer v2.1.0
 * the brains and guts of a layout library
 * MIT license
 */

/*!
 * Masonry v4.1.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

(function(e,t){"use strict";typeof define=="function"&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(n){t(e,n)}):typeof module=="object"&&module.exports?module.exports=t(e,require("jquery")):e.jQueryBridget=t(e,e.jQuery)})(window,function(t,n){function o(e,i,o){function a(t,n,r){var i,u="$()."+e+'("'+n+'")';return t.each(function(t,a){var f=o.data(a,e);if(!f){s(e+" not initialized. Cannot call methods, i.e. "+u);return}var l=f[n];if(!l||n.charAt(0)=="_"){s(u+" is not a valid method");return}var c=l.apply(f,r);i=i===undefined?c:i}),i!==undefined?i:t}function f(t,n){t.each(function(t,r){var s=o.data(r,e);s?(s.option(n),s._init()):(s=new i(r,n),o.data(r,e,s))})}o=o||n||t.jQuery;if(!o)return;i.prototype.option||(i.prototype.option=function(e){if(!o.isPlainObject(e))return;this.options=o.extend(!0,this.options,e)}),o.fn[e]=function(e){if(typeof e=="string"){var t=r.call(arguments,1);return a(this,e,t)}return f(this,e),this},u(o)}function u(e){if(!e||e&&e.bridget)return;e.bridget=o}var r=Array.prototype.slice,i=t.console,s=typeof i=="undefined"?function(){}:function(e){i.error(e)};return u(n||t.jQuery),o}),function(e,t){typeof define=="function"&&define.amd?define("ev-emitter/ev-emitter",t):typeof module=="object"&&module.exports?module.exports=t():e.EvEmitter=t()}(this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(!e||!t)return;var n=this._events=this._events||{},r=n[e]=n[e]||[];return r.indexOf(t)==-1&&r.push(t),this},t.once=function(e,t){if(!e||!t)return;this.on(e,t);var n=this._onceEvents=this._onceEvents||{},r=n[e]=n[e]||{};return r[t]=!0,this},t.off=function(e,t){var n=this._events&&this._events[e];if(!n||!n.length)return;var r=n.indexOf(t);return r!=-1&&n.splice(r,1),this},t.emitEvent=function(e,t){var n=this._events&&this._events[e];if(!n||!n.length)return;var r=0,i=n[r];t=t||[];var s=this._onceEvents&&this._onceEvents[e];while(i){var o=s&&s[i];o&&(this.off(e,i),delete s[i]),i.apply(this,t),r+=o?0:1,i=n[r]}return this},e}),function(e,t){"use strict";typeof define=="function"&&define.amd?define("get-size/get-size",[],function(){return t()}):typeof module=="object"&&module.exports?module.exports=t():e.getSize=t()}(window,function(){function t(e){var t=parseFloat(e),n=e.indexOf("%")==-1&&!isNaN(t);return n&&t}function n(){}function o(){var e={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0};for(var t=0;t<s;t++){var n=i[t];e[n]=0}return e}function u(e){var t=getComputedStyle(e);return t||r("Style returned "+t+". Are you running this code in a hidden iframe on Firefox? "+"See http://bit.ly/getsizebug1"),t}function l(){if(a)return;a=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var n=document.body||document.documentElement;n.appendChild(e);var r=u(e);c.isBoxSizeOuter=f=t(r.width)==200,n.removeChild(e)}function c(e){l(),typeof e=="string"&&(e=document.querySelector(e));if(!e||typeof e!="object"||!e.nodeType)return;var n=u(e);if(n.display=="none")return o();var r={};r.width=e.offsetWidth,r.height=e.offsetHeight;var a=r.isBorderBox=n.boxSizing=="border-box";for(var c=0;c<s;c++){var h=i[c],p=n[h],d=parseFloat(p);r[h]=isNaN(d)?0:d}var v=r.paddingLeft+r.paddingRight,m=r.paddingTop+r.paddingBottom,g=r.marginLeft+r.marginRight,y=r.marginTop+r.marginBottom,b=r.borderLeftWidth+r.borderRightWidth,w=r.borderTopWidth+r.borderBottomWidth,E=a&&f,S=t(n.width);S!==!1&&(r.width=S+(E?0:v+b));var x=t(n.height);return x!==!1&&(r.height=x+(E?0:m+w)),r.innerWidth=r.width-(v+b),r.innerHeight=r.height-(m+w),r.outerWidth=r.width+g,r.outerHeight=r.height+y,r}var r=typeof console=="undefined"?n:function(e){console.error(e)},i=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],s=i.length,a=!1,f;return c}),function(e,t){"use strict";typeof define=="function"&&define.amd?define("desandro-matches-selector/matches-selector",t):typeof module=="object"&&module.exports?module.exports=t():e.matchesSelector=t()}(window,function(){"use strict";var t=function(){var e=Element.prototype;if(e.matches)return"matches";if(e.matchesSelector)return"matchesSelector";var t=["webkit","moz","ms","o"];for(var n=0;n<t.length;n++){var r=t[n],i=r+"MatchesSelector";if(e[i])return i}}();return function(n,r){return n[t](r)}}),function(e,t){typeof define=="function"&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(n){return t(e,n)}):typeof module=="object"&&module.exports?module.exports=t(e,require("desandro-matches-selector")):e.fizzyUIUtils=t(e,e.matchesSelector)}(window,function(t,n){var r={};r.extend=function(e,t){for(var n in t)e[n]=t[n];return e},r.modulo=function(e,t){return(e%t+t)%t},r.makeArray=function(e){var t=[];if(Array.isArray(e))t=e;else if(e&&typeof e.length=="number")for(var n=0;n<e.length;n++)t.push(e[n]);else t.push(e);return t},r.removeFrom=function(e,t){var n=e.indexOf(t);n!=-1&&e.splice(n,1)},r.getParent=function(e,t){while(e!=document.body){e=e.parentNode;if(n(e,t))return e}},r.getQueryElement=function(e){return typeof e=="string"?document.querySelector(e):e},r.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.filterFindElements=function(e,t){e=r.makeArray(e);var i=[];return e.forEach(function(e){if(!(e instanceof HTMLElement))return;if(!t){i.push(e);return}n(e,t)&&i.push(e);var r=e.querySelectorAll(t);for(var s=0;s<r.length;s++)i.push(r[s])}),i},r.debounceMethod=function(e,t,n){var r=e.prototype[t],i=t+"Timeout";e.prototype[t]=function(){var e=this[i];e&&clearTimeout(e);var t=arguments,s=this;this[i]=setTimeout(function(){r.apply(s,t),delete s[i]},n||100)}},r.docReady=function(e){document.readyState=="complete"?e():document.addEventListener("DOMContentLoaded",e)},r.toDashed=function(e){return e.replace(/(.)([A-Z])/g,function(e,t,n){return t+"-"+n}).toLowerCase()};var i=t.console;return r.htmlInit=function(e,n){r.docReady(function(){var s=r.toDashed(n),o="data-"+s,u=document.querySelectorAll("["+o+"]"),a=document.querySelectorAll(".js-"+s),f=r.makeArray(u).concat(r.makeArray(a)),l=o+"-options",c=t.jQuery;f.forEach(function(t){var r=t.getAttribute(o)||t.getAttribute(l),s;try{s=r&&JSON.parse(r)}catch(u){i&&i.error("Error parsing "+o+" on "+t.className+": "+u);return}var a=new e(t,s);c&&c.data(t,n,a)})})},r}),function(e,t){typeof define=="function"&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],t):typeof module=="object"&&module.exports?module.exports=t(require("ev-emitter"),require("get-size")):(e.Outlayer={},e.Outlayer.Item=t(e.EvEmitter,e.getSize))}(window,function(t,n){function r(e){for(var t in e)return!1;return t=null,!0}function f(e,t){if(!e)return;this.element=e,this.layout=t,this.position={x:0,y:0},this._create()}function c(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})}var i=document.documentElement.style,s=typeof i.transition=="string"?"transition":"WebkitTransition",o=typeof i.transform=="string"?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],a={transform:o,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},l=f.prototype=Object.create(t.prototype);l.constructor=f,l._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},l.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},l.getSize=function(){this.size=n(this.element)},l.css=function(e){var t=this.element.style;for(var n in e){var r=a[n]||n;t[r]=e[n]}},l.getPosition=function(){var e=getComputedStyle(this.element),t=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),r=e[t?"left":"right"],i=e[n?"top":"bottom"],s=this.layout.size,o=r.indexOf("%")!=-1?parseFloat(r)/100*s.width:parseInt(r,10),u=i.indexOf("%")!=-1?parseFloat(i)/100*s.height:parseInt(i,10);o=isNaN(o)?0:o,u=isNaN(u)?0:u,o-=t?s.paddingLeft:s.paddingRight,u-=n?s.paddingTop:s.paddingBottom,this.position.x=o,this.position.y=u},l.layoutPosition=function(){var e=this.layout.size,t={},n=this.layout._getOption("originLeft"),r=this.layout._getOption("originTop"),i=n?"paddingLeft":"paddingRight",s=n?"left":"right",o=n?"right":"left",u=this.position.x+e[i];t[s]=this.getXValue(u),t[o]="";var a=r?"paddingTop":"paddingBottom",f=r?"top":"bottom",l=r?"bottom":"top",c=this.position.y+e[a];t[f]=this.getYValue(c),t[l]="",this.css(t),this.emitEvent("layout",[this])},l.getXValue=function(e){var t=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!t?e/this.layout.size.width*100+"%":e+"px"},l.getYValue=function(e){var t=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&t?e/this.layout.size.height*100+"%":e+"px"},l._transitionTo=function(e,t){this.getPosition();var n=this.position.x,r=this.position.y,i=parseInt(e,10),s=parseInt(t,10),o=i===this.position.x&&s===this.position.y;this.setPosition(e,t);if(o&&!this.isTransitioning){this.layoutPosition();return}var u=e-n,a=t-r,f={};f.transform=this.getTranslate(u,a),this.transition({to:f,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},l.getTranslate=function(e,t){var n=this.layout._getOption("originLeft"),r=this.layout._getOption("originTop");return e=n?e:-e,t=r?t:-t,"translate3d("+e+"px, "+t+"px, 0)"},l.goTo=function(e,t){this.setPosition(e,t),this.layoutPosition()},l.moveTo=l._transitionTo,l.setPosition=function(e,t){this.position.x=parseInt(e,10),this.position.y=parseInt(t,10)},l._nonTransition=function(e){this.css(e.to),e.isCleaning&&this._removeStyles(e.to);for(var t in e.onTransitionEnd)e.onTransitionEnd[t].call(this)},l.transition=function(e){if(!parseFloat(this.layout.options.transitionDuration)){this._nonTransition(e);return}var t=this._transn;for(var n in e.onTransitionEnd)t.onEnd[n]=e.onTransitionEnd[n];for(n in e.to)t.ingProperties[n]=!0,e.isCleaning&&(t.clean[n]=!0);if(e.from){this.css(e.from);var r=this.element.offsetHeight;r=null}this.enableTransition(e.to),this.css(e.to),this.isTransitioning=!0};var h="opacity,"+c(o);l.enableTransition=function(){if(this.isTransitioning)return;var e=this.layout.options.transitionDuration;e=typeof e=="number"?e+"ms":e,this.css({transitionProperty:h,transitionDuration:e,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)},l.onwebkitTransitionEnd=function(e){this.ontransitionend(e)},l.onotransitionend=function(e){this.ontransitionend(e)};var p={"-webkit-transform":"transform"};l.ontransitionend=function(e){if(e.target!==this.element)return;var t=this._transn,n=p[e.propertyName]||e.propertyName;delete t.ingProperties[n],r(t.ingProperties)&&this.disableTransition(),n in t.clean&&(this.element.style[e.propertyName]="",delete t.clean[n]);if(n in t.onEnd){var i=t.onEnd[n];i.call(this),delete t.onEnd[n]}this.emitEvent("transitionEnd",[this])},l.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},l._removeStyles=function(e){var t={};for(var n in e)t[n]="";this.css(t)};var d={transitionProperty:"",transitionDuration:"",transitionDelay:""};return l.removeTransitionStyles=function(){this.css(d)},l.stagger=function(e){e=isNaN(e)?0:e,this.staggerDelay=e+"ms"},l.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},l.remove=function(){if(!s||!parseFloat(this.layout.options.transitionDuration)){this.removeElem();return}this.once("transitionEnd",function(){this.removeElem()}),this.hide()},l.reveal=function(){delete this.isHidden,this.css({display:""});var e=this.layout.options,t={},n=this.getHideRevealTransitionEndProperty("visibleStyle");t[n]=this.onRevealTransitionEnd,this.transition({from:e.hiddenStyle,to:e.visibleStyle,isCleaning:!0,onTransitionEnd:t})},l.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},l.getHideRevealTransitionEndProperty=function(e){var t=this.layout.options[e];if(t.opacity)return"opacity";for(var n in t)return n},l.hide=function(){this.isHidden=!0,this.css({display:""});var e=this.layout.options,t={},n=this.getHideRevealTransitionEndProperty("hiddenStyle");t[n]=this.onHideTransitionEnd,this.transition({from:e.visibleStyle,to:e.hiddenStyle,isCleaning:!0,onTransitionEnd:t})},l.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},l.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},f}),function(e,t){"use strict";typeof define=="function"&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(n,r,i,s){return t(e,n,r,i,s)}):typeof module=="object"&&module.exports?module.exports=t(e,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):e.Outlayer=t(e,e.EvEmitter,e.getSize,e.fizzyUIUtils,e.Outlayer.Item)}(window,function(t,n,r,i,s){function c(e,t){var n=i.getQueryElement(e);if(!n){o&&o.error("Bad element for "+this.constructor.namespace+": "+(n||e));return}this.element=n,u&&(this.$element=u(this.element)),this.options=i.extend({},this.constructor.defaults),this.option(t);var r=++f;this.element.outlayerGUID=r,l[r]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function p(e){function t(){e.apply(this,arguments)}return t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t}function v(e){if(typeof e=="number")return e;var t=e.match(/(^\d*\.?\d*)(\w*)/),n=t&&t[1],r=t&&t[2];if(!n.length)return 0;n=parseFloat(n);var i=d[r]||1;return n*i}var o=t.console,u=t.jQuery,a=function(){},f=0,l={};c.namespace="outlayer",c.Item=s,c.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var h=c.prototype;i.extend(h,n.prototype),h.option=function(e){i.extend(this.options,e)},h._getOption=function(e){var t=this.constructor.compatOptions[e];return t&&this.options[t]!==undefined?this.options[t]:this.options[e]},c.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},h._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),i.extend(this.element.style,this.options.containerStyle);var e=this._getOption("resize");e&&this.bindResize()},h.reloadItems=function(){this.items=this._itemize(this.element.children)},h._itemize=function(e){var t=this._filterFindItemElements(e),n=this.constructor.Item,r=[];for(var i=0;i<t.length;i++){var s=t[i],o=new n(s,this);r.push(o)}return r},h._filterFindItemElements=function(e){return i.filterFindElements(e,this.options.itemSelector)},h.getItemElements=function(){return this.items.map(function(e){return e.element})},h.layout=function(){this._resetLayout(),this._manageStamps();var e=this._getOption("layoutInstant"),t=e!==undefined?e:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},h._init=h.layout,h._resetLayout=function(){this.getSize()},h.getSize=function(){this.size=r(this.element)},h._getMeasurement=function(e,t){var n=this.options[e],i;n?(typeof n=="string"?i=this.element.querySelector(n):n instanceof HTMLElement&&(i=n),this[e]=i?r(i)[t]:n):this[e]=0},h.layoutItems=function(e,t){e=this._getItemsForLayout(e),this._layoutItems(e,t),this._postLayout()},h._getItemsForLayout=function(e){return e.filter(function(e){return!e.isIgnored})},h._layoutItems=function(e,t){this._emitCompleteOnItems("layout",e);if(!e||!e.length)return;var n=[];e.forEach(function(e){var r=this._getItemLayoutPosition(e);r.item=e,r.isInstant=t||e.isLayoutInstant,n.push(r)},this),this._processLayoutQueue(n)},h._getItemLayoutPosition=function(){return{x:0,y:0}},h._processLayoutQueue=function(e){this.updateStagger(),e.forEach(function(e,t){this._positionItem(e.item,e.x,e.y,e.isInstant,t)},this)},h.updateStagger=function(){var e=this.options.stagger;if(e===null||e===undefined){this.stagger=0;return}return this.stagger=v(e),this.stagger},h._positionItem=function(e,t,n,r,i){r?e.goTo(t,n):(e.stagger(i*this.stagger),e.moveTo(t,n))},h._postLayout=function(){this.resizeContainer()},h.resizeContainer=function(){var e=this._getOption("resizeContainer");if(!e)return;var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))},h._getContainerSize=a,h._setContainerMeasure=function(e,t){if(e===undefined)return;var n=this.size;n.isBorderBox&&(e+=t?n.paddingLeft+n.paddingRight+n.borderLeftWidth+n.borderRightWidth:n.paddingBottom+n.paddingTop+n.borderTopWidth+n.borderBottomWidth),e=Math.max(e,0),this.element.style[t?"width":"height"]=e+"px"},h._emitCompleteOnItems=function(e,t){function r(){n.dispatchEvent(e+"Complete",null,[t])}function o(){s++,s==i&&r()}var n=this,i=t.length;if(!t||!i){r();return}var s=0;t.forEach(function(t){t.once(e,o)})},h.dispatchEvent=function(e,t,n){var r=t?[t].concat(n):n;this.emitEvent(e,r);if(u){this.$element=this.$element||u(this.element);if(t){var i=u.Event(t);i.type=e,this.$element.trigger(i,n)}else this.$element.trigger(e,n)}},h.ignore=function(e){var t=this.getItem(e);t&&(t.isIgnored=!0)},h.unignore=function(e){var t=this.getItem(e);t&&delete t.isIgnored},h.stamp=function(e){e=this._find(e);if(!e)return;this.stamps=this.stamps.concat(e),e.forEach(this.ignore,this)},h.unstamp=function(e){e=this._find(e);if(!e)return;e.forEach(function(e){i.removeFrom(this.stamps,e),this.unignore(e)},this)},h._find=function(e){if(!e)return;return typeof e=="string"&&(e=this.element.querySelectorAll(e)),e=i.makeArray(e),e},h._manageStamps=function(){if(!this.stamps||!this.stamps.length)return;this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this)},h._getBoundingRect=function(){var e=this.element.getBoundingClientRect(),t=this.size;this._boundingRect={left:e.left+t.paddingLeft+t.borderLeftWidth,top:e.top+t.paddingTop+t.borderTopWidth,right:e.right-(t.paddingRight+t.borderRightWidth),bottom:e.bottom-(t.paddingBottom+t.borderBottomWidth)}},h._manageStamp=a,h._getElementOffset=function(e){var t=e.getBoundingClientRect(),n=this._boundingRect,i=r(e),s={left:t.left-n.left-i.marginLeft,top:t.top-n.top-i.marginTop,right:n.right-t.right-i.marginRight,bottom:n.bottom-t.bottom-i.marginBottom};return s},h.handleEvent=i.handleEvent,h.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},h.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},h.onresize=function(){this.resize()},i.debounceMethod(c,"onresize",100),h.resize=function(){if(!this.isResizeBound||!this.needsResizeLayout())return;this.layout()},h.needsResizeLayout=function(){var e=r(this.element),t=this.size&&e;return t&&e.innerWidth!==this.size.innerWidth},h.addItems=function(e){var t=this._itemize(e);return t.length&&(this.items=this.items.concat(t)),t},h.appended=function(e){var t=this.addItems(e);if(!t.length)return;this.layoutItems(t,!0),this.reveal(t)},h.prepended=function(e){var t=this._itemize(e);if(!t.length)return;var n=this.items.slice(0);this.items=t.concat(n),this._resetLayout(),this._manageStamps(),this.layoutItems(t,!0),this.reveal(t),this.layoutItems(n)},h.reveal=function(e){this._emitCompleteOnItems("reveal",e);if(!e||!e.length)return;var t=this.updateStagger();e.forEach(function(e,n){e.stagger(n*t),e.reveal()})},h.hide=function(e){this._emitCompleteOnItems("hide",e);if(!e||!e.length)return;var t=this.updateStagger();e.forEach(function(e,n){e.stagger(n*t),e.hide()})},h.revealItemElements=function(e){var t=this.getItems(e);this.reveal(t)},h.hideItemElements=function(e){var t=this.getItems(e);this.hide(t)},h.getItem=function(e){for(var t=0;t<this.items.length;t++){var n=this.items[t];if(n.element==e)return n}},h.getItems=function(e){e=i.makeArray(e);var t=[];return e.forEach(function(e){var n=this.getItem(e);n&&t.push(n)},this),t},h.remove=function(e){var t=this.getItems(e);this._emitCompleteOnItems("remove",t);if(!t||!t.length)return;t.forEach(function(e){e.remove(),i.removeFrom(this.items,e)},this)},h.destroy=function(){var e=this.element.style;e.height="",e.position="",e.width="",this.items.forEach(function(e){e.destroy()}),this.unbindResize();var t=this.element.outlayerGUID;delete l[t],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},c.data=function(e){e=i.getQueryElement(e);var t=e&&e.outlayerGUID;return t&&l[t]},c.create=function(e,t){var n=p(c);return n.defaults=i.extend({},c.defaults),i.extend(n.defaults,t),n.compatOptions=i.extend({},c.compatOptions),n.namespace=e,n.data=c.data,n.Item=p(s),i.htmlInit(n,e),u&&u.bridget&&u.bridget(e,n),n};var d={ms:1,s:1e3};return c.Item=s,c}),function(e,t){typeof define=="function"&&define.amd?define(["outlayer/outlayer","get-size/get-size"],t):typeof module=="object"&&module.exports?module.exports=t(require("outlayer"),require("get-size")):e.Masonry=t(e.Outlayer,e.getSize)}(window,function(t,n){var r=t.create("masonry");return r.compatOptions.fitWidth="isFitWidth",r.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var e=0;e<this.cols;e++)this.colYs.push(0);this.maxY=0},r.prototype.measureColumns=function(){this.getContainerWidth();if(!this.columnWidth){var e=this.items[0],t=e&&e.element;this.columnWidth=t&&n(t).outerWidth||this.containerWidth}var r=this.columnWidth+=this.gutter,i=this.containerWidth+this.gutter,s=i/r,o=r-i%r,u=o&&o<1?"round":"floor";s=Math[u](s),this.cols=Math.max(s,1)},r.prototype.getContainerWidth=function(){var e=this._getOption("fitWidth"),t=e?this.element.parentNode:this.element,r=n(t);this.containerWidth=r&&r.innerWidth},r.prototype._getItemLayoutPosition=function(e){e.getSize();var t=e.size.outerWidth%this.columnWidth,n=t&&t<1?"round":"ceil",r=Math[n](e.size.outerWidth/this.columnWidth);r=Math.min(r,this.cols);var i=this._getColGroup(r),s=Math.min.apply(Math,i),o=i.indexOf(s),u={x:this.columnWidth*o,y:s},a=s+e.size.outerHeight,f=this.cols+1-i.length;for(var l=0;l<f;l++)this.colYs[o+l]=a;return u},r.prototype._getColGroup=function(e){if(e<2)return this.colYs;var t=[],n=this.cols+1-e;for(var r=0;r<n;r++){var i=this.colYs.slice(r,r+e);t[r]=Math.max.apply(Math,i)}return t},r.prototype._manageStamp=function(e){var t=n(e),r=this._getElementOffset(e),i=this._getOption("originLeft"),s=i?r.left:r.right,o=s+t.outerWidth,u=Math.floor(s/this.columnWidth);u=Math.max(0,u);var a=Math.floor(o/this.columnWidth);a-=o%this.columnWidth?0:1,a=Math.min(this.cols-1,a);var f=this._getOption("originTop"),l=(f?r.top:r.bottom)+t.outerHeight;for(var c=u;c<=a;c++)this.colYs[c]=Math.max(l,this.colYs[c])},r.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var e={height:this.maxY};return this._getOption("fitWidth")&&(e.width=this._getContainerFitWidth()),e},r.prototype._getContainerFitWidth=function(){var e=0,t=this.cols;while(--t){if(this.colYs[t]!==0)break;e++}return(this.cols-e)*this.columnWidth-this.gutter},r.prototype.needsResizeLayout=function(){var e=this.containerWidth;return this.getContainerWidth(),e!=this.containerWidth},r});