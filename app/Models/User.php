<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends ModelBase
{
    protected $table = 'users';
    protected $fillable = ['username', 'email', 'password'];
    protected $hidden = ['password'];
    protected $primaryKey = 'uid';

    const SEX_MAN   = 1;
    const SEX_FEMALE= 0;

    /**
     * 设置默认值
     */
    public function beforeCreate () {
        $this->status        = self::STATUS_NORMAL;
        $this->login_ip      = get_client_ip();

        return $this;
    }

    public function afterFetch() {
        $location = explode('|', $this->location);
        if(sizeof($location) < 3){
            $this->province = 0;
            $this->city     = 0;
            $this->location = $this->location;
        }
        else {
            $this->province = intval($location[0]);
            $this->city     = intval($location[1]);
            $this->location = $location[2];
        }
    }

    public function get_user_by_uids($uids, $page, $limit){
        if( empty($uids) ){
            return array();
        }
        $query = self::query_builder();

        //默认根据uid获取数据
        $query->whereIn('uid', $uids);

        return self::query_page($query, $page, $limit);
    }

    public function get_user_by_uid( $uid ){
        return self::whereUid( $uid )->first();
    }
    public function get_user_by_phone( $phone ){
        return self::wherePhone( $phone )->first();
    }
    public function get_user_by_username( $username ){
        return self::whereUsername( $username )->first();
    }
    public function get_user_by_nickname( $nickname ){
        return self::whereNickname( $nickname )->first();
    }

    public function increase_asks_count( $uid ) {
        $user = $this->get_user_by_uid($uid);
        $user->asks_count ++;
        return $user->save();
    }
}
