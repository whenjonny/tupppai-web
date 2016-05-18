define(['tpl!app/views/personal/processing/processing.html'],
    function (template) {
        "use strict";
        
        return window.app.view.extend({
            tagName: 'div',
            className: 'loading aniFadeInUp',
            template: template,
        });
    });


