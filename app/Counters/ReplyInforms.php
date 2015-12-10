<?php namespace App\Counters;

use App\Models\Inform as mInform;
use DB;

class ReplyInforms extends CounterBase {

    public static $key  = 'reply_informs_';
    
    public static function _key($reply_id) {
        $key = self::$key . $reply_id ;

        return $key;
    }

    /**
     * 获取计数数据
     */ 
    public static function get($reply_id) {
        $key = self::_key($reply_id);

        return self::query($key, function() use ($key, $reply_id) {
            $mInform  = new mInform;
            $count    = $mInform->where('target_type', mInform::TYPE_REPLY)
                ->where('target_id', $reply_id)
                ->valid()
                ->count();

            return self::put($key, $count);
        });
    }

    public static function inc($reply_id, $val = 1) {
        self::get($reply_id);

        return parent::inc(self::_key($reply_id));
    }
}
