define(['app/views/base', 'tpl!app/views/uploadsuccess/UploadSuccessView.html'],
    function (View, template) {
        "use strict";
        
        return View.extend({
            tagName: 'div',
            className: '',
            template: template,
            onShow: function() {
            	var dataUser = $("body").attr("data-user");
            	$("#dataUser").html(dataUser);
            	$("#dataTime").html(dataUser*10+"分钟");

            }
        });
    });