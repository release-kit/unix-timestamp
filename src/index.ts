import { setFailed, setOutput } from '@actions/core'
import { getOptions } from './options'

async function run() {
  const options = getOptions()

  const timestamp = new Date(options.date).getTime()

  if (Number.isNaN(timestamp)) {
    return setFailed(
      `Specified date is not a valid date (using JavaScript's Date constructor)`
    )
  }

  setOutput('timestamp', timestamp)
}

try {
  void run()
} catch (error) {
  if (error instanceof Error) setFailed(error)
  else setFailed('Unknown error')
}
