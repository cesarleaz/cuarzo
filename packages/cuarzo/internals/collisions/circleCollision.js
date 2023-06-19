// @ts-check
/**
 * @typedef {import('../../collision').Collision} Collider2D
 */

/**
 *
 * @param {Collider2D} collider1
 * @param {Collider2D} collider2
 * @returns {boolean}
 */
export function detectCircleCollision(collider1, collider2) {
  // Obtener radios de los círculos
  const { radius: r1 } = collider1
  const { radius: r2 } = collider2

  // Obtener las coordenadas absolutas de los círculos
  const { x: absX1, y: absY1 } = collider1.getAbsolutePosition()
  const { x: absX2, y: absY2 } = collider2.getAbsolutePosition()

  // Calcular la distancia entre los centros de los círculos
  const distance = Math.sqrt((absX2 - absX1) ** 2 + (absY2 - absY1) ** 2)

  // Verificar si los círculos se superponen
  if (distance <= r1 + r2) {
    return true // Hay colisión entre los círculos
  }

  return false
}
