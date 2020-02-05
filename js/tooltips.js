let interval

function showTooltip(target, cooldown) {
  const tooltipContainer = document.createElement('div')
  let additionalText = ''
  let tooltipText = ''
  tooltipText = target.dataset.tooltip + additionalText
  tooltipContainer.innerHTML = tooltipText;

  if (cooldown) {
  function getDifference() {
      let differenceInSeconds = ( 120 - Math.floor( ( Date.now() - cooldown ) / 1000 ) )

      return differenceInSeconds
    }
    
    interval = setTimeout(function run() {
      tooltipText = target.dataset.tooltip + `. Осталось ${getDifference()} секунд`
      tooltipContainer.innerHTML = tooltipText;
    console.log(tooltipText)
    interval = setTimeout(run, 1000);
    }, 0);
}

  tooltipContainer.className = 'tooltip'
  document.body.append(tooltipContainer)

  let coords = target.getBoundingClientRect()

  tooltipContainer.style.left = coords.left + 'px';
  tooltipContainer.style.top = coords.bottom + 'px';

  target.classList = 'tooltip-border'
}

function hideTooltip(target) {
  clearTimeout(interval)
  const tooltipContainer = document.querySelector('.tooltip')
  tooltipContainer && tooltipContainer.parentNode.removeChild(tooltipContainer)
  target.classList = ''
}

export { showTooltip, hideTooltip }
