 var images = new Array();         //预加载的图像数组
   	  var imgSrc = document.images[11];  //修改中间图像路径
      var left_imgSrc = document.images[10];  //修改左边图像路径
      var right_imgSrc = document.images[12];  //修改右边图像路径
   	  var curIndex = 5;                 //当前索引
      var leftIndex = 4;                //左边层索引
      var rightIndex = 6;               //右边层索引

   	  function init(){
   	  	for(var i=1; i<=3; i++){
   	  	images[i] = new Image();
   	  	images[i].src = "images/myblog/" + i + ".jpg";
   	  	//console.log(images[1]);
   	  }
   	}
   	 init();

   	/*上一张*/
   	   function prev(){
        //当前层
   	  	 curIndex--;
        if(curIndex<=0){
          imgSrc.src = "images/myblog/" + 7 + ".jpg"; 
          curIndex=7;                                //初始化，否则会出bug
        }else{
          imgSrc.src = "images/myblog/" + curIndex + ".jpg"; 
        }
        //左边层
         leftIndex--;
        if(leftIndex<=0){
          left_imgSrc.src = "images/myblog/" + 7 + ".jpg"; 
          leftIndex=7;                                //初始化，否则会出bug
        }else{
          left_imgSrc.src = "images/myblog/" + leftIndex + ".jpg"; 
        }
        //右边层
         rightIndex--;
        if(rightIndex<=0){
          right_imgSrc.src = "images/myblog/" + 7 + ".jpg"; 
          rightIndex=7;                                //初始化，否则会出bug
        }else{
          right_imgSrc.src = "images/myblog/" + rightIndex + ".jpg"; 
        }
   	  
   	   
   	  }
    /*下一张*/
   	  function next(){
        //当前层
   	  	curIndex++;
   	  	if(curIndex>=8){
   	  		imgSrc.src = "images/myblog/" + 1 + ".jpg"; 
          curIndex=1;                                //初始化，否则会出bug
   	  	}else{
   	  		imgSrc.src = "images/myblog/" + curIndex + ".jpg"; 
   	  	}
   	     //左边层
         leftIndex++;
        if(leftIndex>=8){
          left_imgSrc.src = "images/myblog/" + 1 + ".jpg"; 
          leftIndex=1;                                //初始化，否则会出bug
        }else{
          left_imgSrc.src = "images/myblog/" + leftIndex + ".jpg"; 
        }
        //右边层
         rightIndex++;
        if(rightIndex>=8){
          right_imgSrc.src = "images/myblog/" + 1 + ".jpg"; 
          rightIndex=1;                                //初始化，否则会出bug
        }else{
          right_imgSrc.src = "images/myblog/" + rightIndex + ".jpg"; 
        }	
   	  }
   	  
   	  
   	 
   	  