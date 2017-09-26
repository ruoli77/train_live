/**
 * Created by asus on 2017/6/23.
 */

$(function(){

    //监听 申请加群 系统消息
    function onApplyJoinGroupRequestNotify(notify) {
        webim.Log.warn("执行 加群申请 回调：" + JSON.stringify(notify));
        var timestamp = notify.MsgTime;
        var reportTypeCh = "[申请加群]";
        var content = notify.Operator_Account + "申请加入你的群";
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, timestamp);
    }

//监听 申请加群被同意 系统消息
    function onApplyJoinGroupAcceptNotify(notify) {
        webim.Log.warn("执行 申请加群被同意 回调：" + JSON.stringify(notify));
        var reportTypeCh = "[申请加群被同意]";
        var content = notify.Operator_Account + "同意你的加群申请，附言：" + notify.RemarkInfo;
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }
//监听 申请加群被拒绝 系统消息
    function onApplyJoinGroupRefuseNotify(notify) {
        webim.Log.warn("执行 申请加群被拒绝 回调：" + JSON.stringify(notify));
        var reportTypeCh = "[申请加群被拒绝]";
        var content = notify.Operator_Account + "拒绝了你的加群申请，附言：" + notify.RemarkInfo;
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }
//监听 被踢出群 系统消息
    function onKickedGroupNotify(notify) {
        webim.Log.warn("执行 被踢出群  回调：" + JSON.stringify(notify));
        var reportTypeCh = "[被踢出群]";
        var content = "你被管理员" + notify.Operator_Account + "踢出该群";
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }
//监听 解散群 系统消息
    function onDestoryGroupNotify(notify) {
        webim.Log.warn("执行 解散群 回调：" + JSON.stringify(notify));
        var reportTypeCh = "[群被解散]";
        var content = "群主" + notify.Operator_Account + "已解散该群";
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }
//监听 创建群 系统消息
    function onCreateGroupNotify(notify) {
        webim.Log.warn("执行 创建群 回调：" + JSON.stringify(notify));
        var reportTypeCh = "[创建群]";
        var content = "你创建了该群";
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }
//监听 被邀请加群 系统消息
    function onInvitedJoinGroupNotify(notify) {
        webim.Log.warn("执行 被邀请加群  回调: " + JSON.stringify(notify));
        var reportTypeCh = "[被邀请加群]";
        var content = "你被管理员" + notify.Operator_Account + "邀请加入该群";
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }
//监听 主动退群 系统消息
    function onQuitGroupNotify(notify) {
        webim.Log.warn("执行 主动退群  回调： " + JSON.stringify(notify));
        var reportTypeCh = "[主动退群]";
        var content = "你退出了该群";
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }
//监听 被设置为管理员 系统消息
    function onSetedGroupAdminNotify(notify) {
        webim.Log.warn("执行 被设置为管理员  回调：" + JSON.stringify(notify));
        var reportTypeCh = "[被设置为管理员]";
        var content = "你被群主" + notify.Operator_Account + "设置为管理员";
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }
//监听 被取消管理员 系统消息
    function onCanceledGroupAdminNotify(notify) {
        webim.Log.warn("执行 被取消管理员 回调：" + JSON.stringify(notify));
        var reportTypeCh = "[被取消管理员]";
        var content = "你被群主" + notify.Operator_Account + "取消了管理员资格";
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }
//监听 群被回收 系统消息
    function onRevokeGroupNotify(notify) {
        webim.Log.warn("执行 群被回收 回调：" + JSON.stringify(notify));
        var reportTypeCh = "[群被回收]";
        var content = "该群已被回收";
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }
//监听 用户自定义 群系统消息
    function onCustomGroupNotify(notify) {
        webim.Log.warn("执行 用户自定义系统消息 回调：" + JSON.stringify(notify));
        var reportTypeCh = "[用户自定义系统消息]";
        var content = notify.UserDefinedField;//群自定义消息数据
        showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }

    //监听 群资料变化 群提示消息
    function onGroupInfoChangeNotify(groupInfo) {
        webim.Log.warn("执行 群资料变化 回调： " + JSON.stringify(groupInfo));
        var groupId = groupInfo.GroupId;
        var newFaceUrl = groupInfo.GroupFaceUrl;//新群组图标, 为空，则表示没有变化
        var newName = groupInfo.GroupName;//新群名称, 为空，则表示没有变化
        var newOwner = groupInfo.OwnerAccount;//新的群主id, 为空，则表示没有变化
        var newNotification = groupInfo.GroupNotification;//新的群公告, 为空，则表示没有变化
        var newIntroduction = groupInfo.GroupIntroduction;//新的群简介, 为空，则表示没有变化
        if (newName) {
            //更新群组列表的群名称
            //To do
            webim.Log.warn("群id=" + groupId + "的新名称为：" + newName);
        }
    }

    //发送消息的时候转成json字符串
    var get_msg_string = function(msg,msg_type){
        var msg_json = {
            level: localStorage.level||1,
            userId:loginInfo.identifier,
            headPic:loginInfo.headurl,
            msg:msg,
            nickName:loginInfo.identifierNick,
            userAction:msg_type
        };
        msg_json = JSON.stringify(msg_json);
        //return msg_json.replace(new RegExp(/"/g),'&quot;');
        return msg_json;
    };

    //接收消息的时候转成json对象
    var get_msg_json = function(msg){
        msg = msg.getElems()[0].getContent().getText();
        msg = $.parseJSON(msg);
        msg.level>5?msg.level=5:msg.level;
        return msg;
    };

    //退出大群
    function quitBigGroup() {
        var options = {
            'GroupId': avChatRoomId//群id
        };
        onSendMsg(3);
        webim.quitBigGroup(
            options,
            function (resp) {
                webim.Log.info('退群成功');
                //$("#video_sms_list").find("li").remove();
                //webim.Log.error('进入另一个大群:'+avChatRoomId2);
                //applyJoinBigGroup(avChatRoomId2);//加入大群
            },
            function (err) {
                console.log(err.ErrorInfo);
            }
        );
    }

    //显示一条群组系统消息
    function showGroupSystemMsg(type, typeCh, group_id, group_name, msg_content, msg_time) {
        if(type==5){
            //群被解散
            window.location.href = location.href+'?time='+((new Date()).getTime());
            return false;
        }
        var sysMsgStr = "收到一条群系统消息: type=" + type + ", typeCh=" + typeCh + ",群ID=" + group_id + ", 群名称=" + group_name + ", 内容=" + msg_content + ", 时间=" + webim.Tool.formatTimeStamp(msg_time);
        webim.Log.warn(sysMsgStr);
        console.log(sysMsgStr);
    }
    //        im_group_notice--------------endendendendendendendendendendendendendend

    //监听大群新消息（普通，点赞，提示，红包）
    function onBigGroupMsgNotify(msgList) {
        for (var i = msgList.length - 1; i >= 0; i--) {
            //遍历消息，按照时间从后往前
            var msg = msgList[i];
            //console.warn(msg);
            webim.Log.warn('receive a new avchatroom group msg: ' + msg.getFromAccountNick());
            //显示收到的消息
            showMsg(msg);
        }
    }

    //显示消息（群普通+点赞+提示+红包）
    function showMsg(msg) {
        var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
        var ul, li, paneDiv, textDiv, nickNameSpan, contentSpan;

        fromAccount = msg.getFromAccount();
        if (!fromAccount) {
            fromAccount = '';
        }
        fromAccountNick = msg.getFromAccountNick();
        if (!fromAccountNick) {
            fromAccountNick = '未知用户';
        }
        ul = document.getElementById("video_sms_list");
        var maxDisplayMsgCount = 40;
        //var opacityStep=(1.0/4).toFixed(2);
        var opacityStep = 0.2;
        var opacity;
        var childrenLiList = $("#video_sms_list").children();
        if (childrenLiList.length == maxDisplayMsgCount) {
            $("#video_sms_list").children(":first").remove();
            for (var i = 0; i < maxDisplayMsgCount; i++) {
                opacity = opacityStep * (i + 1) + 0.2;
                $('#video_sms_list').children().eq(i).css("opacity", opacity);
            }
        }

        //礼物列表减少
        var giftListMaxCount = 40;
        var giftChildrenLiList = $(".live-gift-wrap").children();
        if(giftChildrenLiList.length==giftListMaxCount){
            $(".live-gift-wrap").children(":first").remove();
        }

        li = document.createElement("li");
        paneDiv = document.createElement("div");
        paneDiv.setAttribute('class', 'video-sms-pane');
        textDiv = document.createElement("div");
        textDiv.setAttribute('class', 'video-sms-text');
        nickNameSpan = document.createElement("span");

        var colorList = ['red', 'green', 'blue', 'org'];
        var index = Math.round(fromAccount.length % colorList.length);
        var color = colorList[index];
        nickNameSpan.setAttribute('class', 'user-name-' + color);
        nickNameSpan.innerHTML = webim.Tool.formatText2Html(""+fromAccountNick + "");
        contentSpan = document.createElement("span");
        //解析消息
        //获取会话类型，目前只支持群聊
        //webim.SESSION_TYPE.GROUP-群聊，
        //webim.SESSION_TYPE.C2C-私聊，
        sessType = msg.getSession().type();
        //获取消息子类型
        //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
        //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
        subType = msg.getSubType();

        isSelfSend = msg.getIsSend();//消息是否为自己发的
        var msg_test;
        if(msg.getElems()[0].getContent().text){
            msg_test = get_msg_json(msg);
            subType = msg_test.userAction;
        }


        var showtGiftMessage = function(){
            if(msg_test.ids){
                var ids = $.parseJSON(msg_test.ids);
                $.each(ids,function(k){
                    var uid = ids[k].uid;//判断是否是当前用户，是当前用户弹出消息提示中奖
                    var tpl = '<span>'+ids[k].u_nickname+'、</span>';
                    $(tpl).appendTo(".rewarded-list-wrap");
                });
            }
        };
        var MSG_TYPE = {
            "MSG_NONE":0,   //无事件
            "MSG_Text":1,   //文本消息
            "MSG_FANS_ENTERLIVE":2, //粉丝进入直播间
            "MSG_FANS_EXITLIVE":3, //粉丝退出直播间
            "MSG_Like":4,           //点赞消息
            "MSG_BARRAGE":5,        //弹幕消息
            "MSG_STAR_GIFT":6,      //明星发送礼物消息
            "MSG_STAR_RED_PACKAGE":7, //红包消息
            "MSG_FANS_GIFT":8,          //粉丝发送礼物消息
            "MSG_STAR_EXITLIVE":9     //明星退出直播间

        };


        var fansInNum = $(".fans-num");

        switch (subType) {
            case MSG_TYPE.MSG_NONE:     //0
                break;
            case MSG_TYPE.MSG_Text:    //1 文本消息
                var tpl1 =
                    '<li>'+
                    '<div class="inline-bg">'+
                    '<span class="user_leval_mark user_leval_'+msg_test.level+'"></span>'+
                    '<span class="fans-name">'+msg_test.nickName+'</span>'+
                    '<span class="comments_text">：'+msg_test.msg+'</span>'+
                    '</div>'+
                    '</li>';
                $(tpl1).appendTo(ul);
                //$(ul).scrollTop((ul.scrollHeight -ul.offsetHeight));
                $(".comments-wrap").scrollTop($(ul).height()-$(".comments-wrap").height());
                //scrollAuto($(".comments-wrap"));
                break;
            case MSG_TYPE.MSG_FANS_ENTERLIVE:   //2 粉丝 游客进入房间
                fansInNum.html(parseInt(fansInNum.html())+1);
                var tpl2=
                    '<li>'+
                    '<div class="inline-bg">'+
                    '<span class="user_leval_mark user_leval_'+msg_test.level+'"></span>'+
                    '<span class="fans-name">'+msg_test.nickName+'</span>'+
                    '<span class="comments_text">：'+msg_test.msg+'</span>'+
                    '</div>'+
                    '</li>';
                $(tpl2).appendTo(ul);
                $(".comments-wrap").scrollTop($(ul).height()-$(".comments-wrap").height());
                break;
            case MSG_TYPE.MSG_FANS_EXITLIVE:    //3 粉丝 游客离开房间
                fansInNum.html((parseInt(fansInNum.html())-1)<0?1:(parseInt(fansInNum.html())-1));
                var tpl3=
                    '<li>'+
                    '<div class="inline-bg">'+
                    '<span class="user_leval_mark user_leval_'+msg_test.level+'"></span>'+
                    '<span class="fans-name">'+msg_test.nickName+'</span>'+
                    '<span class="comments_text">：'+msg_test.msg+'</span>'+
                    '</div>'+
                    '</li>';
                $(tpl3).appendTo(ul);
                $(".comments-wrap").scrollTop($(ul).height()-$(".comments-wrap").height());
                break;
            case MSG_TYPE.MSG_Like: //4

                break;
            case MSG_TYPE.MSG_BARRAGE:  //5

                break;
            case MSG_TYPE.MSG_STAR_GIFT:   //6明星送礼消息
                showtGiftMessage();
                break;
            case MSG_TYPE.MSG_STAR_RED_PACKAGE:   //7明星发红包消息
                showtGiftMessage();
                break;
            case MSG_TYPE.MSG_FANS_GIFT:  //8
                var gift_msg= msg_test.msg.split(",");
                var tpl6 =
                    '<li>'+
                    '<span class="user_leval_mark user_leval_1"></span>'+
                    '<span class="fans-name">'+msg_test.nickName+'</span>'+
                    '<span class="gift-content">送了鲜花</span>'+
                    //'<span class="icon_mul"></span>'+
                    '<span class="gift-flower gift-flower'+(parseInt(gift_msg[1])+1)+'"></span>'+
                    '</li>';
                //$(tpl6).appendTo(".live-gift-wrap");
                //scrollAuto($(".gift-message-wrap"));
                break;
            case MSG_TYPE.MSG_STAR_EXITLIVE:  //9
                //主播正常关闭直播，离开直播间
                    window.location.href = location.href+'?time='+((new Date()).getTime());
                break;
            /*case webim.GROUP_MSG_SUB_TYPE.COMMON://群普通消息
             var message = $.parseJSON(String(convertMsgtoHtml(msg)));
             var nickName = message.nickName,
             msg = message.msg,
             userId = message.userId,
             headPic= message.headPic,
             userAction =  message.userAction;
             contentSpan.innerHTML = nickName+": "+msg;
             break;
             case webim.GROUP_MSG_SUB_TYPE.REDPACKET://群红包消息
             contentSpan.innerHTML = "[群红包消息]" + convertMsgtoHtml(msg);
             break;
             case webim.GROUP_MSG_SUB_TYPE.LOVEMSG://群点赞消息
             //业务自己可以增加逻辑，比如展示点赞动画效果
             contentSpan.innerHTML = "[群点赞消息]" + convertMsgtoHtml(msg);
             //展示点赞动画
             showLoveMsgAnimation();
             break;*/
            case webim.GROUP_MSG_SUB_TYPE.TIP://群提示消息
                contentSpan.innerHTML = "[群提示消息]" + convertMsgtoHtml(msg);
                break;
        }
        /*    textDiv.appendChild(nickNameSpan);
         textDiv.appendChild(contentSpan);

         paneDiv.appendChild(textDiv);
         li.appendChild(paneDiv);
         ul.appendChild(li);*/
    }

    //监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
    //newMsgList 为新消息数组，结构为[Msg]
    function onMsgNotify(newMsgList) {
        var newMsg;
        for (var j in newMsgList) {
            //遍历新消息
            newMsg = newMsgList[j];
//                        handlderMsg(newMsg);//处理新消息
        }
    }

    var loginInfo = getLogInfo(),
        avChatRoomId = String(iService.getQueryString("channel"));



    //游客信息
   /* var sdkAppID = "{$user.sdkAppID}",
        accountType = "{$user.accountType}",
        identifierNick = "{$user.identifierNick}",//昵称
        headurl = "{$user.headurl}",
        identifier = "{$user.identifier}",
        userSig = "{$user.userSig}",
        avChatRoomId = String(iService.getQueryString("channel"));

    var loginInfo = {
        'sdkAppID': sdkAppID, //用户所属应用id,必填
        'appIDAt3rd': sdkAppID, //用户所属应用id，必填
        'accountType': accountType, //用户所属应用帐号类型，必填
        'identifier': identifier, //当前用户ID,必须是否字符串类型，选填
        'identifierNick': identifierNick, //当前用户昵称，选填
        'userSig': userSig, //当前用户身份凭证，必须是字符串类型，选填
        'headurl': headurl //当前用户默认头像，选填
    };*/

    var selType = webim.SESSION_TYPE.GROUP;
    var selToID = avChatRoomId;//当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
    var selSess = null;//当前聊天会话
    var selSessHeadUrl = ""; //默认群组头像
    var chat_input =  $("#js-talk-ipt"),
        btn_send = $("#js-send-talk-btn");

    //发送消息(普通消息)
    function onSendMsg(msgtype,gift_msg) {
        if (!loginInfo.identifier) {
            //未登录
            if (accountMode == 1) {
                //托管模式
                //将account_type保存到cookie中,有效期是1天
                webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
                //调用tls登录服务
                tlsLogin();
            } else {
                //独立模式
                console.log('========================请填写帐号和票据');
            }
            return;
        }

        if (!selToID) {
            console.log("========================您还没有进入房间，暂不能聊天");
            $("#send_msg_text").val('');
            return;
        }
        //获取消息内容
        var msgtosend;
        if(msgtype==1){
            msgtosend = chat_input.val();
            chat_input.val('').focus();
        }else if(msgtype==8){
            msgtosend = gift_msg;
        }else if(msgtype==3){
            msgtosend = "退出了直播间";
        }
        var msgLen = webim.Tool.getStrBytes(msgtosend);
        if (msgtosend.length < 1) {
            console.log("========================发送的消息不能为空!");
            return;
        }

        var maxLen, errInfo;
        /*   if (selType == webim.SESSION_TYPE.GROUP) {
         maxLen = webim.MSG_MAX_LENGTH.GROUP;
         errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
         } else {
         maxLen = webim.MSG_MAX_LENGTH.C2C;
         errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
         }*/
        if (msgLen > maxLen) {
            console.log(errInfo);
            return;
        }

        if (!selSess) {
            selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        var isSend = true;//是否为自己发送
        var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
        var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
        var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
        var subType;//消息子类型

        if (selType == webim.SESSION_TYPE.GROUP) {
            //群消息子类型如下：
            //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
            //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
            //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
            //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
            //subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
            subType = webim.GROUP_MSG_SUB_TYPE.MSG_NONE;
        } else {
            //C2C消息子类型如下：
            //webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
            subType = webim.C2C_MSG_SUB_TYPE.COMMON;
        }
        subType = msgtype;
        var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
        //解析文本和表情
        var expr = /\[[^[\]]{1,3}\]/mg;
        var emotions = msgtosend.match(expr);
        var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
        if (!emotions || emotions.length < 1) {
            text_obj = new webim.Msg.Elem.Text(get_msg_string(msgtosend,msgtype));
            //text_obj = get_msg_string(msgtosend);
            msg.addText(text_obj);
        } else {
            //有表情
            for (var i = 0; i < emotions.length; i++) {
                tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
                if (tmsg) {
                    text_obj = new webim.Msg.Elem.Text(tmsg);
                    msg.addText(text_obj);
                }
                emotionIndex = webim.EmotionDataIndexs[emotions[i]];
                emotion = webim.Emotions[emotionIndex];
                if (emotion) {
                    face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                    msg.addFace(face_obj);
                } else {
                    text_obj = new webim.Msg.Elem.Text(emotions[i]);
                    msg.addText(text_obj);
                }
                restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
                msgtosend = msgtosend.substring(restMsgIndex);
            }
            if (msgtosend) {
                text_obj = new webim.Msg.Elem.Text(msgtosend);
                msg.addText(text_obj);
            }
        }
        //msg.elems[0].content.text = get_msg_string(msg.elems[0].content);
        webim.sendMsg(msg, function (resp) {
            if (selType == webim.SESSION_TYPE.C2C) {
                //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
                showMsg(msg);
            }
            webim.Log.info("发消息成功");
            if(msgtype==1){
                $("#send_msg_text").val('');
            }
            //hideDiscussForm();//隐藏评论表单
            //showDiscussTool();//显示评论工具栏
            //hideDiscussEmotion();//隐藏表情
        }, function (err) {
            webim.Log.error("发消息失败:" + err.ErrorInfo);
            console.log("========================发消息失败:" + err.ErrorInfo);
        });
    }

    //进入大群
    function applyJoinBigGroup(groupId) {
        var options = {
            'GroupId': groupId//群id
        };
        webim.applyJoinBigGroup(
            options,
            function (resp) {
                //JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
                if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
                    webim.Log.info('进群成功');
                    selToID = groupId;
                    //    进入直播间=========STARTSTARTSTARTSTARTSTARTSTARTSTARTSTARTSTART
                    if (!selSess) {
                        selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
                    }
                    var isSend = true;//是否为自己发送
                    var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
                    var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
                    var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
                    var subType;//消息子类型
                    subType = webim.GROUP_MSG_SUB_TYPE.MSG_NONE;
                    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
                    var msgtosend = "进入了直播间";
                    //解析文本和表情
                    var expr = /\[[^[\]]{1,3}\]/mg;
                    var emotions = msgtosend.match(expr);
                    var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
                    if (!emotions || emotions.length < 1) {
                        text_obj = new webim.Msg.Elem.Text(get_msg_string(msgtosend,webim.GROUP_MSG_SUB_TYPE.MSG_FANS_ENTERLIVE));
                        msg.addText(text_obj);
                    }
                    /*webim.sendMsg(msg, function (resp) {
                        //showMsg(msg);
                        console.log("进群成功+++++++++++++++++");
                        webim.Log.info("发消息成功");
                        //hideDiscussForm();//隐藏评论表单
                        //showDiscussTool();//显示评论工具栏
                        //hideDiscussEmotion();//隐藏表情
                    }, function (err) {
                        webim.Log.error("发消息失败:" + err.ErrorInfo);
                        console.log("========================发消息失败:" + err.ErrorInfo);
                    });*/
                    //    进入直播间=========ENDENDENDENDENDENDENDENDENDEND
                } else {
                    console.log('========================进群失败');
                }
            },
            function (err) {
                if(err.ErrorCode==10010){
                    //console.log("========================房间不存在，主播可能暂时离开房间");
                }
                console.log(err.ErrorInfo);
            }
        );
    }

    //聊天室
    //sdk登录
    function sdkLogin() {
        //监听连接状态回调变化事件
        var onConnNotify = function (resp) {
            switch (resp.ErrorCode) {
                case webim.CONNECTION_STATUS.ON:
                    //webim.Log.warn('连接状态正常...');
                    break;
                case webim.CONNECTION_STATUS.OFF:
                    webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
                    break;
                default:
                    webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
                    break;
            }
        };

        //位于js/demo_base.js中
        //IE9(含)以下浏览器用到的jsonp回调函数
        function jsonpCallback(rspData) {
            //设置jsonp返回的
            webim.setJsonpLastRspData(rspData);
        }
        var onGroupSystemNotifys = {
            //"1": onApplyJoinGroupRequestNotify, //申请加群请求（只有管理员会收到,暂不支持）
            //"2": onApplyJoinGroupAcceptNotify, //申请加群被同意（只有申请人能够收到,暂不支持）
            //"3": onApplyJoinGroupRefuseNotify, //申请加群被拒绝（只有申请人能够收到,暂不支持）
            //"4": onKickedGroupNotify, //被管理员踢出群(只有被踢者接收到,暂不支持)
            "5": onDestoryGroupNotify, //群被解散(全员接收)
            //"6": onCreateGroupNotify, //创建群(创建者接收,暂不支持)
            //"7": onInvitedJoinGroupNotify, //邀请加群(被邀请者接收,暂不支持)
            //"8": onQuitGroupNotify, //主动退群(主动退出者接收,暂不支持)
            //"9": onSetedGroupAdminNotify, //设置管理员(被设置者接收,暂不支持)
            //"10": onCanceledGroupAdminNotify, //取消管理员(被取消者接收,暂不支持)
            "11": onRevokeGroupNotify, //群已被回收(全员接收)
            "255": onCustomGroupNotify//用户自定义通知(默认全员接收)
        };

        //监听事件
        var listeners = {
            "onConnNotify": "", //选填
            "jsonpCallback": "", //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
            "onBigGroupMsgNotify": onBigGroupMsgNotify, //监听新消息(大群)事件，必填
            "onMsgNotify": onMsgNotify, //监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
            "onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
            "onGroupInfoChangeNotify": ""//监听群资料变化事件，选填
        };

        var isAccessFormalEnv = true;//是否访问正式环境

        if (webim.Tool.getQueryString("isAccessFormalEnv") == "false") {
            isAccessFormalEnv = false;//访问测试环境
        }

        var isLogOn = false;//是否在浏览器控制台打印sdk日志

        //其他对象，选填
        var options = {
            'isAccessFormalEnv': isAccessFormalEnv,//是否访问正式环境，默认访问正式，选填
            'isLogOn': isLogOn//是否开启控制台打印日志,默认开启，选填
        };
        //web sdk 登录
        webim.login(loginInfo, listeners, options,
            function (identifierNick) {
                //identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
                webim.Log.info('webim登录成功');
                applyJoinBigGroup(avChatRoomId);//加入大群
//                        hideDiscussForm();//隐藏评论表单
//                        initEmotionUL();//初始化表情
            },
            function (err) {
                console.log(err.ErrorInfo);
            }
        );
    }
    sdkLogin();

   /* window.onbeforeunload = function(event){
        if(notify.ReportType == 5){
        }else {
            quitBigGroup();
        }
    };*/

    //游客发送消息
    btn_send.on("click",function(){
        var chat_val = chat_input.val();
        if(chat_val){
            onSendMsg(1);
        }
    });

});
















