<?php
namespace App\Http\Controllers\Main;
use App\Services\Ask as sAsk;
use App\Services\Parttime\Assignment as sAssignment;

class TaskController extends ControllerBase {
	public function index() {
		$uid = _uid();
		$page = $this->post('page', 'int', 1);
		$size = $this->post('size', 'int', 15);
		$assignments = sAssignment::getAssignmentsByUid($uid);
		$askids = [];
		foreach ($assignments as $assignment) {
			$askids[] = $assignment->ask_id;
		}
		$asks = sAsk::getAskByIdsV2($ids, $page, $size);
		$data = [];
		foreach ($asks as $ask) {
			$data[] = sAsk::brief($ask);
		}
		return $this->output($data);

	}
}
