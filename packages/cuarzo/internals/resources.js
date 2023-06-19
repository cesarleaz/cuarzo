// @ts-check

/** @type {Function | undefined} */
let listener

/**
 * Executing
 * @type {boolean}
 */
let executed = false

/**
 * Number of resources by load
 * @type {number}
 */
let numberLoadingResources = 0

/**
 * Internal method called when a resource is successfully loaded.
 * Increases the loaded resource count and checks if the listener should be called.
 */
function _loaded() {
  numberLoadingResources--
  Resources.executeListener()
}

/**
 * Internal method called when an error occurs while loading a resource.
 * Throws an error with the error message and the URL of the failed resource.
 * @param {string} src - The element url.
 * @throws {Error} - Error loading the resource.
 */
function _error(src) {
  throw new Error(`Error loading the resource: ${src}`)
}

/**
 * Class for managing resources such as images and audio.
 */
export class Resources {
  /**
   * Retrieves and loads an image.
   * @param {string} src - The URL of the image.
   * @returns {HTMLImageElement} - The image object.
   */
  static loadImage(src) {
    const image = new Image()
    image.src = src
    numberLoadingResources++
    image.addEventListener('load', _loaded.bind(this))
    image.addEventListener('error', () => {
      _error(src)
    })
    return image
  }

  /**
   * Retrieves and loads an audio file.
   * @param {string} src - The URL of the audio file.
   * @returns {HTMLAudioElement} - The audio object.
   */
  static loadAudio(src) {
    const audio = new Audio()
    audio.src = src
    numberLoadingResources++
    audio.addEventListener('canplaythrough', _loaded.bind(this))
    audio.addEventListener('error', () => {
      _error(src)
    })
    return audio
  }

  /**
   * Checks if all resources have been loaded and calls the listener if necessary.
   */
  static executeListener() {
    if (
      executed ||
      numberLoadingResources > 0 ||
      typeof listener !== 'function'
    )
      return
    executed = true
    listener()
  }

  /**
   *
   * @param {function} callback
   */
  static asignListener(callback) {
    listener = callback
  }
}
