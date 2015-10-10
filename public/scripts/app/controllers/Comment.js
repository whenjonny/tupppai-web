define([ 
        'underscore',  
        'app/models/Ask',
        'app/collections/Comments',
        'app/views/comment/CommentView', 
        'app/views/PopupView',
        'app/views/comment/CommentItemView',
        'app/views/comment/HotCommentView',
        'app/views/comment/NewCommentView',
       ],function (_, Ask, Comments, CommentView, PopupView, CommentItemView,  HotCommentView, NewCommentView) {
        "use strict";

        return function(type, id) {
            var ask = new Ask;
            ask.url = '/asks/'+id;
            ask.fetch();

            var hot_comments = new Comments;
            hot_comments.url = '/comments?target_type=hot';

            var new_comments = new Comments;
            new_comments.url = '/comments?target_type=new';

            if( type == 'ask') {
                var type = 1;
            }else {
                var type = 2;
            }
            hot_comments.fetch({
                data: {type: type, target_id: id},
                success: function(data) {
                    //hot_comments.trigger('change');
                    if( !data ) {
                        $('.comment-hot-title').removeClass('hide');
                    }
                }
            });         

            new_comments.fetch({
                data: {type: type, target_id: id},
                success: function(data) {
                    //new_comments.trigger('change');
                    if( data ) {
                        $('.comment-hot-content').removeClass('hide');
                    }
                }
            });

            var view = new PopupView({
                model: ask
            });
            window.app.modal.show(view);

            var view = new CommentView();
            window.app.content.show(view);

            var askRegion = new Backbone.Marionette.Region({el:"#commentItemView"});

            var hotCommentRegion = new Backbone.Marionette.Region({el:"#hotCommentView"});

            var newCommentRegion = new Backbone.Marionette.Region({el:"#newCommentView"});

            var view = new CommentItemView({
                model: ask
            });
            askRegion.show(view);

            var view = new HotCommentView({
                collection: hot_comments
            });
            hotCommentRegion.show(view);

            var view = new NewCommentView({
                collection: new_comments
            });
            newCommentRegion.show(view);
        };
    });
