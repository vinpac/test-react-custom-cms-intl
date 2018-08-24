export function layerPathToKeyPath(layerPath: string): string[] {
  const arr = layerPath.split('.')
  const keyPath: string[] = []

  arr.forEach(k => {
    keyPath.push('nodes', k)
  })

  return keyPath
}
