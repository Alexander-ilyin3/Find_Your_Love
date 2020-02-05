import { buildTree, concatLink } from './js/functions.js'
import handlers from './js/handlers.js'
import { modalHandler, modalSuccessHandler, overlayHandler } from './js/modals.js'

const { refreshButtonHandler, applyButtonHandler, resetButtonHandler, tBodyHandler, paginatorNext, paginatorPrev, onPageHandler, documentClickHandler, pageCountHandler, inputHandler, buttonHandler, input, button } = handlers

const blankLink = 'https://gorest.co.in/public-api/users?_format=json&access-token='
const fetchLink = concatLink('',  blankLink)

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

  document.addEventListener('click', documentClickHandler, true)

  refreshButton.addEventListener('click', refreshButtonHandler)
  applyButton.addEventListener('click', applyButtonHandler)
  resetButton.addEventListener('click', resetButtonHandler)
  tBody.addEventListener('click', tBodyHandler)

  overlay.addEventListener('click', overlayHandler)
  modal.addEventListener('click', modalHandler)
  modalSuccess.addEventListener('click', modalSuccessHandler)

  nextButton.addEventListener('click', paginatorNext)
  prevButton.addEventListener('click', paginatorPrev)
  onPage.addEventListener('change', onPageHandler)
  pageCount.addEventListener('click', pageCountHandler)

  input.addEventListener('keyup', inputHandler)
  button.addEventListener('click', buttonHandler)
      
      buildTree()

export { tBody, fetchLink, blankLink, applyButton, overlay, modal, modalSuccess, instantOverlay, pageCount, button, input, prevButton, nextButton, noData }
