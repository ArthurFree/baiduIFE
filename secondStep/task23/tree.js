(function() {
	var treeWalker = new TreeWalker();
	var root = document.querySelector(".root");
	var btns = document.querySelectorAll("input");

	btns[0].addEventListener("click", function() {
		treeWalker.preOrder(root);
		treeWalker.animation();
	}, false);

	btns[3].addEventListener("click", function() {
		treeWalker.search(root);
	}, false);

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
		this.postNode(tempNode);
		tempNode = tempNode.nextElementSibling;
	}

	this.stack.push(node);
}

TreeWalker.prototype.search = function(node) {
	this.isSearching = true;
	this.preOrder(node);
	this.animation();
}

TreeWalker.prototype.animation = function() {
	var timer;
	var iter = 0;
	var stack = this.stack;
	var self = this;
	var keyword = document.querySelector("input[name=search]").value.trim().toLocaleLowerCase();
	var speeder = document.querySelector("#speeder");

	self.stack = [];
	self.searchArr = [];

	if (!self.isWalking) {
		self.isWalking = true;
		stack[iter].style.backgroundColor = "rgb(50, 180, 250)";
		timer = setInterval(function(){
			if (self.isSearching) {

				if (iter == stack.length-1) {

					if (stack[iter].firstChild.nodeValue.trim().toLocaleLowerCase() == keyword) {
						stack[iter].style.backgroundColor = "red";
					} else {
						stack[iter].style.backgroundColor = "#FFFFFF";
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