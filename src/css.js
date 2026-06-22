// Converts a CSS declaration string ("display:flex; gap:10px;") into a React
// style object, so the design's original inline-style strings can be kept verbatim.
export function css(str) {
  if (!str) return {}
  const out = {}
  for (const part of str.split(';')) {
    const i = part.indexOf(':')
    if (i < 0) continue
    const key = part.slice(0, i).trim()
    if (!key) continue
    const val = part.slice(i + 1).trim()
    out[key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = val
  }
  return out
}
