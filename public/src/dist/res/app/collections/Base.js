define(["backbone","underscore"],function(e,t){return e.Collection.extend({data:{page:0,size:10},initialize:function(){this.data={page:0,size:15}},post:function(e){var t=this;$.post(t.url,t.data,function(n){var n=t.parse(n);t.trigger("change"),e&&e(n)})},parse:parse,plock:!1,lock:function(){return this.plock!=this._listenerId?(this.plock=this._listenerId,!1):!0},unlock:function(e){this.plock=!1},fetch:function(e){var n=this;if(n.lock())return!0;e=e?t.clone(e):{},n.page?n.data.page=n.page:n.data.page++,e.data=n.data,e.parse===void 0&&(e.parse=!0);var r=e.success;return e.success=function(e,t,n){var i=n.update?"update":"reset";e[i](t,n),r&&r(e,t,n)},this.sync("read",this,e)},loading:function(e){var t=this;this.fetch({success:function(n){t.unlock(n),t.trigger("change"),e&&e(n)}})},paging:function(e,t){this.fetch({page:e,callback:t})}})});