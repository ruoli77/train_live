/**
 * Created by asus on 2017/6/1.
 */

var iService = function(){
    function getUserAgent(){
        var u = navigator.userAgent,
            isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
            isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            agent = {
                isAndroid:isAndroid,
                isiOS:isAndroid
            };
        return agent;
    }
    //获取链接参数
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = decodeURI(window.location.search.substr(1)).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    //获取当前日期
    function getNowFormatDate(pattern) {
        var date = new Date();
        var seperator1 = pattern;
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
    /**
     * 描述：日期增加/减少天数
     * @author zhou zheng
     * @param date   string日期格式，格式可以为：yyyyMMdd、yyyy-MM-dd、yyyy/MM/dd、yyyy,MM,dd  注意：月和日必须都是2位
     * @param value  整型  正数或负数   正数：代表增加；负数：代表减少
     * @returns new_date   8位长的日期字符串 格式：yyyyMMdd
     */

    function AddDaysUtil(date,value,pattern)
    {
        date=getDateFromString(date);
        var new_date=new Date(date.setDate(date.getDate()+value));
        return turnDateToString(new_date,pattern);
    }
    //转化时间
    function timeFormat(time){
        return String(time).slice(0,16).replace(/-/g,".").replace(/ /,"-");
    }

    /**
     * 描述：将日期格式化
     * @author zhou zheng
     * @param date Date 类型
     * @param pattern -  或   ， 或   /  或  空字符串
     * @returns {String}
     */
    function turnDateToString(date,pattern)
    {
        return date.getFullYear()+pattern+((date.getMonth()+1)<10?("0"+(date.getMonth()+1)):(date.getMonth()+1))+pattern+(date.getDate()<10?("0"+date.getDate()):date.getDate());
    }

    //加法
    function accAdd(arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    }

    //减法
    function accSub(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }

    function inputAnimate(input_now){
        $(input_now).off("focus").on("focus",function(){
            $(this).stop().animate({"height":"100px"}, "fast");
        });
        $(input_now).off("blur").on("blur",function(){
            if($(this).val()==""){
                $(this).stop().animate({"height":"28px"}, "fast");
            }
        });
    }

    function imgNoFind(that){
        that.setAttribute('src','/themes/show/public/assets/img/logo.png');
    }

    return{
        getUserAgent:getUserAgent,
        getQueryString:getQueryString,
        timeFormat:timeFormat,
        accAdd:accAdd,
        accSub:accSub,
        getNowFormatDate:getNowFormatDate,
        AddDaysUtil:AddDaysUtil,
        turnDateToString:turnDateToString,
        inputAnimate:inputAnimate,
        imgNoFind:imgNoFind
    }
}();


/*$('body').bind('contextmenu', function(e) {
    e.preventDefault();
});

$('body').on('touchstart','.mui-popup-button',function(){
    $(this).addClass('yui-touch');
}).on('touchend','.mui-popup-button',function(){
    $(this).removeClass('yui-touch');
});*/











