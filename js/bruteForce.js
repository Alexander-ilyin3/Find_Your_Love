import { concatLink } from '../js/functions.js'
import { showLoading, hideLoading } from './loading.js'
import { showOverlay, hideOverlay } from './modals.js'

const blankLink = 'https://gorest.co.in/public-api/users?_format=json&access-token='

let fetchList = []
const listOfTokens = [
  // '2WNUfC2hkqMwRTcdLtmw_avT3j1sWqd2idel',
  // 'QmDQGIeUf26xjVoFAj898TYxYlv6O2BSkfUd',
  // 'XplfDUdcobJrth5bDFIwJkQ6aqZQpBHbLvsf',
  // 'VdjCTKiG-o9A4yGNXZBUdlHxey8ykToNjpMT',
  // 'lBG6BHNjV4_vBuSUHnZeqzZrf4ZwQf-fIjuV',
  // '77fmIiSbp-RoCgZaVXyzqScykmJqwoP5ezD4',
  '5BfXi9LibSMiKIVvAQyXgF7udRBWKXcy7nPI',
  '8dgJBPP3Hcq5HKoB44Ro7Z-2FJUGwqSMHN1M',
  'aS1Pu6xchVMlkq_6NtOJ0lEBmRSgk8rAlAwA',
  'pjiZ4BxBZD-MrhitjL9Eat-LVATmopPm3yWG',
  'V8Xv3Ph85_IEVe1U5jkS7UDBIMEWIjMT3_l4',
  'nDaccZBUARRN7L0xtP0R2WZKo0SQQpzSHS_p',
  'hJUzpMH7W4Ala3jxaE1iVs4LdHQmh4X2TtHe',
  'VT48O1GpD_EJs7egqiUmIw6IL1lfJC3IIWCZ',
  'UHE0012d_iH3eA3_ikUGnLrfZxQmUc_vlZ7q',
  'gWObxr-xgzpehnEQBAyECHlFZoLKlXZdgneo',
]

class BruteForce {

  userList = [];

  fakeDelay = () => new Promise((rs, rj)=> {
    setTimeout(() => {
      rs()
    }, 400);
  })

  getCachedUsers = async () => {
    if (this.userList.length === 0) this.userList = await this.getListOfAllUsers()
    await this.fakeDelay()
    return [...this.userList]
  }

  refreshLocalStorage = async () => {

    this.userList = []
    localStorage.removeItem('users')
    await this.getCachedUsers()
  }

  getListOfAllUsers = async () => {
    if (!localStorage.getItem('cooldown')) localStorage.setItem( 'cooldown', Date.now() )
    if ( localStorage.getItem('users') ) return JSON.parse(localStorage.getItem('users'))
    showLoading()
    showOverlay('instant')
    
    const pageCount = parseInt( await this.getPageCount() )
    const fetchesArray = this.concatArrayOfFetches(pageCount, blankLink)
    
    const arrayOfResponses = await Promise.all(fetchesArray)
    let arrayOfParsed
    try {
      arrayOfParsed = await Promise.all( arrayOfResponses.map( resp => resp.clone().json()))
    } catch (error) {
      console.log(error)
    }
    
    const arrayOfUsers = arrayOfParsed.map(response => {
      return response.result
    })
    this.putToLocalStorage(arrayOfUsers)
    
    hideLoading()
    hideOverlay('instant')  

    return JSON.parse( localStorage.getItem('users') )
  }
  
  putToLocalStorage = (arrayOfUsers) => {
    const jointArrayOfAllUsers = []
    
    arrayOfUsers.forEach(arr => {
      arr.forEach(item => jointArrayOfAllUsers.push(item))
    });

    jointArrayOfAllUsers.sort(( prev, next ) => { 
      if ( prev.first_name.toLowerCase() > next.first_name.toLowerCase() ) return 1
      if ( prev.first_name.toLowerCase() < next.first_name.toLowerCase() ) return -1
      else return 0
    })
    
    localStorage.removeItem('users')
    localStorage.setItem('users', JSON.stringify(jointArrayOfAllUsers))
  }
  
  concatArrayOfFetches = (pageCount, blankLink) => {

    fetchList = []

    for(let i = 1, j = 0; i < pageCount + 1; i++, j++) { 
      if (j === listOfTokens.length) j = 0; 
      const currentPage = '&page=' + i
      
      fetchList.push( fetch( concatLink( currentPage, blankLink, listOfTokens[j] ) ) )
    }
    return fetchList
  }
  
  getPageCount = async () => {
    const resp = await fetch('https://gorest.co.in/public-api/users?_format=json&access-token=77fmIiSbp-RoCgZaVXyzqScykmJqwoP5ezD4')
    const json = await resp.json()
    const pageCount = json._meta.pageCount

    return await pageCount
  }
}

export default new BruteForce()
