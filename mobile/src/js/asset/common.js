/**
 * Created by asus on 2017/6/1.
 */

var iService = function(){
    var headerMove = function(index){
        var nav = $("#headerWrapper ul li.nav_click");
        nav.eq(index).children("a").addClass("active").siblings("i").removeClass("displayNone");
        nav.hover(function(){
            $(this).children("a").siblings("i").stop().removeClass("displayNone");
            $(this).children("a").addClass("active");
            //$(this).siblings("i").stop().fadeIn("fast").animateCss("fadeInDown");
        },function(){
            $(this).children("a").siblings("i").stop().addClass("displayNone");
            $(this).children("a").removeClass("active");
            nav.eq(index).children("a").addClass("active").siblings("i").removeClass("displayNone");
        });
        var addr_info = nav.eq(index).html();
        if(index==6){
            addr_info = "消息中心";
            $("#icon_message").addClass("ic_message");
        }else if(index==7){
            addr_info = "个人中心";
        }
        if(index!=6){
            $("#icon_message").parent("li").hover(function(){
                $(this).children("#icon_message").addClass("ic_message");
            },function(){
                $(this).children("#icon_message").removeClass("ic_message");
            });
        }
        /* var user_addr = '<p class="user_site">您的位置：<span>'+addr_info+'</span></p>';
         $(".navWrapper").after(user_addr);*/

        //$(user_addr).prependTo(".navWrapper");
        $("#headerWrapper").find("#personal,#down_load_btn,#message_btn").hover(function(){
            $(this).find("div").stop().slideDown("fast");
        },function(){
            $(this).find("div").stop().slideUp("fast");
        });
    };
    //粉丝等级
    var get_user_leval = function(u_score){
        var u_score_all = [0,3000,18000,40000,100000];
        for(var i=0;i<u_score_all.length-1;i++){
            if(u_score>=u_score_all[i]&&u_score<u_score_all[i+1]){
                u_score_next = u_score_all[i+1] - u_score;
                return i+1;
            }
        }
    };

    function bookHover(){
        $('.viewPlace_add').off('mouseenter mouseleave').on('mouseenter',function(){
            $(this).html("取消订阅");
        }).on('mouseleave',function(){
            $(this).html("已订阅");
        });
    }

    //订阅取消
    var book_Fun = function(that){
        var thisView = $(that);
        var l_id = thisView.data("l_id");
        var req = {
            url:'Homes/booked',
            data:{
                follow:l_id
            }
        };
        $.JsonRpc(req,function(data){
            var status = data.data.status;
            console.log(data);
            thisView.unbind('mouseenter').unbind('mouseleave');
            if(status==10){
                //订阅成功
                thisView.html("已订阅");
                thisView.addClass("viewPlace_add");
                thisView.hover(function(){
                    thisView.html("取消订阅");
                },function(){
                    thisView.html("已订阅");
                });
            }else if(status==20){
                thisView.removeClass("viewPlace_add");
                thisView.html("订阅");
            }

        });
    };

    //关注取消的状态
    var focus_status_btn = function(status,sid){
        var tpl = "";
        if(status==10){
            tpl+=
                '<a data-s_status="'+status+'" data-sid = "'+sid+'" class="focus_btn btn_cancel fr" href="javascript:void(0)">'+
                '已关注'+
                '</a>';
        }else if(status==20){
            tpl+=
                '<a data-s_status="'+status+'" data-sid = "'+sid+'" class="focus_btn btn_confirm fr" href="javascript:void(0)">'+
                '关注'+
                '</a>';
        }
        return tpl;
    };

    //关注取消
    var focus_Fun = function(that){
        var that = $(that);
        var sid = that.data("sid");
        //s_status = that.data("s_status");
        var search_param = {
            url:'Users/subscribe',
            data:{
                follow:sid
            }
        };
        $.JsonRpc(search_param,function(data){
            if(data.data.status==10){
                that.html("已关注")
                    .addClass("btn_cancel")
                    .removeClass("btn_confirm");
            }else if(data.data.status==20){
                that.html("关注")
                    .addClass("btn_confirm")
                    .removeClass("btn_cancel");
            }
        });
    };

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
        headerMove:headerMove,
        focus_Fun:focus_Fun,
        focus_status_btn:focus_status_btn,
        get_user_leval:get_user_leval,
        bookHover:bookHover,
        book_Fun:book_Fun,
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








