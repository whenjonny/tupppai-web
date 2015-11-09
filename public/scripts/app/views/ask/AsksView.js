define(['imagesLoaded',
		'app/views/Base',
		'app/collections/Asks', 
		'tpl!app/templates/ask/AsksView.html'
	], function (imagesLoaded, View, Asks, template) {

        "use strict";
        
        return View.extend({
            collection: Asks,
            tagName: 'div',
            className: 'ask-container grid',
            template: template,
            events: {
                "click .download" : "download",
            },
            construct: function () {
                var self = this;
                self.listenTo(self.collection, 'change', self.render);
				//瀑布流
                self.scroll();

                self.collection.loading(function() {
                    $('.ask-main').unbind('hover').bind('mouseenter', function(){ });
                });
            },
            render: function() {
				this.renderMasonry();                
            }
        });
    });
