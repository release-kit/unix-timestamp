import { getInput } from '@actions/core'
import { z } from 'zod'

const Schema = z.object({
  date: z.string().default(() => new Date().toISOString()),
})

interface Inputs {
  date?: string
}

function getActionInputs(): Inputs {
  return Object.entries({
    date: getInput('date'),
  }).reduce<Inputs>((acc: Inputs, [name, value]) => {
    if (!value) return acc
    acc[name as keyof Inputs] = value
    return acc
  }, {})
}

export function getOptions(input: Inputs = getActionInputs()) {
  return Schema.parse(input)
}
