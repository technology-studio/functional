/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-03-10T07:46:45+01:00
 * @Copyright: Technology Studio
**/

import { isObject } from './Object'

export const debugDiffObjects = (left: unknown, right: unknown): unknown => {
  if (
    left != null &&
    right != null &&
    isObject(left) &&
    isObject(right)
  ) {
    let result = Object.keys(left).reduce((subResult: Record<string, unknown> | undefined, key) => {
      const subLeft = left[key]
      const subRight = right[key]
      if (subLeft !== subRight) {
        subResult = subResult ?? {}
        subResult[key] = isObject(subLeft) && isObject(subRight)
          ? debugDiffObjects(
            subLeft,
            subRight,
          )
          : ['DIFF', subLeft, subRight]
      }
      return subResult
    }, undefined)
    result = Object.keys(right).reduce((subResult, key) => {
      const subLeft = left[key]
      const subRight = right[key]
      if (!Object.prototype.hasOwnProperty.call(left, key)) {
        subResult = subResult ?? {}
        subResult[key] = ['DIFF', subLeft, subRight]
      }
      return subResult
    }, result)
    return result ?? 'DIFF'
  }
  if (left == null || right == null) {
    return ['DIFF', left, right]
  }
}
