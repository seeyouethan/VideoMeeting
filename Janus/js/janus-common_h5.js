//渲染对应的video标签和其他Html元素
// uid表示当前用户的id  创建的容器，都添加到了id为 videos-container 的div中
// videoid表示video标签的id,这个id是trtc生成的id selfRtc.localStream_.getId()
// config表示一些配置 里面包含了一些onclick方法以及一些属性等等
function CreatePlayerElement(config) {
    var uid = config.uid;
    //如果有，先移除这个div 防止重复添加
    RemovePlayerElement(uid);

    var width = $("#videos-container").width();
    if (getFocusedStatus()) {
        //主持人状态
        width = width - 16;
    } else {
        //平铺状态
        width = width / 2 - 14;
    }
    var mediaElementContainer = document.createElement('div');
    mediaElementContainer.className = 'vctb-item';
    mediaElementContainer.setAttribute('data-uid', uid);
    mediaElementContainer.setAttribute('id', "div_" + uid);
    
    //姓名标签和右下角的功能标签
    var mediaBox = document.createElement('div');
    mediaBox.className = 'media-box';
    mediaBox.setAttribute('id', uid);
    mediaBox.style.width = width + 'px';
    mediaElementContainer.appendChild(mediaBox);
    var h2 = document.createElement('span');
    if (config.realName && config.realName != "") {
        h2.innerHTML = config.realName;
    } else {
        h2.innerHTML = getTrueNameByUserid(config.uid);
    }
    h2.className = 'video-title';
    mediaBox.appendChild(h2);
    mediaElementContainer.style.width = width + "px";
    mediaElementContainer.style.height = width * 3 / 4 + 6 + "px";
    //video标签
    var mediaElement = document.createElement('video');
    mediaElement.className = 'media-video';
    mediaElement.setAttribute('id', config.videoid);
    try {
        mediaElement.setAttributeNode(document.createAttribute('autoplay'));
        mediaElement.setAttributeNode(document.createAttribute('playsinline'));
        mediaElement.setAttributeNode(document.createAttribute('controls'));
    } catch (e) {
        mediaElement.setAttribute('autoplay', true);
        mediaElement.setAttribute('playsinline', true);
    }

    if (config.mediaStream) {
        mediaElement.srcObject = mediaStream;
    }

    //防止暂停
    mediaElement.addEventListener('pause', function () {
        //暂停开始执行的函数
        mediaElement.play();
    });
    mediaElement.onclick = function () {
        SetFocus("div_" + uid);
    };

    mediaElementContainer.appendChild(mediaElement);
    if (config.gdVideo) {
        //有挂断标签，表示是自己的视频界面，添加到第一个
        $(mediaElementContainer).prependTo($("#videos-container"));
        //自己把自己的video静音
        mediaElement.muted = true;
        mediaElement.volume = 0;
    } else {
        document.getElementById('videos-container').appendChild(mediaElementContainer);
    }
    return mediaElement;
}


function RemovePlayerElement(uid) {
    var ele = $("#videos-container div[data-uid='" + uid + "']");
    if (ele.length > 0) {
        ele.remove();
    }
}




//全屏功能
function launchFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}


function getTrueNameByUserid(uid) {
    var ele = $(".member-ul li[data-uid='" + uid + "']");
    if (ele.length !== 0) {
        return ele.attr("data-title");
    }
    return "";
}
