<?php namespace App\Http\Controllers\Main;

use App\Models\App;
use App\Models\ActionLog;

use App\Services\User;
use App\Services\Ask;

class IndexController extends ControllerBase {

    public function indexAction(){
        dd(1230);
        return $this->output();
    }
}
