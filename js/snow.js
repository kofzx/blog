$(document).ready(function(){
var snowfly = document.getElementById('snowfly');
var snowclear = document.getElementById('snowclear');
  
			window.requestAnimFrame = (function() {
				return window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					function(callback) {
						window.setTimeout(callback, 1000);
					};
			})();

			var dx, xp, yp; //声明变量，xp表示横坐标，yp表示纵坐标>  
			var am, stx, sty; //声明变量，am表示左右摆动的幅度，stx表示横坐标的偏移步长，sty表示纵坐标的步长>

			var dx = new Array();
			var xp = new Array();
			var yp = new Array();
			var am = new Array();
			var stx = new Array();
			var sty = new Array();

			var width = document.documentElement.clientWidth;
			var height = document.documentElement.clientHeight;

			//var x = Math.random()*width;
			//var y = Math.random()*height;

			var array = new Array();

			for (i = 0; i < 10; i++) {
				dx[i] = 0;

				xp[i] = Math.random() * (width - 50); //x
				yp[i] = Math.random() * height; //y
				am[i] = Math.random() * 20;
				stx[i] = 0.02 + Math.random() / 10;
				sty[i] = 0.7 + Math.random();

				var div = document.createElement('div');
				var str = "width: 50px;height: 50px;position: absolute;left: " + 15+"px" + ";" + "top: " + 15+"px" + ";";
				div.setAttribute('id', 'div' + i);
				div.style.cssText = str;
				//div1.style.left = x;
				//div1.style.top = y;

				var img = document.createElement('img');
				var str1 = "width: 30px;height: 30px;";
				img.style.cssText = str1;
				img.setAttribute('src', 'images/myblog/snowball.png');
				img.style.left = 15+"px";
				img.style.top = 15+"px";

				div.appendChild(img);
				document.documentElement.appendChild(div);
				array[i] = div;
			}

            snowfly.addEventListener('click',function(){
            var stopAction;
			function action() {
				for (i = 0; i < 10; i++) {
					yp[i] += sty[i];

					if (yp[i] > height - 50) {

						xp[i] = Math.random() * (width - am[i] - 30);

						yp[i] = 0;
					}

					dx[i] += stx[i];

					var div = array[i];
					//var a = Math.random()*400;
					//var b = Math.random()*400;

					div.style.left = xp[i] + am[i] * Math.sin(dx[i])+"px";
					div.style.top = yp[i]+"px";
				}
				//setTimeout(action(),10);

				//clearInterval(st);
				stopAction = requestAnimationFrame(action);
			}
			requestAnimationFrame(action);
			//动画暂停，还没有清除。
			snowclear.addEventListener('click',function(){
			window.cancelAnimationFrame(stopAction);
			});
		});
});