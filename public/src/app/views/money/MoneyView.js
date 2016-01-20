 define([
        'app/views/Base',
        'tpl!app/templates/money/MoneyView.html'
       ],
    function (View, template) {

        "use strict";
        return View.extend({
            tagName: 'div',
            className: '',
            template: template,
            events: {
                "click .recharge": "paymentMethod",
                "click .ali, .weix": "recharge",
                "click .money-cancel": "moneyCancel",
                "click .weixinPay": "weixinPay" 
            },
            paymentMethod: function() {
                $(".fonbox").removeClass("blo");
            },
            moneyCancel: function() {
                $(".fonbox").addClass("blo");
            },
            weixinPay:function() {
                var uid = $(".user-message").attr("data-uid");
                var amount = document.getElementById('amount').value * 1000;
                var channel = 'alipay_wap';
                var pay_url = "ping/pay";
                $.post('pay_url',{
                    uid: uid,
                    channel: channel,
                    amount: amount
                },function(){

                    if (xhr.readyState == 4 && xhr.status == 200) {
                        console.log(xhr.responseText);
                        pingpp.createPayment(xhr.responseText, function(result, err) {
                            console.log(result);
                            console.log(err);
                        });
                    }
                });
                
                // var xhr = new XMLHttpRequest();
                // xhr.open("POST", pay_url, true);
                // xhr.setRequestHeader("Content-type", "application/json");
                // xhr.send(JSON.stringify({
                //     channel: channel,
                //     amount: amount
                // }));
                
                // xhr.onreadystatechange = function () {
                //     if (xhr.readyState == 4 && xhr.status == 200) {
                //         console.log(xhr.responseText);
                //         pingpp.createPayment(xhr.responseText, function(result, err) {
                //             console.log(result);
                //             console.log(err);
                //         });
                //     }
                // }
            },
            recharge: function() {
                $(".payment-method").addClass("blo");
                $(".box").removeClass("blo");
            },
            moneyCancel: function() {
                $(".fonbox").addClass("blo");
            }
        });
    });
