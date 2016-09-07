(function() {
	var treeWalker = new TreeWalker();
	var root = document.querySelector(".root");
	var btns = document.querySelectorAll("input");
	var preBtn = btns[0];
	var postBtn = btns[1];
	var searchBtn = btns[3];

	addHandler(preBtn, 'click', function() {
		treeWalker.preOrder(root);
		treeWalker.animation();
	});

	addHandler(postBtn, 'click', function() {
		treeWalker.postOrder(root);
		treeWalker.animation();
	});

	addHandler(searchBtn, 'click', function() {
		treeWalker.search(root);
	});

})();
function TreeWalker() {
	this.stack = [];
	this.isWalking = false;
	this.isSearching = false;
}

TreeWalker.prototype.preOrder = function(node) {
	var tempNode = node.firstElementChild || null;

	this.stack.push(node);

	while(tempNode) {
		this.preOrder(tempNode);
		tempNode = tempNode.nextElementSibling;
	}
}

TreeWalker.prototype.postOrder = function(node) {
	var tempNode = node.firstElementChild || null;

	while(tempNode) {
		this.postOrder(tempNode);
		tempNode = tempNode.nextElementSibling;
	}

	this.stack.push(node);
}

TreeWalker.prototype.search = function(node) {
	if (document.querySelector("input[name=search]").value.trim() == "") return alert("请输入查询内容!!!");
	var m_all = document.querySelectorAll(".m-all");

	for(var i = 0;i < m_all.length;i++) {
		m_all[i].style.backgroundColor = "#FFFFFF";
	}
	this.isSearching = true;
	this.preOrder(node);
	this.animation();
}

TreeWalker.prototype.animation = function() {
	var timer;
	var iter = 0;
	var count = 0;
	var stack = this.stack;
	var self = this;
	var keyword = document.querySelector("input[name=search]").value.trim().toLocaleLowerCase();
	var speeder = document.querySelector("#speeder");

	self.stack = [];

	if (!self.isWalking) {
		self.isWalking = true;
		stack[iter].style.backgroundColor = "rgb(50, 180, 250)";
		timer = setInterval(function(){
			if (self.isSearching) {

				if (iter == stack.length-1) {

					if (stack[iter].firstChild.nodeValue.trim().toLocaleLowerCase() == keyword) {
						stack[iter].style.backgroundColor = "red";
						count++;
					} else {
						stack[iter].style.backgroundColor = "#FFFFFF";
						if (count == 0) {
							alert("未找到匹配元素!!!");
						} else {
							alert("找到" + count + "个匹配元素");
						}
					}

					self.isWalking = false;
					self.isSearching = false;
					clearInterval(timer);

				} else {

					++iter;

					if (stack[iter-1].firstChild.nodeValue.trim().toLocaleLowerCase() !== keyword) {
						stack[iter-1].style.backgroundColor = "#FFFFFF";
					}

					if (stack[iter].firstChild.nodeValue.trim().toLocaleLowerCase() == keyword) {
						stack[iter].style.backgroundColor = "red";
						count++;
					} else {
						stack[iter].style.backgroundColor = "rgb(50, 180, 250)";
					}

				}

			} else {

				if (iter == stack.length-1) {
					stack[iter].style.backgroundColor = "#FFFFFF";
					self.isWalking = false;
					self.isSearching = false;
					clearInterval(timer);
				} else {
					++iter;
					stack[iter-1].style.backgroundColor = "#FFFFFF";
					stack[iter].style.backgroundColor = "rgb(50, 180, 250)";
				}

			}
		}, speeder.value);

	}
}

/* 事件绑定 */
function addHandler(element, type, handler) {
	if (element.addEventListener) {
		addHandler = function(element, type, handler) {
			element.addEventListener(type, handler, false);
		}
	} else if (element.attachEvent) {
		addHandler = function(element, type, handler) {
			element.attachEvent("on"+type, handler);
		}
	} else {
		addHandler = function(element, type, handler) {
			element["on" + type] = handler;
		}
	}

	return addHandler(element, type, handler);
}