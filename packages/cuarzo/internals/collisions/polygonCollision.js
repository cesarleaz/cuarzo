import { detectSegmentCollision } from './segmentCollision.js'

export function detectPolygonCollision(node1, polygon1, node2, polygon2) {
  // Obtener los puntos de los polígonos relativos a las áreas
  const points1 = polygon1.points
  const points2 = polygon2.points

  // Calcular las coordenadas absolutas de los puntos de los polígonos
  const absPoints1 = points1.map((point) => ({
    x: node1.position.x + point.x,
    y: node1.position.y + point.y
  }))
  const absPoints2 = points2.map((point) => ({
    x: node2.position.x + point.x,
    y: node2.position.y + point.y
  }))

  // Verificar la colisión entre cada segmento de los polígonos
  for (let i = 0; i < absPoints1.length; i++) {
    const segment1 = {
      point1: absPoints1[i],
      point2: absPoints1[(i + 1) % absPoints1.length]
    }

    for (let j = 0; j < absPoints2.length; j++) {
      const segment2 = {
        point1: absPoints2[j],
        point2: absPoints2[(j + 1) % absPoints2.length]
      }

      if (detectSegmentCollision(node1, segment1, node2, segment2)) {
        return true // Hay colisión entre los polígonos
      }
    }
  }
}
