const speed = 10;   //ルーレットの回転速度
const timeout = 2000;   //○秒後に停止

// ルーレットの回転処理
function playRoulette(roulette) {
  let probs = JSON.parse(localStorage.getItem(`prob${roulette}`));
  let x = _.random(1, _.sum(probs));
  let accProbs = _.concat(0, _.range(1, probs.length + 1).map(i => _.sum(_.take(probs, i))));
  let stopNumber = _.find(
    _.range(1, probs.length + 1),
    i => accProbs[i] >= x
  );
  let areas = JSON.parse(localStorage.getItem('areas'));
  let normalizedArea = areas.map(area => 360 / _.sum(areas) * area);

  //停止位置の設定。1～360までの乱数を取得して挿入する
  var stopAngle = 360 - _.sum(_.take(_.concat(0, normalizedArea), stopNumber)) - _.random(normalizedArea[stopNumber - 1]);

  //ルーレットの角度の変数。停止位置の値を初期値に設定する
  var angle = stopAngle;

  var rotation = setInterval(function(){
    $(`#roulette${roulette}`).rotate(angle);
    angle += speed;
  }, 5);

  setTimeout(function(){

    //クルクル処理をしているsetIntervalをclear
    clearInterval(rotation);

    //setIntervalで増えた余分な数値を減らし、逆回転を防ぐためにマイナス値にする
    angle = angle%360-360;

    //停止位置までのアニメーション。完了するとresult()が実行される
    $(`#roulette${roulette}`).rotate({
      angle: angle,
      animateTo: stopAngle,
      callback: () => $(`#result${roulette} span`).text(
        `${JSON.parse(localStorage.getItem('areaNames'))[stopNumber - 1]}でした！`)
    });
    $(`#hari${roulette} img`).attr('src', $(`#hari${roulette} img`).attr('src').replace('gif', 'png'));
  }, timeout);
};

function createRoulette(roulette) {
  return new Chart(document.getElementById(`roulette${roulette}`).getContext('2d'), {
    type: 'pie',
    data: {
      datasets: [{
        data: JSON.parse(localStorage.getItem('areas')),
        backgroundColor: [
          window.chartColors.red,
          window.chartColors.yellow,
          window.chartColors.green,
          window.chartColors.blue,
          window.chartColors.orange,
          window.chartColors.purple,
          window.chartColors.brown,
          window.chartColors.grey,
        ]
      }],
      labels: ['a', 'b', 'c', 'd']
    },
    options: {
      responsive: false,
      legend: {
        display: false,
        onClick: e => e.stopPropagation()
      }
    }
  });
}

$(() => {
  let rouletteA = createRoulette('A');
  let rouletteB = createRoulette('B');
  let swiper = new Swiper('.swiper-container', {
    initialSlide: 1,
    on: {
      slideChange: () => {
        updateRoulette();
        rouletteA.data.datasets[0].data = JSON.parse(localStorage.getItem('areas'))
        rouletteA.update()
        rouletteB.data.datasets[0].data = JSON.parse(localStorage.getItem('areas'))
        rouletteB.update()
      },
      tap () {
        if (this.activeIndex === 1) {
          playRoulette('A');
        }
        if (this.activeIndex === 2) {
          playRoulette('B');
        }
      }
    }
  });
});
