import { Resources } from '../internals/resources'

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
    this._playing = {}

    /**
     * Audio clips.
     * @private
     * @type {Array.<{audio: Audio, index: number}>}
     */
    this._audios = resources.map((src, index) => {
      /**
       * Audio object.
       * @type {Audio}
       */
      const audio = Resources.loadAudio(src)

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
    const soundIndex = Math.floor(Math.random() * this._audios.length)
    const { audio, index } = this._audios[soundIndex]

    this._playing[index] = true
    audio.play()
  }

  /**
   * Stop and reset a specific audio clip.
   * @param {number} index - Index of the audio clip to stop.
   */
  stop(index) {
    const audio = this._audios[index].audio
    audio.pause()
    audio.currentTime = 0
    delete this._playing[index]
  }

  /**
   * Pause all currently playing audio clips.
   */
  pause() {
    for (const index in this._playing) {
      this.stop(index)
    }
  }
}
