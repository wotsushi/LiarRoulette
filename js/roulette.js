var config = {
  type: 'pie',
  data: {
    datasets: [{
      data: [
        1,
        2,
        3,
        10
      ],
      backgroundColor: [
        window.chartColors.red,
        window.chartColors.yellow,
        window.chartColors.green,
        window.chartColors.blue,
      ],
      label: 'data1'
    }],
    labels: [
      'a',
      'b',
      'c',
      'd'
    ]
  },
  options: {
    responsive: true,
    legend: {
      display: false
    }
  }
};

var stopNumber = 1;

// ルーレットの面積更新処理
function updateRoulette() {
  var total_val = Number($('#roulette-conf [name=a]').val()) + Number($('#roulette-conf [name=b]').val()) + Number($('#roulette-conf [name=c]').val()) + Number($('#roulette-conf [name=d]').val());
  config.data.datasets[0].data = [
    (360 / total_val) * Number($('#roulette-conf [name=a]').val()),
    (360 / total_val) * Number($('#roulette-conf [name=b]').val()),
    (360 / total_val) * Number($('#roulette-conf [name=c]').val()),
    (360 / total_val) * Number($('#roulette-conf [name=d]').val()),
  ];
  window.myPie.update();
  roulette(
    (360 / total_val) * Number($('#roulette-conf [name=a]').val()),
    (360 / total_val) * Number($('#roulette-conf [name=b]').val()),
    (360 / total_val) * Number($('#roulette-conf [name=c]').val()),
    (360 / total_val) * Number($('#roulette-conf [name=d]').val())
  );
}

// ルーレットの回転処理
function roulette(param1, param2, param3, param4){
  var speed = 10;   //ルーレットの回転速度
  var divide = 4;   //ルーレットの分割数
  var timeout = 2000;   //○秒後に停止

  //停止位置の設定。1～360までの乱数を取得して挿入する
  var stopAngle = Math.round(Math.random () * 360 + 0.5);

  //ルーレットの角度の変数。停止位置の値を初期値に設定する
  var angle = stopAngle;

  //
  var sections = 360/divide;
  //レート
  var rates = [param1, param2, param3, param4]

  //停止位置がどのエリアにあるか調べ、該当する番号をstopNumberに格納
  var accumulated_rate = 0;
  accumulated_rate += rates[0];
  for(i=1; i<divide; i++){
    if( accumulated_rate < stopAngle) {
      stopNumber++;
      accumulated_rate += rates[i];
    }else{
      break;
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
};

//ルーレット停止後に実行される処理
function result() {
  switch(stopNumber){

    //1の時の処理
    case 1:
    $("#result span").text("①でした！")
    break;

    //2の時の処理
    case 2:
    $("#result span").text("②でした！")
    break;

    //3の時の処理
    case 3:
    $("#result span").text("③でした！")
    break;

    //4の時の処理
    case 4:
    $("#result span").text("④でした！")
    break;

    //5の時の処理
    case 5:
    $("#result span").text("⑤でした！")
    break;
  };
};

$(() => {
  var ctx = document.getElementById('chart-area').getContext('2d');
  window.myPie = new Chart(ctx, config);
  $("#main").swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      if (direction === 'right') {
        alert('右にスワイプ');
      }
      if (direction === 'left') {
        alert('左にスワイプ');
      }
    }
  });
});
