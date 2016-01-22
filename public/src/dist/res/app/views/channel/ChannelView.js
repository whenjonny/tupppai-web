define(["app/views/Base","superSlide","app/models/Activity","app/collections/Asks","app/collections/Tags","app/collections/Channels","app/collections/Replies","app/collections/Activities","app/views/channel/ChannelFoldView","app/views/channel/ChannelWorksView","app/views/channel/ActivityView","app/views/channel/ActivityIntroView","app/views/channel/ChannelDemandView","app/views/channel/AskChannelView","app/views/channel/AskChannelFlowsView","app/views/tag/TagView","tpl!app/templates/channel/ChannelView.html"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m){"use strict";return e.extend({template:m,events:{"click .header-nav":"allHandle","click .fold-icon":"ChannelFold","click .pic-icon":"ChannelPic","click .activitHide":"channelOrActivity","click #check_more":"checkMore","click .super-like":"superLike","click .weixinPay":"weixinPay","click .download":"download"},weixinPay:function(){var e=document.getElementById("amount").value*1e3,t="alipay_wap",n="ping/pay",r=new XMLHttpRequest;r.open("POST",n,!0),r.setRequestHeader("Content-type","application/json"),r.send(JSON.stringify({channel:t,amount:e})),r.onreadystatechange=function(){r.readyState==4&&r.status==200&&(console.log(r.responseText),pingpp.createPayment(r.responseText,function(e,t){console.log(e),console.log(t)}))}},initialize:function(){$(".header-back").addClass("height-reduce");var e=new i,t=new Backbone.Marionette.Region({el:"#tagGroup"}),n=new v({collection:e});t.show(n)},checkMore:function(){$("#multiclassContentShowView").empty();var e=$(".bgc-change").attr("data-id");$("#multiclassConainerView").addClass("hide"),$("#allAskConainerView").removeClass("hide");var t=new r;t.data.width=300,t.data.category_id=e;var n=new Backbone.Marionette.Region({el:"#allAskContentShowView"}),i=new d({collection:t});i.collection.reset(),i.collection.loading(),this.scroll(i),n.show(i)},channelOrActivity:function(e){$("#askContainerView").addClass("hide"),$("#askContentShowView").empty(),$("#replyContainerView").addClass("hide"),$("#replyContentShowView").empty(),$("#activityConainerView").addClass("hide"),$("#activityContentShowView").empty(),$("#multiclassConainerView").addClass("hide"),$("#multiclassContentShowView").empty(),$("#askflowsShow").empty(),$("#allAskConainerView").addClass("hide"),$("#allAskContentShowView").empty();var t=this,i=$(e.currentTarget).attr("data-type"),s=$(e.currentTarget).attr("data-id");if(i=="channel"){$("#multiclassConainerView").removeClass("hide"),$(".ask-uploading-popup-hide").removeClass("hide"),$(".fold-icon").click();var u=new r;u.data.size=6,u.data.category_id=s,u.data.page=0;var a=new Backbone.Marionette.Region({el:"#channelDemand"}),d=new h({collection:u});a.show(d),setTimeout(function(){$(".ask-uploading-popup-hide, .ask-explain").removeClass("blo")},500),setTimeout(function(){$(".ask-explain").addClass("blo")},5e3),$(".fold-icon").css({backgroundPosition:"-155px -528px"}).siblings(".pic-icon").css({backgroundPosition:"-155px -501px"})}if(i=="activity"){$("#activityConainerView").removeClass("hide");var v=new n;v.url="/activities/"+s,v.fetch();var m=new Backbone.Marionette.Region({el:"#activityIntro"}),d=new c({model:v});m.show(d);var g=$(e.currentTarget).attr("activity-href");$(".attr-href").attr("href",g);var y=$(e.currentTarget).attr("data-src");$(".channel-big-pic img").attr("src",y);var b=new o;b.data.category_id=s,b.data.size=15,b.data.page=0;var w=new Backbone.Marionette.Region({el:"#activityContentShowView"}),E=new l({collection:b});E.collection.reset(),E.collection.loading(),t.scroll(E),w.show(E)}if(i=="ask"){$("#askContainerView").removeClass("hide");var S=0;$("#attrChannelId").attr("data-id",S),$(".login-upload").attr("data-id",S);var u=new r;u.data.size=15,u.data.page=0;var x=new Backbone.Marionette.Region({el:"#askContentShowView"}),T=new p({collection:u});T.collection.reset(),T.collection.loading(),t.scroll(T),x.show(T),setTimeout(function(){$(".ask-uploading-popup-hide, .ask-explain").removeClass("blo")},500),setTimeout(function(){$(".ask-explain").addClass("blo")},5e3)}if(i=="reply"){$("#replyContainerView").removeClass("hide");var S=0;$("#attrChannelId").attr("data-id",S),$(".login-upload").attr("data-id",S);var b=new o,N=new Backbone.Marionette.Region({el:"#replyContentShowView"}),C=new f({collection:b});C.collection.reset(),C.collection.data.size=6,C.collection.data.page=0,C.collection.loading(),t.scroll(C),N.show(C),setTimeout(function(){$(".ask-uploading-popup-hide, .ask-explain").removeClass("blo")},500),setTimeout(function(){$(".ask-explain").addClass("blo")},5e3)}},allHandle:function(e){$(".header-back").addClass("height-reduce"),$(".channel-header").find(".header-nav").removeClass("bgc-change"),$(e.currentTarget).addClass("bgc-change");var t=$(e.currentTarget).attr("data-id"),n=$(e.currentTarget).attr("data-type");$("#attrChannelId").attr("data-id",t),$(".login-upload").attr("data-id",t),$(".pic-icon").css({backgroundPosition:"-128px -501px"}).siblings(".fold-icon").css({backgroundPosition:"-127px -528px"})},ChannelFold:function(e){var t=$(".bgc-change").attr("data-id"),n=$(".bgc-change").attr("data-type");$("#multiclassContentShowView").empty(),setTimeout(function(){var n=new s;n.data.size=6,n.data.type="replies",n.data.page=0,n.data.category_id=t;var r=new Backbone.Marionette.Region({el:"#multiclassContentShowView"}),i=new a({collection:n});i.scroll(i),i.collection.reset(),i.collection.loading(),r.show(i),$(e.currentTarget).css({backgroundPosition:"-155px -528px"}).siblings(".pic-icon").css({backgroundPosition:"-155px -501px"});var o=$(".user-message").attr("data-id");o?($(".login-popup-hide").addClass("hide"),$(".ask-uploading-popup-hide").removeClass("hide")):($(".ask-uploading-popup-hide").addClass("hide"),$(".login-popup-hide").removeClass("hide"))},100)},ChannelPic:function(e){$("#multiclassContentShowView").empty();var t=$(".bgc-change").attr("data-id"),n=$(".bgc-change").attr("data-type");if(n=="channel"){$("#multiclassConainerView").removeClass("hide");var r=new o,i=new Backbone.Marionette.Region({el:"#multiclassContentShowView"}),s=new f({collection:r});s.collection.reset(),s.collection.data.category_id=t,s.collection.data.size=15,s.collection.data.page=0,s.collection.loading(),s.scroll(s),i.show(s),$(e.currentTarget).css({backgroundPosition:"-128px -501px"}).siblings(".fold-icon").css({backgroundPosition:"-127px -528px"})}}})});