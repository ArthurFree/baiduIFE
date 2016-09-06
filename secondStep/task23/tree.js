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
	this.preOrder(node);
	console.log(this.stack);
}

TreeWalker.prototype.animation = function() {
	var timer;
	var iter = 0;
	var stack = this.stack;
	var self = this;
	var speeder = document.querySelector("#speeder");

	self.stack = [];

	if (!self.isWalking) {
		self.isWalking = true;
		stack[iter].style.backgroundColor = "#F125C2";
		timer = setInterval(function(){
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