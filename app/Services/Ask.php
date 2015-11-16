<?php namespace App\Services;

use App\Models\Ask      as mAsk,
    App\Models\User     as mUser,
    App\Models\Count    as mCount,
    App\Models\Label    as mLabel,
    App\Models\Reply    as mReply,
    App\Models\Follow   as mFollow,
    App\Models\Record   as mRecord,
    App\Models\Comment  as mComment,
    App\Models\Download as mDownload,
    App\Models\UserRole as mUserRole;

use App\Services\User       as sUser,
    App\Services\Count      as sCount,
    App\Services\Focus      as sFocus,
    App\Services\Follow     as sFollow,
    App\Services\Reply      as sReply,
    App\Services\Label      as sLabel,
    App\Services\Upload     as sUpload,
    App\Services\Comment    as sComment,
    App\Services\UserDevice as sUserDevice,
    App\Services\Download   as sDownload,
    App\Services\ActionLog  as sActionLog,
    App\Services\ThreadCategory as sThreadCategory,
    App\Services\Collection as sCollection;

use Queue, App\Jobs\Push, DB;
use App\Facades\CloudCDN;

class Ask extends ServiceBase
{
    /**
     * 添加新求PS
     *
     * @param string $uid        用户ID
     * @param string $desc       求PS详情
     * @param \App\Models\Upload $upload_obj 上传对象
     */
    public static function addNewAsk($uid, $upload_ids, $desc)
    {
        $uploads = sUpload::getUploadByIds($upload_ids);
        if( !$uploads ) {
            return error('UPLOAD_NOT_EXIST');
        }

        $device_id = sUserDevice::getUserDeviceId($uid);

        $ask = new mAsk;
        sActionLog::init('POST_ASK', $ask);

        $ask->assign(array(
            'uid'=>$uid,
            'desc'=>$desc,
            'upload_ids'=>implode(',', $upload_ids),
            'device_id'=>$device_id
        ));
        $ask->save();

        #求助推送
        #todo:推送给好友,邀请求助
        Queue::push(new Push(array(
            'uid'=>$uid,
            'ask_id'=>$ask->id,
            'type'=>'post_ask'
        )));

        // 给每个添加一个默认的category，话说以后会不会爆掉
        sThreadCategory::addNormalThreadCategory( $uid, mAsk::TYPE_ASK, $ask->id);
        sActionLog::save($ask);
        return $ask;
    }

    public static function getAsksByIds($ask_ids) {
        return (new mAsk)->get_asks_by_askids($ask_ids, 1, 0);
    }

    /**
     * 通过id获取求助
     */
    public static function getAskById($ask_id) {
        return (new mAsk)->get_ask_by_id($ask_id);
    }

    /**
     * 通过类型获取首页数据
     */
    public static function getAsksByCond($cond = array(), $page, $limit) {
        $mAsk = new mAsk;
        $asks = $mAsk->get_asks($cond, $page, $limit);

        $data = array();
        foreach($asks as $ask){
            $row = self::detail($ask);
            $row['hot_comments'] = sComment::getHotComments(mComment::TYPE_ASK, $ask->id);
            $row['desc'] = strip_tags($row['desc']);
            $data[] = $row;
        }

        return $data;
    }

    /**
     * 获取用户的求P和作品
     */
    public static function getUserAsksReplies($uid, $page, $limit){
        $mAsk = new mAsk;

        $asks = $mAsk->get_asks( array('uid'=>$uid), $page, $limit);

        $data = array();
        foreach($asks as $ask){
            $tmp    = self::detail($ask);
            $tmp['replies'] = sReply::getRepliesByAskId($ask->id, 0, 3);
            $data[] = $tmp;
        }

        return $data;
    }

    /**
     * 获取关注人的求助列表
     */
    public static function getFollowAsks($uid, $page, $limit){
        $mFollow = new mFollow;
        $mAsk    = new mAsk;

        $followUsers = $mFollow->getFollowUsers($uid);

        $followUids  = array();
        foreach($followUsers as $user){
            $followUids[] = $user->uid;
        }

        $asks = $mAsk->get_asks_by_uids($followUids, $page, $limit);

        $data = array();
        foreach($asks as $ask){
            $data[] = self::detail($ask);
        }
        return $data;
    }

    /**
     * 我的收藏分页
     */
    public static function getFocusAsks($uid, $page, $limit) {
        $mFocus  = new mFocus;
        $mAsk    = new mAsk;

        $focusAsks = $mFocus->get_user_focus_asks($uid);

        $focusAskids = array();
        foreach($focusAsks as $focus){
            $focusAskids[] = $focus->ask_id;
        }

        $asks = $mAsk->get_asks_by_askids($focusAskids, $page, $limit);

        $data = array();
        foreach($asks as $ask){
            $data[] = self::detail($ask);
        }
        return $data;
    }

    /**
     * 获取回复人列表
     */
    public static function getReplyers($ask_id, $page, $size) {
        $mReply  = new mReply;
        $mUser   = new mUser;

        $replies = $mReply->get_replies(array('ask_id'=>$ask_id), $page, $size);
        $reply_uids = array();
        foreach($replies as $reply) {
            $reply_uids[] = $reply->uid;
        }

        $replyers = $mUser->get_user_by_uids($reply_uids, 0, 0);
        $replyer_arr = array();
        foreach($replyers as $user) {
            $replyer_arr[$user->uid] = sUser::detail($user);
        }

        $data = array();
        foreach($replies as $reply){
            if(isset($replyer_arr[$reply->uid]))
                $data[] = $replyer_arr[$reply->uid];
        }

        return $data;
    }

    /**
     * 获取用户求p数量
     */
    public static function getUserAskCount ( $uid ) {
        return (new mAsk)->count_asks_by_uid($uid);
    }

    /**
     * 数量变更
     */
    public static function updateAskCount ($id, $count_name, $status){
        $count = sCount::updateCount ($id, mLabel::TYPE_ASK, $count_name, $status);
        //todo: 是否需要报错提示,不需要更新
        if (!$count)
            return false;

        $mAsk   = new mAsk;
        $ask    = $mAsk->get_ask_by_id($id);
        if (!$ask)
            return error('ASK_NOT_EXIST');

        $count_name  = $count_name.'_count';
        if(!isset($ask->$count_name)) {
            return error('COUNT_TYPE_NOT_EXIST', 'Ask doesn\'t exists '.$count_name.'.');
        }

        $value = 0;
        if ($count->status == mCount::STATUS_NORMAL)  
            $value = 1;
        else
            $value = -1;

        $ask->$count_name += $value;
        if ($ask->$count_name < 0)
            $ask->$count_name = 0;

        // 通过名字获取日志记录的键值
        $name   = ( $value==1? '': 'CANCEL_' ).strtoupper($count_name).'_ASK';
        $key    = sActionLog::getActionKey($name);

        $ret    = $ask->save();
        sActionLog::log($key, $ask, $ret);

        return $ret;
    }

    /**
     * 更新求助的内容
     */
    public static function updateAskDesc($ask_id, $desc){
        $ask = self::getAskById($ask_id);
        $ask->desc = $desc;
        $ask->save();
        
        #点赞推送
        Queue::push(new Push(array(
            'uid'=>_uid(),
            'target_uid'=>$ask->uid,
            //前期统一点赞,不区分类型
            'type'=>'like_ask',
            'target_id'=>$ask_id,
        )));

        return $ask;
    }

    /**
     * 更新求助审核状态
     */
    public static function updateAskStatus($ask, $status, $_uid, $data=""){
        sActionLog::init( 'UPDATE_ASK_STATUS', $ask );
        $ask->status = $status;

        switch($status){
        case mAsk::STATUS_NORMAL:
            break;
        case mAsk::STATUS_READY:
            break;
        case mAsk::STATUS_REJECT:
            $ask->del_by = $_uid;
            $ask->del_time = time();
            break;
        case mAsk::STATUS_DELETED:
            $ask->del_by = $_uid;
            $ask->del_time = time();
            break;
        }

        $ret = $ask->save();
        sActionLog::save( $ask );

        return $ret;
    }

    public static function blockUserAsks( $uid ){
        $mAsk = new mAsk();
        sActionLog::init('BLOCK_USER_ASKS');
        $mAsk->change_asks_status( $uid, mAsk::STATUS_BLOCKED, mAsk::STATUS_NORMAL );
        sActionLog::save();
        return true;
    }

    public static function recoverBlockedAsks( $uid ){
        $mAsk = new mAsk();
        sActionLog::init('RESTORE_USER_ASKS');
        $mAsk->change_asks_status( $uid, mAsk::STATUS_NORMAL, mAsk::STATUS_BLOCKED );
        sActionLog::save();
        return true;
    }

    /**
     * 通过ask的id数组获取ask对象
     * @param [array] ask_ids
     * @return [array][object]
     */
    public static function umengListUserAskCount($ask_ids) {
        if(!$ask_ids){
            return error('CODE_WRONG_INPUT');
        }
        $ask = new mAsk();
        return $ask->list_user_ask_count($ask_ids);
    }

    public static function getAskUploads($upload_ids_str, $width) {
        $ask_uploads = array();

        $uploads = sUpload::getUploadByIds(explode(',', $upload_ids_str));
        foreach($uploads as $upload) {
            $ask_uploads[] = sUpload::resizeImage($upload->savename, $width, 1, $upload->ratio);
        }

        return $ask_uploads;
    }

    /**
     * 获取标准输出(含评论&作品
     */
    public static function detail( $ask, $width = 480) {
        if(!$ask) return array();

        $uid    = _uid();
        $width  = _req('width', $width);
        $data = array();
        $data['id']             = $ask->id;
        $data['ask_id']         = $ask->id;
        $data['type']           = mLabel::TYPE_ASK;

        //$data['comments']       = sComment::getComments(mComment::TYPE_ASK, $ask->id, 0, 5);
        //$data['labels']         = sLabel::getLabels(mLabel::TYPE_ASK, $ask->id, 0, 0);
        //$data['replyer']        = self::getReplyers($ask->id, 0, 7);

        //if($hot_comments) $data['hot_comments']   = sComment::getHotComments(mComment::TYPE_ASK, $ask->id);
        $data['is_follow']      = sFollow::checkRelationshipBetween($uid, $ask->uid);
        //$data['is_fan']    = sFollow::checkRelationshipBetween($uid, $ask->uid);

        $data['is_download']    = sDownload::hasDownloadedAsk($uid, $ask->id);
        $data['uped']           = sCount::hasOperatedAsk($uid, $ask->id, 'up');
        $data['collected']      = sFocus::hasFocusedAsk($uid, $ask->id);

        $data['avatar']         = $ask->asker->avatar;
        //todo: default value ?
        $data['sex']            = $ask->asker->sex?1:0;
        $data['uid']            = $ask->asker->uid;
        $data['nickname']       = $ask->asker->nickname;

        $data['upload_id']      = $ask->upload_ids;
        $data['create_time']    = $ask->create_time;
        $data['update_time']    = $ask->update_time;
        $data['desc']           = $ask->desc? $ask->desc: '(这个人好懒，连描述都没写)';
        $data['up_count']       = $ask->up_count;
        //$data['comment_count']  = $ask->comment_count;
        $data['comment_count']  = sComment::countComments(mAsk::TYPE_ASK, $ask->id);

        //todo
        $data['collect_count']  = sFocus::countFocusesByAskId($ask->id);
        $data['click_count']    = $ask->click_count;
        $data['inform_count']   = intval($ask->inform_count);

        $data['share_count']    = $ask->share_count;
        $data['weixin_share_count'] = $ask->weixin_share_count;
        $data['reply_count']    = intval($ask->reply_count);

        $data['ask_uploads']    = self::getAskUploads($ask->upload_ids, $width);
        $data = array_merge($data, $data['ask_uploads'][0]);

        $ask->increment('click_count');

        return $data;
    }

    public static function brief( $ask ){
        $data = array();

        $uid    = _uid();
        $width  = _req('width', 480);
        $data['id']             = $ask->id;
        $data['ask_id']         = $ask->id;
        $data['desc']           = $ask->desc;

        $data['avatar']         = $ask->asker->avatar;
        $data['sex']            = $ask->asker->sex;
        $data['uid']            = $ask->asker->uid;
        $data['nickname']       = $ask->asker->nickname;

        $data['upload_id']      = $ask->upload_ids;
        $data['create_time']    = $ask->create_time;
        $data['update_time']    = $ask->update_time;
        $data['desc']           = $ask->desc? $ask->desc: '(这个人好懒，连描述都没写)';
        $data['up_count']       = $ask->up_count;
        //$data['comment_count']  = $ask->comment_count;
        $data['comment_count']  = sComment::countComments(mAsk::TYPE_ASK, $ask->id);
        //todo
        $data['collect_count']  = sFocus::countFocusesByAskId($ask->id);
        $data['click_count']    = $ask->click_count;
        $data['inform_count']   = intval($ask->inform_count);

        $data['share_count']    = $ask->share_count;
        $data['weixin_share_count'] = $ask->weixin_share_count;
        $data['reply_count']    = intval($ask->reply_count);


        $data['ask_uploads']    = self::getAskUploads($ask->upload_ids, $width);
        $data = array_merge($data, $data['ask_uploads'][0]);

        DB::table('asks')->increment('click_count');

        return $data;
    }
}
