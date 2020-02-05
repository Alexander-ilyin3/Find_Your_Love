import { buildTree, setPaginatorData, setFilterData, paginatorData } from './functions.js'
import bruteForce from './bruteForce.js'
import { showModal } from './modals.js'
import { showTooltip, hideTooltip } from './tooltips.js'

class Handlers {
  constructor() {
    this.nameInput = document.getElementById('name-input')
    this.ageFrom = document.getElementById('age-from')
    this.ageTo = document.getElementById('age-to')
    this.genderSelect = document.getElementById('gender-select')
    this.refreshButton = document.getElementById('refreshLocalStorage')
    this.input = document.createElement('input')
    this.button = document.createElement('button')
  }

 refreshButtonHandler = async () => {

  if (document.querySelector('.tooltip')) hideTooltip(this.refreshButton)

    const cooldown = localStorage.getItem('cooldown')
    const now = Date.now()
    const difference = now - cooldown

    if ( difference < 120000) { 
      showTooltip(this.refreshButton, cooldown) 
    } else {
      localStorage.removeItem('cooldown')
      const cooldown = Date.now()
      localStorage.setItem('cooldown', cooldown)

      await bruteForce.refreshLocalStorage()
      buildTree()
    }
  }

  applyButtonHandler = () => {

    const properties = {
      name: this.nameInput.value,
      ageFrom: this.ageFrom.value,
      ageTo: this.ageTo.value,
      gender: this.genderSelect.value === 'choose gender' ? 'both' : this.genderSelect.value,
    }

    if (properties.name.length === 1) { showTooltip(this.nameInput); return }

    setFilterData(properties)
    setPaginatorData({ pageNumber: 0 })
  }

  resetButtonHandler = () => {
    this.nameInput.value = ''
    this.ageTo.value = ''
    this.ageFrom.value = ''
    this.genderSelect.value = 'choose gender'
  }

  tBodyHandler = (e) => {
    showModal(e)
  }

 paginatorNext = async () => {
    const page = paginatorData.pageNumber + 1
    await setPaginatorData({
      pageNumber: page > paginatorData.lastPage ? paginatorData.lastPage : page
    })

  }

 paginatorPrev = async () => {
    const page = paginatorData.pageNumber - 1

    await setPaginatorData({
      pageNumber: page < 0 ? 0 : page
    })
  }

  onPageHandler = (e) => {
    setPaginatorData({ onPage: +e.target.value })
  }

  documentClickHandler = (e) => {
    hideTooltip(this.refreshButton)
    hideTooltip(this.nameInput)
    if (e.target !== this.input) this.blur(this.input)
  }

  blur = () => {
    if (this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input)
    if (this.button && this.button.parentNode) this.button.parentNode.removeChild(this.button)
  }

  pageCountHandler = (e) => {
    
    const currentPage = e.target.textContent.match('(.*?)\/')[1]
    const parent = e.target.parentNode
    let input = this.input
    parent.insertBefore(input, parent.firstChild)
    input.value = currentPage
    input.select()

    let button = this.button
    button.innerText = '->'
    parent.insertBefore(button, e.target)
}
  inputHandler = (e) => {
    e.preventDefault()
      switch (e.key) {
        case 'Enter': {
          this.blur(); setPaginatorData({ pageNumber: +this.input.value - 1 }); return;
        }
        case 'Escape': this.blur(); break
      }
  }
   
  buttonHandler = () => {
      this.blur()
      setPaginatorData({ pageNumber: +this.input.value - 1 })
  }
}

export default new Handlers
