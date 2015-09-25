var paths = [
    'marionette',
    'app/controllers/Index',
    'app/controllers/Asks',
    'app/controllers/Hots',
    'app/controllers/Download',
    'app/controllers/Uploading',
    'app/controllers/Popup',
    'app/controllers/Detail',
    'app/controllers/Login',
    'app/controllers/Register',
    'app/controllers/Commend',
    'app/controllers/Home',
    'app/controllers/Show',
];

define(paths, function (marionette) {
        'use strict';

        var routes = {};
        var controllers = {};

        for(var i = 1; i < paths.length; i ++) {
            var path = paths[i].substr('app/controllers/'.length);
            routes[path.toLowerCase()] = path;
            routes[path.toLowerCase() + '/:id'] = path;
            routes[path.toLowerCase() + '/:type/:id'] = path;
            controllers[path] = arguments[i];
        }

        routes['*action'] = 'action';
        //extra action defined
        controllers['action'] = function (action) {
            //do nothing
            console.log(action);
        }
        console.log(controllers);
        console.log(routes);

        return marionette.AppRouter.extend({
            appRoutes: routes,
            controller: controllers
        });
    });
