export function getCollisions(rect, i) {
  const collision = rect.$collisions[i]

  return {
    x: rect.position.x + collision.position.x,
    y: rect.position.y + collision.position.y,
    w: collision.size.w,
    h: collision.size.h,
    bg: collision.bg
  }
}

export default function checkCollision(rect1, rect2) {
  const r1 = getCollisions(...rect1)
  const r2 = getCollisions(...rect2)

  return (
    r1.x + r1.w >= r2.x && // rect1 right collides with rect2 left
    r2.x + r2.w >= r1.x && // rect2 right collides with rect1 left
    r1.y + r1.h >= r2.y && // rect1 bottom collides with rect2 top
    r2.y + r2.h >= r1.y // rect1 top collides with rect2 bottom
  )
}
