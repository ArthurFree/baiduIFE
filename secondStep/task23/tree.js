(function() {
	var treeWalker = new TreeWalker();
	var root = document.querySelector(".root");
	var btns = document.querySelectorAll("input");

	btns[0].addEventListener("click", function() {
		treeWalker.preOrder(root);
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

TreeWalker.prototype.animation = function() {
	var timer;

	timer = setInterval(function(), 1000)
}