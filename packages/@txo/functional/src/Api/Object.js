/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-03-10T07:47:24+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import type { LiteralMap } from '@txo/flow'
import { Log } from '@txo-peer-dep/log'
const log = new Log('txo.functional.Api.Object')

export const areObjects = (left: any, right: any): boolean => typeof left === 'object' && typeof right === 'object'

export const clearUndefinedAttributes = <OBJECT: Object> (object: OBJECT) => {
  const newObject = {}
  Object.keys(object).forEach(key => {
    if (typeof object[key] !== 'undefined') {
      newObject[key] = object[key]
    }
  })
  return newObject
}

export const copyNotUndefinedAttributes = <SOURCE: Object, DESTINATION: Object> (
  source: SOURCE,
  destination: DESTINATION,
  sourceAttributeToDestinationAttributeMap: LiteralMap<$Keys<SOURCE>, $Keys<DESTINATION>>,
): DESTINATION => {
  Object.entries(sourceAttributeToDestinationAttributeMap).forEach(([sourceKey, destinationKey]: [string, mixed]) => {
    const value = source[sourceKey]
    if (value !== undefined) {
      destination[destinationKey] = value
    }
  })
  return destination
}

export const shallowObjectEquals = (left: ?Object, right: ?Object, onlyKeys?: string[]): boolean => {
  if (left === right) {
    return true
  }

  if (!left || !right) {
    return false
  }
  const _left = left
  const _right = right

  var _onlyKeys: string[]
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

export const keysToObject = (keys: string[]): Object => keys.reduce((obj, key) => {
  obj[key] = true
  return obj
}, {})

export const shallowObjectDiff = (left: ?Object, right: ?Object, onlyKeys?: string[], result: Object = {}): Object => {
  if (left === right) {
    return result
  }

  if (!left || !right) {
    return keysToObject(Object.keys(left || right || {}))
  }
  const _left = left
  const _right = right

  var _onlyKeys: string[] = onlyKeys || [
    ...Object.keys(_left),
    ...Object.keys(_right),
  ]

  return _onlyKeys.reduce((obj: Object, key) => {
    if (_left[key] !== _right[key]) {
      obj[key] = true
    }
    return obj
  }, result)
}

export const deepObjectEqualsBySchema = (left: any, right: any, scheme: Object): boolean => (
  left === right || !!(
    left && typeof left === 'object' &&
    right && typeof right === 'object' &&
    Object.keys(scheme).every(schemeKey => {
      const subScheme = scheme[schemeKey]
      switch (typeof subScheme) {
        case 'boolean': {
          return (left: any)[schemeKey] === (right: any)[schemeKey]
        }
        case 'object': {
          return deepObjectEqualsBySchema((left: any)[schemeKey], (right: any)[schemeKey], subScheme)
        }
        default:
          throw new Error(`Unknown scheme type ${typeof subScheme} for key ${schemeKey}`)
      }
    })
  )
)

export const removeKeys = <OBJECT: {}>(obj: OBJECT, keysToRemove: string[]): $Shape<OBJECT> => {
  const unremovedKeys = Object.keys(obj).filter(key => keysToRemove.indexOf(key) === -1)
  return unremovedKeys.reduce((filteredObject, key) => {
    filteredObject[key] = obj[key]
    return filteredObject
  }, {})
}

export const containsPathSegmentList = (obj: ?Object, pathSegmentList: string[]) => (
  pathSegmentList.length === 0 ||
  (obj && typeof obj === 'object' && containsPathSegmentList(
    obj[pathSegmentList[0]],
    pathSegmentList.slice(1),
  ))
)

export const isObject = (obj: any): boolean %checks => obj && typeof obj === 'object'

export const isEmptyObject = (obj: {}): boolean => Object.keys(obj).length === 0

export const deepMergeIgnoreNil = (left: any, right: any, key?: string) => {
  log.debug(`deepMergeIgnoreNil - ${key || ''}`, { left, right })
  if (left === right) {
    return left
  }

  if (isObject(left)) {
    return isObject(right)
      ? Object.keys({
        ...left,
        ...right,
      }).reduce((nextObj, key) => {
        nextObj[key] = deepMergeIgnoreNil(left[key], right[key], key)
        return nextObj
      }, {})
      : left
  }
  return right ?? left
}
