export class AudioClip {
  constructor(...resources) {
    this.$playing = {}
    this.$sounds = resources.map((src, index) => {
      const audio = new Audio(src)
      audio.addEventListener('ended', () => delete this.playing[index])
      return { audio, index }
    })
  }

  play() {
    const soundIndex = parseInt(Math.random() * this.$sounds.length)
    const { audio, index } = this.$sounds[soundIndex]
    this.$playing[index] = true
    audio.play()
  }

  pause() {
    for (const index in this.$playing) {
      this.$sounds[index].audio.pause()
      delete this.$playing[index]
    }
  }
}
