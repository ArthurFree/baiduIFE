<<<<<<< HEAD
/**
 * @arthor: LC
 * @param  {[type]} tags [description]
 * @return {[type]}      [description]
 * 
 */
!(function(tags) {

	'use strict';
debugger
	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		define(tags);

	} else if (typeof module !== 'undefined' && module.exports) {

		module.exports = tags();

	} else {

		window.tags = tags();

	}

})(function() {

	'use strict';

debugger
	// 默认参数
	var _config = {
		// 标签字体颜色
		color : "white",

		// 标签背景颜色
		bkgColor : "rgb(0,140, 214)",

		// 标签宽度
		width : 100,

		// 标签高度
		height : 50,

		// 是否可删除
		isDelete : true,

		// 标签形状 ['rectangle', 'circular']
		// rectangle - 方形 ; circular - 圆形
		tagShape : 'rectangle',

		// 生成标签之前执行
		beforeExec : null,

		// 生成标签之后执行
		afterExec : null,

		// 监听事件列表
		eventList : ['click', 'mouseover']

	}

	// var _this = new tags();
	
	// 覆盖参数
	for (var key in config) {
		_config[key] = config[key];
	}

	// 构造函数
	function tags(inElem, outElem, config) {

		/*对外接口*/

		// 输入元素
		this.inElem = inElem;

		// 输出元素
		this.outElem = outElem;

		// 初始化函数
		this.init = init.bind(null, inElem, outElem, config);

		// 创建标签
		this.createTag = null;

		// 删除标签
		this.deleteTag = null;
	}


	function apartData() {
console.log(this);
		var str = inElem.value.trim();
		var arr;

		if (str === "") return;
		arr = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(elem) {
			if (elem != null && elem.length > 0) {
				return true;
			} else {
				return false;
			}
		});

		return arr;

	}

	/*
	 * .tag { 
	 * 		display: inline-block; 
	 * 		width: 50px; 
	 * 		height: 20px; 
	 * 		text-align: center; 
	 * 		line-height: 20px;
	 * 		margin: 20px 20px 0 0; 
	 * }
	 * 
	 */

	function render(arr) {

		if(arr.length == 0) return;

		for(var i = 0;i < arr.length;i++) {
			
			var div = document.createElement("div");

			div.innerText = arr[i];
			createStyle(div);
			outElem.appendChild(div);

		}

	}


	function createStyle(elem) {

		elem.setAttribute("class", "tag");

		elem.style.backgroundColor = _config.bkgColor;
		elem.style.color = _config.color;
		elem.style.width = _config.width + "px";
		elem.style.height = _config.height + "px";

	}

	function bind() {
		var confirm = document.querySelector(".tag-confirm");
		var arr;

		confirm.addEventListener('click', function() {
			debugger
			arr = apartData();
			render(arr);
		}, false);
	};

	function init() {
		bind();
	}


	return tags;
});
=======
/**
 * @arthor: LC
 * @param  {[type]} tags [description]
 * @return {[type]}      [description]
 * 
 */
!(function(tags) {

	'use strict';
debugger
	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		define(tags);

	} else if (typeof module !== 'undefined' && module.exports) {

		module.exports = tags();

	} else {

		window.tags = tags();

	}

})(function() {

	'use strict';

debugger
	// 默认参数
	var _config = {
		// 标签字体颜色
		color : "white",

		// 标签背景颜色
		bkgColor : "rgb(0,140, 214)",

		// 标签宽度
		width : 100,

		// 标签高度
		height : 50,

		// 是否可删除
		isDelete : true,

		// 标签形状 ['rectangle', 'circular']
		// rectangle - 方形 ; circular - 圆形
		tagShape : 'rectangle',

		// 生成标签之前执行
		beforeExec : null,

		// 生成标签之后执行
		afterExec : null,

		// 监听事件列表
		eventList : ['click', 'mouseover']

	}

	// var _this = new tags();
	
	// 覆盖参数
	for (var key in config) {
		_config[key] = config[key];
	}

	// 构造函数
	function tags(inElem, outElem, config) {

		/*对外接口*/

		// 输入元素
		this.inElem = inElem;

		// 输出元素
		this.outElem = outElem;

		// 初始化函数
		this.init = init.bind(null, inElem, outElem, config);

		// 创建标签
		this.createTag = null;

		// 删除标签
		this.deleteTag = null;
	}


	function apartData() {
console.log(this);
		var str = inElem.value.trim();
		var arr;

		if (str === "") return;
		arr = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(elem) {
			if (elem != null && elem.length > 0) {
				return true;
			} else {
				return false;
			}
		});

		return arr;

	}

	/*
	 * .tag { 
	 * 		display: inline-block; 
	 * 		width: 50px; 
	 * 		height: 20px; 
	 * 		text-align: center; 
	 * 		line-height: 20px;
	 * 		margin: 20px 20px 0 0; 
	 * }
	 * 
	 */

	function render(arr) {

		if(arr.length == 0) return;

		for(var i = 0;i < arr.length;i++) {
			
			var div = document.createElement("div");

			div.innerText = arr[i];
			createStyle(div);
			outElem.appendChild(div);

		}

	}


	function createStyle(elem) {

		elem.setAttribute("class", "tag");

		elem.style.backgroundColor = _config.bkgColor;
		elem.style.color = _config.color;
		elem.style.width = _config.width + "px";
		elem.style.height = _config.height + "px";

	}

	function bind() {
		var confirm = document.querySelector(".tag-confirm");
		var arr;

		confirm.addEventListener('click', function() {
			debugger
			arr = apartData();
			render(arr);
		}, false);
	};

	function init() {
		bind();
	}


	return tags;
});
>>>>>>> corporation
