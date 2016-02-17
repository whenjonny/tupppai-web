define(["app/views/Base","app/models/Base","app/models/Ask","app/models/Reply","app/collections/Comments","tpl!app/templates/replydetailplay/ReplyDetailPlayView.html","app/views/replydetailplay/ReplyDetailPersonView","app/views/replydetailplay/ReplyDetailCommentView","app/views/replydetailplay/ReplyDetailCountView","app/views/replydetailplay/ReplyDetailActionView"],function(e,t,n,r,i,s,o,u,a,f){"use strict";return e.extend({tagName:"div",className:"",template:s,events:{"click .pic-scroll":"picScroll","click #replyDetailRight":"picScroll","click #replyDetailLeft":"picScroll","click .reply-play":"replyBlo","click #replyCommentBtn":"sendComment","mouseover .icon-add-emoji":"addEmoji","click #chaMore":"replyDetailMore"},replyDetailMore:function(){$(".reply-detail-ifo").scrollTop(204),$(".reply-detail-more").addClass("blo"),$(".reply-detail-ifo").css({overflow:"auto"})},onRender:function(){var e=$(".header-container").attr("data-reply-id");$(".center-loading-image-container[data-id="+e+"]").trigger("click")},construct:function(){this.listenTo(this.model,"change",this.render)},addEmoji:function(){$(".icon-add-emoji").emojiSelector({assign:"textInp",path:"/res/face-selector/face/"})},sendComment:function(e){var t=$(e.currentTarget).attr("data-id"),n=$(e.currentTarget).attr("data-type"),r=$("#textInp").val();if(!r||r=="")return toast("内容不能为空"),!1;$.post("/comments/save",{id:t,type:n,content:r},function(e){if(e.ret==1){$(".center-loading-image-container[data-id="+t+"]").trigger("click"),$("#textInp").val(" ");var n=$(document)}else $(".login-popup").click()})},replyBlo:function(e){$(e.currentTarget).parents(".reply-ifo").siblings(".inp-frame").removeClass("blo").parents(".user-ifo").siblings(".user-ifo").find(".inp-frame").addClass("blo");var t=$(e.currentTarget).parents(".reply-ifo").siblings(".inp-frame").find(".play-icon")[0],n=$(e.currentTarget).parents(".reply-ifo").siblings(".inp-frame").find(".play-inp").attr("name");$(t).emojiSelector({assign:n,path:"/res/lib/face-selector/face/"})},picScroll:function(e){var t=$(".pic-scroll img"),s=t.length,l=parseInt($(".detail-pic").attr("otherNum")),c=null,h=null;e.currentTarget.id=="replyDetailRight"&&(l++,l>=s-1&&(l=s-1),$(".detail-pic").attr("otherNum",l)),e.currentTarget.id=="replyDetailLeft"&&(l--,l<=0&&(l=0),$(".detail-pic").attr("otherNum",l)),$(e.currentTarget).hasClass("center-loading-image-container")&&(l=$(e.currentTarget).index(),$(".detail-pic").attr("otherNum",l)),c=t.eq(l).attr("src"),$("#bigPic").attr("src",c),t.eq(l).parents(".center-loading-image-container").addClass("change-pic").siblings(".center-loading-image-container").removeClass("change-pic"),$(".original-pic").removeClass("original-change"),l==s-1?$("#replyDetailRight").css({display:"none"}):$("#replyDetailRight").css({display:"block"}),l==0?$("#replyDetailLeft").css({display:"none"}):$("#replyDetailLeft").css({display:"block"});var p=l+1;parseInt($(".detail-pic").css("marginLeft"))==0&&(h=3),p>h&&p<s&&p>=3&&($(".detail-pic").animate({marginLeft:-90*(p-3)+"px"},400),h=p);var d=t.eq(l).parents(".center-loading-image-container").attr("data-id"),v=t.eq(l).parents(".center-loading-image-container").attr("data-type");$("#replyCommentBtn").attr("data-id",d),$("#replyCommentBtn").attr("data-type",v);if(v==2){var m=new r;m.url="/replies/"+d,m.fetch(),$("#bgIcon").addClass("other-icon").removeClass("old-icon")}if(v==1){var m=new n;m.url="/asks/"+d,m.fetch(),$("#bgIcon").addClass("old-icon").removeClass("other-icon")}var g=new i;g.url="/comments?target_type=new",g.data.type=v,g.data.target_id=d;var y=new Backbone.Marionette.Region({el:"#replyDetailPersonView"}),b=new o({model:m});y.show(b);var w=new Backbone.Marionette.Region({el:"#userIfo"}),b=new u({collection:g});w.show(b);var E=new Backbone.Marionette.Region({el:"#count"}),b=new a({model:m});E.show(b);var S=new Backbone.Marionette.Region({el:"#action"}),b=new f({model:m});S.show(b),setTimeout(function(){$(".reply-comment").height()>550?$(".reply-detail-more").removeClass("blo"):$(".reply-detail-more").addClass("blo"),$(".reply-detail-ifo").css({overflow:"hidden"})},700);var x=t.eq(l).attr("imageWidth"),T=t.eq(l).attr("imageHeight"),N=x/T,C=$("#bigPic").parents(".center-image"),k=$(C)[0].offsetWidth,L=$(C)[0].offsetHeight,A=0,O=0,M=0,_=0;T>=L&&x>=k?x/T>=k/L?(A=k,O=T*k/x,_=(L-O)/2,M=0):x/T<k/L&&(O=L,A=x*L/T,_=0,M=(k-A)/2):x<k&&T<L?N>k/L?(A=k,O=k*T/x,M=0,_=(L-O)/2):(O=L,A=x/T*L,_=0,M=(k-A)/2):x<=k&&T>=L?(O=L,A=x*L/T,M=(k-A)/2,_=0):x>=k&&T<=L&&(A=k,O=k/x*T,_=(L-O)/2,M=0),$("#bigPic").css("left",M),$("#bigPic").css("top",_),$("#bigPic").width(A),$("#bigPic").height(O),$(".other-icon").css("left",M),$(".other-icon").css("top",_+20),setTimeout(function(){$(".comment-content .border-bottom").removeClass("border-bot"),$(".border-bottom").eq($(".comment-content").find(".border-bottom").length-1).addClass("border-bot"),c=trimUrl(c),$("#bigPic").attr("src",c)},200)}})});