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
    JsonRpc: function(param, successFunc, me, async) {
        var param_public = {
            //token:'W2JVbVE3UzYKYQFkUGBXMg5kAjMHYg==',
            //token:'XGUDNFU3AG0ObQNtX2EBbQtrATsBYg==',
            //token:'CjMDNFs5Uj8ObQJsBDoNYQBgAjgIaw==',
            //channel:'201314-59bf7148'
        };
        var url = 'http://192.168.1.111:8090/v001/'+param.postData;
        //var url = 'http://train.api.livestaring.com/v001/'+param.postData;
        param = $.extend(param.data,param_public);
        $.ajax({
            type: "post",
            url: url,
            datatype: "JSON",
            data: param,
            async: async != false,
            success: function (obj) {
                if (typeof(obj) == "object") {
                    successFunc(obj);
                } else {
                    try{
                        //window.location.href = urll;\
                        var arr = obj.split('<link');
                        obj = arr[0];
                        var response = $.parseJSON(obj);
                        if(response.code == 400){
                            mui.alert(response.data.message,' ',function(){
                            });
                            if(me){
                                me.resetload();
                            }
                            return false;
                        } else if(response.code == 300){
                            mui.alert(response.data.message,' ',function(){
                                //调用安卓方法
                            });
                            if(me){
                                me.resetload();
                            }
                            return false;
                        }
                       if(response.code == 500){
                            alert("服务器错误，请刷新重试");
                            if(me){
                                me.resetload();
                            }
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
                console.log("error");
                if(me){
                    me.resetload();
                }
            }
        });

    }
});