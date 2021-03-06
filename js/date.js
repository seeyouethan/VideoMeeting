/*日期格式化函数*/
window.Date.prototype.Format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

var change=function (t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
}
//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
/**
 * 获取指定日期的周的第一天、月的第一天、季的第一天、年的第一天
 * @param date new Date()形式，或是自定义参数的new Date()
 * @returns 返回值为格式化的日期，xxxx年xx月xx日
 */
function timeFormat(date) {
    if (!date || typeof (date) === "string") {
        this.error("参数异常，请检查...");
    }
    var y = date.getFullYear(); //年
    var m = date.getMonth() + 1; //月
    var d = date.getDate(); //日
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }

    return y + "年" + m + "月" + d + "日";
}

function timeFormatGetYearMonth(date) {
    if (!date || typeof (date) === "string") {
        this.error("参数异常，请检查...");
    }
    var y = date.getFullYear(); //年
    var m = date.getMonth() + 1; //月
    if (m < 10) {
        m = "0" + m;
    }
    var d = date.getDate(); //日
    return y + "年" + m + "月";
}

//获取这周的第一天
function getFirstDayOfWeekString(date) {
    var tempdate = new Date(date);
    var weekday = tempdate.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
    tempdate.setDate(tempdate.getDate() - weekday + 1);//往前算（weekday-1）天，年份、月份会自动变化
    return timeFormat(tempdate);
}
function getFirstDayOfWeek(date) {
    var tempdate = new Date(date);
    var weekday = tempdate.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
    tempdate.setDate(tempdate.getDate() - weekday + 1);//往前算（weekday-1）天，年份、月份会自动变化
    return tempdate;
}
//获取这周的周的最后一天
function getLastDayOfWeekString(date) {
    var tempdate = new Date(date);
    var weekday = tempdate.getDay() || 7;
    tempdate.setDate(tempdate.getDate() + 7 - weekday);
    return timeFormat(tempdate);
}
function getLastDayOfWeek(date) {
    var tempdate = new Date(date);
    var weekday = tempdate.getDay() || 7;
    tempdate.setDate(tempdate.getDate() + 7 - weekday);
    return tempdate;
}

//获取当月第一天
function getFirstDayOfMonthString(date) {
    var tempdate = new Date(date);
    tempdate.setDate(1);
    return timeFormat(tempdate);
}

function getFirstDayOfMonth(date) {
    var tempdate = new Date(date);
    tempdate.setDate(1);
    return tempdate;
}
//获取当月最后一天
function getLastDayOfMonthString(date) {
    var tempdate = new Date(date);
    tempdate.setMonth(tempdate.getMonth() + 1);
    tempdate.setDate(1);
    tempdate.setDate(tempdate.getDate() - 1);
    return timeFormat(tempdate);
}

function getLastDayOfMonth(date) {
    var tempdate = new Date(date);
    tempdate.setMonth(tempdate.getMonth() + 1);
    tempdate.setDate(1);
    tempdate.setDate(tempdate.getDate() - 1);
    return tempdate;
}

//获取当季第一天
function getFirstDayOfSeason(date) {
    var month = date.getMonth();
    if (month < 3) {
        date.setMonth(0);
    } else if (2 < month && month < 6) {
        date.setMonth(3);
    } else if (5 < month && month < 9) {
        date.setMonth(6);
    } else if (8 < month && month < 11) {
        date.setMonth(9);
    }
    date.setDate(1);
    return timeFormat(date);
}

//获取当年第一天
function getFirstDayOfYear(date) {
    date.setDate(1);
    date.setMonth(0);
    return timeFormat(date);
}
var weekday = new Array(7);
weekday[0] = "星期天";
weekday[1] = "星期一";
weekday[2] = "星期二";
weekday[3] = "星期三";
weekday[4] = "星期四";
weekday[5] = "星期五";
weekday[6] = "星期六";


function geWeekString(date) {
    return weekday[date.getDay()];
}

/**
 * 从C#的Datatime格式通过Json传到Js里面，时间会显示成时间戳/Date(1354116249000)/ 使用这个函数转换为正常的时间
 * @param {} str 
 * @returns {} 
 */
function JsonDate2Date(str) {
    return new Date(parseInt(str.substr(6, 13))).toLocaleDateString();
}

/**
 * 往往json传过来的时间都是"/Date(1405056837780)/" 转换需要的方法
 * @param {} format 
 * @returns {} 
 */
window.String.prototype.ToString = function (format) {
    var dateTime = new Date(parseInt(this.substring(6, this.length - 2)));
    format = format.replace("yyyy", dateTime.getFullYear());
    format = format.replace("yy", dateTime.getFullYear().toString().substr(2));
    if (dateTime.getMonth() + 1 < 10) {
        format = format.replace("MM", "0" + (dateTime.getMonth() + 1));
    } else {
        format = format.replace("MM", dateTime.getMonth() + 1);
    }
    if (dateTime.getDate() < 10) {
        format = format.replace("dd", "0" + dateTime.getDate());
    } else {
        format = format.replace("dd", dateTime.getDate());
    }
    if (dateTime.getHours() === 0) {
        format = format.replace("hh", "00");
    } else if (dateTime.getHours()<10) {
        format = format.replace("hh", "0" + dateTime.getHours());
    } else {
        format = format.replace("hh", dateTime.getHours());
    }
    if (dateTime.getMinutes() === 0) {
        format = format.replace("mm", "00");
    } else if (dateTime.getMinutes()<10) {
        format = format.replace("mm", "0"+dateTime.getMinutes());
    }else {
        format = format.replace("mm", dateTime.getMinutes());
    }
    if (dateTime.getSeconds() === 0) {
        format = format.replace("ss", "00");
    } else if (dateTime.getSeconds()<10) {
        format = format.replace("ss", "0" + dateTime.getSeconds());
    }else {
        format = format.replace("ss", dateTime.getSeconds());
    }

    format = format.replace("mm", dateTime.getMinutes());
    format = format.replace("ss", dateTime.getSeconds());
    format = format.replace("ms", dateTime.getMilliseconds());
    return format;
};

function dateOrder(objectArr,flag) {
    var dates;
    if (flag === 1) {
        dates = objectArr.sort(
            function(a, b) {
                return (new Date(a.PostDate.date.replace(/-/g, '/')).getTime() - new Date(b.PostDate.date.replace(/-/g, '/')).getTime());
            }
        );
    } else {
        dates = objectArr.sort(
            function(a, b) {
                return (new Date(b.PostDate.date.replace(/-/g, '/')).getTime() - new Date(a.PostDate.date.replace(/-/g, '/')).getTime());
            }
        );
    }
};
