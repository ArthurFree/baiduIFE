/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var dataCityName = document.getElementById("aqi-city-input");
var dataCityValue = document.getElementById("aqi-value-input");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

	var cityName = dataCityName.value.trim();
	var cityValue = dataCityValue.value.trim();

	if(!cityName.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) return console.log("请输入汉字或字母");
	if(!cityValue.match(/^\d+$/)) return console.log("请输入整数数字");

	aqiData[cityName] = cityValue;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	var item = "<tr><th>城市名称</th><th>空气质量指数</th><th>操作</th></tr>";
	for(var key in aqiData) {
		item += "<tr><td>" + key + "</td><td>" + aqiData[key] + "</td><td><button data-city='" + key + "'>删除</button></tr>"
	}
	table.innerHTML = key ? item : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  	addAqiData();
  	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  	delete aqiData[city]
  	renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

  var btn = document.getElementById("add-btn");
  btn.onclick = addBtnHandle;

  var delBtn = document.getElementById("aqi-table");
  delBtn.addEventListener('click', function(event) {
  	if(event.target.nodeName.toLowerCase() === "button") 
  		delBtnHandle.call(null, event.target.dataset.city);
  });
}

init();
