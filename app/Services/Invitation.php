<?php

namespace App\Services;

use App\Services\ActionLog as sActionLog;
use App\Models\Invitation as mInvitation,
    App\Models\Usermeta   as mUsermeta,
    App\Models\Message  as mMessage,
    App\Models\Ask        as mAsk;

use Queue, App\Jobs\Push;

class Invitation extends ServiceBase
{

    public static function checkInvitationOf( $ask_id, $invite_uid ){
        $mInvitation = new mInvitation();
        $inv = $mInvitation->where( [ 'ask_id' => $ask_id, 'invite_uid'=> $invite_uid ] )->first();

        return (bool)$inv;
    }

    private static function sendInvitation( $ask_id, $invite_uid ){
        $invitation = new mInvitation();
        sActionLog::init( 'INVITE_FOR_ASK', $invitation );
        $invitation->assign(array(
            'ask_id'        => $ask_id,
            'invite_uid'    => $invite_uid,
        ));
        $invitation->save();
        sActionLog::save($invitation);
        return $invitation;
    }

    public static function setInvitation($uid, $ask_id, $invite_uid, $status = mInvitation::STATUS_NORMAL) {
        #$invitation->setInvitation( $ask_id, $invite_uid, mInvitation::STATUS_READY );
        $mAsk= new mAsk;

        $ask = $mAsk->get_ask_by_id($ask_id);
        if( !$ask ) {
            return error('ASK_NOT_EXIST');
        }
        //if( $uid != $ask->uid ) {
        //    return error('PERMISSION_DENY');
        //}

        $action_name = 'INVITE_FOR_ASK';
        if( $status == mInvitation::STATUS_DELETED ){
            $action_name = 'CANCEL_'.$action_name;
        }


        $mInvitation = new mInvitation();

        $cond = [
            'ask_id' => $ask_id,
            'invite_uid' => $invite_uid
        ];
        #todo: remove first or new
        $invitation = $mInvitation->firstOrNew( $cond );

        $data = $cond;
        if( !$invitation->id ){
            if( $status == mInvitation::STATUS_DELETED ){
                return true;
            }
            $data['create_time'] = time();
        }

        $data['update_time'] = time();
        $data['status'] = $status;
        $invitation->assign($data)->save();
        #todo: jq 有点看不懂
        sActionLog::init( $action_name, $invitation );
        sActionLog::save($invitation);

        #邀请推送
        Queue::push(new Push(array(
            'uid'=>$uid,
            'target_uid'=>$invite_uid,
            'type'=>'invite'
        )));

        return $invitation;
    }

    /**
     * 通过id获取求助
     */
    public static function getInvitation($ask_id, $invite_id) {
        $inv = mInvitation::findFirst("ask_id=$ask_id and invite_id=$invite_id");
        if( !$inv ){
            return error('INVITATION_NOT_EXIST');
        }

        return $inv;
    }

    //Deprecated?
    public static function updateMsg( $uid, $last_updated ){
        $lasttime = Usermeta::readUserMeta( $uid, Usermeta::KEY_LAST_READ_INVITE);
        $lasttime = $lasttime?$lasttime[Usermeta::KEY_LAST_READ_INVITE]: 0;
        define('INVITATION_MSG_TEXT', 'uid::uid: invites you to help him/her.');


        $invitation = new Invitation();
        $invites = $invitation->get_unread_invitation($uid, $last_updated, $lasttime );

        foreach( $invites as $row){
            Message::newInvitation(
                $row->uid,
                $uid,
                str_replace(array(':uid:'), array($row->uid), INVITATION_MSG_TEXT),
                $row->id);
        }

        if(isset($row)){
            Usermeta::refresh_read_notify(
                $uid,
                Usermeta::KEY_LAST_READ_INVITE,
                $lasttime
            );
        }
        return $invites;
    }


    public static function getNewInvitations( $uid, $last_fetch_msg_time ){
       return (new mInvitation)->get_new_invitations( $uid, $last_fetch_msg_time );
    }

    public static function count_new_invitation($uid){
        $lasttime = Usermeta::readUserMeta( $uid, Usermeta::KEY_LAST_READ_INVITE );
        if( $lasttime ){
            $lasttime = $lasttime[Usermeta::KEY_LAST_READ_INVITE];
        }
        else{
            $lasttime = 0;
        }

        return Invitation::count( array(
            'create_time>'.$lasttime,
            'status='.Invitation::STATUS_NORMAL,
            'invite_uid='.$uid
        ) );
    }

    public static function list_unread_invites( $lasttime, $page = 1, $size = 500 ){

        $invite = new mInvitation;
        $sql = 'select i.invite_uid, count(1) as num'.
            ' FROM invitations i'.
            ' WHERE i.status='.mInvitation::STATUS_NORMAL.
            ' AND i.create_time>'.$lasttime.
            ' GROUP BY i.invite_uid';
        return new Resultset(null, $invite, $invite->getReadConnection()->query($sql));
    }

}
