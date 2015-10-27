<?php namespace App\Http\Controllers\Admin;

use App\Models\App;
use App\Models\ActionLog;

use App\Services\User;
use App\Services\Ask;

use App\Facades\CloudCDN, Log, Queue, Request;
use Carbon\Carbon;
use App\Jobs\Push;

use App\Jobs\SendEmail;

use App\Services\Ask as sAsk;
use App\Services\Reply as sReply;
use App\Services\Comment as sComment;
use App\Services\User as sUser;

class AppController extends ControllerBase {

    public function testAction() {
        $uid = 1;
        $reply_to = 253;
        $msg_type       = 'comment_comment';
        #评论推送
        Queue::push(new Push(array(
            'uid'=>$uid,
            'target_uid'=>$reply_to,
            'type'=>$msg_type,
            'comment_id'=>1,
            'for_comment'=> 0
        )));
    }

    public function pushAction() {

        $type = $this->post('type', 'int');
        $uid  = $this->post('uid', 'int');
        $target_id = $this->post('target_id', 'int');
        if(!$type || !$uid || !$target_id) {
            return $this->output();
        }
        switch($type) {
        case 'post_reply':
            $reply = sReply::getReplyById($target_id);
            Queue::push(new Push(array(
                'uid'=>$uid,
                'ask_id'=>$reply->ask_id,
                'reply_id'=>$reply->id,
                'type'=>'post_reply'
            )));
            break;
        case 'post_ask':
            $ask = sAsk::getAskById($target_id);
            Queue::push(new Push(array(
                'uid'=>$uid,
                'ask_id'=>$ask->id,
                'type'=>'post_ask'
            )));
            break;
        case 'like_reply':
            $reply = sReply::getReplyById($target_id);
            Queue::push(new Push(array(
                'uid'=>$uid,
                'target_uid'=>$reply->uid,
                //前期统一点赞,不区分类型
                'type'=>'like_reply',
                'target_id'=>$target_id
            )));
            break;
        case 'follow':
            #关注推送
            Queue::push(new Push(array(
                'uid'=>$uid,
                'target_uid'=>$target_id,
                'type'=>'follow'
            )));
            break;
        case 'comment_ask':
            $ask = sAsk::getAskById($target_id);
            #评论推送
            Queue::push(new Push(array(
                'uid'=>$uid,
                'target_uid'=>$ask->uid,
                'type'=>'comment_ask',
                'comment_id'=>1,
                'for_comment'=> 0
            )));
            break;
        case 'comment_reply':
            $reply = sReply::getReplyById($target_id);
            #评论推送
            Queue::push(new Push(array(
                'uid'=>$uid,
                'target_uid'=>$reply->uid,
                'type'=>'comment_reply',
                'comment_id'=>1,
                'for_comment'=> 0
            )));
            break;

        }
        return $this->output();
    }

    public function indexAction(){
        Queue::push(new SendEmail('1'));
        $date = Carbon::now()->addMinutes(1);
        Queue::later($date, new SendEmail('2'));

        Log::info('This is some useful information.');
        return $this->output();
    }

    public function list_appsAction(){
        $appModel = new App;

        $cond = array();
        $cond['app_name'] = array(
            $this->post('app_name'),
            'LIKE',
            'AND'
        );
        $cond['del_time'] = array('junk','NULL');
        $join = array();
        $join['Upload'] = array('logo_upload_id','id');
        $order = array();
        $order[]='order_by ASC';

        $data = $this->page($appModel, $cond, $join, $order );
        foreach ($data['data'] as $app) {
            $app->logo = '<img class="applogo" src="'.CloudCDN::file_url($app->savename).'"/>';
            $app->app_name = '<a target="_blank" href="'.$app->jumpurl.'">'.$app->app_name.'</a>';
            $app->create_time = date('Y-m-d H:i:s', $app->create_time);
            $app->oper = '<a href="#" class="delete">删除</a>';
        }

        return $this->output_table($data);
    }

    public function save_appAction(){
        if( !Request::ajax() ){
            return error('WRONG_ARGUMENTS');
        }

        $app_name = $this->post('app_name','string');
        if( empty($app_name) ){
            return error('EMPTY_APP_NAME');
        }

        $logo_upload_id = $this->post('logo_id','int');
        if( empty($logo_upload_id) ){
            return error('EMPTY_ID');
        }

        $jumpurl = $this->post('jump_url', 'url');
        if( empty($jumpurl)){
            return error('EMPTY_URL');
        }
        
        sApp::addNewApp( $uid, $app_name, $logo_upload_id, $jumpurl );

        return $this->output();
    }

    public function del_appAction(){

        if( !Request::ajax() ){
            return error('WRONG_ARGUMENTS');
        }

        $app_id = $this->post('app_id', 'int');
        if(empty($app_id)){
            return error('EMPTY_ID');
        }

        sAsk::delApp($this->_uid, $app_id);

        return $this->output();
    }

    public function sort_appsAction(){
        #todo: skys
        if( !Request::ajax()){
            return error('WRONG_ARGUMENTS');
        }
        $app_sort = $this->post('sorts','string');
        $sorts = array_filter( explode(',', $app_sort) );

        if( empty($sorts) ){
            return error('WRONG_ARGUMENTS');
        }

        sAsk::sortApps($sorts);

        return $this->output();
    }

    public function get_app_listAction(){
        if( !Request::ajax() ){
            return error('WRONG_ARGUMENTS');
        }

        $mApp = new sApp();
        $apps = $mApp->getAppList();

        return $this->output($apps);
    }
}
