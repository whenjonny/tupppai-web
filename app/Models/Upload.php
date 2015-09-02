<?php
namespace App\Models;

class Upload extends ModelBase
{
    protected $table = 'uploads';

    /**
     * 设置默认值
     */
    public function beforeCreate () {
        //$this->status   = self::STATUS_NORMAL;
        $this->ip       = get_client_ip();

        return $this;
    }

    /**
     * 通过id获取上传记录
     */
    public function get_upload_by_id($upload_id) {
        $upload = self::find($upload_id);

        return $upload;
    }

    /**
     * 局部函数，由对象调用
     */
    public function update_image($scale, $ratio){ 
        $this->scale = $scale;
        $this->ratio = $ratio;

        return $this->save();
    }
    
}
