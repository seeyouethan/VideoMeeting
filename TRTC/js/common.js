GetFocusedWidthHeight = function () {
    var width = $("#videos-container").width() - 16;
    //根据宽度，获取对应的4:3的高度
    var height = width * 3 / 4 + 6;
    return { height: height, width: width };
 }

 GetFocusedWidthHeightDown = function () {
    var width = $("#videos-container").width() / 3 - 18;
    var height = width * 3 / 4 + 6;
    return { height: height, width: width };
 }

 GetOverLayedWidthHeight = function () {
    var width = $("#videos-container").width() / 2 - 14;
    var height = width * 3 / 4 + 6;
    return { height: height, width: width };
 }
 //关闭当前窗口函数，后面会调用
 CloseWindow = function () {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
       location.href = "about:blank";
    } else {
       window.opener = null;
       window.open('', '_self');
    }
    window.close();
 };