define(["app/views/Base","tpl!app/templates/replydetailplay/ReplyDetailCommentView.html"],function(e,t){"use strict";return e.extend({tagName:"div",className:"",template:t,events:{"click .inp-reply":"replyComment","click .reply-cancel":"replyNone","click .reply-more":"moreScroll"},construct:function(){var e=this;this.listenTo(this.collection,"change",this.render),e.collection.loading()},replyNone:function(e){$(".inp-frame").addClass("blo")},moreScroll:function(){$(".reply-detail-ifo").scrollTop(204),$(".reply-more").addClass("blo"),$(".reply-detail-ifo").css({overflow:"auto"})},replyComment:function(e){var t=$(e.currentTarget).siblings(".play-inp"),n=t.val(),r=t.attr("reply-to"),i=t.attr("data-type"),s=t.attr("comment-id"),o=t.attr("target-id"),u="/comments/save",a={content:n,type:i,id:o,reply_to:r,for_comment:s};$.post(u,a,function(e){var t=e.info;e.ret==1&&(toast("回复评论成功"),$(".center-loading-image-container[data-id="+o+"]").trigger("click"))})}})});