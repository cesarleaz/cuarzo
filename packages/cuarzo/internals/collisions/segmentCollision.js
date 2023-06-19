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
export function detectSegmentCollision(collider1, collider2) {
  // Obtener las coordenadas de los puntos de los segmentos relativos a las áreas
  const { x: x1, y: y1 } = collider1.point1
  const { x: x2, y: y2 } = collider1.point2
  const { x: x3, y: y3 } = collider2.point1
  const { x: x4, y: y4 } = collider2.point2

  // Calcular las coordenadas absolutas de los puntos de los segmentos
  const { x: absX1Collider, y: absY1Collider } = collider1.getAbsolutePosition()
  const { x: absX2Collider, y: absY2Collider } = collider2.getAbsolutePosition()

  const absX1 = absX1Collider + x1
  const absY1 = absY1Collider + y1
  const absX2 = absX1Collider + x2
  const absY2 = absY1Collider + y2
  const absX3 = absX2Collider + x3
  const absY3 = absY2Collider + y3
  const absX4 = absX2Collider + x4
  const absY4 = absY2Collider + y4

  // Calcular las diferencias de coordenadas
  const dx1 = absX2 - absX1
  const dy1 = absY2 - absY1
  const dx2 = absX4 - absX3
  const dy2 = absY4 - absY3

  // Calcular el determinante
  const determinant = dx1 * dy2 - dx2 * dy1

  // Verificar si los segmentos son paralelos
  if (determinant === 0) {
    return false
  }

  // Calcular los valores de 's' y 't' para la intersección
  const s = (dx1 * (absY3 - absY1) + dy1 * (absX1 - absX3)) / determinant
  const t = (dx2 * (absY1 - absY3) + dy2 * (absX3 - absX1)) / -determinant

  // Verificar si la intersección está dentro de los segmentos
  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    return true // Hay colisión entre los segmentos
  }

  return false
}
