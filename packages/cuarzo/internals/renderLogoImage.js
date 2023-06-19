/**
 * Renders an image logo.
 * @param {string} src - The URL or path of the image.
 * @param {Function} next - The callback function to execute after the logo is rendered.
 */
export function renderLogoImage(src, next) {
  const container = document.createElement('div')
  container.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background: white;
    position: fixed;
    inset: 0;
    opacity: 1;
    transition: opacity 0.2s;
    width: 100vw;
    height: 100vh;
  `

  const logo = new Image()
  logo.style.cssText = `
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
  `
  logo.src = src

  container.appendChild(logo)
  document.body.appendChild(container)

  logo.addEventListener('load', function loaded() {
    logo.removeEventListener('load', loaded)
    setTimeout(() => {
      container.style.opacity = 0
      container.addEventListener('transitionend', function transitionEnd() {
        container.removeEventListener('transitionend', transitionEnd)
        container.remove()
        if (typeof next === 'function') next()
      })
    }, 1500)
  })
}
