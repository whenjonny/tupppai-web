define(["app/views/Base","tpl!app/templates/channel/ChannelNavView.html"],function(e,t){"use strict";return e.extend({tagName:"div",className:"",template:t,construct:function(){this.listenTo(this.collection,"change",this.render),this.collection.loading()}})});