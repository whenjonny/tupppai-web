define(["app/views/Base","tpl!app/templates/channel/ChannelDemandView.html"],function(e,t){"use strict";return e.extend({tagName:"div",className:"father-grid",template:t,events:{"mouseover .demmand-contain":"channelDemmand","mouseleave .demmand-contain":"channelDemmand"},channelDemmand:function(e){e.type=="mouseover"&&$(e.currentTarget).find(".demmand-position-top").fadeIn(1e3),e.type=="mouseleave"&&$(e.currentTarget).find(".demmand-position-top").stop(!0,!0).fadeOut(1e3)},construct:function(){this.listenTo(this.collection,"change",this.render),this.collection.loading()}})});