 define([ 
        'app/views/Base',
        'app/models/User',
        'app/collections/Channels',
        'app/collections/Replies',
        'app/collections/Activities',
        'app/views/channel/ChannelFoldView',
        'app/views/channel/ChannelWorksView',
        'app/views/channel/ActivityView',
        'app/views/channel/ActivityIntroView',
        'tpl!app/templates/channel/ChannelView.html'
       ],
    function (View, User, Channels, Replies, Activities, ChannelFoldView, ChannelWorksView, ActivityView, ActivityIntroView, template) {

        "use strict";
        return View.extend({
            template: template,
            events: {
                "click .like_toggle" : 'likeToggleLarge',
                "mouseover .reply-main": "channelFadeIn",
                "mouseleave .reply-main": "channelFadeOut",
                "click .fold-icon": "ChannelFold",
                "click .pic-icon": "ChannelPic",
                "click .download" : "download", 
                "click .header-nav" : "colorChange", 
                "click #hot-reply" : "hotReply",
                "click .present-nav": "activityIntro",
                "mouseover .long-pic": "channelWidth",
                "mouseleave .long-pic": "channelWidth",
            },
            activityIntro:function() {
                var user = new User;
                user.url = '/users/' + 1;
                user.fetch();

                var activityIntro = new Backbone.Marionette.Region({el:"#activityIntro"});
                var view = new ActivityIntroView({
                    model: user
                });
                activityIntro.show(view);
            },
            channelWidth: function(e) {
                if(e.type == "mouseover") {
                    $(e.currentTarget).siblings(".view-details").animate({
                        width: "20px"
                    }, 500);
                }
                if(e.type == "mouseleave") {
                    $(e.currentTarget).siblings(".view-details").stop(true, true).animate({
                        width: "0px"
                    }, 500);
                }
            },

            hotReply:function() {
                setTimeout(function(){
                    $("body").scrollTop(9);
                },400);
                $("body").scrollTop(10);
            
                setTimeout(function(){
                    var activity_id = $(".bgc-change").attr("data-id");
                    var activity = new Activities;
                    var activityWorksPic = new Backbone.Marionette.Region({el:"#channelWorksPic"});
                    var view = new ActivityView({
                        collection: activity
                    });
                    view.scroll();
                    view.collection.reset();
                    view.collection.data.type = "replies";
                    view.collection.data.activity_id = activity_id;
                    view.collection.data.string = 'hot';
                    view.collection.data.size = 6;
                    view.collection.data.page = 0;
                    view.collection.loading();
                    activityWorksPic.show(view);
                    console.log(activity_id );
                },100)
            },
         
            onRender:function() {
                setTimeout(function(){
                  $(".demand-p").removeClass('hide');
                  $(".channel-works-header").removeClass('hide');
                  $(".header-nav[data-id=1001]").addClass('bgc-change');
                  $("#channelWorksPic").empty();
                },100);
            },
            colorChange: function(e) {
                $("#channelWorksPic").empty();
                $("#hot-reply").trigger("click");
                $(e.currentTarget).addClass("bgc-change").siblings(".header-nav").removeClass("bgc-change");
                var id = $(e.currentTarget).attr("data-id");
                var type = $(e.currentTarget).attr("data-type");
                if( type == "activity" ) {
                    $(".channel-activity-works").removeClass('hide');
                    $(".channel-big-pic").removeClass('hide');
                    $(".demand-p").addClass('hide');
                    $(".channel-works-header").addClass('hide');
                    $(".channel-fix").removeClass('hide');
                } else {
                    $(".channel-fix").addClass('hide');
                    $(".channel-big-pic").addClass('hide');
                    $(".channel-activity-works").addClass('hide');
                    $(".demand-p").removeClass('hide');
                    $(".channel-works-header").removeClass('hide');
                }
                    console.log(e);
                    var imgageUrl = $(e.currentTarget).attr("data-src");
                    $('.channel-big-pic img').attr("src",imgageUrl );

            },
            ChannelPic:function(e) {
                setTimeout(function(){
                    $("body").scrollTop(11);
                },500);
                $("body").scrollTop(9);

                $("#channelWorksPic").empty();
                var reply = new Replies;
                var channel_id = $(".bgc-change").attr("data-id");;

                var channelWorksPic = new Backbone.Marionette.Region({el:"#channelWorksPic"});
                var view = new ChannelWorksView({
                    collection: reply
                });
                view.scroll();
                view.collection.reset();
                view.collection.size = 10;
                view.collection.data.type = "replies";
                view.collection.data.channel_id = channel_id;
                view.collection.data.page = 0;
                view.collection.loading();
                channelWorksPic.show(view);

                $(e.currentTarget).css({
                    backgroundPosition: "-128px -501px"
                }).siblings(".fold-icon").css({
                    backgroundPosition: "-127px -528px"
                })
            },
            ChannelFold:function(e) {
                setTimeout(function(){
                    $("body").scrollTop(11);
                },500);
                $("body").scrollTop(9);
                
                $("#channelWorksPic").empty();
                var channel = new Channels;
                var channel_id = 7;

                var channelWorksFold = new Backbone.Marionette.Region({el:"#channelWorksPic"});
                var view = new ChannelFoldView({
                    collection: channel
                });

                view.scroll();
                view.collection.reset();
                view.collection.size = 10;
                view.collection.data.type = "replies";
                view.collection.data.channel_id = channel_id;
                view.collection.data.page = 0;
                view.collection.loading();
                channelWorksFold.show(view);

                $(e.currentTarget).css({
                    backgroundPosition: "-155px -528px"
                }).siblings(".pic-icon").css({
                    backgroundPosition: "-155px -501px"
                })
            },
            channelFadeIn: function(e) {
                $(e.currentTarget).css({
                    height: $(e.currentTarget).height() + "px"
                });
                $(e.currentTarget).find(".reply-works-pic").fadeOut(1500);
                $(e.currentTarget).find(".reply-artwork-pic").fadeIn(1500);
                $(e.currentTarget).siblings(".reply-footer").find(".nav-bottom").animate({
                    marginLeft: "37px"
                }, 1500);
                $(e.currentTarget).siblings(".reply-footer").find(".ask-nav").addClass("nav-pressed");
                $(e.currentTarget).siblings(".reply-footer").find(".reply-nav").removeClass("nav-pressed");
            },
            channelFadeOut: function(e) {
                $(e.currentTarget).siblings(".reply-footer").find(".nav-bottom").stop(true, true).animate({
                    marginLeft: "0"
                }, 1500);
                $(e.currentTarget).find(".reply-artwork-pic").stop(true, true).fadeOut(1500);
                $(e.currentTarget).find(".reply-works-pic").stop(true, true).fadeIn(1500);
                $(e.currentTarget).siblings(".reply-footer").find(".ask-nav").removeClass("nav-pressed");
                $(e.currentTarget).siblings(".reply-footer").find(".reply-nav").addClass("nav-pressed");
            },
        
           
        });
    });
