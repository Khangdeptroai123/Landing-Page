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
const sections = document.querySelectorAll('section')
const navLinks = document.querySelectorAll('.nav-link')

window.addEventListener('scroll', () => {
  let current = ''

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80 // Adjust for fixed navbar height
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id')
    }
  })

  navLinks.forEach(link => {
    link.classList.remove('text-primary')
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('text-primary')
    }
  })
})

window.addEventListener('load', function () {
  // Basic
  flatpickr('.flatpickr-date', {
    monthSelectorType: 'static'
  })
})
  document.addEventListener('DOMContentLoaded', function () {
  const docItems = Array.from(document.querySelectorAll('.doc-item'))
  const lightbox = document.getElementById('imageLightbox')
  const lightboxImage = document.getElementById('lightboxImage')
  const lightboxClose = document.getElementById('lightboxClose')
  const lightboxPrev = document.getElementById('lightboxPrev')
  const lightboxNext = document.getElementById('lightboxNext')
  const lightboxCounter = document.getElementById('lightboxCounter')
  const lightboxPreviewPrev = document.getElementById('lightboxPreviewPrev')
  const lightboxPreviewNext = document.getElementById('lightboxPreviewNext')
  const lightboxPreviewPrevWrap = document.getElementById('lightboxPreviewPrevWrap')
  const lightboxPreviewNextWrap = document.getElementById('lightboxPreviewNextWrap')
  if (
    !docItems.length ||
    !lightbox ||
    !lightboxImage ||
    !lightboxClose ||
    !lightboxPrev ||
    !lightboxNext ||
    !lightboxCounter ||
    !lightboxPreviewPrev ||
    !lightboxPreviewNext ||
    !lightboxPreviewPrevWrap ||
    !lightboxPreviewNextWrap
  ) {
    return
  }

  const images = docItems
    .map(item => ({
      src: item.getAttribute('data-full'),
      alt: item.querySelector('img')?.getAttribute('alt') || 'Preview'
    }))
    .filter(item => item.src)

  let currentIndex = 0
  let currentScale = 1
  let translateX = 0
  let translateY = 0
  let isDragging = false
  let startX = 0
  let startY = 0

  function updateTransform() {
    lightboxImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`
    lightboxImage.style.cursor = currentScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
  }

  function resetZoom() {
    currentScale = 1
    translateX = 0
    translateY = 0
    lightboxImage.style.transition = 'transform .2s ease, opacity .28s ease'
    updateTransform()
  }

  function renderLightbox() {
    const current = images[currentIndex]
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    const nextIndex = (currentIndex + 1) % images.length

    lightboxImage.src = current.src
    lightboxImage.alt = current.alt
    lightboxPreviewPrev.src = images[prevIndex].src
    lightboxPreviewNext.src = images[nextIndex].src
    lightboxCounter.textContent = `${currentIndex + 1} of ${images.length}`

    const hasMany = images.length > 1
    lightboxPrev.style.display = hasMany ? 'block' : 'none'
    lightboxNext.style.display = hasMany ? 'block' : 'none'
    lightboxPreviewPrev.style.display = hasMany ? 'block' : 'none'
    lightboxPreviewNext.style.display = hasMany ? 'block' : 'none'

    resetZoom()
  }

  function openLightbox(index) {
    currentIndex = index
    renderLightbox()
    lightbox.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
  }

  function closeLightbox() {
    lightbox.classList.add('hidden')
    document.body.style.overflow = ''
    resetZoom()
  }

  function animateTo(newIndex, direction) {
    lightboxImage.style.opacity = '0'
    lightboxImage.style.transform =
      direction === 'next'
        ? 'translateX(-24px) scale(0.98)'
        : 'translateX(24px) scale(0.98)'

    setTimeout(() => {
      currentIndex = newIndex
      renderLightbox()

      lightboxImage.style.transition = 'none'
      lightboxImage.style.opacity = '0'
      lightboxImage.style.transform =
        direction === 'next'
          ? 'translateX(24px) scale(0.98)'
          : 'translateX(-24px) scale(0.98)'

      requestAnimationFrame(() => {
        lightboxImage.style.transition = 'opacity .28s ease, transform .28s ease'
        lightboxImage.style.opacity = '1'
        updateTransform()
      })
    }, 180)
  }

  function showPrev() {
    const newIndex = (currentIndex - 1 + images.length) % images.length
    animateTo(newIndex, 'prev')
  }

  function showNext() {
    const newIndex = (currentIndex + 1) % images.length
    animateTo(newIndex, 'next')
  }

  function zoomAt(delta, clientX, clientY) {
    const rect = lightboxImage.getBoundingClientRect()
    const offsetX = clientX - rect.left - rect.width / 2
    const offsetY = clientY - rect.top - rect.height / 2

    const oldScale = currentScale
    currentScale += delta

    if (currentScale < 1) currentScale = 1
    if (currentScale > 4) currentScale = 4

    if (currentScale === 1) {
      translateX = 0
      translateY = 0
    } else {
      const scaleRatio = currentScale / oldScale
      translateX -= offsetX * (scaleRatio - 1)
      translateY -= offsetY * (scaleRatio - 1)
    }

    lightboxImage.style.transition = 'transform .12s ease'
    updateTransform()
  }

  docItems.forEach((item, index) => {
    item.addEventListener('click', function () {
      openLightbox(index)
    })
  })
    lightboxClose.addEventListener('click', closeLightbox)
    lightboxPrev.addEventListener('click', showPrev)
    lightboxNext.addEventListener('click', showNext)
    lightboxPreviewPrevWrap.addEventListener('click', showPrev)
    lightboxPreviewNextWrap.addEventListener('click', showNext)

  document.addEventListener('keydown', function (e) {
    if (lightbox.classList.contains('hidden')) return

    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft' && currentScale === 1) showPrev()
    if (e.key === 'ArrowRight' && currentScale === 1) showNext()

    if (e.key === '+' || e.key === '=') {
      const rect = lightboxImage.getBoundingClientRect()
      zoomAt(0.25, rect.left + rect.width / 2, rect.top + rect.height / 2)
    }

    if (e.key === '-') {
      const rect = lightboxImage.getBoundingClientRect()
      zoomAt(-0.25, rect.left + rect.width / 2, rect.top + rect.height / 2)
    }

    if (e.key === '0') {
      resetZoom()
    }
  })

  lightbox.addEventListener('click', function (e) {
    if (!lightboxImage.contains(e.target)) {
      closeLightbox()
    }
  })
  lightboxImage.addEventListener('click', function (e) {
    e.stopPropagation()

    if (currentScale === 1) {
      zoomAt(1, e.clientX, e.clientY)
    } else {
      resetZoom()
    }
  })

  lightboxImage.addEventListener(
    'wheel',
    function (e) {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 0.2 : -0.2
      zoomAt(delta, e.clientX, e.clientY)
    },
    { passive: false }
  )
  lightboxImage.addEventListener('click', function (e) {
      e.stopPropagation()
    })

    lightboxPrev.addEventListener('click', function (e) {
      e.stopPropagation()
    })

    lightboxNext.addEventListener('click', function (e) {
      e.stopPropagation()
    })

    lightboxPreviewPrevWrap.addEventListener('click', function (e) {
      e.stopPropagation()
      showPrev()
    })

    lightboxPreviewNextWrap.addEventListener('click', function (e) {
      e.stopPropagation()
      showNext()
    })
  lightboxImage.addEventListener('mousedown', function (e) {
    if (currentScale <= 1) return
    isDragging = true
    startX = e.clientX - translateX
    startY = e.clientY - translateY
    lightboxImage.style.transition = 'none'
    updateTransform()
    e.preventDefault()
  })

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return
    translateX = e.clientX - startX
    translateY = e.clientY - startY
    updateTransform()
  })

  document.addEventListener('mouseup', function () {
    isDragging = false
    updateTransform()
  })
  
})