<?php
namespace App\Http\Controllers\Android;

use Session;
use App\Facades\Sms;
use App\Services\User as sUser;

class AccountController extends ControllerBase{

    public function loginAction(){
        $username   = $this->post('username', 'string');
        $phone      = $this->post('phone', 'string');
        $password   = $this->post('password', 'string');

        #todo: remove
        $phone      = "19000000001";
        $password   = "123123";

        if ( (is_null($phone) and is_null($username)) or is_null($password) ) {
            return error('WRONG_ARGUMENTS');
        }

        $user = sUser::loginUser($phone, $username, $password);
        session( 'uid', $user['uid'] );

        return $this->output($user);
    }

    public function registerAction(){
        //get platform
        $type     = $this->post('type', 'string');
        //todo: 验证码
        $code     = $this->post('code');
        //post param
        $mobile   = $this->post('mobile', 'string');
        $password = $this->post('password', 'string');
        $nickname = $this->post('nickname', 'string');
        $username = $nickname;
        $avatar   = $this->post('avatar', 'string');
        $location = $this->post('location', 'string','');
        $city     = $this->post('city', 'int');
        $province = $this->post('province', 'int');
        //$location = $this->encode_location($province, $city, $location);

        $sex      = $this->post('sex', 'string');
        $openid   = $this->post('openid','string', $mobile);
        $avatar_url = $this->post('avatar_url', 'string', $avatar);

        if( !$nickname ){
            return error( 'WRONG_ARGUMENTS', '昵称不能为空');
        }
        if( !$mobile ) {
            return error( 'WRONG_ARGUMENTS', '请输入手机号码' );
        }
        if( !$password ) {
            return error( 'WRONG_ARGUMENTS', '请输入密码' );
        }
        if( !$avatar ) {
            return error( 'WRONG_ARGUMENTS', '请上传头像' );
        }

        if( $type != 'mobile' && !$openid ) {
            return error( 'WRONG_ARGUMENTS', '请重新授权！' );
        }
        if( sUser::checkHasRegistered( $type, $openid ) ){
            //turn to login
            return error('USER_EXISTS');
        }

        //register
        $user = sUser::addUser( $type, $username, $password, $nickname, $mobile, $location, $avatar, $sex, $openid );

        return $this->output( $user, '注册成功');
    }

    public function requestAuthCodeAction(){
        $phone = $this->get('phone','mobile',0);
        if( !$phone ){
            return error( 'WRONG_ARGUMENTS', '手机号格式错误' );
        }

        $active_code = mt_rand(100000, 9999999);    // 六位验证码
        $active_code  = '123456';
        session( ['code'=>$active_code] );

        Sms::make([
              'YunPian'    => '1',
              'SubMail'    => '123'
          ])
          ->to($phone)
          ->data(['皮埃斯网络科技', '123456'])
          ->content('【皮埃斯网络科技】您的验证码是123456')
          ->send();

        return $this->output( [ 'code' => $active_code ], '发送成功' );
    }

    public function resetPasswordAction(){
        $phone   = $this->post('phone', 'int');
        $code    = $this->post('code', 'int','------');
        $new_pwd = $this->post('new_pwd');

        if(!$new_pwd) {
            return error( 'WRONG_ARGUMENTS', '密码不能为空' );
        }
        if(!$phone) {
            return error( 'WRONG_ARGUMENTS', '手机号不能为空' );
        }
        if(!$code) {
            return error( 'WRONG_ARGUMENTS', '短信验证码为空' );
        }
        //todo: 验证码有效期(通过session有效期控制？)
        if( $code != Session::pull('code') ){
            return error( 'WRONG_ARGUMENTS', '验证码过期或不正确' );
        }

        $result = sUser::resetPassword( $phone, $new_pwd );

        return $this->output( ['status'=>(bool)$result] );
    }

    public function hasRegisteredAction(){
        $phone = $this->get( 'phone', 'mobile' );
        if( !$phone ){
            return error( 'WRONG_ARGUMENTS', '手机号格式错误' );
        }

        $hasRegistered = sUser::checkHasRegistered( 'mobile', $phone );

        return $this->output( [ 'has_registered' => $hasRegistered ] );
    }

    public function checkTokenValidityAction(){
        $token = $this->post( 'token', 'string' );

        if( !$token ){
            return error( 'WRONG_ARGUMENTS' );
        }

        $isValid = $this->check_token();
        return $this->output( [ 'is_valid' => $isValid ] );
    }
}
