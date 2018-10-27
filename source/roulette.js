$(function(){
var speed = 10;   //ルーレットの回転速度
  var divide = 5;   //ルーレットの分割数
  var timeout = 2000;   //○秒後に停止
 
  //停止位置の設定。1～360までの乱数を取得して挿入する
  var stopAngle = Math.round(Math.random () * 360 + 0.5);
 
  //ルーレットの角度の変数。停止位置の値を初期値に設定する
  var angle = stopAngle;
 
  //ルーレットの分割数から1エリア分の角度を求める。今回は5分割なので72が入ってます
  var section = 360/divide;
 
  //停止位置がどのエリアにあるか調べ、該当する番号をstopNumberに格納
  for(i=1; i<=divide; i++){
     if(section*(i-1)+1 <= stopAngle && stopAngle <= section*i) {
        stopNumber = i;
     }
    };


    var rotation = setInterval(function(){
        $("#chart-area").rotate(angle);
        angle += speed;
     }, 5);
     
     setTimeout(function(){
      
        //クルクル処理をしているsetIntervalをclear
        clearInterval(rotation);
        
        //setIntervalで増えた余分な数値を減らし、逆回転を防ぐためにマイナス値にする
        angle = angle%360-360;
        
        //停止位置までのアニメーション。完了するとresult()が実行される
        $("#chart-area").rotate({
           angle: angle, 
           animateTo: stopAngle,
           callback: result
        });
        $("#hari img").attr('src', $("#hari img").attr('src').replace('gif', 'png'));
    }, timeout);
  

 //function rotate(){
 //   $("#chart-area").animate({rotate: 360},2000, 'linear',function(){rotate();});  
 //};

 

//timeout秒後に停止させる処理
setTimeout(function(){
   
    //クルクル処理をしているsetIntervalをclear
    clearInterval(rotation);
    
    //setIntervalで増えた余分な数値を減らし、逆回転を防ぐためにマイナス値にする
    angle = angle%360-360;
    
    //停止位置までのアニメーション。完了するとresult()が実行される
    $("#mato").rotate({
       angle: angle, 
       animateTo: stopAngle,
       callback: result
    });
    
    //ルーレットの停止処理に入ったので針の画像を静止画へ変更
    $("#hari img").attr('src', $("#hari img").attr('src').replace('gif', 'png'));
  
  }, timeout);
 
 


 rotate();
});