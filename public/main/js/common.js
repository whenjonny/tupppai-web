//唤起登录框
function call_login_modal() {
    var loginModal = $('[data-remodal-id=login-modal]').remodal();
    if (loginModal.getState() == 'closed') {
        loginModal.open();    
    }
}

/**
 * 对ajax请求的二次封装
 * 对后台返回的信息进行统一处理
 *
 * @author brandwang
 */
function psAjax(url, type, params, callback) {
    $.ajax({
        url: url,
        type: type,
        data: params,
        success: function(data) {
            //请求失败
            if (data.ret == 0) {
                //user not login
                if (data.code == 1) {
                    call_login_modal();
                } else {
                    //TODO error handler
                    console.log('error');        
                }    
            } else {
                //成功后执行回调
                callback;
            }
        },
        error: function(info) {
            console.log(info);
        }
    });
}
