//https://github.com/hunnble/ife2016spring/blob/gh-pages/stage2/js/util.js


/**
 * 事件绑定
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


function preventDefault(event) {
	if (event.preventDefault) {
		preventDefault = function(event) {
			event.preventDefault;
		}
	} else {
		preventDefault = function(event) {
			event.returnValue = false;
		}
	}

	return preventDefault(event);
}