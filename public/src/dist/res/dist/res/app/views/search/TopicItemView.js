define(["app/views/Base","app/collections/Topics","tpl!app/templates/search/TopicItemView.html"],function(e,t,n){"use strict";return e.extend({tagName:"div",className:"",template:n,collection:t,construct:function(){var e=this;this.listenTo(this.collection,"change",this.render),e.collection.loading(e.showEmptyView)}})});