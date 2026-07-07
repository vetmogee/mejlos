let finished = false
const listeners = new Set<() => void>()

export function isIntroFinished() {
  return finished
}

export function markIntroFinished() {
  if (finished) return
  finished = true
  listeners.forEach(cb => cb())
  listeners.clear()
}

export function onIntroFinished(cb: () => void) {
  if (finished) {
    cb()
    return () => {}
  }
  listeners.add(cb)
  return () => listeners.delete(cb)
}
