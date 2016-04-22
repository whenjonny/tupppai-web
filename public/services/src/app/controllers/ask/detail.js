define(['app/views/list/index', 'app/views/ask/detail/detailView' ], 
	function (list, detailView) {
    "use strict";
    return function() {
        var sections = [ '_view'];
		var layoutView = window.app.render(sections);


        var model = new window.app.model( { value: 1 } );
        model.url=" /v2/replies/ask/1";
        var view = new detailView({
			model: model
        });
        layoutView._view.show(view);
    };
});
 