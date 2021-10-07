import Highland from 'highland'

export function tee<T> (readable: Highland.Stream<T>,
                        numDestinations = 2): Array<Highland.Stream<T>> {
  const destStreams: Array<Highland.Stream<T>> = []
  if (numDestinations <= 0) {
    return destStreams
  }
  // extend isn't working.
  // Create destination streams
  for (let i = 0; i < numDestinations; i++) {
    const destStream = Highland<T>()
    // Open issue: should destination failures propagate to parent??
    destStreams.push(destStream)
  }
  // create parent stream that will feed all children
  const parentStream = Highland()
  readable.pipe(parentStream)
  parentStream.each(
    // reader: Gets the written values. Pass them down to all destinations.
    // @ts-ignore
    ((value: T) => {
      destStreams.forEach((destStream) => {
        destStream.write(value)
      })
    })
  ).done(
    (() => {
      destStreams.forEach((destStream) => {
        destStream.end()
      })
    })
  )
  return destStreams.slice()
}
