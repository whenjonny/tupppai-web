define(['app/views/Base', 'app/models/Like', 'app/collections/Replies', 'tpl!app/templates/HotItemView.html'],
         
    function (View, Like, Replies, template) {
        "use strict";
        
        return View.extend({
            collection: Replies,
            tagName: 'div',
            className: 'photo-container',
            template: template,
            events: {
                'click .like_toggle' : 'replyLikeToggle',
                "click .photo-item-reply" : "photoShift",
            },
            // 求助图片切换
            photoShift: function(e) {
                 var AskSmallUrl = $(e.currentTarget).find('img').attr("src");
                 var AskLargerUrl = $(e.currentTarget).prev().find('img').attr("src");
                 $(e.currentTarget).prev().find('img').attr("src",AskSmallUrl);
                 $(e.currentTarget).find('img').attr("src",AskLargerUrl);
       
                 var replace = $(e.currentTarget).find('.bookmark');
                 var attr = replace.text();
                 if(attr == '原图') {
                    replace.text('作品');
                 } else {
                    replace.text('原图');
                 } 
                  
            },
            replyLikeToggle: function(e) {
                var value = 1;
                if( $(e.currentTarget).hasClass('icon-like-large') ){
                    value = -1;
                }

                var id = $(e.target).attr('data-id');
                var like = new Like({
                    id: id,
                    type: 2,
                    status: value 
                });

                like.save(function(){

                    $(e.currentTarget).toggleClass('icon-like-large');
                    $(e.currentTarget).siblings('.actionbar-like-count').toggleClass('icon-like-color');

                    var likeEle = $(e.currentTarget).siblings('.actionbar-like-count');
                    var linkCount = likeEle.text( Number(likeEle.text())+value );
                });
            },
   
            construct: function () {
                var self = this;
                self.listenTo(self.collection, 'change', self.render);

                self.scroll();
                self.collection.loadMore();
            },
            scroll: function() {
                var self = this;
                //页面滚动监听 进行翻页操作
                $(window).scroll(function() {
                    //页面可视区域高度
                    var windowHeight = $(window).height();
                    //总高度
                    var pageHeight   = $(document.body).height();
                    //滚动条top
                    var scrollTop    = $(window).scrollTop();
                
                    if ((pageHeight-windowHeight-scrollTop)/windowHeight < 0.15) {
                        //todo: 增加加载中...
                        self.collection.loadMore();
                    }
                });
            },
            render: function() {
                var el = this.el;
                var template = this.template;
                this.collection.each(function(model){
                    append(el, template(model.toJSON()));
                });
                this.onRender(); 
            }
        });
    });
