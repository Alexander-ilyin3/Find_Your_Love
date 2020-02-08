const tBody = document.getElementById('tbody')
const applyButton = document.getElementById('apply-button')
const refreshButton = document.getElementById('refreshLocalStorage')
const resetButton = document.getElementById('reset-button')

const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal-confirm')
const modalSuccess = document.getElementById('modal-success')
const instantOverlay = document.getElementById('instant-overlay')

const nextButton = document.getElementById('next')
const prevButton = document.getElementById('prev')
const onPage = document.getElementById('on-page')
const pageCount = document.getElementById('page-count')

const noData = document.getElementById('no-data')

export {
  tBody,
  applyButton,
  overlay,
  modal,
  modalSuccess,
  instantOverlay,
  pageCount,
  refreshButton,
  resetButton,
  onPage,
  prevButton,
  nextButton,
  noData,
}
