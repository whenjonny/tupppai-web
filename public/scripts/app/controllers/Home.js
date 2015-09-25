define(['underscore', 'app/models/User', 'app/modules/HomeModule'],
    function (_, User, HomeModule) {
        "use strict";

        return function(uid) {
            var user = new User;
            user.url = 'users/' + uid;
            var homeModule   = new HomeModule({model: user});
            user.fetch();

            window.app.home.$el.show();
            window.app.home.show(homeModule);
        };
    });
