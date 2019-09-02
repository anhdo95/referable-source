window.onload = function() {
  const lazyImages = [...document.getElementsByClassName('lazy-image')]

  const options = {
    // Defaults to the browser viewport if not specified or if null.
    root: document.querySelector('.container'),
    // rootMargin: '0px 0px 200px'
    // The degree of intersection between the target element and its root is the intersection ratio.
    // 1.0 means that when 100% of the target is visible within the element specified by the root option, the callback is invoked.
    // If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1].
    threshold: 0
  }

  function handleObserver(entries, observer) {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        observer.unobserve(target)

        target.src = target.dataset.src
        target.onload = () => target.classList.add('loaded')
      }
    })
  }

  const io = new IntersectionObserver(handleObserver, options)

  lazyImages.forEach(image => io.observe(image))
}