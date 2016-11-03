//http://behappy.leanapp.cn/third/task40/index.html
//http://blog.csdn.net/amork/article/details/7257212
//https://github.com/soulclearm/Learn_front_end/blob/dev/public/third/task40/datePicker.js#L10
//http://blog.sina.com.cn/s/blog_a33855c10102ww40.html
var week = [];

(function () {
	var datePicker = function () {
		this.date = new Date();
	}


	datePicker.prototype.render = function () {

	}
}());

// 判断是否为闰年
function is_leap(year){
	return (year%100 == 0 ? (year%400 ? 1 : 0) : (year%4 == 0 ? 1 : 0))
}

//包含每个月天数的数组
var m_days = [31, 28 + isLeap(nowYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//取得当月第一天

var _date = new Date(this.date);



