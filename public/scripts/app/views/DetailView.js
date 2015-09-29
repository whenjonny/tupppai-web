define(['app/views/Base','tpl!app/templates/DetailView.html'],
	function(View, template) {
		"use strict"

		return View.extend({
			tagName: 'div',
			className: '',
			template: template,
			construct: function() {
				var self = this;
				this.listenTo(this.model, 'change', this.render);
			}
		})
	})
