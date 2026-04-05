
document.addEventListener('DOMContentLoaded', () => {
  function counter(id, start, end, duration, suffix = '') {
    let obj = document.getElementById(id),
      current = start,
      range = end - start,
      increment = end > start ? 1 : -1,
      step = Math.abs(Math.floor(duration / range)),
      timer = setInterval(() => {
        current += increment
        let formattedNumber = current

        // Check if the number is 1000 or more to add "k+" (for thousands)
        if (current >= 1000) {
          formattedNumber = (current / 1000).toFixed(1) + 'k' // Adding the "k" suffix
        }

        obj.textContent = formattedNumber + suffix
        if (current == end) {
          clearInterval(timer)
        }
      }, step)
  }

  counter('count1', 100, 4, 5000, '+')
  counter('count2', 100, 30, 5000, '+')
  counter('count3', 0, 100, 5000, '+')
  counter('count4', 100, 10, 5000, 'k+')
})
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav-link')

function updateActiveNav() {
  const header = document.querySelector('header')
  const headerHeight = header ? header.offsetHeight : 100
  const scrollPosition = window.scrollY + headerHeight + 20

  let currentSectionId = ''

  sections.forEach(section => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSectionId = section.getAttribute('id')
    }
  })

  navLinks.forEach(link => {
    link.classList.remove('text-primary')

    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('text-primary')
    }
  })
}

window.addEventListener('scroll', updateActiveNav)
window.addEventListener('load', updateActiveNav)
window.addEventListener('resize', updateActiveNav)  

window.addEventListener('load', function () {
  // Basic
  flatpickr('.flatpickr-date', {
    monthSelectorType: 'static'
  })
})