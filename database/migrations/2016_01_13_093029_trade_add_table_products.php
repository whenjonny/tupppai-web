<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TradeAddTableProducts extends Migration
{
    public $connection = 'db_trade';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection($this->connection)
            ->create( 'products', function( $table ){
            $table->increments('id');
            $table->string('name');  //商品名称
            $table->string('desc')->nullable();  //商品描述
            $table->string('remark')->nullable();//备注（后台人员用，不公开）
            $table->double('price');//商品单价
            //暂不添加  商品单位，折扣等信息
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection($this->connection)
                ->drop( 'products' );
    }
}
