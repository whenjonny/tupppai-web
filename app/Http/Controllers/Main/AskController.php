<?php 
namespace App\Http\Controllers\Main;

use App\Services\Ask As sAsk,
    App\Services\Reply As sReply;

class AskController extends ControllerBase {
    
    public $_allow = array('*');    

    public function index(){
        $type = $this->post('type', 'string', 'new');
        $page = $this->post('page', 'int',1);
        $size = $this->post('size', 'int',15);
        $width= $this->post('width', 'int', 300);
        $uid  = $this->post('uid', 'int', $this->_uid);

        $cond = array();

        $asks = sAsk::getAsksByType($cond, $type, $page, $size);
        
        return $this->output($asks);
    }


    public function view($id) {
        $ask = sAsk::getAskById($id);
        $ask = sAsk::detail($ask);

        return $this->output($ask);
    }

    //点赞
    public function upAskAction() {
        $id     = $this->get('id', 'int');
        $status = $this->get('status', 'int', 1);

        $ret    = sAsk::updateAskCount($id, 'up', $status);
        return $this->output();
    }
}
?>
