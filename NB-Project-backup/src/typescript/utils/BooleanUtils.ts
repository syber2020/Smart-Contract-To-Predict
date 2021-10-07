
export function parseBool (s: string) {
  const res = JSON.parse(s)
  if (res) {
    return true
  } else {
    return false
  }
}
