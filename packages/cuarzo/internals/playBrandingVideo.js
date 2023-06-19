// @ts-check
/**
 * Plays a branding video.
 * @param {HTMLVideoElement} media - The video element to play.
 * @param {Function} next - The callback function to execute after the video ends.
 */
export function playBrandingVideo(media, next) {
  /**
   * Sets the styles for the video element.
   * @type {CSSStyleDeclaration}
   */
  const style = media.style

  style.width = innerWidth + 'px'
  style.height = innerHeight + 'px'
  style.cssText = `
    box-sizing: border-box;
    background: black;
    position: fixed;
    inset: 0;
  `

  media.play()

  media.addEventListener('ended', function ended() {
    media.removeEventListener('ended', ended)
    style.display = 'none'
    if (typeof next === 'function') next()
  })
}
