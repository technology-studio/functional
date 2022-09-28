/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-01-19T15:01:13+01:00
 * @Copyright: Technology Studio
**/

import { getOnPath } from '../../src'

const sample = { a: { b: { c: 1 } } }

test('should contain value on existing path', () => {
  const result = getOnPath('a.b.c', sample)
  expect(result).toBe(sample.a.b.c)
})

test('should return undefined for non existing path', () => {
  const result = getOnPath('a.b.d', sample)
  expect(result).toBeUndefined()
})
