define(["app/views/hot/list/index"],function(e){"use strict";return function(){var t=["_content"],n=window.app.render(t),r=new window.app.collection;r.url="/v2/populars";var i=new e({collection:r});window.app.show(n._content,i)}});