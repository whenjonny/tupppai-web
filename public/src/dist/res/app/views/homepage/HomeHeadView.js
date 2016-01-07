define(["app/views/Base","app/collections/Users","app/collections/Replies","app/collections/Asks","app/collections/Inprogresses","tpl!app/templates/homepage/HomeHeadView.html","app/views/homepage/HomeReplyView","app/views/homepage/HomeAskView","app/views/homepage/HomeConductView","app/views/homepage/HomeFansView","app/views/homepage/HomeAttentionView","app/views/homepage/HomeLikedView","app/views/homepage/HomeCollectionView"],function(e,t,n,r,i,s,o,u,a,f,l,c,h){"use strict";return e.extend({tagName:"div",className:"",template:s,events:{"click .menu-bar-item":"homeNav","click .menu-nav-reply":"homeReply","click .menu-nav-ask":"homeAsk","click .menu-nav-liked":"homeLiked","click .menu-nav-conduct":"homeConduct","click .menu-nav-collection":"homeCollection","click .personage-fans":"FansList","click #attention":"attention","click #cancel_attention":"cancelAttention","click .personage-attention":"attentionList","click #home-scrollTop":"scrollTop","click .super-like":"superLike","mouseenter .ask-work-pic":"homeScroll","mouseleave .ask-work-pic":"homeScroll"},homeScroll:function(e){var t=$(e.currentTarget).find(".ask-box"),n=t.length,r=$(e.currentTarget).scrollLeft(),i=$(e.currentTarget).attr("foldTime"),s=parseInt($(e.currentTarget).attr("speed")),o=n*137;$(e.currentTarget).find(".ask-main-pic").css({width:o+"px"}),e.type=="mouseenter"&&(s=1),e.type=="mouseleave"&&(s=-1),$(e.currentTarget).attr("speed",s),n>5&&(clearInterval(i),i=setInterval(function(){s=parseInt(s),r+=s,r+685>o?(clearInterval(i),r=o-685):r<0&&(clearInterval(i),r=0),$(e.currentTarget).attr("foldTime",i),$(e.currentTarget).scrollLeft(r)},8))},initialize:function(){this.listenTo(this.model,"change",this.render)},homeLiked:function(){$(".attention-nav").addClass("hide"),$(".fans-nav").addClass("hide");var e=$(".menu-nav-liked").attr("data-id"),t=new r,n=new Backbone.Marionette.Region({el:"#homeCantainer"}),i=new c({collection:t});i.scroll(),i.collection.url="/user/uped",i.collection.reset(),i.collection.data.uid=e,i.collection.data.page=0,i.collection.loading(this.showEmptyView),n.show(i)},onRender:function(){var e=$(".homehead-cantainer").attr("data-id"),t=window.app.user.get("uid");setTimeout(function(){$(".width-hide").removeClass("hide")},3e3),e==t?($("#attention").addClass("hide"),$("#cancel_attention").addClass("hide"),$(".home-self").removeClass("hide")):($(".menu-nav-collection").addClass("hide"),$(".home-others").removeClass("hide"),$(".menu-nav-conduct").addClass("hide"))},homeAsk:function(e){$(".fans-nav").addClass("hide"),$(".attention-nav").addClass("hide");var t=$(".menu-nav-reply").attr("data-id"),n=new r,i=new Backbone.Marionette.Region({el:"#homeCantainer"}),s=new u({collection:n});s.scroll(),s.collection.reset(),s.collection.data.uid=t,s.collection.data.page=0,s.collection.data.type="ask",s.collection.loading(this.showEmptyView),i.show(s)},homeReply:function(e){$(".fans-nav").addClass("hide"),$(".attention-nav").addClass("hide");var t=$(".menu-nav-reply").attr("data-id"),r=new Backbone.Marionette.Region({el:"#homeCantainer"}),i=new n,s=new o({collection:i});s.scroll(),s.collection.reset(),s.collection.data.uid=t,s.collection.data.page=0,s.collection.loading(this.showEmptyView),r.show(s)},attention:function(e){var t=$(e.currentTarget),n=t.attr("data-id");$.post("user/follow",{uid:n,status:1},function(e){e.ret==1&&$(t).addClass("hide").siblings().removeClass("hide")})},cancelAttention:function(e){var t=$(e.currentTarget),n=t.attr("data-id");$.post("user/follow",{uid:n,status:0},function(e){e.ret==1&&$(t).addClass("hide").siblings().removeClass("hide")})},attentionList:function(){var e=$(".homehead-cantainer").attr("data-id"),n=window.app.user.get("uid");e==n?($("#attention").addClass("hide"),$("#cancel_attention").addClass("hide"),$(".home-self").removeClass("hide")):($(".home-others").removeClass("hide"),$(".menu-nav-conduct").addClass("hide")),$(".fans-nav").addClass("hide"),$("#homeCantainer").empty(),$(".home-nav").children("li").removeClass("active");var n=$(".menu-nav-reply").attr("data-id"),r=new t,i=new Backbone.Marionette.Region({el:"#homeCantainer"}),s=new l({collection:r});s.scroll(),s.collection.url="/follows",s.collection.reset(),s.collection.data.uid=n,s.collection.data.page=0,s.collection.loading(this.showEmptyView),i.show(s)},FansList:function(e){var n=$(".homehead-cantainer").attr("data-id"),r=window.app.user.get("uid");n==r?($("#attention").addClass("hide"),$("#cancel_attention").addClass("hide"),$(".home-self").removeClass("hide")):($(".home-others").removeClass("hide"),$(".menu-nav-conduct").addClass("hide")),$("#homeCantainer").empty(),$(".home-nav").children("li").removeClass("active"),$(".attention-nav").addClass("hide");var r=$(".menu-nav-reply").attr("data-id"),i=new t,s=new Backbone.Marionette.Region({el:"#homeCantainer"}),o=new f({collection:i});o.scroll(),o.collection.url="/fans",o.collection.reset(),o.collection.data.uid=r,o.collection.data.page=0,s.show(o),o.collection.loading(this.showEmptyView)},homeConduct:function(e){$(".fans-nav").addClass("hide"),$(".attention-nav").addClass("hide");var t=$(".menu-nav-reply").attr("data-id"),n=new i,r=new Backbone.Marionette.Region({el:"#homeCantainer"}),s=new a({collection:n});s.scroll(),s.collection.reset(),s.collection.data.uid=t,s.collection.data.page=0,s.collection.loading(this.showEmptyView),r.show(s)},homeCollection:function(e){$(".fans-nav").addClass("hide"),$(".attention-nav").addClass("hide");var t=$(".homehead-cantainer").attr("data-id"),r=new n,i=new Backbone.Marionette.Region({el:"#homeCantainer"}),s=new h({collection:r});s.scroll(),s.collection.url="/user/collections",s.collection.reset(),s.collection.data.uid=t,s.collection.data.page=0,s.collection.loading(this.showEmptyView),i.show(s)},homeNav:function(e){$(e.currentTarget).addClass("active").siblings().removeClass("active");var t=$(e.currentTarget).attr("data-type"),n=$(e.currentTarget).attr("data-id");$(".ask-uploading-popup-hide").addClass("hide"),$("#homeCantainer").empty()},showEmptyView:function(e){$(".inner-container .emptyContentView").empty(),$(".inner-container .emptyContentView").addClass("hide"),$(".addReplyMinHeight").addClass("ReplyMinHeight"),e.data.page==1&&e.length==0&&(append($("#contentView"),".emptyContentView"),$(".addReplyMinHeight").removeClass("ReplyMinHeight"))}})});