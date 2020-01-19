/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-09T00:56:40+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { translateOnPath } from '@txo/functional'

const sample = { a: { b: { c: 1 } } }

test('test replace with object', () => {
  const result = translateOnPath('a.b.c', sample, value => ({ d: 2 }))
  expect(result).toStrictEqual({ a: { b: { c: { d: 2 } } } })
  expect(result !== sample).toBeTruthy()
})

test('test replace with same value', () => {
  const result = translateOnPath('a.b.c', sample, value => 1)
  expect(result).toStrictEqual({ a: { b: { c: 1 } } })
  expect(result === sample).toBeTruthy()
})

test('test replace with different value', () => {
  const result = translateOnPath('a.b.c', sample, value => 2)
  expect(result).toStrictEqual({ a: { b: { c: 2 } } })
  expect(result !== sample).toBeTruthy()
})

test('test replace with null', () => {
  const result = translateOnPath('a.b.c', sample, value => null)
  expect(result).toStrictEqual({ a: { b: { c: null } } })
  expect(result !== sample).toBeTruthy()
})

test('test replace with undefined', () => {
  const result = translateOnPath('a.b.c', sample, value => undefined)
  expect(result).toBeUndefined()
})

test('should be undefined after replacing by empty object', () => {
  const result = translateOnPath('a.b.c', sample, value => ({}))
  expect(result).toBeUndefined()
})

test('should keep leaf empty object', () => {
  const result = translateOnPath('a.b.c', sample, value => ({}), {
    keepEmptyObjectsAtTranlateResult: true,
  })
  expect(result).toStrictEqual({ a: { b: { c: {} } } })
})

test('should pass undefined value for translate in case path does not exist', () => {
  const result = translateOnPath('a.b.d', sample, value => value, {
    keepEmptyObjectsAtTranlateResult: true,
  })
  expect(result).toStrictEqual({ a: { b: { c: 1 } } })
  expect(result).toBe(sample)
})
