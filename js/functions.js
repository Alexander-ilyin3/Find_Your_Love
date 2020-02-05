import { tBody } from '../index.js'
import bruteForce from './bruteForce.js'
import { pageCount, nextButton, prevButton, noData } from '../index.js'
import { showOverlay, hideOverlay } from './modals.js'
import { hideLoading, showLoading } from './loading.js'

let filterData = {
  name: '',
  ageFrom: 0,
  ageTo: 100,
  gender: 'both',
}

let paginatorData = {
  pageNumber: 0,
  onPage: 10,
  lastPage: null,
}

let processedUsers = []
async function setPaginatorData(data) {
  showOverlay('instant')
  showLoading('instant')
  if ( data.pageNumber > paginatorData.lastPage ) data = { ...data, pageNumber: paginatorData.lastPage }
  if ( data.pageNumber < 1 || isNaN(data.pageNumber) ) data = { ...data, pageNumber: 0 }
  paginatorData = {...paginatorData, ...data}

  await buildTree()
  hideOverlay('instant')
  hideLoading('instant')
}

function setFilterData(data) {
  filterData = {...filterData, ...data}
}

function addToInvitedUsers(invitedUserId) {

  const usersFromStorage = JSON.parse( localStorage.getItem('invited') ) || []

  if ( usersFromStorage.includes(invitedUserId) ) {
    console.error('Пользователя не должно быть на странице'); return
  }

  usersFromStorage.push(invitedUserId)

  localStorage.setItem( 'invited', JSON.stringify(usersFromStorage) )

  buildTree()
}

function concatLink( params, blankLink, token ) {
  const cutIndex = (blankLink.indexOf('users?') + 'users?'.length )
  const linkForFetch = 
    blankLink.slice( 0, cutIndex ) + 
    params + 
    blankLink.slice( cutIndex, blankLink.length ) + 
    token
  
  return linkForFetch
}

async function getList () { 
  const arrayOfUsers = await bruteForce.getCachedUsers()

  processedUsers = arrayOfUsers

  if ( localStorage.getItem('invited') ) {
    

    const invitedusers = JSON.parse(localStorage.getItem('invited'))
    processedUsers = processedUsers.filter((user) => {
      return !invitedusers.includes(user.id)
    })
  } 

  const { name, ageFrom, ageTo, gender } = filterData

    processedUsers = processedUsers.filter( user => {
      return (
        ( user.first_name.toLowerCase().startsWith( name.toLowerCase() ) 
          ||
          user.last_name.toLowerCase().startsWith ( name.toLowerCase() )
        )
          &&
        ( calculateAge(user.dob) >= +ageFrom ) 
          && 
        ( calculateAge(user.dob) <= ( +ageTo || 100 ) ) 
          &&
        ( user.gender === gender || gender === 'both' )
      )
    })

  const { pageNumber, onPage } = paginatorData

  return processedUsers.slice(pageNumber * onPage, pageNumber * onPage + onPage)
}

async function buildTree(n) {
  const personList = await getList(n || 0)

  if (!personList.length) noData.removeAttribute('hidden')
  else noData.setAttribute('hidden', 'true')

  if (personList === undefined) { console.error('localstorage пуст!'); return }

  const usersLayout = new UserOnPage(personList)
  const renderResult = usersLayout.render()
  tBody.innerHTML = ''
  tBody.innerHTML = renderResult

  const { onPage, pageNumber } = paginatorData
  const lastPageValue = Math.ceil(processedUsers.length / onPage)

  paginatorData = { ...paginatorData, lastPage: lastPageValue - 1 }

  
  pageCount.innerText = pageNumber + 1 + '/' + lastPageValue

  if (pageNumber === 0) prevButton.setAttribute('disabled', 'true')
  else prevButton.removeAttribute('disabled')
  if (pageNumber === lastPageValue - 1) nextButton.setAttribute('disabled', 'true')
  else nextButton.removeAttribute('disabled')
}
 
function calculateAge(personDayOfBirth) {
  const nowaday = new Date()
  const birthDate = new Date(personDayOfBirth)
  const age = nowaday.getFullYear() - birthDate.getFullYear() 

  return nowaday.setFullYear(2000) < birthDate.setFullYear(2000) ? age - 1 : age
}

class UserOnPage {
  constructor(personList) {
    this.personList = personList
  }

  insertCapitalLetter(person, i, personArray) {
    if( personArray[i - 1] && 
      person.first_name[0].toLowerCase() !== personArray[i - 1].first_name[0].toLowerCase()
      ) {
        return `<tr><h3>${ person.first_name[0] }</h3></tr>`
    } else if ( !personArray[i - 1] ) {
        return `<tr><h3>${ person.first_name[0] }</h3></tr>` 
    }
  }

  render() {
    return this.personList.map((person, i, personArray) => {
      let capitalLetter = this.insertCapitalLetter(person, i, personArray)

    return `
    ${capitalLetter || ''}
      <tr data-status="${person.status}"> 
        <td>${person.first_name} ${person.last_name}</td>
        <td>${calculateAge(this.personList[i].dob)}</td>
        <td>${person.gender}</td>
        <td> 
          <button data-id="${person.id}">Пригласить на свидание</button>
        </td>
      </tr>`
    }).join('')
  }
}

export { buildTree, concatLink, addToInvitedUsers, setFilterData, setPaginatorData, paginatorData, processedUsers }
