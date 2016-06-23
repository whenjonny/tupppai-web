function trimUrl(e){var t=e.indexOf("?");return t!=-1&&(e=e.substring(0,t)),e}function getQueryVariable(e){var t=window.location.search.substring(1),n=t.split("&");for(var r=0;r<n.length;r++){var i=n[r].split("=");if(i[0]==e)return i[1]}return!1}function time(e){var t=Number(e)*1e3,n=(new Date).getTime(),r=Math.ceil((n-t)/1e3),i="",s=0;if(r<60)s=Math.ceil(r),i="刚刚";else if(r<3600)s=Math.ceil(r/60),i=s+"分钟前";else if(r<86400)s=Math.ceil(r/3600),i=s+"小时前";else if(r<172800)i="一天前";else if(r<259200)i="一天前";else if(r<345600)i="两天前";else if(r<432e3)i="三天前";else if(r<518400)i="四天前";else if(r<518400)i="五天前";else if(r<604800)i="六天前";else if(r<691200)i="一周前";else{var o=new Date(t),u=0,a=o.getMinutes();o.getMinutes()<10?u="0"+a:u=a,i=o.getFullYear()+"-"+(o.getMonth()+1)+"-"+o.getDate()+" ",i+=o.getHours()+":"+u}return i}function append(e,t,n){var r={time:400};for(var i in n)r[i]=n[i];var t=$(t).clone().hide();$(e).append(t),t.fadeIn(r.time)}function error(e,t,n){$("a#show-error-popup").fancybox({afterShow:function(){$(".confirm, .cancel").click(function(){$.fancybox.close(),n&&n()})},padding:0}),$("#error-popup .title").text(e),$("#error-popup .error-content").text(t),$("#show-error-popup").click()}function toast(e,t){$("a#show-toast-popup").fancybox({autoSize:!0,closeBtn:!1,helpers:{overlay:null}}),$("#toast-popup .error-content").text(e),$("#show-toast-popup").click(),setTimeout(function(){$.fancybox.close(),t&&t()},2e3)}function parse(e,t){return e.ret==0&&e.code==1&&WB2.anyWhere(function(e){e.widget.connectButton({id:"wb_login_btn",callback:{login:account.weibo_auth}}),e.widget.connectButton({id:"wb_register_btn",callback:{login:account.weibo_auth}})}),e.ret==0&&e.code==1&&this.url!="user/status"?(WB2.oauthData.access_token?$(".binding-popup").click():$(".login-popup").click(),!1):(e.ret==0&&this.url!="user/status"&&error("操作失败",e.info),e.data)}$.JSON={};var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;typeof JSON=="object"&&typeof JSON.stringify=="function"?$.JSON.stringify=JSON.stringify:$.JSON.stringify=function(e,t,n){var r;gap="",indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")},typeof JSON=="object"&&typeof JSON.parse=="function"?$.JSON.parse=JSON.parse:$.JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")};var Common=function(){var e=function(){var e=[];$.cur_log_depth=0,$.max_log_depth=3,$.post_error=function(e){},$._post=$.post,$.post=function(){$._post.apply(this,arguments)},$.fn.post=function(){$._post.apply(this,arguments)},$.time33=function(e){var t=0;for(var n=e.length-1;n>=0;n--)t=t*33+e.substr(n,n+1).charCodeAt();return t.toString(36)};var t=function(){var e=document.createElement("div");return e.id="__loading",e.className="body_loading",e.innerHTML="<img src='/theme/img/loading.gif' alt='加载中...' />",e.style.position="absolute",e.style.left="49.5%",e.style.top="64%",e.style.zIndex="9999999",e}();$._ajax=$.ajax,$.ajax=function(n){var r="";r=$.time33(n.url),(typeof n.loading=="undefined"||n.loading==1)&&$("body").append(t),n.type==undefined&&(n.type="get"),n.type.toLowerCase()!="post"&&(n.url=encodeURI(n.url)),e[r]!=null&&e[r].abort(),n.data&&n.data.start&&n.data.length&&(n.url+="&page="+n.data.start/n.data.length),e[r]=$._ajax(n).complete(function(e){if(e.readyState==0)return!1;if(n.type.toLowerCase()=="post")try{var t=$.JSON.parse(e.responseText);parse(t)}catch(r){$.cur_log_depth++<$.max_log_depth&&error("操作失败","操作失败")}else{var t=$.JSON.parse(e.responseText);t.ret==0&&t.info=="logout"&&location.reload()}$("#__loading").remove()})}},t=function(e,t,n,r){setTimeout(function(){$(e).uploadify({formData:{timestamp:(new Date).getTime(),token:(new Date).getTime()},method:"post",buttonText:'<button class="btn btn-primary">选择文件</button>',swf:"/theme/vendors/uploadify/uploadify.swf",uploader:r&&r.url?r.url:"/image/preview",queueID:"fileQueue",width:r&&r.width?r.width:"80",buttonImage:"",auto:!0,multi:!1,onUploadSuccess:function(n,r,i){t&&t($.JSON.parse(r),e)},onUploadProgress:function(e,t,n,r,i){var s=$(".pace-inactive");s.length>0&&(t==0?s.find(".pace-progress").css("width","100%"):s.hide())},onUploadStart:function(e){var t=$(".pace-inactive");t.find(".pace-progress").css("width",0),t.show(),n&&n(e)}})},10)};return{upload:t,init:function(){e()}}}();Common.init();var account={keypress:function(e){e.which==13&&$("#login_btn").click()},weibo_auth:function(e){$.get("user/auth",{openid:WB2.oauthData.uid,type:"weibo"},function(e){e.data.is_register==0?$(".binding-popup").click():location.reload()}),e.gender=="f"&&$(".option-sex .option-girl input").click(),$("#register-avatar").attr("src",e.profile_image_url),$("#register_nickname").val(e.screen_name),$("#register_nickname").attr("type","weibo"),$("#register_nickname").attr("openid",WB2.oauthData.uid),$(".login-popup").attr("href","#binding-popup"),window.app.user.uid||(window.app.user.set("avatar",e.profile_image_url),window.app.user.set("nickname",e.screen_name),window.app.user.set("uid",e.uid),$(".login-popup").attr("href","#binding-popup")),$("#binding-popup").css("display")=="none"&&$(".binding-popup").click()},login_keyup:function(){var e=$("#login_name").val(),t=$("#login_password").val();e!=""&&t!=""&&$("#login_btn").removeAttr("disabled").css("background","#F7DF68"),(e==""||t=="")&&$("#login_btn").attr("disabled",!0).css("background","#EBEBEB")},login:function(e){var t=this,n=$("#login_name").val(),r=$("#login_password").val();$.post("/user/login",{username:n,password:r},function(e,t){if(e.ret!=1)return console.log(e),!1;history.go(1),location.reload()})},register_keyup:function(){var e=$("#register_nickname").val(),t=$("#register_phone").val(),n=$("#register_password").val();e!=""&&t!=""&&n!=""&&$(".register-btn").removeAttr("disabled").addClass("bg-btn"),(e==""||t==""||n=="")&&$(".register-btn").attr("disabled",!0).removeClass("bg-btn")},register:function(e){var t=this,n=$(".boy-option").hasClass("boy-pressed"),r=1,i=$("#register-popup input[name=registerCode]").val(),s=$("#register-avatar").attr("src"),o=$("#register_nickname").val(),u=$("#register_phone").val(),a=$("#register_password").val(),f="/user/register",l={nickname:o,sex:r,mobile:u,password:a,avatar:s,code:i,type:"mobile"};$.post(f,l,function(e){e.ret!=0&&location.reload()})},bind:function(){var e=$(".boy-option").hasClass("boy-pressed"),t=e?0:1,n=$("#register-avatar").attr("src"),r=$("#register_nickname").val(),i=$("input[name=binding-phone]").val(),s=$("input[name=binding-code]").val(),o=$("input[name=binding-password]").val(),u=$("#register_nickname").attr("type"),a=$("#register_nickname").attr("openid");if(i=="")return alert("手机号不能为空"),!1;if(s=="")return alert("验证码不能为空"),!1;if(o=="")return alert("密码不能为空"),!1;var f="/user/register",l={type:u,openid:a,nickname:r,avatar:n,sex:t,mobile:i,code:s,password:o};$.post(f,l,function(e){e.ret!=0&&location.reload()})},optionSex:function(e){$(".sex-pressed").removeClass("boy-pressed").removeClass("girl-pressed"),$(e.currentTarget).addClass("boy-pressed"),$(e.currentTarget).addClass("girl-pressed")}};