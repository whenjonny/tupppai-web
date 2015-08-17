<?php
namespace App\Services;

use App\Models\User as mUser,
    App\Models\Master as mMaster;

class Master extends ServiceBase{

    public static function addNewMaster($uid, $oper_by, $start_time, $end_time) {
        $master = new mMaster;
        $master->assign(array(
            'uid'=>$uid,
            'set_by'=>$oper_by,
            'start_time'=>$start_time,
            'end_time'=>$end_time
        ));

        $master->save();
        #todo: actionlog
        return $master;
    }

    public static function updateMasters(){
        return (new mMaster)->update_master_status();
    }

    public static function getAvailableMasters( $page = 1, $size = 15 ){
        $mMaster = new mMaster;
        $mMaster->update_master_status();

        $uids = $mMaster->get_valid_master_list($page, $size);

        return $uids;
    }

    /**
     * 取消推荐大神
     */
    public static function cancelRecommendMaster($id, $oper_uid) {
        $mMaster = new mMaster;

        $master  = $mMaster->get_master_by_id($id);
        if( !empty($master) ) {
            return error('EMPTY_MASTER');
        }
        $master->status = self::STATUS_DELETE;
        $master->del_by = $oper_uid;
        $master->del_time = time();
        $master->save();

        #todo: actionlog
        return $master;
    }
}
