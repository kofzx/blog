$(document).ready(function(){
	var can = document.getElementById("surface");
	var ctx = can.getContext("2d");
	//var outfire = document.getElementById('outfire');
	//var clear = document.getElementById('clear');
	//var sub_left_width = document.getElementById('sub_left').offsetWidthwidth;
	//console.log(sub_left_width);
	
	var particles = [];
	var particles_count = 150;
	for(var i = 0; i<particles_count;i++){
		particles.push(new data());
	}
	
	/*requestAnimationFrame*/
	window.requestAnimationFrame = (function(){
		return window.requestAnimationFrame ||
		       window.webkitRequestAnimationFrame ||
		       window.mozRequestAnimationFrame ||
		       function(callback){
		       	 window.setTimeout(callback,6000/60);
		       };
	})();
	
	function data(){
		this.speed = {x:-1+Math.random()*2,y:-10+Math.random()*9};
		var canWidth = document.getElementById("surface").width;		
		var canHeight = document.getElementById("surface").height;
		//console.log(canWidth+','+canHeight);
		this.location = {x:canWidth/2,y:(canHeight/2)+35};          //初始位置/坐标
		
		this.radius = 0.5+Math.random()*5;  
		this.life = 1+Math.random()*10;
		this.death = this.life;
		/*随机颜色*/
		this.r = 255;
		this.g = Math.round(Math.random()*155);
		this.b = 0;
	}
	
	var stopFire;
	function particle(){
		/*布置画布*/
		ctx.fillStyle = "#FAFFFF";
		ctx.fillRect(0,0,450,400);
		
		/*实现动画*/
		for(var i = 0; i<particles_count;i++){
			var p = particles[i];
			
			ctx.beginPath();
			p.opacity = 0.5;
			//创建径向渐变
			var grd = ctx.createRadialGradient(p.location.x,p.location.y,0,p.location.x,p.location.y,p.radius);
			//渐变规则
			grd.addColorStop(0,"rgba(" + p.r + "," + p.g + "," + p.b + "," + p.opacity +")");
			grd.addColorStop(0.5,"rgba(" + p.r + "," + p.g + "," + p.b + "," + p.opacity +")");
			grd.addColorStop(1,"rgba(" + p.r + "," + p.g + "," + p.b + "," + p.opacity +")");
			ctx.fillStyle = grd;
			ctx.arc(p.location.x,p.location.y,p.radius,0,Math.PI*2,false);
			ctx.fill();
			
			p.death--;
			p.radius++;
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;
			if(p.death<0 ||p.radius<0){
				particles[i] = new data();
			}
			
		}
		
		stopFire = requestAnimationFrame(particle);
		
		/*outfire.addEventListener('click',function(){
			cancelRequestAnimationFrame(stopFire);
		});*/
	}
	
	requestAnimationFrame(particle);
	
	/*function clear(){
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,320,480);
		//window.location.reload();
	}*/
	
});
