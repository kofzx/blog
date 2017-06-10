/**
 * Created by Administrator on 2017/5/29.
 */

$(document).ready(function() {
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var scale = 2.5;
    $("#c").click(function(){draw1();});
    //console.log(canvas.clientWidth,canvas.clientHeight);

    function ran(){
        var a = Math.floor(Math.random()*10);
        return a;
    }
    //console.log(ran());
    function ranColor(){
        var b = Math.floor(Math.random()*256);
        return b;
    }
    function ranX(){
        var x = Math.floor(Math.random()*90+10);           //需要调整区间范围
        return x;
    }
    function ranY(){
        var y = Math.floor(Math.random()*20+10);
        return y;
    }
    // console.log(ranColor());
    function init(){
        for(var i=0; i<4; i++){
            ranObj[i] = ran();
        }
        return ranObj;
    }

    var a1 = ran();
    var a2 = ran();
    var a3 = ran();
    var a4 = ran();
    var ranObj = {
        "0" : a1,
        "1" : a2,
        "2" : a3,
        "3" : a4,
    };
    function draw1(){
        ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
        ctx.translate(30,50);
        /* init */
        init();

        /*画矩形背景*/
        ctx.save();
        ctx.fillStyle = "rgb(0,250,200)";
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.strokeRect(0,0,100*scale,30*scale);
        ctx.fillRect(1,1,99*scale,29*scale);
        ctx.closePath();
        ctx.restore();

        /*画干扰点*/
        for(var i = 0; i<10; i++){
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = "rgb(0,"+ranColor()+",200)";
            ctx.arc(ranX()*scale,ranY()*scale,2.5*scale,0,2*Math.PI,false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        /*画干扰线*/
        for(var i=0; i<2; i++) {
            ctx.save();
            ctx.strokeStyle = "rgb(150,50,0)";
            ctx.beginPath();
            ctx.moveTo(ranX()*scale, 0);
            ctx.lineTo(ranX()*scale, ranY()*scale);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }

        /*画验证码*/
        for(var i=0; i<4; i++){
            ctx.save();
            ctx.translate((10+i*20)*scale,15*scale);             //先转换
            ctx.rotate(Math.PI/ran());
            ctx.font = 20*scale+'px Arial';
            ctx.beginPath();
            ctx.translate(-(10+i*20)*scale,-15*scale);           //转换回来（跟前面的抵消）
            ctx.fillText(ranObj[i],(10+i*20)*scale,15*scale);
            ctx.closePath();
            ctx.restore();
        }
        ctx.translate(-30,-50);
    }
    draw1();
    //$("#check").blur(function(){
    $("#send").click(function(){
        /*$.ajax({
         type: 'GET',
         url: "check.php",
         data: {
         ran1:ranObj[0],
         ran2:ranObj[1],
         ran3:ranObj[2],
         ran4:ranObj[3],
         check:$("#check").val()
         } ,
         success: function (data) {
         //window.location.href = "check.php?ran="+a1+"&check="+$("#check").val();
         console.log(data);
         var capCheck = data.ran1+""+data.ran2+""+data.ran3+""+data.ran4;
         if(data.check==capCheck){
         alert("vectory!");
         }
         },
         dataType: "json"
         });*/
        $data = ranObj[0]+""+ranObj[1]+""+ranObj[2]+""+ranObj[3];
        $check = $("#check").val();
        if($data==$check){
            var msg = //document.getELementById('msg');
            $("#msg").html("正确!");
        }else{
            $("#msg").html("");
        }
    });
});
