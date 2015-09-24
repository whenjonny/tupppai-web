var paths = [
    'marionette',
    'app/controllers/Index',
    'app/controllers/Asks',
    'app/controllers/Hots',
    'app/controllers/Download',
    'app/controllers/AskView',
    'app/controllers/Login',
];

define(paths, function (marionette) {
        'use strict';

        var routes = {};
        var controllers = {};

        for(var i = 1; i < paths.length; i ++) {
            var path = paths[i].substr('app/controllers/'.length);
            routes[path.toLowerCase()] = path;
            controllers[path] = arguments[i];
        }

        routes['*action'] = 'action';
        //extra action defined
        controllers['action'] = function (action) {
            //do nothing
            console.log(action);
        }
        //console.log(controllers);
        //console.log(routes);

        return marionette.AppRouter.extend({
            appRoutes: routes,
            controller: controllers
        });
    });
