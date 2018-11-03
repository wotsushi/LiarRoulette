function updateRoulette() {
  let succNum = $('#confTable').prop('rows').length
  localStorage.setItem('areaNames', JSON.stringify(
    _.range(1, succNum).map(i => $(`#areaName${i}`).text())
  ))
  localStorage.setItem('areas', JSON.stringify(
    _.range(1, succNum).map(i => Number($(`#area${i}`).val()))
  ))
  localStorage.setItem('probA', JSON.stringify(
    _.range(1, succNum).map(i => Number($(`#probA${i}`).val()))
  ))
  localStorage.setItem('probB', JSON.stringify(
    _.range(1, succNum).map(i => Number($(`#probB${i}`).val()))
  ))
}

function addParamRow() {
  let areaName = $('#areaN').val()
  let succNum = $('#confTable').prop('rows').length
  $('#confTable tbody').append(`<tr>\
                                         <th scope="row" id="areaName${succNum}">${areaName}</th>\
                                         <td><input type="number" class="form-control input-normal" placeholder="0" id="area${succNum}"></td>\
                                         <td><input type="number" class="form-control input-normal" placeholder="0" id="probA${succNum}"></td>\
                                         <td><input type="number" class="form-control input-normal" placeholder="0" id="probB${succNum}"></td>\
                                         </tr>`)
}

$(() => {
  let areaNames = localStorage.getItem('areaNames')
  if (areaNames) {
    let n = JSON.parse(areaNames).length
    _.range(n).forEach(i => addParamRow())
    JSON.parse(localStorage.getItem('areaNames')).forEach((areaName, i) => $(`#areaName${i + 1}`).text(areaName))
    JSON.parse(localStorage.getItem('areas')).forEach((area, i) => $(`#area${i + 1}`).val(area))
    JSON.parse(localStorage.getItem('probA')).forEach((probA, i) => $(`#probA${i + 1}`).val(probA))
    JSON.parse(localStorage.getItem('probB')).forEach((probB, i) => $(`#probB${i + 1}`).val(probB))
  }
});
