<?php
namespace App\Models;

use \App\Models\Permission as mPermission;

class Permission extends ServiceBase
{
    /**
     * [save_permission 保存权限模块]
     * @param [type] $pid             [权限模块ID]
     * @param [type] $display_name    [模块名称]
     * @param [type] $controller_name [控制器名称]
     * @param [type] $action_name     [操作名称]
     */
    public static function addNewPermission($pid = null, $display_name, $controller_name, $action_name)
    {
        if($pid){
            $permission = mPermission::findfirst($pid);
        } else {
            $permission = new mPermission();
            $permission->create_time = time();
        }

        $permission->display_name= $display_name;
        $permission->controller_name = $controller_name;
        $permission->action_name = $action_name;
        $permission->update_time = time();

        return $permission->save_and_return($permission);
    }

    /**
     * check_exists 检测权限模块是否已经存在]
     * @return [type] [description]
     */
    public static function checkExist($controller_name, $action_name){
        $exists = mPermission::findfirst(array("controller_name = '{$controller_name}' AND action_name = '{$action_name}'"));

        if ($exists){
            return true;
        }else{
            return false;
        }
    }

    /**
     * [delete_permission 删除权限]
     * @return  boolean [删除是否成功]
     */
    public static function deletePermission($id){
        $permission = mPermission::findfirst(array(
            'id='.$id
        ));
        return $permission->delete();
    }

    /**
     * [check_permission_by_role_id 判断指定角色有无权限访问]
     * @param  integer $role_id     角色id
     * @param  string  $ctrler_name 控制器名
     * @param  string  $action_name 操作名
     * @return boolean              是否允许访问
     */
    public static function check_permission_by_user_id( $user_id, $ctrler_name, $action_name  ){
        $builder = mPermission::query_builder('p');
        $perrole = '\App\Models\PermissionRole';
        $user = '\App\Models\User';
        $userrole = '\App\Models\UserRole';

        $cond = array(
            'ur.uid = '. $user_id,
            'p.controller_name=\''.$ctrler_name.'\'',
            'p.action_name=\''.$action_name.'\''
        );
        $data = $builder->join($perrole, 'p.id = pr.permission_id', 'pr', 'LEFT')
                        ->join($userrole, 'pr.role_id = ur.role_id', 'ur', 'LEFT')
                        ->where( implode(' AND ', $cond) )
                        ->getQuery()
                        ->execute();

        $data = $data -> toArray();
        if(empty($data)){
            return false;
        }
        else{
            return true;
        }

    }
}
