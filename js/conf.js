function updateRoulette() {
  var succNum = $('#confTable').prop('rows').length
  localStorage.setItem('areas', JSON.stringify(
    _.range(succNum).map(i => Number($(`#area${i}`).val()))
  ))
  localStorage.setItem('probA', JSON.stringify(
    _.range(succNum).map(i => Number($(`#probA${i}`).val()))
  ))
  localStorage.setItem('probB', JSON.stringify(
    _.range(succNum).map(i => Number($(`#probB${i}`).val()))
  ))
  alert('Roulette settings are updated!')
}

function addParamRow() {
  var succNum = $('#confTable').prop('rows').length
  $('#confTable tbody > tr:last').after(`<tr>\
                                         <th scope="row">Param${succNum}</th>\
                                         <td><input type="number" class="form-control input-normal" placeholder="0" id="area${succNum}"></td>\
                                         <td><input type="number" class="form-control input-normal" placeholder="0" id="probA${succNum}"></td>\
                                         <td><input type="number" class="form-control input-normal" placeholder="0" id="probB${succNum}"></td>\
                                         </tr>`)
}

$(() => {
  JSON.parse(localStorage.getItem('areas')).forEach((area, i) => $(`#area${i}`).val(area))
  JSON.parse(localStorage.getItem('probA')).forEach((probA, i) => $(`#probA${i}`).val(probA))
  JSON.parse(localStorage.getItem('probB')).forEach((probB, i) => $(`#probB${i}`).val(probB))
  });
