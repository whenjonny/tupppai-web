define(["marionette","imagesLoaded","masonry","app/models/Base"],function(e,t,n,r){"use strict";return e.ItemView.extend({initialize:function(){$(window).unbind("scroll"),this.construct(),$(window).scroll(function(){var e=$(window).scrollTop();e>700?$(".scrollTop-icon").fadeIn(1e3):$(".scrollTop-icon").fadeOut(1e3)}),$(".ask-uploading-popup-hide").addClass("blo")},scrollTop:function(){$("html, body").animate({scrollTop:"0"},200)},onRender:function(){this.loadImage()},loadImage:function(){var e=t(".is-loading",function(){});e.on("progress",function(e,t){t.isLoaded&&setTimeout(function(){t&&(t.img.parentNode.className="",$(t.img).css("opacity",0),$(t.img).animate({opacity:1},300))},400)});var n=t(".center-loading",function(){});n.on("progress",function(e,t){if(t.isLoaded){var n=t.img.width,r=t.img.height,i=n/r,s=$(t.img).parents(".center-loading-image-container"),o=$(s)[0].offsetWidth,u=$(s)[0].offsetHeight,a=0,f=0,l=0,c=0;r>=u&&n>=o?n/r>=o/u?(f=u,a=n*u/r,l=(o-a)/2,c=0):(a=o,f=r*o/n,l=0,c=(u-f)/2):n<=o&&r<=u?i>o/u?(f=u,a=n*u/r,c=0,l=(n-a)/2):(a=o,f=r*o/n,l=0,c=(r-f)/2):n<=o&&r>u?(a=o,f=r*o/n,c=(r-f)/2,l=0):n>o&&r<=u&&(f=u,a=i*u,l=(n-a)/2,c=0),$(t.img).css("left",l),$(t.img).css("top",c),$(t.img).width(a),$(t.img).height(f)}})},page:function(){},download:function(e){var t=$(e.currentTarget).attr("data-type"),n=$(e.currentTarget).attr("data-id"),r=$(e.currentTarget).attr("category-id");if(r=="undefine")var r=0;$.get("/record?type="+t+"&target="+n+"&category_id="+r,function(e){parse(e),console.log(e);if(e.ret==1){var e=e.data,t=e.url;_.each(t,function(e){location.href="/download?url="+e,console.log(location.href)}),toast("已下载该图片，到进行中处理")}})},render:function(){if(!this.collection&&!this.model){var e=$(this.el),t=this.template;append(e,t())}else if(this.collection){var e=$(this.el),t=this.template;this.collection.each(function(n){append(e,t(n.toJSON()))})}else if(this.model){var e=$(this.el),t=this.template;$(this.el).html(t(this.model.toJSON()))}this.onRender()},scroll:function(e){var t=this;$(window).scroll(function(){var n=$(window).height(),r=$(document.body).height(),i=$(window).scrollTop();(r-n-i)/n<.15&&(e&&(t=e),t.collection.loading(function(e){}))})},msnry:null,renderMasonry:function(){var e=this,t=this.template,r=this.el;if(this.collection.length!=0){var i="";for(var s=0;s<this.collection.models.length;s++)i+=t(this.collection.models[s].toJSON());var o=$(i);o.hide(),$(r).append(o),o.imagesLoaded().progress(function(t,r){var i=$(r.img).parents(".grid-item");e.msnry=new n(".grid",{itemSelector:".grid-item",isAnimated:!0,animationOptions:{duration:750,easing:"linear",queue:!1}}),i.fadeIn(400)})}},superLike:function(e){var t=$(e.currentTarget).attr("data-love"),n=$(e.currentTarget).attr("data-id"),r=$(e.currentTarget).find(".like-count"),i=2;t++;if(t>3)return toast("点满三次了,不能在点击了亲!"),!1;t--,$.get("/love",{id:n,num:t,type:2},function(n){if(n.ret!=1)var n=parse(n);else t++,t==1&&($(e.currentTarget).attr("data-love",t),$(e.currentTarget).find(".bg-sprite-rebirth").removeClass("like-icon").addClass("like-icon-one"),$(e.currentTarget).addClass("liked"),$(e.currentTarget).find(".like-count").toggleClass("like-color"),r.text(Number(r.text())+1)),t==2&&($(e.currentTarget).attr("data-love",t),$(e.currentTarget).find(".bg-sprite-rebirth").removeClass("like-icon-one").addClass("like-icon-two"),$(e.currentTarget).find(".like-count").toggleClass("like-color"),r.text(Number(r.text())+1)),t==3&&($(e.currentTarget).attr("data-love",t),$(e.currentTarget).find(".bg-sprite-rebirth").removeClass("like-icon-two").addClass("like-icon-three"),$(e.currentTarget).addClass("liked"),$(e.currentTarget).find(".like-count").toggleClass("like-color"),r.text(Number(r.text())+1))})},collectToggle:function(e){var t=$(e.currentTarget).hasClass("collected")?-1:1,n=$(e.target).attr("data-id"),i=$(e.target).attr("data-type"),s=new r({id:n,type:1,status:t});s.url="/collect",s.save(null,function(){$(e.currentTarget).toggleClass("collected"),$(e.currentTarget).siblings(".collection-count").toggleClass("collection-color");var n=$(e.currentTarget).siblings(".collection-count");n.text(Number(n.text())+t)})},construct:function(){}})});