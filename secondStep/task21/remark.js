<<<<<<< HEAD
(function(tags) {

	'use strict';

	window.tags = tags();

})(function(elemArg1, elemArg2) {

	'use strict';

	// 构造函数
	function tags() {

		this.init = init;
	}

	// 事件绑定
	function bind() {
		elemArg1.addEventLinstener('click', function() {
			fn();
		}, false)
	}

	function fn() {
		console.log(elemArg2)
	}

	// 初始化
	function init() {
		bind();
	}
=======
(function(tags) {

	'use strict';

	window.tags = tags();

})(function(elemArg1, elemArg2) {

	'use strict';

	// 构造函数
	function tags() {

		this.init = init;
	}

	// 事件绑定
	function bind() {
		elemArg1.addEventLinstener('click', function() {
			fn();
		}, false)
	}

	function fn() {
		console.log(elemArg2)
	}

	// 初始化
	function init() {
		bind();
	}
>>>>>>> corporation
});