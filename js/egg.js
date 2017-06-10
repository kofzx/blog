			var arr = new Array();
			arr = ['images/shoe_egg.jpg','images/shoe.jpg','images/shoe.jpg'];
						 //shoe_egg is correct ,  shoe is defeat
			var img01 = document.getElementsByTagName('img')[7];
			var img02 = document.getElementsByTagName('img')[8];
			var img03 = document.getElementsByTagName('img')[9];
			
			var isClick = true;
			/*核心函数,随机数组元素位置*/
			function reset(){
				for(var i = 0; i<3; i++){					
					var index = Math.floor(Math.random()*2);
					
					var temp = arr[i];
					arr[i] = arr[index];		//arr[i]跟arr[index]互换
					arr[index] = temp;					
					//console.log(arr[i]);
				}				
			}
			function isRight(index){
				reset();
				//console.log(arr);		//arr已经随机过了
				img01.src = arr[0];
				img02.src = arr[1];
				img03.src = arr[2];								
				
				if(arr[index] == 'images/shoe_egg.jpg'){
					$('#title').text("猜对了!");
					$('#title').css({
						color:'green'
				});
				}
				else{
					$('#title').text("抱歉，再猜猜看吧。。。");
					$('#title').css({
						color:'#ab283b'
					});
				}				
			}
			function checkClick(fun){				
				if(isClick){
					for(var i = 7; i<10; i++){
						$('img').eq(i).css({
							transition:'opacity 1.2s',
							opacity:0.4
						});			//使单击的图片变得透明		
					}	
					$('.hide').css({display:'block'});		
				}
				//isClick = false;
				//console.log(isClick);
			}			
			function tryAgain(){
				$('.hide').css({display:'none'});

				img01.src = 'images/shoe.jpg';
				img02.src = 'images/shoe.jpg';
				img03.src = 'images/shoe.jpg';			

				for(var i = 7; i<10; i++){
						$('img').eq(i).css({opacity:1});				
					}		
			}		