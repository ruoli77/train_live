/**
 * Created by asus on 2017/4/21.
 */

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

jQuery.extend({

    //ajax扩展
    JsonRpc: function(param, successFunc, async) {
        /*  param.data.udid="12";
         param.data.token='e661ac84b480997cbf24fe9a9bc5c9d861c19812';
         */

        //登录后有param_c的参数，从cookie取出来

        var login_cookie = $.cookie("get", {
            name: 'login'
        });

        login_cookie = $.parseJSON(login_cookie);

        var param_c = {
          /*  udid: '12',
            token: 'e661ac84b480997cbf24fe9a9bc5c9d861c19812',*/
            udid:login_cookie.data.udid,
            token: login_cookie.token
        };

        param = {
            url: param.url,
            data: $.extend(param.data, param_c)
        };
        $.ajax({
            type: "post",
            url: 'postData',
            datatype: "JSON",
            data: param,
            async: async != false,
            success: function (obj) {
                if (typeof(obj) == "object") {
                    successFunc(obj);
                } else {
                    try{
                        //window.location.href = urll;
                        var response = $.parseJSON(obj);
                        if (response.code == 300) {
                            //清除浏览器缓存数据 跳转登录页面，
                            /*$.cookie("delete", {
                                name: 'login'
                            });
                            var login_flag = $.cookie("exist", {
                                name: 'login_flag'
                            });
                            if(login_flag){
                                $.cookie("delete", {
                                    name: 'login_flag'
                                });
                            }
                            localStorage.clear();*/
                            window.location.href = "../../Login/index.html";
                            return false;
                        }else if(response.code == 500){
                            alert("服务器错误，请刷新重试");
                            return false;
                        }
                        successFunc(response);
                    }catch (err){
                        //alert(err);
                        console.log(err);
                        console.log(obj);
                    }
                }
            },
            error: function () {
                console.log("error")
            }
        });

    }
});