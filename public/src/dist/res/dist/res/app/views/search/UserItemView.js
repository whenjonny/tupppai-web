define(["app/views/Base","app/collections/Users","tpl!app/templates/search/UserItemView.html"],function(e,t,n){"use strict";return e.extend({tagName:"div",className:"",template:n,collection:t,events:{"click #attention":"attention"},construct:function(){this.listenTo(this.collection,"change",this.render),this.collection.loading()},attention:function(e){var t=$(e.currentTarget),n=t.attr("data-id");$.post("user/follow",{uid:n},function(t){t.ret==1&&$(e.currentTarget).addClass("hide").siblings().removeClass("hide")})}})});