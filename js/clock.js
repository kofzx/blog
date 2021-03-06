        //var main = document.getElementById('main');
    	var can = document.getElementById('clock');
    	var ctx = can.getContext('2d');
    	var translateX = 200, translateY = 100;
    	var dX,dY;
    	var r = 60;
    	var number = new Array();
    	/*画圆*/
    	function drawCircle(){
    		ctx.save();
    		ctx.beginPath();
    		ctx.arc(200,100,r,0,2*Math.PI,false);
    		ctx.stroke();
    		ctx.closePath();
    		ctx.restore();
    	}
    	//drawCircle();
    	/*画数字*/
    	function drawNumber(){
    		ctx.translate(translateX,translateY);     //重置x,y坐标系统，规定圆心为原点(0,0)。
    		ctx.save();
    		ctx.beginPath();
    		ctx.textAlign = 'center';
    		ctx.textBaseAlign = 'middle';
    		getNumber();
    		ctx.stroke();
    		ctx.closePath();
    		ctx.restore();
    	}
    	//drawNumber();
    	/*画时针*/
    	function drawHour(hou){
            var rad = 2*Math.PI/12/5;  
            rad = 5*rad * (hou+9);           //由于arc()从3点开始，所以+45个刻度，使得指针从12点开始
            dX = Math.cos(rad)*(r-35);
            dY = Math.sin(rad)*(r-35);

    		ctx.save();
            ctx.lineWidth = 3;
    		ctx.beginPath();
    		//ctx.rotate(Math.PI/6);
    		//开始画之前旋转
    		ctx.moveTo(0,0);
    		ctx.lineTo(dX,dY);
    		ctx.stroke();
    		ctx.closePath();
    		ctx.restore();
    	}
    	//drawHour();
    	/*画分针*/
    	function drawMinute(min){      
    		var rad = 2*Math.PI/12/5;  
    		rad = rad * (min+45);
    		dX = Math.cos(rad)*(r-20);
    		dY = Math.sin(rad)*(r-20);

            ctx.save();
    		ctx.beginPath();
    		ctx.moveTo(0,0);
    		ctx.lineTo(dX,dY);
    		ctx.stroke();
    		ctx.closePath();
            ctx.restore();
    	}
    	//drawMinute();
        /*画秒针*/
        function drawSecond(sec){
            var rad = 2*Math.PI/12/5;       //时钟上每一个刻度的弧度，即平均弧度
            rad = rad * (sec+45);           //乘以多少个弧度
            dX = Math.cos(rad)*(r-10);
            dY = Math.sin(rad)*(r-10);

            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(dX,dY);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    	/*获取数字*/
    	function getNumber(){
    		number = [3,4,5,6,7,8,9,10,11,12,1,2];
    		for(var i = 0; i<number.length; i++){
    			var rad = 2*Math.PI/12;     //时钟上每一个数字刻度的弧度，即平均弧度
    			rad = rad * i;
    			dX = Math.cos(rad)*(r-12);   //x,y坐标
    			dY = Math.sin(rad)*(r-12);
    			ctx.fillText(number[i],dX,dY);
    		}    		
    	}    

    	function clock(){
    		var date = new Date();
            var Hour = date.getHours();
            var Minute = date.getMinutes();
            var Second = date.getSeconds();
            Hour += Minute/60;                          //将分钟转换为小时
            //console.log(Hour+":"+Minute+":"+Second);

    		ctx.clearRect(0,0,300,300);
            ctx.save();
    		drawCircle();
    		drawNumber();
    		drawHour(Hour);
    		drawMinute(Minute);
            drawSecond(Second);
            ctx.restore();
    	}
        clock();
    	var st = setInterval('clock()',1000);	