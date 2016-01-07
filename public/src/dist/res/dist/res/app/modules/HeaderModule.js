define(["marionette","fancybox","app/collections/Inprogresses","app/models/User","tpl!app/templates/HeaderView.html","app/views/upload/InprogressItemView"],function(e,t,n,r,i,s){"use strict";var o=e.ItemView.extend({model:r,tagName:"div",className:"",template:i,initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"change",this.loginArea)},loginArea:function(){if(this.model.get("uid")!=0){var e="/#trend";$("#headerView .login-view").addClass("hide"),$("#headerView .profile-view").removeClass("hide"),$(".menu-bar-trend").attr("href",e)}else{var e="#login-popup";$("#headerView .profile-view").addClass("hide"),$("#headerView .login-view").removeClass("hide"),$(".menu-bar-trend").attr("href",e)}},onRender:function(){$(".remind-message").click(function(){$(".remind-red-dot-icon").addClass("hide")}),$(".scrollTop-icon").click(function(){$("html, body").animate({scrollTop:"0"},200)}),$(".title-bar").removeClass("hide"),$("#more-user").click(function(){$(".menu-bar-user").click()}),$("#more-thread").click(function(){$(".menu-bar-thread").click()}),$(".search-icon").click(function(){var e=$("#keyword").width();e==0&&$("#keyword").animate({width:"180px"},300).focus()}),$(".inprogress-popup").click(function(){var e=new n,t=new Backbone.Marionette.Region({el:"#InprogressItemView"}),r=new s({collection:e});t.show(r),$(".ask-uploading-popup-hide").removeClass("blo")}),$("#keyword").focus(function(){var e=$("#keyword").val();e&&$(".search-content").css("opacity",1)}),$("#keyword").blur(function(){$(".search-content").css({opacity:0},300);var e=$("#keyword").val();e||$("#keyword").animate({width:"0"},300)}),$("#keyword").keypress(function(e){e.which==13&&$("a.menu-bar-search").click()}),$("#keyword").keyup(function(){var e=$("#keyword").val();e!=undefined&&e!=""?($.ajax({type:"GET",url:"search/users?size=3&keyword="+e,success:function(e){var t=$("#tpl_search_users").html(),n=Handlebars.compile(t),r={data:e.data},i=n(r);$("#search_users").html(i)}}),$.ajax({type:"GET",url:"search/threads?size=3&keyword="+e,success:function(e){var t=$("#tpl_search_threads").html(),n=Handlebars.compile(t),r={data:e.data},i=n(r);$("#search_threads").html(i)}}),$(".search-content").show()):$(".search-content").hide()}),$(".look-more-icon").click(function(){$(".search-content").hide()}),$(".look-content").unbind("click").click(function(){var e=$("#keyword").val();location.href="#search/all/"+e}),$("#more-user").unbind("click").click(function(){var e=$("#keyword").val();$(".menu-bar-item ").removeClass("active"),location.href="#search/user/"+e}),$("#more-thread").unbind("click").click(function(){var e=$("#keyword").val();$(".menu-bar-item ").removeClass("active"),location.href="#search/thread/"+e}),$("a.menu-bar-item").click(function(){$("a.menu-bar-item").removeClass("active"),$(this).addClass("active")}),$(".title-bar-logo").click(function(){$("a.menu-bar-item").removeClass("active"),$("a.menu-bar-item[href='#askFlows']").addClass("active")}),$(".return-home-page").click(function(){$("a.menu-bar-item").removeClass("active"),$("a.menu-bar-item[href='#askflows']").addClass("active")}),$("a.menu-bar-item[href='/"+location.hash+"']").addClass("active")}});return o});