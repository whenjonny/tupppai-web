<?php
use Illuminate\Database\Seeder;
use App\Models\Category as mCategory;
class DefaultCategoriesSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$categories = [
			[
				'id' => 0,
				'name' => 'normal',
				'display_name' => '默认分类'
			],[
				'id' => 1,
				'name' => 'popular',
				'display_name' => '热门'
			],[
				'id' => 2,
				'name' => 'pc_popular',
				'display_name' => 'PC热门',
				'pid' => 1
			],[
				'id' => 3,
				'name' => 'app_popoular',
				'display_name' => 'APP热门',
				'pid' => 1
            ],[
                'id' => 4,
                'name' => 'activity',
                'display_name' => '活动',
                'pid' => 0
            ],[
				'id' => 5,
				'name' => 'channel',
				'display_name' => '频道',
				'pid' => 0
            ]
		];
		$category_base = config('global.CATEGORY_BASE');
		$category_table = (new mCategory)->getTable();
		mCategory::where('id','<=', $category_base )->delete();
		foreach( $categories as $category ){
			$category['create_time'] = time();
			$category['update_time'] = time();
			$category['create_by'] = 1;
			$category['status'] = mCategory::STATUS_NORMAL;
			$id = mCategory::insertGetId( $category );
			mCategory::where('id', $id)->first()->update(['id'=>$category['id']]);
		}
		$sql = DB::raw('ALTER TABLE '.$category_table.' AUTO_INCREMENT = '. ($category_base+1) .';');
		DB::statement( $sql );
		//set auto increment 1000
	}
}
