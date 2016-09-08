// 参考jsTree:  https://github.com/vakata/jstree
// 参考： https://github.com/leegent/leegent.github.io/blob/master/ife2016/task25/task25.js
(function() {

})();

function TreeNode() {
	
}


/**
 * data structure
 * 初始化节点结构
 */
{
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















function addHandler(element, type, handler) {
	if (element.addEventListener) {
		addHandler = function(element, type, handler) {
			element.addEventListener(type, handler, false);
		}
	} else if (element.attachEvent) {
		addHandler = function(element, type, handler) {
			element.attachEvent("on" +type, handler ) ;
		}
	} else {
		addHandler = function(element, type, handler) {
			element["on" + type] = handler;
		}
	}
}