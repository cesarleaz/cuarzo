export function renderImageLogo(source, next) {
  const container = document.createElement('div')
  container.style.display = 'flex'
  container.style.alignItems = 'center'
  container.style.justifyContent = 'center'
  container.style.boxSizing = 'border-box'
  container.style.background = 'white'
  container.style.position = 'fixed'
  container.style.inset = 0
  container.style.opacity = 1
  container.style.transition = 'opacity .2s'
  container.width = innerWidth
  container.height = innerHeight

  const logo = new Image()
  logo.style.boxSizing = 'border-box'
  logo.src = source
  logo.style.maxWidth = '100%'
  logo.style.maxHeight = '100%'

  container.append(logo)
  document.body.append(container)

  logo.addEventListener('load', function loaded() {
    logo.removeEventListener('load', loaded)
    setTimeout(() => {
      container.style.opacity = 0
      container.addEventListener('transitionend', function transitionEnd() {
        container.removeEventListener('transitionend', transitionEnd)
        container.remove()
        typeof next === 'function' && next()
      })
    }, 1500)
  })
}
