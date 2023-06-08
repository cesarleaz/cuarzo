/**
 * Class representing an AudioClip for managing and playing audio clips.
 */
export class AudioClip {
  /**
   * Create an instance of the AudioClip class.
   * @param {...string} resources - Audio resources for the clips.
   */
  constructor(...resources) {
    /**
     * State of the playing clips.
     * @private
     * @type {Object.<number, boolean>}
     */
    this.$playing = {}

    /**
     * Audio clips.
     * @private
     * @type {Array.<{audio: Audio, index: number}>}
     */
    this.$sounds = resources.map((src, index) => {
      /**
       * Audio object.
       * @type {Audio}
       */
      const audio = new Audio(src)

      audio.addEventListener('ended', () => this.stop(index))

      return { audio, index }
    })
  }

  /**
   * Play a random audio clip.
   */
  play() {
    /**
     * Index of the audio clip to play.
     * @type {number}
     */
    const soundIndex = Math.floor(Math.random() * this.$sounds.length)
    const { audio, index } = this.$sounds[soundIndex]

    this.$playing[index] = true
    audio.play()
  }

  /**
   * Stop and reset a specific audio clip.
   * @param {number} index - Index of the audio clip to stop.
   */
  stop(index) {
    const audio = this.$sounds[index].audio
    audio.pause()
    audio.currentTime = 0
    delete this.$playing[index]
  }

  /**
   * Pause all currently playing audio clips.
   */
  pause() {
    for (const index in this.$playing) {
      this.stop(index)
    }
  }
}
