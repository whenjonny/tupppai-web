<?php
namespace App\Services;

use App\Services\Ask as sAsk,
    App\Services\Reply as sReply,
    App\Services\ThreadCategory as sThreadCategory;

use App\Models\Ask as mAsk;
use App\Models\Reply as mReply;

use App\Models\ThreadCategory as mThreadCategory;

class Thread extends ServiceBase
{
    public static function getPopularThreads($uid, $page, $size, $last_updated){
        $threads    = sThreadCategory::getPopularThreads( $page, $size );
        $ask_ids    = array();
        $reply_ids  = array();
        foreach($threads as $thread) {
            if($thread->target_type == mThreadCategory::TYPE_ASK) {
                $ask_ids[] = $thread->target_id;
            }
            else if($thread->target_type == mThreadCategory::TYPE_REPLY) {
                $reply_ids[] = $thread->target_id;
            }
        }
        $asks   = sAsk::getAsksByIds($ask_ids);
        $replies= sReply::getRepliesByIds($reply_ids);

        $sort_arr = array();
        foreach($asks as $ask) {
            $sort_arr[$ask->create_time] = sAsk::detail($ask);
        }
        foreach($replies as $reply) {
            $sort_arr[$reply->create_time] = sReply::detail($reply);
        }
        sort($sort_arr);

        return array_values($sort_arr);
    }
    /*

    public static function getPopularThreads($uid,  $page, $size ,$last_updated ){
        $mAsk   = new mAsk;
        $mReply = new mReply;
        
        $category_id     = mThreadCategory::CATEGORY_TYPE_POPULAR;

        $asks = $mAsk->where( 'category_id', $category_id )
            ->where('update_time','<', $last_updated )
            ->valid();
        $replies = $mReply->where( 'category_id', $category_id )
            ->where('update_time','<', $last_updated )
            ->valid();

        $askAndReply = $replies->union($asks)
            ->orderBy('update_time','DESC')
            ->forPage( $page, $size )
            ->get();

        $timelines = self::parseAskAndReply( $askAndReply );

        return $timelines;
    }
*/
}
