define([
        'app/views/Base', 
        'app/collections/Replies',
        'app/collections/Asks',
        'app/collections/Inprogresses', 
        'tpl!app/templates/homepage/HomeHeadView.html',
        'app/views/homepage/HomeReplyView',
        'app/views/homepage/HomeAskView',
        'app/views/homepage/HomeConductView',
       ],
    function (View, Replies, Asks, Inprogresses, template, HomeReplyView, HomeAskView, HomeConductView) {
        "use strict";
        
        return View.extend({
            tagName: 'div',
            className: '',
            template: template,
            events: {
                "click .menu-bar-item" : 'homeNav',
                "click .menu-nav-reply" : 'homeReply',
                "click .menu-nav-ask" : 'homeAsk',
                "click .menu-nav-conduct" : 'homeConduct',
                "click #attention" : "attention",
                "click #cancel_attention" : "cancelAttention",
                "mouseover .ask-main-pic" : "seeMore",
                "mouseleave .ask-main-pic" : "seeMore",
            },
            seeMore: function(e) {
                // if(e.type == "mouseleave") {
                //     $(e.currentTarget).children("em").stop(true).animate({
                //         width: "0"
                //     }, 200);
                // }
                // if(e.type == "mouseover") {
                //     $(e.currentTarget).children("em").stop(true).animate({
                //         width: "20px"
                //     }, 200);
                // }
            },
            initialize: function() {
                var self = this;
                this.listenTo(this.model, 'change', this.render);
            },
            onRender: function() {
                var own_id = $(".homehead-cantainer").attr("data-id");
                var uid = window.app.user.get('uid');
                
                if( own_id == uid ) {
                    $("#attention").addClass("hide");
                    $("#cancel_attention").addClass("hide");
                    $('.home-self').removeClass("hide");
                } else {
                    $('.home-others').removeClass("hide");
                    $(".reset-icon").attr("disabled", true);
                    $(".menu-nav-conduct").addClass("hide");
                }
            console.log(own_id);
            console.log(uid);
            },
            attention: function(event) {

                var el = $(event.currentTarget);
                var id = el.attr("data-id");
                $.post('user/follow', {
                    uid: id,
                    status: 1
                }, function(data) {
                    if(data.ret == 1) 
                        $(el).addClass('hide').siblings().removeClass('hide');
                });
            },
            cancelAttention: function(event) {
                var el = $(event.currentTarget);
                var id = el.attr("data-id");
                $.post('user/follow', {
                    uid: id,
                    status: 0
                }, function(data) {
                    if(data.ret == 1) 
                        $(el).addClass('hide').siblings().removeClass('hide');
                });
            },
            homeReply: function(e) {
                $("#conductCantainer").addClass('hide');
                $("#askCantainer").addClass('hide');
                $("#replyCantainer").removeClass("hide");

                var reply = new Replies;
                var homeReplyCantainer = new Backbone.Marionette.Region({el:"#replyCantainer"});
                var reply_view = new HomeReplyView({
                    collection: reply
                });
                homeReplyCantainer.show(reply_view);
            },
            homeConduct: function(e) {
                $("#replyCantainer").addClass('hide');
                $("#askCantainer").addClass('hide');
                $("#conductCantainer").removeClass("hide");

                var inprogress = new Inprogresses;
                var conductCantainer = new Backbone.Marionette.Region({el:"#conductCantainer"});
                var conduct_view = new HomeConductView({
                    collection: inprogress
                });
                conductCantainer.show(conduct_view);
            },
            homeAsk: function(e) {
                $("#conductCantainer").addClass('hide');
                $("#replyCantainer").addClass('hide');
                $("#askCantainer").removeClass("hide");

                var ask = new Asks;
                var askCantainer = new Backbone.Marionette.Region({el:"#askCantainer"});
                var ask_view = new HomeAskView({
                    collection: ask
                });
                askCantainer.show(ask_view);   
            },
            homeNav : function(e) {
                $(e.currentTarget).addClass("active").siblings().removeClass("active");

                var type = $(e.currentTarget).attr('data-type');
                var id = $(e.currentTarget).attr('data-id');
            },
        });
    });
