<?php
date_default_timezone_set("PRC");
$env    = 'local';
$code   = date("YmdHis");

if($argc >= 2) {
    $env = $argv[1];
}

?>

<!DOCTYPE html>
<html>
<head> 
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="图派">
    <meta name="keywords" content="PS,社区">
    <!-- wb -->
    <meta property="wb:webmaster" content="cd0d265f8e3e0cb0" /> 
    <html xmlns:wb="http://open.weibo.com/wb">
    <!-- h5  -->
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="icon" href="/img/favicon.ico" type="image/x-icon" /> 
 
    <!-- plugin -->
    <link rel="stylesheet" type="text/css" href="/res/fancybox/jquery.fancybox.css" >
    <link rel="stylesheet" type="text/css" href="/res/face-selector/face-selector.css">

    <!-- css -->
    <script>
        var require = {
            urlArgs : "v=<?php echo $code; ?>"
        };
    </script>    

    <!-- 生成css集合 -->
    <?php if($env == 'production') { ?>
        <link rel="stylesheet" type="text/css" href="/css/main.css?<?php echo $code; ?>"  >
        <!-- 合并后的js文件在script-build/src -->
        <script data-main="res/main" src="/res/lib/require/require.js"></script>
        <script src="/res/lib/pingpp/pingpp.js"></script>
        <script src="/res/lib/payWeixin/ap.js"></script>
    <?php } else { ?> 
        <link rel="stylesheet" type="text/css" href="/css/homepage.css"  >
        <link rel="stylesheet" type="text/css" href="/css/index.css">
        <link rel="stylesheet" type="text/css" href="/css/common.css">
        <link rel="stylesheet" type="text/css" href="/css/commonNew.css">
        <link rel="stylesheet" type="text/css" href="/css/ask.css">
        <link rel="stylesheet" type="text/css" href="/css/trend.css"  >
        <link rel="stylesheet" type="text/css" href="/css/activity.css"  >
        <link rel="stylesheet" type="text/css" href="/css/replydetailplay.css"  >
        <link rel="stylesheet" type="text/css" href="/css/channel.css"  >
        <link rel="stylesheet" type="text/css" href="/css/setting.css"  >
        <link rel="stylesheet" type="text/css" href="/css/message.css" >
        <link rel="stylesheet" type="text/css" href="/css/search.css"  >
        <link rel="stylesheet" type="text/css" href="/css/money.css"  >
        <!-- 未合并后的js文件在src/src -->
        <script src="/src/lib/pingpp/pingpp.js"></script>
        <script src="/src/lib/payWeixin/ap.js"></script>
        <script data-main="src/main" src="/src/lib/require/require.js"></script>
        
    <?php } ?>



    <!--[if IE]>
         <script src="/res/lib/respond/respond.js" ></script>
         <script src="/res/lib/es5/es5-sham.js" ></script>
         <script src="/res/lib/mediaqueries/css3-mediaqueries.js" ></script>
         <script src="/res/lib/PIE/PIE.js" ></script>
    <![endif]--> 
    <title>图派</title>
</head> 
 
<body>
    <div class="container">

        <!-- header nav  -->
        <div class="header-container">
            <div  class="header-back">
                <div class="header-block"></div>
               <div id="headerView"></div>
            </div>
        </div>
        <div class="header"> 
            <div class="width-hide">
                <i class="scrollTop-icon clearfix bg-sprite-new blo"></i>
                
                <a href="#login-popup" class="login-popup  hide login-popup-hide">
                    <i class="askForP-icon clearfix bg-sprite-new ">
                        <em class="ask-explain blo">点击↓</em>
                    </i>
                </a>    
                <div id="askReplyUploadHove" class="ask-uploading-popup-hide blo">
                    <i class="askForP-icon clearfix bg-sprite-new" ></i>
                    <div class="login-popup-contain clearfix">
                        <div id="attrChannelId" class="login-demand-p">
                             <a href="#ask-uploading-popup" class="ask-uploading-popup">
                                <i class="bg-sprite-rebirth demand-icon upload-ask"></i>
                                <span>发布求P</span>
                            </a>
                        </div>
                        <div class="login-upload">
                            <a href="#inprogress-popup" class="inprogress-popup">
                                <i class="bg-sprite-rebirth upload-icon"></i>
                                <span>上传作品</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="title-bar">  
                <div class="menu-bar">
                    <div class="menu-bar-area">
             <!--        <wb:share-button appkey="1211791030" addition="number" type="button" pic="http%3A%2F%2F7u2spr.com1.z0.glb.clouddn.com%2F20151220-2113405676a984bf170.png" ralateUid="5738008040" default_text="你好"></wb:share-button> -->
                 
                        <a class="menu-bar-item tupai-index" href="/#index">首页</a>
                        <a class="menu-bar-item menu-bar-trend login-popup" href="/#trend">动态</a>
                        <a class="menu-bar-item " href="/#channel">频道</a>
                        <!-- <a class="menu-bar-item reply-index" href="/#replyflows">作品</a> -->
                        <a class="menu-bar-item" href="/bbs">讨论</a>
                        <div class="menu-search">
                            <input type="text" id="keyword" placeHolder="搜索用户/内容">
                            <a class="menu-bar-search"><i class="search-icon bg-sprite-new"></i></a>

                            <div class="search-content">
                                <div class="search-header">
                                    <i class="triangle-icon bg-sprite-new"></i>
                                    <b class="correlation">相关用户</b>
                                    <i class="more-icon  bg-sprite-new" id="more-user" ></i>
                                </div>

                                <div class="search-user" id="search_users">
                                </div>       

                                <div class="search-header-middle">
                                    <b class="correlation">相关内容</b>
                                    <i class="more-icon bg-sprite-new nav" id="more-thread"></i>
                                </div>

                                <div class="correlation-list" id="search_threads">
                                </div>

                                <a href="javascript:void(0);" class="look-more-icon">
                                        <div class="look-content">
                                        查看全部搜索结果
                                        <i class="more-icon bg-sprite-new"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>        
        </div>
        <div class="inner-container" id="contentView">
        </div>  
        <div class="inner-container hide" id="modalView">
        </div>
        <div class="inner-container hide" id="loginView">
        </div>
        <div class="inner-container hide" id="registerView">
        </div>
        <div class="inner-container hide" id="forgetPasswordView">
        </div>
        <div class="inner-container hide" id="userBindingView">
        </div>
        <div class="inner-container hide" id="amendPasswordView">
        </div>
        <div class="clear"></div>        
        <div class="footer" id="footerView"></div>
    </div>   
    </body>

    <script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=de97f78883b2"></script>
	<script type="text/javascript" charset="utf-8" src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=1211791030&debug=true"></script>
    <script type="text/javascript" charset="utf-8" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101268487" data-redirecturi="http://www.tupppai.com"></script>
    
<script> 
    //百度统计
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "//hm.baidu.com/hm.js?9415cc640f8eb9775c3298cd6822119b";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
</script>
</html>
