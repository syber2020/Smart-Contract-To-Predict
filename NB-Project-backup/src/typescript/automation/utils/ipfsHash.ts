
import { generate } from 'randomstring'

export function getFakeIPFSHash (): Promise<string> {
  return Promise.resolve(generate({ length: 46 }))
}
