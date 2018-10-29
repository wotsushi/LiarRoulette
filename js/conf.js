function updateRoulette() {
  localStorage.setItem('areas', JSON.stringify(
    _.range(4).map(i => Number($(`#area${i}`).val()))
  ))
  localStorage.setItem('probA', JSON.stringify(
    _.range(4).map(i => Number($(`#probA${i}`).val()))
  ))
  localStorage.setItem('probB', JSON.stringify(
    _.range(4).map(i => Number($(`#probB${i}`).val()))
  ))
  alert('Roulette settings are updated!')
}

$(() => {
  JSON.parse(localStorage.getItem('areas')).forEach((area, i) => $(`#area${i}`).val(area))
  JSON.parse(localStorage.getItem('probA')).forEach((probA, i) => $(`#probA${i}`).val(probA))
  JSON.parse(localStorage.getItem('probB')).forEach((probB, i) => $(`#probB${i}`).val(probB))
  });
