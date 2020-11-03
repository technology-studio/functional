/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-03-10T07:46:45+01:00
 * @Copyright: Technology Studio
**/

import { areObjects } from './Object'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const debugDiffObjects = (left: any, right: any): Record<string, unknown> | string | any[] | undefined => {
  if (left && right && areObjects(left, right)) {
    let result = Object.keys(left).reduce((subResult: Record<string, unknown> | undefined, key) => {
      const subLeft = left[key]
      const subRight = right[key]
      if (subLeft !== subRight) {
        subResult = subResult ?? {}
        subResult[key] = areObjects(subLeft, subRight)
          ? debugDiffObjects(subLeft, subRight)
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
  if (!left || !right) {
    return ['DIFF', left, right]
  }
}
