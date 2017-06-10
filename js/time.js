var clockTime = document.getElementById('clockTime');

function time(){
  var today = new Date();
  //时分秒
  var hour = today.getHours();
  var minute = today.getMinutes();
  var second = today.getSeconds();
  //格式化分秒（实际需要显示的分秒为00格式）
  var format_minute = formatTime(minute);
  var format_second = formatTime(second);

  clockTime.innerHTML = hour +":"+ format_minute +":"+ format_second;

  var timer = setTimeout('time()',500);

}
time();

function formatTime(a){
	if(a<10)
		a = "0" + a;

    return a;
}




