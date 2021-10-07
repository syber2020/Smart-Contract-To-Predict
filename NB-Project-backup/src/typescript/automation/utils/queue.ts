
import { Mutex, MutexInterface } from 'async-mutex'

const sendersToMutexes: {[sender: string]: Mutex} = {}

export function acquireLock (sender: string): Promise<MutexInterface.Releaser> {
  if (sender) {
    sender = sender.trim().toLowerCase()
  } else {
    throw new Error('Null Sender!')
  }

  if(sender){
    if (!sendersToMutexes[sender]) {
      sendersToMutexes[sender] = new Mutex()
    }
    return sendersToMutexes[sender].acquire()
  } else {
    throw new Error('Empty Sender After Trim/Lowercase!')
  }
}
