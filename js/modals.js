import { addToInvitedUsers, processedUsers } from './functions.js'
import { overlay, modal, modalSuccess, instantOverlay } from './nodes.js'

let invitedUserId = null;

function insertName() {
  const insertTarget = modal.querySelector('strong')
  const user = processedUsers.find(user => user.id === invitedUserId)

  insertTarget.innerText = `${user.first_name} ${user.last_name}`
}

function modalHandler(e) {
  if (e.target.dataset.value === 'no') overlayHandler()
  else if (e.target.dataset.value === 'yes') {

    showModalSuccess()
    addToInvitedUsers(invitedUserId)
  }
}

function modalSuccessHandler(e) {
  if (e && e.target.dataset.value === 'ok') {
     overlayHandler()
  } 
}

function overlayHandler() {
  modal.classList = 'modal'
  modalSuccess.classList = 'modal'
  hideOverlay()
}

function showModal(e) {
  if (e.target.dataset.id) {
    modal.classList = 'modal is-shown'
    showOverlay()
    invitedUserId = e.target.dataset.id
    insertName()
  }
}

function showOverlay(instant) {
  if (instant && instant === 'instant') {
    instantOverlay.classList = 'overlay is-shown'; return
  } else { 
    overlay.classList = 'overlay is-shown' 
  }
}

function hideOverlay(instant) {
  if (instant && instant === 'instant') {
    instantOverlay.classList = 'overlay'; return
  } else { 
    overlay.classList = 'overlay'
  }
}

function showModalSuccess() {
  modal.classList = 'modal'
  modalSuccess.classList = 'modal is-shown'
}

export { modalHandler, modalSuccessHandler, overlayHandler, showModal, hideOverlay, showOverlay }
