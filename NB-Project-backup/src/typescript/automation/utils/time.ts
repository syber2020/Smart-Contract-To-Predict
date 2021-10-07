import { performance } from 'perf_hooks'

let offsetInitialized: boolean = false
let firstHighPerformanceTimeInSeconds: number = 0
let firstTimeSinceUnixEpochInSeconds: number = 0

function getHighPerformanceTimeInSeconds (): number {
  return performance.now() / 1000.0
}

function getTimeSinceUnixEpochInSeconds (): number {
  return Date.now() / 1000.0
}

function initializeOffset (): void {
  if (!offsetInitialized) {
    firstHighPerformanceTimeInSeconds = getHighPerformanceTimeInSeconds()
    firstTimeSinceUnixEpochInSeconds = getTimeSinceUnixEpochInSeconds()
    offsetInitialized = true
  }
}

export function getMostPreciseTimeInSecondsSinceUnixEpoch (): number {
  initializeOffset()
  const currentHighPerfTime = getHighPerformanceTimeInSeconds()
  const taredHighPerfTime = currentHighPerfTime - firstHighPerformanceTimeInSeconds
  const timeSinceUnixEpochInSeconds = taredHighPerfTime + firstTimeSinceUnixEpochInSeconds
  return timeSinceUnixEpochInSeconds
}
