//http://behappy.leanapp.cn/third/task40/index.html
//https://github.com/soulclearm/Learn_front_end/blob/dev/public/third/task40/datePicker.js#L10
//http://blog.csdn.net/amork/article/details/7257212
//http://blog.sina.com.cn/s/blog_a33855c10102ww40.html

//构造函数
var dateTimePicker = function (container) {
	this.date = new Date();
	this.container = container;
	this.table = document.createElement("table");
	this.m_days = [31, 28 + this.is_Leap(this.date), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
}

//判断是否是闰年
dateTimePicker.prototype.is_Leap = function (date) {
	var year = date.getFullYear();
	return (year%100 == 0 ? (year%400 == 0 ? 1 : 0) : (year%4 == 0 ? 1 : 0));
}

//判断当月第一天是周几
dateTimePicker.prototype.getFirstDay = function (date) {
	var firstDay = new Date(date);
	firstDay.setDate(1);
	return firstDay.getDay();
}

//渲染数据
dateTimePicker.prototype.renderData = function (date) {
	var temp_date = new Date(date);
	var firstDayWeek = this.getFirstDay(date);
	var tr_total = Math.ceil((this.m_days[this.date.getMonth()] + firstDayWeek)/7);

	for (var i = 0;i < tr_total;i++){
		var tr = document.createElement("tr");
		for(var j = 0;j < 7;j++){
			temp_date = new Date(date);
			var td = document.createElement("td");
			temp_date.setDate(i*7+j-firstDayWeek+1)
			td.innerText = temp_date.getDate();
			tr.appendChild(td);
		}
		this.table.querySelector("tbody").appendChild(tr);
	}
}

//创建日历结构
dateTimePicker.prototype.createTemplate = function () {
	var thead = document.createElement("thead");
	var tbody = document.createElement("tbody");
	var tfoot = document.createElement("tfoot");

	this.table.appendChild(thead);
	this.table.appendChild(tbody);
	this.table.appendChild(tfoot);

	this.container.appendChild(this.table);
}

//初始化函数
dateTimePicker.prototype.init = function () {
	 

	this.createTemplate();

	this.renderData(this.date);

	this.container.appendChild(this.table);
}


var container = document.querySelector(".dateTimePicker");
var show = document.querySelector(".show");
var dtp = new dateTimePicker(container);

show.addEventListener('click', function () {
	dtp.init();
}, false);


