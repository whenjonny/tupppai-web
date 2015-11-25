define(['common', 'app/views/Base', 'tpl!app/templates/SettingView.html'],
    function (common, View, template) {
        "use strict";
        
        return View.extend({
            tagName: 'div',
            className: '',
            template: template,
            events: {
                'click .base-nav' : 'navBar',
            },
 			navBar: function(e) {
                var type = $(e.currentTarget).attr('data-type');
                    location.href = '#setting/'+ type;
               
            },
        });
    });
