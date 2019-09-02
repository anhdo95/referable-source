window.onload = function() {
  const lazyImages = [...document.getElementsByClassName('lazy-image')]
  const inAdvance = 200

  const throttledLazyLoad = _.throttle(lazyLoad, 16)

  function isLazyImagesLoaded() {
    return lazyImages.every(function(image) {
      return image.classList.contains('loaded')
    })
  }

  function lazyLoad() {
    lazyImages.forEach(function(image) {
      if (image.offsetTop < (window.innerHeight + window.pageYOffset + inAdvance)) {
        image.src = image.dataset.src
        image.onload = function() {
          image.classList.add('loaded')
        }
      }
    })

    if (isLazyImagesLoaded()) {
      window.removeEventListener('scroll', throttledLazyLoad)
      window.removeEventListener('resize', throttledLazyLoad)
    }
  }

  lazyLoad()

  window.addEventListener('scroll', throttledLazyLoad)
  window.addEventListener('resize', throttledLazyLoad)
}
