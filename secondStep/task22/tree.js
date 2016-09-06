(function() {
	var treeWalker = new TreeWalker();
	var root = document.querySelector(".root");
	var btns = document.querySelectorAll("input");
	var preBtn = btns[0];
	var inBtn = btns[1];
	var postBtn = btns[2];

	addHandler(preBtn, "click", function() {
		treeWalker.preOrder(root);
		treeWalker.animation();
	});

	addHandler(inBtn, "click", function() {
		treeWalker.inOrder(root);
		treeWalker.animation();
	});

	addHandler(postBtn, "click", function() {
		treeWalker.postOrder(root);
		treeWalker.animation();
	});
})();

function TreeWalker() {
	this.stack = [];
	this.isWalking = false;
}

/* 前序遍历 */
TreeWalker.prototype.preOrder = function(node) {
	if (!node) return;

	this.stack.push(node);
	this.preOrder(node.firstElementChild);
	this.preOrder(node.lastElementChild);
}

/* 中序遍历 */
TreeWalker.prototype.inOrder = function(node) {
	if (!node) return;

	this.inOrder(node.firstElementChild);
	this.stack.push(node);
	this.inOrder(node.lastElementChild);
}

/* 后序遍历 */
TreeWalker.prototype.postOrder = function(node) {
	if (!node) return;

	this.inOrder(node.firstElementChild);
	this.inOrder(node.lastElementChild);
	this.stack.push(node);
}

/* 动画方法 */
TreeWalker.prototype.animation = function() {
	var self = this;
	var iter = 0;
	var stack = this.stack;
	var speeder = document.querySelector("#speeder");
	var timer;

	self.stack = [];
	if (!self.isWalking) {
		self.isWalking = true;
		stack[iter].style.backgroundColor = "#F125C2";
		timer = setInterval(function() {
			if (iter == stack.length-1) {
				stack[iter].style.backgroundColor = "#FFFFFF";
				self.isWalking = false;
				clearInterval(timer);
			} else {
				++iter;
				stack[iter-1].style.backgroundColor = "#FFFFFF";
				stack[iter].style.backgroundColor = "#F125C2";
			}
		}, speeder.value);
	}
}