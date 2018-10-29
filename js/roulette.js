var areas = JSON.parse(localStorage.getItem('areas'));
var probs = JSON.parse(localStorage.getItem('probA'));
const speed = 10;   //ルーレットの回転速度
const timeout = 2000;   //○秒後に停止

// ルーレットの回転処理
function playRoulette() {
  let x = _.random(1, _.sum(probs))
  let accProbs = _.concat(0, _.range(1, probs.length + 1).map(i => _.sum(_.take(probs, i))))
  let stopNumber = _.find(
    _.range(1, probs.length + 1),
    i => accProbs[i] >= x
  )
  let normalizedArea = JSON.parse(localStorage.getItem('areas')).map(area => 360 / _.sum(areas) * area)

  //停止位置の設定。1～360までの乱数を取得して挿入する
  var stopAngle = 360 - _.sum(_.take(_.concat(0, normalizedArea), stopNumber)) - _.random(normalizedArea[stopNumber - 1])

  //ルーレットの角度の変数。停止位置の値を初期値に設定する
  var angle = stopAngle;

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
      callback: () => $("#result span").text(`${stopNumber}でした！`)
    });
    $("#hari img").attr('src', $("#hari img").attr('src').replace('gif', 'png'));
  }, timeout);
};

$(() => {
  var ctx = document.getElementById('chart-area').getContext('2d');
  ctx.canvas.width = 500;
  window.myPie = new Chart(ctx, {
    type: 'pie',
    data: {
      datasets: [{
        data: JSON.parse(localStorage.getItem('areas')),
        backgroundColor: [
          window.chartColors.red,
          window.chartColors.yellow,
          window.chartColors.green,
          window.chartColors.blue,
        ],
        label: 'data1'
      }],
      labels: ['a', 'b', 'c', 'd']
    },
    options: {
      responsive: false,
      legend: { display: false}
    }
  });
  $("#main").swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      if (direction === 'right') {
        alert('switch B');
        probs = JSON.parse(localStorage.getItem('probB'));
      }
      if (direction === 'left') {
        alert('switch A');
        probs = JSON.parse(localStorage.getItem('probA'));
      }
    }
  });
});
