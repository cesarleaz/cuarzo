/**
 * Default key mappings.
 * Modify this object to customize the default key assignments.
 */
const DEFAULT_KEYS = {
  UP: ['ArrowUp', 'w'],
  DOWN: ['ArrowDown', 's'],
  LEFT: ['ArrowLeft', 'd'],
  RIGHT: ['ArrowRight', 'd'],
  JUMP: [' ']
}

/**
 * Set to store pressed keys.
 */
const KEY_PRESSEDS = new Set()

/**
 * Key assignments retrieved from storage or default keys if not available.
 * @type {Object}
 */
const KEYS_ASSIGNEDS_FORM_STORAGE =
  window.localStorage.getItem('KEYS_ASSIGNEDS')
let keyAssigneds = KEYS_ASSIGNEDS_FORM_STORAGE
  ? JSON.parse(KEYS_ASSIGNEDS_FORM_STORAGE)
  : structuredClone(DEFAULT_KEYS)

/**
 * The last key that was pressed.
 * @type {string}
 */
let $lastKeyPressed

/**
 * Class representing the Input module.
 */
export class Input {
  /**
   * Get the last key that was pressed.
   * @returns {string} The last key pressed.
   */
  static get lastKeyPressed() {
    return $lastKeyPressed
  }

  /**
   * Check if a specific key is currently pressed.
   * @param {string} key - The key to check.
   * @returns {boolean} True if the key is pressed, false otherwise.
   */
  static isKeyPressed(key) {
    return KEY_PRESSEDS.has(key.toUpperCase())
  }

  /**
   * Get the current state of all assigned keys.
   * @returns {Object} An object containing the current state of all assigned keys.
   */
  static getAllKeysState() {
    const keysState = {}
    for (const key in keyAssigneds) {
      keysState[key] = this.isKeyPressed(key)
    }
    return keysState
  }
}

/**
 * Event handler for keydown events.
 * @param {KeyboardEvent} e - The keydown event object.
 */
function handleKeyDown(e) {
  const keyPressed = e.key.toUpperCase()

  for (const key in keyAssigneds) {
    if (!keyAssigneds[key].includes(keyPressed)) continue
    KEY_PRESSEDS.add(key)
    $lastKeyPressed = keyAssigneds[key]
    return
  }

  keyAssigneds[keyPressed] = [keyPressed]
  KEY_PRESSEDS.add(keyPressed)
  $lastKeyPressed = keyPressed
}

/**
 * Event handler for keyup events.
 * @param {KeyboardEvent} e - The keyup event object.
 */
function handleKeyUp(e) {
  const keyPressed = e.key.toUpperCase()
  for (const key in keyAssigneds) {
    if (!keyAssigneds[key].includes(keyPressed)) continue
    KEY_PRESSEDS.delete(key)
    break
  }
}

window.addEventListener('keydown', handleKeyDown)
window.addEventListener('keyup', handleKeyUp)
