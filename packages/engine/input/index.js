const DEFAULT_KEYS = {
  UP: ['ArrowUp', 'w'],
  DOWN: ['ArrowDown', 's'],
  LEFT: ['ArrowLeft', 'd'],
  RIGHT: ['ArrowRight', 'd'],
  JUMP: [' ']
}

const KEY_PRESSEDS = {}
const KEYS_ASSIGNEDS_FORM_STORAGE =
  window.localStorage.getItem('KEYS_ASSIGNEDS')

let keyAssigneds = KEYS_ASSIGNEDS_FORM_STORAGE
  ? JSON.parse(KEYS_ASSIGNEDS_FORM_STORAGE)
  : structuredClone(DEFAULT_KEYS)
let $lastKeyPressed

export class Input {
  static get lastKeyPressed() {
    return $lastKeyPressed
  }
  static getKeyPressed(key) {
    return KEY_PRESSEDS[key.toUpperCase()]
  }
}

window.addEventListener('keydown', (e) => {
  const keyPressed = e.key.toUpperCase()

  for (const key in keyAssigneds) {
    if (!keyAssigneds[key].includes(keyPressed)) continue
    KEY_PRESSEDS[key] = true
    $lastKeyPressed = keyAssigneds[key]
    return
  }

  keyAssigneds[keyPressed] = [keyPressed]
  KEY_PRESSEDS[keyPressed] = true
  $lastKeyPressed = keyPressed
})

window.addEventListener('keyup', (e) => {
  const keyPressed = e.key.toUpperCase()
  for (const key in keyAssigneds) {
    if (!keyAssigneds[key].includes(keyPressed)) continue
    KEY_PRESSEDS[key] = false
    break
  }
})
