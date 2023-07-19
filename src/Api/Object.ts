/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-03-10T07:47:24+01:00
 * @Copyright: Technology Studio
**/

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Log } from '@txo/log'
import type { ValuesType } from 'utility-types'

const log = new Log('txo.functional.Api.Object')

export const areObjects = (left: any, right: any): boolean => typeof left === 'object' && typeof right === 'object'

export const clearUndefinedAttributes = <OBJECT extends Record<string | number | symbol, unknown>>(object: OBJECT): OBJECT => {
  const newObject: Record<string, unknown> = {}
  Object.keys(object).forEach(key => {
    if (typeof object[key] !== 'undefined') {
      newObject[key] = object[key]
    }
  })
  return newObject as OBJECT
}

export const copyNotUndefinedAttributes = <
  SOURCE extends Record<string | number | symbol, unknown>,
  DESTINATION extends Record<string | number | symbol, unknown>,
> (
    source: SOURCE,
    destination: DESTINATION,
    sourceAttributeToDestinationAttributeMap: Record<keyof SOURCE, keyof DESTINATION>,
  ): DESTINATION => {
  Object.entries(sourceAttributeToDestinationAttributeMap).forEach(([sourceKey, destinationKey]: [keyof SOURCE, keyof DESTINATION]) => {
    const value = source[sourceKey]
    if (value !== undefined) {
      destination[destinationKey] = value as DESTINATION[keyof DESTINATION]
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

  if ((left == null) || (right == null)) {
    return false
  }
  const _left = left
  const _right = right

  let _onlyKeys: string[]
  if (onlyKeys != null) {
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
  left: Record<string | number | symbol, unknown> | null | undefined,
  right: Record<string | number | symbol, unknown> | null | undefined,
  onlyKeys?: string[],
  result: Record<string | number | symbol, boolean> = {},
): Record<string, unknown> => {
  if (left === right) {
    return result
  }

  if ((left == null) || (right == null)) {
    return keysToObject(Object.keys((left != null) || (right != null) || {}))
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

export const deepObjectEqualsBySchema = (left: Record<string, unknown>, right: Record<string, unknown>, scheme: Scheme): boolean => (
  left === right || !!(
    left != null && typeof left === 'object' &&
    right != null && typeof right === 'object' &&
    Object.keys(scheme).every(schemeKey => {
      const subScheme = scheme[schemeKey]
      switch (typeof subScheme) {
        case 'boolean': {
          return left[schemeKey] === right[schemeKey]
        }
        case 'object': {
          return deepObjectEqualsBySchema(
            left[schemeKey] as Record<string, unknown>,
            right[schemeKey] as Record<string, unknown>,
            subScheme,
          )
        }
        default:
          throw new Error(`Unknown scheme type ${typeof subScheme} for key ${schemeKey}`)
      }
    })
  )
)

export const removeKeys = <OBJECT extends Record<string, unknown>, KEYS extends (keyof OBJECT)[]>(obj: OBJECT, keysToRemove: KEYS): Omit<OBJECT, typeof keysToRemove[number]> => {
  const unremovedKeys = Object.keys(obj).filter((key) => !keysToRemove.includes(key))
  return unremovedKeys.reduce((filteredObject: Record<string, unknown>, key) => {
    filteredObject[key] = obj[key]
    return filteredObject
  }, {}) as Omit<OBJECT, typeof keysToRemove[number]>
}

export const containsPathSegmentList = (
  obj: Record<string, unknown> | null | undefined,
  pathSegmentList: string[],
): boolean => !!(
  pathSegmentList.length === 0 ||
  (obj != null && typeof obj === 'object' && containsPathSegmentList(
    obj[pathSegmentList[0]] as Record<string, unknown> | null | undefined,
    pathSegmentList.slice(1),
  ))
)

export const isObject = (obj: any): obj is Record<string | number | symbol, unknown> => (
  obj != null && typeof obj === 'object'
)

export const isEmptyObject = <OBJECT>(obj?: OBJECT | null): boolean => !!(
  obj != null && Object.keys(obj).length === 0
)

export const deepMergeIgnoreNil = (
  left: Record<string | number | symbol, unknown>,
  right: Record<string | number | symbol, unknown>,
  key?: string,
): Record<string | number | symbol, unknown> => {
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
        nextObj[key] = deepMergeIgnoreNil(
          left[key] as Record<string | number | symbol, unknown>,
          right[key] as Record<string | number | symbol, unknown>,
          key,
        )
        return nextObj
      }, {})
      : left
  }
  return right ?? left
}

export const removeSubtree = (obj: Record<string, unknown>, tree: Record<string, unknown>): Record<string, unknown> => {
  if (isObject(obj) && !Array.isArray(obj)) {
    return Object.keys(obj).reduce((object: Record<string, unknown>, key) => {
      const subtree = tree[key]
      const subObj = obj[key] as Record<string, unknown>
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
