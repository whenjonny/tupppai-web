<?php

namespace App\Models;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset,
    \App\Models\Record,
    \App\Models\Count,
    \App\Models\Usermeta,
    \App\Models\Label;
use App\Models\Label as LabelBase;

class Reply extends ModelBase
{
    protected $table = 'replies';

    const TYPE_NORMAL       = 1;
    const STATUS_BLOCKED    = 4;
    /**
     * 绑定映射关系
     */
    public function replyer() {
        return $this->belongsTo('App\Models\User', 'uid');
    }
    public function upload() {
        return $this->hasOne('App\Models\Upload', 'id', 'upload_id');
    }

    public function beforeCreate () {
        $this->status       = self::STATUS_NORMAL;
        $this->type         = self::TYPE_NORMAL;
        $this->ip           = get_client_ip();

        return $this;
    }

    public function get_reply_by_id($reply_id){
        return self::find($reply_id);
    }
       
    /**
     * 通过ask_id获取作品数量
     */
    public function count_replies_by_askid($ask_id) {
        return self::where('ask_id', $ask_id)
            ->where('status', self::STATUS_NORMAL)
            ->count();
    }

    /**
     * 通过ask_id获取作品列表
     */
    public function get_replies_by_askid($ask_id, $page, $limit) {
        $builder = self::query_builder();
        $builder = $builder->where('ask_id', $ask_id)
            ->orderBy('update_time', 'DESC');
        return self::query_page($builder, $page, $limit);
    }

    /**
     * 通过uid数组获取用户的求助信息
     */
    public function get_replies_by_replyids($replyids, $page, $limit){
        $builder = self::query_builder();
        $builder->inWhere('id', $replyids);
        $builder->orderBy('update_time DESC');
        return self::query_page($builder, $page, $limit);
    }

    /**
     * 计算用户发的作品数量
     */
    public function count_user_reply($uid) {
        $count = self::where('uid', $uid)
            ->where('status', self::STATUS_NORMAL)
            ->count();
        return $count;
    }

    /**
    * 分页方法
    *
    * @param int 加数
    * @param int 被加数
    * @return integer
    */
    public function page($keys = array(), $page=1, $limit=10, $type='new')
    {
        $builder = self::query_builder();
        foreach ($keys as $k => $v) {
            $builder = $builder->where($k, '=', $v);
        }
        $builder = $builder->where('status', '!=', self::STATUS_DELETED);
        if($type == 'new')
            $builder = $builder->orderBy('create_time', 'DESC');
        else
            $builder = $builder->orderBy('click_count', 'DESC');

        return self::query_page($builder, $page, $limit);
    }

    //-------------------
    //public static function addNewReply($uid, $desc, $ask_id, $upload_obj, $download_type = null, $download_target_id = null)
    //public static function addNewTimingReply($uid, $desc, $ask_id, $upload_obj, $time, $status=self::STATUS_NORMAL)
    //public static function get_reply_by_id($id) {
    //public function get_comments()
    //public function get_comments_array() {
    //public static function collection_page($cond, $page = 1, $limit = 15)
    //public function get_user_scores()
    //public function to_simple_array() {
    //public function toSimpleArray() {
    //public function toStandardArray( $uid = 0, $width = 480) {
    //public static function fellow_replies_page($uid, $page=1, $limit=10)
    //public function getLabelRows() {
    //public function getHotCommentRows($limit=5) {
    //public function get_labels()
    //public function get_labels_array()
    //public static function update_status($reply, $status, $data="", $oper_by='0')
    //public static function get_reply_by_ask_id($ask_id, $page, $limit){
    //public static function get_reply_by_ask_id_count($ask_id)
    //public static function list_replies($reply_ids){
    public static function modify_download_status($uid, $download_type, $download_target_id, $image_url){
         // 修改下载状态 (回复ask的)
        if ($download_type == Download::TYPE_ASK){
            $d = Download::findFirst(array("uid = $uid AND type= ".Download::TYPE_ASK." AND target_id = $download_target_id and status = " . Download::STATUS_NORMAL));
            if ($d){
                $d->status = Download::STATUS_REPLIED;
                $d->save_and_return($d);
            }else{
                Download::addNewDownload($uid, Download::TYPE_ASK, $download_target_id, get_cloudcdn_url($image_url), Download::STATUS_NORMAL);
            }
        }else if ($download_type == Download::TYPE_REPLY){        // (回复回复的)
            $d = Download::findFirst(array("uid = $uid AND type= ".Download::TYPE_REPLY." AND target_id = $download_target_id and status = " . Download::STATUS_NORMAL));
            if ($d){
                $d->status = Download::STATUS_REPLIED;
                $d->save_and_return($d);
            }else{
                Download::addNewDownload($uid, Download::TYPE_REPLY, $download_target_id, get_cloudcdn_url($image_url), Download::STATUS_NORMAL);
            }
        }
    }

    public static function user_get_reply_page($uid, $page=1, $limit=15){
        $builder = self::query_builder('r');
        $upload  = 'App\Models\Upload';
        $builder->join($upload, 'up.id = r.upload_id', 'up')
                ->where("r.uid = {$uid} and r.status = ".self::STATUS_NORMAL)
                ->columns(array('r.id', 'r.ask_id',
                    'up.savename', 'up.ratio', 'up.scale'
                ));
        return self::query_page($builder, $page, $limit);
    }

    public function get_user_reply($uid, $page, $limit, $last_read_time=NULL ){
        $builder = self::query_builder();

        if( !is_null( $last_read_time) ){
            $last_read_time = time();
        }

        $builder = $builder->where('uid', $uid)
            ->where('update_time','<', $last_read_time )
            ->orderBy('update_time', 'DESC');

        return self::query_page($builder, $page, $limit);
    }

    public function get_replies_of_asks( $ask_ids, $last_fetch_msg_time ){
        return $this->where([
            'status' => self::STATUS_NORMAL
            ])
        ->where('update_time', '>', $last_fetch_msg_time )
        ->whereIn('ask_id', $ask_ids )
        ->orderBy('update_time', 'ASC')
        ->get();
    }

    
}
