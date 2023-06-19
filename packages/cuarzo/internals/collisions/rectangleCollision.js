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
export function detectRectangleCollision(collider1, collider2) {
  // Obtener las coordenadas absolutas de los círculos
  const { x: absX1, y: absY1 } = collider1.getAbsolutePosition()
  const { x: absX2, y: absY2 } = collider2.getAbsolutePosition()

  // Verificar si los rectángulos se superponen en el eje X
  if (
    absX1 + collider1.size.x >= absX2 &&
    absX2 + collider2.size.y >= absX1 &&
    absY1 + collider1.size.x >= absY2 &&
    absY2 + collider2.size.y >= absY1
  ) {
    // Hay colisión entre los rectángulos
    return true
  }

  return false
}
