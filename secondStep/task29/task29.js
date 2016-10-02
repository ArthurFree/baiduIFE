(function () {

	var enter = document.querySelector("input[name=enter]");
	var verifiy = document.querySelector("input[name=verifiy]");
	var prom = document.querySelector("#prom");

	verifiy.addEventListener('click', function () {
		var content = enter.value.trim();

		if (countLength(content) == 0) {
			prom.innertext;
		}
		// charCodeAt()
		function countLength(str) {
			var inputLength = 0;
			for(var i = 0;i < str.length;i++) {
				var countCode = str.charCodeAt(i);
				if (countCode >= 0 && countCode <= 128) {
					inputLength += 1;
				} else {
					inputLength += 2;
				}
			}
			return inputLength;
		}
	}, false);


















})()