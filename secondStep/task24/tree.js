(function() {
	var treeWalker = new TreeWalker();
	var root = document.querySelector(".root");             // 根节点
	var btns = document.querySelectorAll("input");          // 按钮集合
	var elemTemp;                                           // 元素暂存, 用来清除上一个元素的border
	var preBtn = btns[0];                                   // 前序遍历按钮
	var postBtn = btns[1];                                  // 后序遍历按钮
	var searchBtn = btns[3];                                // 搜索按钮
	var deleteBtn = btns[4];                                // 删除按钮
	var addText = btns[5]                                   // 添加节点输入框
	var addBtn = btns[6];                                   // 添加节点按钮

	// 绑定前序程序按钮
	addHandler(preBtn, 'click', function() {
		treeWalker.preOrder(root);
		treeWalker.animation();
	});

	// 绑定前序程序按钮
	addHandler(postBtn, 'click', function() {
		treeWalker.postOrder(root);
		treeWalker.animation();
	});

	// 绑定搜索程序按钮
	addHandler(searchBtn, 'click', function() {
		treeWalker.search(root);
	});

	// 当鼠标点击时，改变当前元素border, 并恢复上一个点击过的元素border
	addHandler(root, 'mouseover', function(event) {

		// 对鼠标滑过的元素绑定click事件
		addHandler(event.target, 'click', function(event) {

			// 判断是否为第一次点击, 否——恢复上一个元素的border, 是——直接改变当前元素的border
			if (treeWalker.currElem !== undefined) {
				treeWalker.currElem.style.border = "1px solid rgb(50, 180, 250)";
			}

			// 将当前元素DOM对象暂存在currElem
			treeWalker.currElem = event.target;
			event.target.style.border = "1px solid black";

		});

	});

	// 绑定删除节点事件
	addHandler(deleteBtn, 'click', function() {
		treeWalker.deleteNode();
	});

	// 绑定添加节点事件
	addHandler(addBtn, 'click', function() {
		var text = addText.value;
		var div = document.createElement("div");
		var className = treeWalker.currElem.getAttribute("class");
		div.setAttribute("class", className);
		treeWalker.addNode(div, treeWalker.currElem, text);
	});

})();
function TreeWalker() {
	this.stack = [];                 // 按遍历顺序存放的元素栈
	this.currElem;                   // 当前选中元素
	this.isWalking = false;
	this.isSearching = false;
}

/**
 * 
 * 前序遍历
 * @param  {[DOM Object]} node [DOM节点]
 * 
 */
TreeWalker.prototype.preOrder = function(node) {
	var tempNode = node.firstElementChild || null;

	this.stack.push(node);

	while(tempNode) {
		this.preOrder(tempNode);
		tempNode = tempNode.nextElementSibling;
	}
}

/**
 * 
 * 后序遍历
 * @param  {[DOM Object]} node [DOM节点]
 * 
 */
TreeWalker.prototype.postOrder = function(node) {
	var tempNode = node.firstElementChild || null;

	while(tempNode) {
		this.postOrder(tempNode);
		tempNode = tempNode.nextElementSibling;
	}

	this.stack.push(node);
}

/**
 * 
 * 查询函数
 * @param  {[DOM Object]} node [DOM节点]
 * 
 */
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

/**
 * 
 * 动画渲染
 * 
 */
TreeWalker.prototype.animation = function() {
	var timer;
	var iter = 0;                                       // DOM stack 计数
	var count = 0;                                      // 查询结果计数
	var stack = this.stack;                             // DOM元素存放栈
	var self = this;
	var keyword = document.querySelector("input[name=search]").value.trim().toLocaleLowerCase();   // 获取查询匹配字段， 统一小写
	var speeder = document.querySelector("#speeder");   // 调节器元素

	// 执行之前，释放元素存放栈
	self.stack = [];

	// 判断当前是否正在执行 true-正在执行，false-未执行
	if (!self.isWalking) {
		// 执行中，锁死
		self.isWalking = true;

		// 将初始元素设置为选中状态
		stack[iter].style.backgroundColor = "rgb(50, 180, 250)";
		// 间隙调用
		timer = setInterval(function(){

			// 是否为搜索状态
			if (self.isSearching) {
				// 到栈的最后一个元素
				if (iter == stack.length-1) {

					if (stack[iter].firstChild.nodeValue.trim().toLocaleLowerCase() == keyword) {
						stack[iter].style.backgroundColor = "red";
						count++;
						// 最后一个元素匹配到时
						alert("找到" + count + "个匹配元素");
					} else {
						stack[iter].style.backgroundColor = "#FFFFFF";
						// 最后一个元素未匹配时
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
					// 为到栈的最后一个元素
					++iter;
					// 当上一个元素没匹配上查询关键词时
					if (stack[iter-1].firstChild.nodeValue.trim().toLocaleLowerCase() !== keyword) {
						stack[iter-1].style.backgroundColor = "#FFFFFF";
					}
					// 查看当前元素是否匹配
					if (stack[iter].firstChild.nodeValue.trim().toLocaleLowerCase() == keyword) {
						stack[iter].style.backgroundColor = "red";
						count++;
					} else {
						stack[iter].style.backgroundColor = "rgb(50, 180, 250)";
					}

				}

			} else {
				// 不在查询状态时执行
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

/**
 * 
 * 删除节点
 * 
 */
TreeWalker.prototype.deleteNode = function() {
	if (this.currElem == undefined) return alert("请选中想要删除的节点");
	
	this.currElem.parentNode.removeChild(this.currElem);
}

/**
 *
 * 添加节点
 * 
 */
/**
 * 添加节点
 * @param {[DOM Object]} newElem    [待添加节点]
 * @param {[DOM Object]} targetElem [当前节点]
 * @param {[String]} value      [带添加节点的内容]
 */
TreeWalker.prototype.addNode = function(newElem, targetElem, value) {
	if (value == "") return alert("请输入想要插入的节点!!!");
	newElem.innerText = value;
	insertAfter(newElem, targetElem);
}

/* 事件绑定 */
/**
 * 通用事件绑定函数
 * @param {[DOM Object]} element [事件绑定元素]
 * @param {[String]}     type    [事件类型]
 * @param {[Function]}   handler [事件执行函数]
 * @return {[Function]}  addHandler(element, type, handler)   [事件执行后结果]
 */
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

/**
 * 在当前元素后插入新节点
 * @param  {[DOM Object]} newElem    [带插入节点]
 * @param  {[DOM Object]} targetElem [当前选中节点]
 * @return {[null]}            [null]
 */
function insertAfter(newElem, targetElem) {
	var parent = targetElem.parentNode;

	if (parent.lastChild == targetElem) {
		parent.appendChild(newElem);
	} else {
		parent.insertBefore(newElem, targetElem.nextElementSibling);
	}
}


/**
 * 在获取元素的过程中，
 * firstChild在主流浏览器中均会将相邻的html标签中的空白节点也解析出来，在IE6/7/8中则不会解析出空白节点
 * childNodes同上
 *
 * DOM扩展了firstElementChild方法，可以实现选择元素节点，但IE6/7/8中无此方法
 *
 * 可以使用children方法（推荐），可以实现firstElementChild的功能，同时兼容IE6/7/8
 * 
 */