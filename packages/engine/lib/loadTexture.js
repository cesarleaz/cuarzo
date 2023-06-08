export default function loadTexture(resource) {
  const texture = new Image()
  texture.src = resource.startsWith('res://')
    ? resource.replace('res://', '/sprites/')
    : resource
  return texture
}
