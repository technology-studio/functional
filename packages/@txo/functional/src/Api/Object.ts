/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-03-10T07:47:24+01:00
 * @Copyright: Technology Studio
**/

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Log } from '@txo/log'
import type { ValuesType } from 'utility-types'

const log = new Log('txo.functional.Api.Object')

export const areObjects = (left: any, right: any): boolean => typeof left === 'object' && typeof right === 'object'

export const clearUndefinedAttributes = (object: Record<string | number | symbol, unknown>): Record<string | number | symbol, unknown> => {
  const newObject: Record<string, unknown> = {}
  Object.keys(object).forEach(key => {
    if (typeof object[key] !== 'undefined') {
      newObject[key] = object[key]
    }
  })
  return newObject
}

export const copyNotUndefinedAttributes = <
  SOURCE extends Record<string | number | symbol, unknown>,
  DESTINATION extends Record<string | number | symbol, unknown>
> (
    source: SOURCE,
    destination: DESTINATION,
    sourceAttributeToDestinationAttributeMap: Record<keyof SOURCE, keyof DESTINATION>,
  ): DESTINATION => {
  Object.entries(sourceAttributeToDestinationAttributeMap).forEach(([sourceKey, destinationKey]: [keyof SOURCE, keyof DESTINATION]) => {
    const value = source[sourceKey]
    if (value !== undefined) {
      destination[destinationKey] = value as any
    }
  })
  return destination
}

export const shallowObjectEquals = (
  left: Record<string | number | symbol, unknown> | null | undefined,
  right: Record<string | number | symbol, unknown> | null | undefined,
  onlyKeys?: string[],
): boolean => {
  if (left === right) {
    return true
  }

  if (!left || !right) {
    return false
  }
  const _left = left
  const _right = right

  let _onlyKeys: string[]
  if (onlyKeys) {
    _onlyKeys = onlyKeys
  } else {
    const leftKeys = Object.keys(left)
    const rightKeys = Object.keys(right)
    if (leftKeys.length !== rightKeys.length) {
      return false
    }
    _onlyKeys = leftKeys
  }

  return _onlyKeys.every(key => _left[key] === _right[key])
}

export const keysToObject = (keys: string[]): Record<string, unknown> => keys.reduce((obj: Record<string | number | symbol, boolean>, key) => {
  obj[key] = true
  return obj
}, {})

export const shallowObjectDiff = (
  left: Record<string | number| symbol, unknown> | null | undefined,
  right: Record<string | number| symbol, unknown> | null | undefined,
  onlyKeys?: string[],
  result: Record<string | number | symbol, boolean> = {},
): Record<string, unknown> => {
  if (left === right) {
    return result
  }

  if (!left || !right) {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return keysToObject(Object.keys(left || right || {}))
  }
  const _left = left
  const _right = right

  const _onlyKeys: string[] = onlyKeys ?? [
    ...Object.keys(_left),
    ...Object.keys(_right),
  ]

  return _onlyKeys.reduce((obj: Record<string | number | symbol, boolean>, key) => {
    if (_left[key] !== _right[key]) {
      obj[key] = true
    }
    return obj
  }, result)
}

type Scheme = {
  [key: string]: Scheme | boolean,
}

export const deepObjectEqualsBySchema = (left: any, right: any, scheme: Scheme): boolean => (
  left === right || !!(
    left && typeof left === 'object' &&
    right && typeof right === 'object' &&
    Object.keys(scheme).every(schemeKey => {
      const subScheme = scheme[schemeKey]
      switch (typeof subScheme) {
        case 'boolean': {
          return left[schemeKey] === right[schemeKey]
        }
        case 'object': {
          return deepObjectEqualsBySchema(left[schemeKey], right[schemeKey], subScheme)
        }
        default:
          throw new Error(`Unknown scheme type ${typeof subScheme} for key ${schemeKey}`)
      }
    })
  )
)

export const removeKeys = <OBJECT extends Record<string, unknown>>(obj: OBJECT, keysToRemove: string[]): Partial<OBJECT> => {
  const unremovedKeys = Object.keys(obj).filter(key => !keysToRemove.includes(key))
  return unremovedKeys.reduce((filteredObject: Record<string, unknown>, key) => {
    filteredObject[key] = obj[key]
    return filteredObject
  }, {}) as Partial<OBJECT>
}

export const containsPathSegmentList = (
  obj: any,
  pathSegmentList: string[],
): boolean => !!(
  pathSegmentList.length === 0 ||
  (obj && typeof obj === 'object' && containsPathSegmentList(
    obj[pathSegmentList[0]],
    pathSegmentList.slice(1),
  ))
)

export const isObject = (obj: any): obj is Record<string | number | symbol, unknown> => (
  obj && typeof obj === 'object'
)

export const isEmptyObject = <OBJECT>(obj?: OBJECT | null): boolean => !!(
  obj && Object.keys(obj).length === 0
)

export const deepMergeIgnoreNil = (left: any, right: any, key?: string): Record<string | number | symbol, unknown> => {
  log.debug(`deepMergeIgnoreNil - ${key ?? ''}`, { left, right })
  if (left === right) {
    return left
  }

  if (isObject(left)) {
    return isObject(right)
      ? Object.keys({
        ...left,
        ...right,
      }).reduce((nextObj: Record<string | number | symbol, unknown>, key) => {
        nextObj[key] = deepMergeIgnoreNil(left[key], right[key], key)
        return nextObj
      }, {})
      : left
  }
  return right ?? left
}

export const removeSubtree = (obj: any, tree: any): any => {
  if (isObject(obj) && !Array.isArray(obj)) {
    return Object.keys(obj).reduce((object: Record<string, unknown>, key) => {
      const subtree = tree[key]
      const subObj = obj[key]
      if (isObject(subtree)) {
        object[key] = removeSubtree(subObj, subtree)
      } else if (subtree !== true) {
        object[key] = subObj
      }
      return object
    }, {})
  }
  return obj
}

export const objectValues = <OBJECT extends Record<string, unknown>>(obj: OBJECT): ValuesType<OBJECT>[] => (
  Object.keys(obj).reduce((values: ValuesType<OBJECT>[], key) => {
    values.push(obj[key] as ValuesType<OBJECT>)
    return values
  }, [])
)
