<!-- header nav  -->
<div class="header-container">
    <div class="header-back">
        <div class="user-massage">
            <div class="profile-view hide">
                <ul>
                    <li class="avatar">
                        <span class="user-avatar" style="margin-top: 0;">
                            <a href="#home/ask/<%= uid %>">
                                <img src=" " alt="">
                            </a>
                        </span>
                    </li>
                    <li class="remind-message">
                        <i class="message-remind-icon bg-sprite"></i>
                        <i class="remind-red-dot-icon bg-sprite"></i>   
                    </li>
                </ul>
            </div>
             <div class="login-view hide">
                <!-- <li class="weibo"><i class="bg-sprite icon-weibo"></i>微博快速登录</li> -->
                <a href="#login-popup" class="login-popup"><li class="login">登录</li></a>
                <a href="#register-popup" class="register-popup"><li class="register">注册</li></a>
            </div>
            <ul>
                <li class="tupai">关于图派</li>
                <li class="contact-us">联系我们</li>
                <a href="/#download">
                    <li class="app-tupai">客户端</li>
                </a>
            </ul>
        </div>
        <div class="logo">
                    <div class="logo-icon bg-sprite-new"></div>
               </div>
                
               <div class="upload-btn hide">
                    <a href="#uploading-popup" class="uploading-popup">
                       <span class="upload-ask">上传求P</span>
                    </a>
                    <a href="#home/inprogress/<%= uid %>" >
                       <span class="upload-reply">上传作品</span>
                    </a>
               </div>
            </div>
    </div>
</div>
        <div class="header"> 
            <div class="title-bar">
        <!--       
                上一个版本的logi          
                <a href="#asks">
                     <div class="left">
                        <span class="title-bar-logo icon-logo bg-sprite"></span>
                    </div>
                </a> 
                -->
                <div class="menu-bar">
                    <div class="menu-bar-area">
                        <a class="menu-bar-item" href="/#index">首页</a>
                        <a class="menu-bar-item" href="/#asks">原图</a>
                        <a class="menu-bar-item" href="/#hots">作品</a>
                        <a class="menu-bar-item active" href="/bbs" style="height: 57px;">讨论</a>
                    </div>
                </div>
                <!-- 
                    上一版本的登录
                     <div class="right setting" id="headerView"></div>
                 -->
            </div>
            <div class="clear"></div>        
        </div>

<script>
    $.get('/user/status',function(ret){
        if( ret.ret == '1') {
            var src = ret.data.avatar;
            $('.user-avatar img').attr('src',src);
            $('.login-view').addClass('hide');
            $('.profile-view').removeClass('hide');
            $('.upload-btn').removeClass('hide');
           
        }else{
            $('.upload-btn').addClass('hide');
            $('.profile-view').addClass('hide');
            $('.login-view').removeClass('hide');
        }
        console.log(ret);
        console.log();
    })
</script>




<?php /*
<div id="navbar-wrapper">
<div  id="navigation" class="navbar <?php if($this->config->item('static')=='default'){?>navbar-inverse<?php } else{?>navbar-default<?php }?> navbar-fixed-top">
<div class="container">

	<div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
		<a class="navbar-brand" href="<?php echo site_url()?>"><?php echo $settings['logo'];?></a>
<!--<a class=".btn .btn-default navbar-btn collapsed" data-target=".navbar-collapse" data-toggle="collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a><a href="<?php echo site_url()?>" class="brand">Start<span class="green">BBS</span></a>-->
	</div>

        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li<?php if(@$action=='home'){?> class="active"<?php }?>><a href="<?php echo site_url()?>"><?php echo lang('front_home');?></a></li>
            <li<?php if(@$action=='node'){?> class="active"<?php }?>><a href="<?php echo site_url('node')?>">节点</a></li>
            <li<?php if(@$action=='user'){?> class="active"<?php }?>><a href="<?php echo site_url('user')?>">会员</a></li>
            <li<?php if(@$action=='tag'){?> class="active"<?php }?>><a href="<?php echo site_url('tag')?>">标签</a></li>
            <li<?php if(@$action=='add'){?> class="active"<?php }?>><a href="<?php echo site_url('topic/add')?>">发表</a></li>
           </ul>

        <?php echo form_open('search',array('class'=>'navbar-form navbar-left','target'=>'_blank','role'=>'search'))?>
		      <div class="form-group">
		        <input type="text" class="form-control" name="keyword" placeholder="输入关键字回车">
		      </div>
		</form>
          <ul class="nav navbar-nav navbar-right">
 
	        <?php if($this->session->userdata('uid')){ ?>
	        <li><a href="<?php echo site_url('message/')?>"><span class="glyphicon glyphicon-envelope"></span> <?php if($myinfo['messages_unread']>0) echo $myinfo['messages_unread']?></a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class='glyphicon glyphicon-user'></span> <?php echo $this->session->userdata('username');?> <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="<?php echo site_url('user/profile/'.$this->session->userdata('uid').'')?>">个人主页</a></li>
                <li><a href="<?php echo site_url('message')?>">站内信</a></li>
                <li><a href="<?php echo site_url('settings')?>">设置</a></li>
                <?php if($this->auth->is_admin()){ ?>
                <li><a href="<?php echo site_url('admin/login')?>">管理后台</a></li>
                <?php }?>
                <li class="divider"></li>
                <!--<li class="dropdown-header">Nav header</li>-->
                <li><a href="<?php echo site_url('user/logout')?>">退出</a></li>
              </ul>
            </li>
			<?php }else{?>
            <li><a href="<?php echo site_url('user/register')?>">注册</a></li>
            <li><a href="<?php echo site_url('user/login')?>">登入</a></li>
            <?php }?>
          </ul>
        </div><!--/.nav-collapse -->
        
</div>
</div>

</div>

 */ ?>
