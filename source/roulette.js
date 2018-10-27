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
    $("#mato").animate({rotate: 360},2000);
    angle += speed;
 }, 5);
});