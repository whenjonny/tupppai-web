define('app/router', [ 'marionette' ], function (Marionette) {
    'use strict';

    var routes = [];
    var controllers = [];
    routes['*action'] = 'action';
    controllers['action'] = function (action) {
        if(type == 'hash') 
            var url = location.hash.substr(1);
        else 
            var url = location.pathname.substr(baseUri.length + '/'.length);
        var paths = url.split('/');

        if(paths.length == 1)
            url += '/index';
        if(paths[0] == '')
            url = 'index/index';

        require(['app/controllers/'+url], function (controller) {
            controller();
        });
    }

    return Marionette.AppRouter.extend({
        appRoutes: routes,
        controller: controllers
    });
});
