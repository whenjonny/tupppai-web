<?php namespace App\Http\Controllers\Api;

use App\Services\User as sUser;
use App\Services\Config as sConfig;
use App\Services\UserLanding as sUserLanding;
use App\Models\Config as mConfig;

use App\Trades\Transaction as tTransaction;
use App\Trades\User as tUser;
use App\Trades\Account as tAccount;

use App\Models\UserLanding as mUserLanding;

use Queue, App\Jobs\Push;

class MoneyController extends ControllerBase{

    public function __construct() {
        parent::__construct();
        \Pingpp\Pingpp::setApiKey(env('PINGPP_KEY'));
    }

    
    public function rewardAction()
    {
        $uid    = $this->_uid;
        $ask_id = $this->post( 'ask_id', 'int');
        $amount = $this->post( 'amount', 'int');
        $type   = $this->post( 'type', 'string', 'wx');

        if(empty($ask_id) || empty($uid)){
            return error('EMPTY_ARGUMENTS');
        }

        //生成随机打赏金额
        $start  = config('global.reward_amount_scope_start');
        $end    = config('global.reward_amount_scope_end');
        $amount = $amount ? $amount : randomFloat($start, $end);

        $data   = null;
        try {
            //打赏,但是没有支付回调之前打赏都是失败的
            $reward = sReward::createReward($uid, $ask_id ,$amount, mUserLanding::STATUS_READY);

            $data   = tAccount::pay($this->_uid, $amount, $type, array(
                'type'=>'reward',
                'reward_id'=>$reward->id
            ));
        } catch (\Exception $e) {
            return error('TRADE_PAY_ERROR', $e->getMessage());
        }
        return $this->output($data);
    }

    /**
     * 充值
     */
    public function chargeAction() {
        $type    = $this->post('type', 'string', 'wx');
        $amount  = $this->post('amount', 'money');

        $data    = null;

        try {
            $data = tAccount::pay($this->_uid, $amount, $type, array(
                'type'=>'charge'
            ));
        } catch (\Exception $e) {
            return error('TRADE_PAY_ERROR', $e->getMessage());
        }

        return $this->output($data);
    }

    /**
     * 提现
     */
    public function transferAction() {
        $type    = $this->post('type', 'string', 'red');
        $amount  = $this->post('amount', 'money');

        if (!$amount) {
            return error('AMOUNT_NOT_EXIST');
        }
        //提现逻辑
        $maxWithdrawAmount = sConfig::getConfigValue(mConfig::KEY_WITHDRAW_MAX_AMOUNT) ;
        if ($amount > ( $maxWithdrawAmount * config('global.MULTIPLIER') ) ) {
            return error('AMOUNT_ERROR', '单次提现金额不能大于'+$maxWithdrawAmount+'，提现失败');
        }

        //没有绑定公众号不能提现
        $landing = sUserLanding::getUserLandingByUid($this->_uid, mUserLanding::TYPE_WEIXIN);
        if (!$landing || $landing->openid == '' || $landing->status != mUserLanding::STATUS_NORMAL) {
            return error('OPEN_ID_NOT_EXIST', '未绑定微信账号');
        }
        $open_id = $landing->openid;

        // 用户余额不足也不能提现
        $user = sUser::getUserByUid($this->_uid);
        if ($amount > $user->balance) {
            return error('AMOUNT_ERROR', '余额不足，提现失败');
        }

        $data    = '';

        try {
            if($type == 'red') {
                $data = tAccount::b2c($this->_uid, $open_id, $amount);
            }
            else {
                $data = tAccount::red($this->_uid, $open_id, $amount);
            }
        }
        catch (\Exception $e) {
            return error('TRADE_PAY_ERROR', $e->getMessage());
        }

        return $this->output($data);
    }

}
