import { getOptions } from './options'

describe('getOptions', () => {
  test('empty inputs', () => {
    expect(new Date(getOptions({}).date).getTime()).not.toBeNaN()
  })

  test('only date input', () => {
    const date = '2024-06-29T13:03:17.253Z'
    expect(getOptions({ date }).date).toBe(date)
  })
})
