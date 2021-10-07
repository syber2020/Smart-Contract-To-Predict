
export function parseArray (s: string): string[] {
  if (!s) {
    return []
  } else {
    return s.split(',')
  }
}

export function multiSwap<T> (thiz: T[], beforeIdxs: number[], afterIdxs: number[]): void {
  if (beforeIdxs.length !== afterIdxs.length) {
    return
  }
  const beforeArr: T[] = []
  for (let i = 0; i < beforeIdxs.length; i++) {
    const beforeIdx = beforeIdxs[i]
    const afterIdx = afterIdxs[i]
    if (beforeIdx < 0 || beforeIdx > thiz.length) {
      return
    }
    if (afterIdx < 0 || afterIdx > thiz.length) {
      return
    }
    beforeArr.push(thiz[beforeIdx])
  }

  for (let i = 0; i < afterIdxs.length; i++) {
    const afterIdx = afterIdxs[i]
    const afterElem = beforeArr[i]
    thiz[afterIdx] = afterElem
  }
}

export function swap<T> (thiz: T[], a: number, b: number): void {
  multiSwap(thiz, [a, b], [b, a])
}
