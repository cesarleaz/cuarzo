export function loadVideoBrand(media, next) {
  media.width = innerWidth
  media.height = innerHeight
  media.style.boxSizing = 'border-box'
  media.style.background = 'white'
  media.style.position = 'fixed'
  media.style.inset = '0'
  media.play()

  media.addEventListener('ended', function ended() {
    media.removeEventListener('ended', ended)
    media.style.display = 'none'
    typeof next === 'function' && next()
  })
}
