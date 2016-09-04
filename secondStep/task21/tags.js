var arr =[];
var hash = {};

var tag_entry = document.querySelector('input[name=single-Tag]');
var tag_show = document.querySelector('.single-show');




// 事件绑定兼容
function addEventHandler(ele, event, handler) {
	if (ele.addEventListener) {
		ele.addEventListener(event, handler, false);
	} else if (ele.attachEvent) {
		ele.attachEvent("on" + event, handler);
	} else {
		ele["on" + event] = handler;
	}
}

function bind() {
	addEventHandler(tag_entry, 'keyup', showTag);
}

function showTag() {
	
	if (this.value === "") return;
	
	
	var data;

	if (this.name === "single-Tag") {

		// 感觉这里的实现不好，也许一个一个字符键值匹配会好一点
		if (/[^a-zA-Z0-9\u4e00-\u9fa5\']+/.test(this.value) || event.keyCode == 13) {
			data = this.value.trim().split(/[^a-zA-Z0-9\u4e00-\u9fa5]+/)[0];
			// 这里采用hash的方法去重
			if (!hash[data]) {

				hash[data] = true;
				arr.push(data);

				if (arr.length > 10) {
					// 通过添加节点的方式显示，避免全部渲染影响速度
					tag_show.removeChild(tag_show.firstChild);
					delete hash[arr[0]];
					arr.shift();
				}

			} else {
				this.value = "";
				return;
			}
			render(data);
			this.value = "";

		}

	}

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
function render(item) {
	var div = document.createElement("div");
	div.setAttribute("class", "tag");
	div.innerText = item;
	tag_show.appendChild(div);
}

function init() {
	bind();
}

init();

