define(["app/collections/Base","app/models/Message"],function(e,t){return e.extend({model:t,url:"/messages",initialize:function(){this.data={type:"normal",page:0,size:10}}})});