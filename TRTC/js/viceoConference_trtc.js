//RtcMulti部分
DoConnection = function() {
  var connection = new RTCMultiConnection();

  connection.userid = window.uid;

  //connection.extra = { "uid": window.uid }//将oaokcs中的用户id值存放到extra中

  connection.socketURL = "https://rtc.cnki.net/"; //https://www.385073012.cn/

  connection.socketMessageEvent = "video-conference-demo-group01";

  connection.AppID = "okcs-im";
  connection.StartDate = "2019-11-11 11:11:11";
  connection.UserName = "okcs-im";


  connection.session = {
    data: true
  };

  connection.bandwidth = {
    audio: 128, //audio bitrates. Minimum 6 kbps and maximum 510 kbps
    video: 1024 * 2, //video framerates. Minimum 100 kbps; maximum 2000 kbps
    screen: 1024 //screen framerates. Minimum 300 kbps; maximum 4000 kbps
  };
  connection.processSdp = function(sdp) {
    sdp = BandwidthHandler.setApplicationSpecificBandwidth(
      sdp,
      connection.bandwidth,
      !!connection.session.screen
    );
    sdp = BandwidthHandler.setVideoBitrates(sdp, {
      min: connection.bandwidth.video,
      max: connection.bandwidth.video
    });
    sdp = BandwidthHandler.setOpusAttributes(sdp);
    sdp = BandwidthHandler.setOpusAttributes(sdp, {
      stereo: 1,
      //'sprop-stereo': 1,
      maxaveragebitrate: connection.bandwidth.audio * 1000 * 8,
      maxplaybackrate: connection.bandwidth.audio * 1000 * 8,
      //'cbr': 1,
      //'useinbandfec': 1,
      //'usedtx': 1,
      maxptime: 3
    });
    return sdp;
  };

  connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: false,
    OfferToReceiveVideo: false
  };

  connection.iceServers = [
    {
      urls: "stun:www.385073012.cn:3478"
    },
    {
      urls: "turn:www.385073012.cn:3478",
      username: "cnki", //可选
      credential: "123456" //可选
    }
  ];

  connection.videosContainer = document.getElementById("videos-container");

  connection.onmessage = function(event) {
    //收到消息
    /*
              0 表示聊天消息
              1 表示当前正在分享用户个数的消息
              2 表示xxx用户离线的消息
              3 表示xxx用户申请发言
              4 表示主持人同意发言
              5 表示主持人拒绝发言
              6 表示xxx用户停止发言
              7 表示新的观众用户
          */
    if (event.data.type === 0) {
      //聊天消息
      GetMessage(event.data.content);
    } else if (event.data.type === 1) {
      //当前正在分享用户个数的消息
      SetOnLiveUserList(event.data.content);
    } else if (event.data.type === 2) {
      //离线消息

      UserOffline(event.userid);
      var mediaElement = document.getElementById(event.userid);
      if (mediaElement) {
        mediaElement.parentNode.removeChild(mediaElement);
      }
    } else if (event.data.type === 3) {
      GetApplyForSpeech(event.data.content);
    } else if (event.data.type === 4) {
      GetAgreeSpeech(event.data.content);
    } else if (event.data.type === 5) {
      GetDisAgreeSpeech(event.data.content);
    } else if (event.data.type === 6) {
      GetStopSpeech(event.data.content);
    } else if (event.data.type === 7) {
      GetNewAudience(event.data.content);
    }else if (event.data.type === 8) {
      GetNewPhoto(event.data.content);
    }
  };
  connection.onstream = null;


  //用户进入房间即可触发（不分享摄像头也会触发）
  connection.onopen = function(event) {
    //收到其他用户上线，设置其为上线状态
    UserOnline(event.userid);
  };
  connection.onclose = function(event) {
    //收到其他用户离线，设置其为离线状态
    UserOffline(event.userid);
  };
  //关闭浏览器
  connection.onleave = function(event) {
    //
    if (event.userid == window.uid) {
      RemoveOnLiveUser(event.userid);
    }
  };

  connection.closeBeforeUnload = false;
  window.onbeforeunload = function(event) {
    RemoveOnLiveUser(event.userid);
    /*发送离线消息*/
    multiRtc.send({ type: 2, content: event.userid + " leave room" });
    connection.closeSocket();
  };

  connection.openOrJoin(window.groupid, function(isRoomExist, roomid, error) {
    if (error) {
      console.log(error);

      if (error == "Room not available") {
        //重新加入
        setTimeout(function() {
          connection.openOrJoin(window.groupid, function(
            isRoomExist,
            roomid,
            error
          ) {
            if (error) {
              alert("重新加入房间失败");
            } else {
              //设置左侧自己上线
              UserOnline(window.uid);
            }
            if (connection.isInitiator === true) {
              //创建房间
            } else {
              //加入房间
            }
            //分享摄像头/桌面
            ShowCameraOrDesktop();
            window.setInterval(function() {
              connection.socket.emit("", "1");
            }, 10000);
          });
        }, 1000);
      }
    } else {
      //设置左侧自己上线
      UserOnline(window.uid);
    }
    if (connection.isInitiator === true) {
      //创建房间
    } else {
      //加入房间
    }
    //分享摄像头/桌面

    ShowCameraOrDesktop();

    window.setInterval(function() {
      connection.socket.emit("", "1");
    }, 10000);
  });


  return connection;
};

