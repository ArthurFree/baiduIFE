(function(window) {

	'use strict';

	window["lc"] = window["lc"] || {};

	window.lc.tags = tags;

	var arr = [];
	var hash = {};

	function tags(config) {
		var _config = {
			type: "single",		// 类型选择 单项触发 或者 多项触发
			Ielem: null,		// 输入DOM元素
			Oelem: null,		// 输出DOM元素
			confirmBtn: null	// 插入按钮元素
		}

		for(var key in _config) {
			_config[key] = config[key];
		}
		// 暴露初始化函数
		this.init = init.bind(null, _config);
	}

	function init(config) {
		bind(config);
	}

	function bind(config) {
		if (config.type === "single") {
			addEventHandler(config.Ielem, 'keyup', showTag.bind(config.Ielem, config));
			// addEventHandler(config.Ielem, 'keyup', function() {
			// 	showTag.call(this, config);
			// });
		} else if (config.type === "multiple") {
			addEventHandler(config.confirmBtn, 'click', showTag.bind(config.Ielem, config));
		}
	}

	function showTag(config) {
	
		if (this.value === "") return;
		
		var data;

		if (config.type === "single") {
			// 感觉这里的实现不好，也许一个一个字符键值匹配会好一点
			if (/[^a-zA-Z0-9\u4e00-\u9fa5\']+/.test(this.value) || event.keyCode == 13) {
				data = this.value.trim().split(/[^a-zA-Z0-9\u4e00-\u9fa5]+/)[0];
				// 这里采用hash的方法去重
				if (!hash[data] && data !== "") {

					hash[data] = true;
					arr.push(data);

					if (arr.length > 10) {
						// 通过添加节点的方式显示，避免全部渲染影响速度
						config.Oelem.removeChild(config.Oelem.firstChild);
						delete hash[arr[0]];
						arr.shift();
					}

				} else {
					this.value = "";
					return;
				}
				render(data, config);
				this.value = "";

			}

		} else if (config.type === "multiple") {

			data = this.value.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);

			if (data.length > 10 && arr.length < 10) {
				data = data.slice(0, 10);
			}

			for(var i = 0;i < data.length;i++) {
				// 去重
				if (!hash[data[i]] && data[i] !== "") {
					
					hash[data[i]] = true;
					arr.push(data[i].trim());

					if (arr.length > 10) {
						delete hash[arr[0]];
						arr.shift();
						config.Oelem.removeChild(config.Oelem.firstChild);
					}
					// 渲染
					render(arr[arr.length-1], config);
				}
			}
		}

	}


	function render(item, config) {
		var div = document.createElement("div");
		div.setAttribute("class", "tag");
		div.innerText = item;
		// 鼠标划入时，改变样式
		addEventHandler(div, 'mouseover', function() {
			div.style.backgroundColor = "red";
			div.innerText = "删除" + item;
		});
		// 鼠标划出时，恢复样式
		addEventHandler(div, 'mouseout', function() {
			div.style.backgroundColor = 'rgb(0, 140, 214)';
			div.innerText = item;
		});
		// 鼠标点击时，删除节点，并删除数组与对象中存储的数据
		addEventHandler(div, 'click', function(event) {
			console.log(event.target);
			for(var i = 0;i< arr.length;i++) {
				if (arr[i] === item) {
					delete hash[arr[i]];
					arr.splice(i, 1);
				}
			}
			config.Oelem.removeChild(event.target);
		});
		config.Oelem.appendChild(div);
	}

	function addEventHandler(ele, event, handler) {
		if (ele.addEventListener) {
			ele.addEventListener(event, handler, false);
		} else if (ele.attachEvent) {
			ele.attachEvent("on" + event, handler);
		} else {
			ele["on" + event] = handler;
		}
	}


})(window);



/**
 *
 *
 *	使用方法：
 *
 *		var tag = new window.lc.tags({
 *			type: 'single',
 *			Ielem: document.getElementById("inElem"),
 *			Oelem: document.getElementById("outElem"),
 *			confirmBtn: document.getElementById("insert"),
 *		});
 *
 *		tag.init();
 * 
 * 
 */