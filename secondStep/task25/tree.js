// 参考jsTree:  https://github.com/vakata/jstree
// 参考： https://github.com/leegent/leegent.github.io/blob/master/ife2016/task25/task25.js

function TreeNode(config) {
	this.container = config.container;
	this.initNode = config.core.data;
}

/**
 * 初始化函数
 * @return {[type]} [description]
 */
TreeNode.prototype.init = function () {
	var initNode = this.initNode;
	var tempArr = [];
	// 判断初始树结构是否为空
	if (initNode == null || initNode.length == 0) return alert("请创建初始节点");

	for(var i = 0;i < initNode.length;i++) {
		if (initNode[i].parent == "#") {
			// var div = document.createElement("div");
			// div.setAttribute("id", initNode[i].id);
			// div.innerText = initNode[i].text;
			// this.container.appendChild(div);
			
			this.addNode(this.container, initNode[i].id, initNode[i].text, true);

		} else {
			var parent = document.getElementById(initNode[i].parent);
			// 判断初始化节点的父节点是否已渲染到页面
			// 是 —— 添加节点到父节点
			if (parent) {
				// var div = document.createElement("div");
				// div.setAttribute("id", initNode[i].id);
				// div.innerText = initNode[i].text;
				// parent.appendChild(div);
				
				this.addNode(parent, initNode[i].id, initNode[i].text, false);
			} else {
				// 否 —— 将此节点信息推入栈
				tempArr.push(initNode[i]);
			}
		}
	}

	// 所有节点渲染完成后，判断是否有节点还未添加
	if (tempArr.length > 0) {
		// 遍历存储栈，再次判断未插入节点的父节点是否存在
		// 存在 —— 将节点添加到父节点后
		// 不存在 —— 输出提示信息
		for(var j = 0;j < tempArr.length;j++) {
			var tempParentNode = document.getElementById(tempArr[j].parent);
			if (tempParentNode) {
				// var temp_div = document.createElement("div");
				// temp_div.setAttribute("id", tempArr[i].id);
				// temp_div.innerText = tempArr[i].text;
				// tempParentNode.appendChild(temp_div);
				
				this.addNode(tempParentNode, tempArr[i].id, tempArr[i].text, false);
			} else {
				alert("未找到 " + tempArr[i].id + " 该节点的父节点");
			}
		}
	}

	bind(this.container, this.toggleFold);
}


TreeNode.prototype.addNode = function (targetNode, id, text, isRoot) {
	// 最外层节点
	var outside_node = document.createElement("div");
	// 节点中的文字内容
	var header_node = document.createElement("div");
	// 添加节点属性
	outside_node.setAttribute("id", id);
	if (isRoot) {
		outside_node.setAttribute("class", "outside_node actived");
	} else {
		outside_node.setAttribute("class", "outside_node hidden");
	}
	
	header_node.setAttribute("class", "header_node");
	header_node.innerText = text;

	outside_node.appendChild(header_node);
	targetNode.appendChild(outside_node);
}

// 此种DOM构建方法感觉不是很好
// 另外的一种构建的想法是 父节点下只包含两个节点，一个作为title展示，另一个保存所有的Child节点
TreeNode.prototype.toggleFold = function (elem) {
	var children = elem.children;
	
	for(var i = 1;i < children.length;i++) {
		if (children[i].className == "outside_node active") {
			children[i].className = "outside_node hidden";
		} else {
			children[i].className = "outside_node active";
		}
	}
}

// mouseenter -- 在鼠标从元素外部首次移动到元素范围之内时触发
// 
// mouseover -- 在鼠标位于一个元素外部，首次移入另一个元素的边界之内时触发
// 
// mousemove -- 在鼠标在元素内移动时重复地触发

// 当点击某一节点时，
function bind(container, toggleFold) {
	var headers = document.querySelectorAll(".header_node");
	var count = 0; // 测试click事件执行了多少次
	addHandler(container, 'mouseenter', function (event) {
		var parent = event.target.parentNode;
		if (parent.children.length > 1) {
			addHandler(event.target, 'click', toggle);
		}
	});

	addHandler(container, 'mouseleave', function (event) {
		var parent = event.target.parentNode;
		if (parent.children.length > 1) {
			removeHandler(event.target, 'click', toggle);
		}
	});

	function toggle(event) {
		if (event.target.className == "header_node") {
			toggleFold(event.target.parentNode);
		} else {
			return;
		}
	}
}

/**
 * data structure
 * 初始化节点结构
 */
/*var config = {
	'container': document.querySelector(".main"),
	'core': {
		'data': [
			// 根节点
			{"id": "root", "parent": "#", "text": "前端工程师"},
			// 二级节点
			{"id": "node_1", "parent": "root", "text": "技术"},
			{"id": "node_2", "parent": "root", "text": "IT公司"},
			{"id": "node_3", "parent": "root", "text": "技术"},
			// 三级节点
			// 技术
			{"id": "node_1_1", "parent": "node_1", "text": "HTML5"},
			{"id": "node_1_2", "parent": "node_1", "text": "JavaScript"},
			{"id": "node_1_3", "parent": "node_1", "text": "PHP"},
			{"id": "node_1_4", "parent": "node_1", "text": "Node.js"},
			// IT公司
			{"id": "node_2_1", "parent": "node_2", "text": "baidu"},
			{"id": "node_2_2", "parent": "node_2", "text": "meituan"},
			{"id": "node_2_3", "parent": "node_2", "text": "qunar"},
			// 生活
			{"id": "node_3_1", "parent": "node_3", "text": "美食"},
			{"id": "node_3_2", "parent": "node_3", "text": "旅游"},
			// 四级节点
			// Node.js
			{"id": "node_4_1", "parent": "node_1_4", "text": "grunt"},
			{"id": "node_4_2", "parent": "node_1_4", "text": "gulp"},
		]
	}
}

*/

function addHandler(element, type, handler) {
	if (element.addEventListener) {
		addHandler = function (element, type, handler) {
			element.addEventListener(type, handler, false);
		}
	} else if (element.attachEvent) {
		addHandler = function (element, type, handler) {
			element.attachEvent("on" +type, handler );
		}
	} else {
		addHandler = function (element, type, handler) {
			element["on" + type] = handler;
		}
	}

	return addHandler(element, type, handler);
}

function removeHandler(element, type, handler) {
	if (element.removeEventListener) {
		removeHandler = function (element, type, handler) {
			element.removeEventListener(type, handler, false);
		}
	} else if (element.detachEvent) {
		removeHandler = function (element, type, handler) {
			element.detachEvent("on" + type, handler);
		}
	} else {
		removeHandler = function (element, type, handler) {
			element["on" + type] = handler;
		}
	}

	return removeHandler(element, type, handler);
}

(function () {
	/**
	 * data structure
	 * 初始化节点结构
	 */
	var config = {
		'container': document.querySelector(".main"),
		'core': {
			'data': [
				// 根节点
				{"id": "root", "parent": "#", "text": "前端工程师"},
				// 二级节点
				{"id": "node_1", "parent": "root", "text": "技术"},
				{"id": "node_2", "parent": "root", "text": "IT公司"},
				{"id": "node_3", "parent": "root", "text": "生活"},
				// 三级节点
				// 技术
				{"id": "node_1_1", "parent": "node_1", "text": "HTML5"},
				{"id": "node_1_2", "parent": "node_1", "text": "JavaScript"},
				{"id": "node_1_3", "parent": "node_1", "text": "PHP"},
				{"id": "node_1_4", "parent": "node_1", "text": "Node.js"},
				// IT公司
				{"id": "node_2_1", "parent": "node_2", "text": "baidu"},
				{"id": "node_2_2", "parent": "node_2", "text": "meituan"},
				{"id": "node_2_3", "parent": "node_2", "text": "qunar"},
				// 生活
				{"id": "node_3_1", "parent": "node_3", "text": "美食"},
				{"id": "node_3_2", "parent": "node_3", "text": "旅游"},
				// 四级节点
				// Node.js
				{"id": "node_4_1", "parent": "node_1_4", "text": "grunt"},
				{"id": "node_4_2", "parent": "node_1_4", "text": "gulp"},
			]
		}
	}




	var treeNode = new TreeNode(config);

	treeNode.init();
})();