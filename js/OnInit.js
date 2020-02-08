import { buildTree } from './functions.js'
import handlers from './handlers.js'
import { modalHandler, modalSuccessHandler, overlayHandler } from './modals.js'
import { refreshButton, applyButton, resetButton, tBody, overlay, modal, modalSuccess, nextButton, prevButton, onPage, pageCount, } from './nodes.js'


class OnInit {
  init = () => {
    const { refreshButtonHandler, applyButtonHandler, resetButtonHandler, tBodyHandler, paginatorNext, paginatorPrev, onPageHandler, documentClickHandler, pageCountHandler, inputHandler, buttonHandler, input, button } = handlers

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
  }
}

export default new OnInit()
