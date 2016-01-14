<?php


namespace App\Handles\Trade;


class ReplySaveHandle
{
    public function handle(Event $event)
    {
        $asks = $event->arguments['ask'];
        //1,创建订单
        $orderId = $this->createOrderId($asks->id);
        //2,获取订单
        $orderId = $this->getOrderId($asks->id);
        //3,提交支付
        $this->pay($orderId);
        //4,写流水
        $this->transaction($order);

        $ask = $event->arguments['reply'];

        //获取商品金额
        $amount = $this->getGoodsAmount(1);

        //检查扣除商品费用后,用户余额是否充足
        $checkUserBalance = $this->checkUserBalance($ask->uid,$amount);
        if(!$checkUserBalance) {
            //写流水交易失败,余额不足
            $this->freezeAccount($ask->uid, $amount, tUser::getBalance($ask->uid),tAccount::ACCOUNT_FAIL_STATUS, '余额不足');
            return error('TRADE_USER_BALANCE_ERROR');
        }

        //操作psgod_trade库
        DB::connection('db_trade')->transaction(function() use($ask,$amount){
            //冻结(求P用户)金额
            $this->freeze($ask->uid,$amount);
            //写冻结流水
            $userGoodsBalance = tUser::getBalance($ask->uid);
            $this->freezeAccount($ask->uid, $amount, $userGoodsBalance,tAccount::ACCOUNT_SUCCEED_STATUS);
            //恢复求P状态为常态
            $this->setAskStatus($ask);
        });



    }
    /*
     * 判断是否在三天以内
     * 三天以内由发起求P用户支付
     * 超过三天由默认uid支付
     * */
    public function checkPayUser($ask)
    {

    }
    /*
 * 生成订单
 * */
    public function createOrder($asks)
    {
        return true;
    }
    /*
     * 获得订单
     * return orderId
     * */
    public function getOrderId($asksId)
    {
        $orderId = 0;
        return $orderId;
    }
    /*
     * 支付订单
     * */
    public function pay($orderId)
    {
        //支付状态
        $status = 0;
        return $status;
    }
    /*
     * 写流水
     * */
    public function transaction($order)
    {
        return true;
    }
}