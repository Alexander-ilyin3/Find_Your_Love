let interval

 function showLoading(instant) {
  const container = document.getElementById('loading')
  const span = document.querySelector('#loading span')
  container.classList = 'modal is-shown'
  if (!instant && instant !== 'instant') {
  let i = 0
    interval = setInterval(() => {
      i++
      console.log(i)
      span.innerText += '.'
      if ( i === 4 ) { span.innerText = 'Loading' ; i = 0 }
      
    }, 250);
  }
}

function hideLoading() {
  const container = document.getElementById('loading')
  container.classList = 'modal'
 clearInterval(interval)
}

export { showLoading, hideLoading }
