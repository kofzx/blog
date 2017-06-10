var showText =document.getElementById('split_right');
var str = "欢迎光临本网站！";
var index = 0;

window.onload  =function(){
   var st = setInterval(function(){
    	    showText.innerText = str.substring(0,index++);
    	       if(index>=20)
    	       	clearInterval(st);
    },200);
};

