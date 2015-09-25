define(['app/models/Base'], function(Model) {
    return Model.extend({
        url: '/users',
        defaults: {
            uid: 0,
            username: "",
            nickname: "",
            phone: "",
            sex: 0,
            avatar: "",
            uped_count: 0,
            current_score: 0,
            paid_score: 0,
            total_praise: 0,
            location: "",
            province: 0,
            city: 0,
            bg_image: null,
            status: 0,
            is_bound_weixin: 0,
            is_bound_qq: 0,
            is_bound_weibo: 0,
            fans_count: 0,
            fellow_count: 0,
            ask_count: 0,
            reply_count: 0,
            inprogress_count: 0,
            collection_count: 0
        },
        construct: function() {

        }
    });
}); 
