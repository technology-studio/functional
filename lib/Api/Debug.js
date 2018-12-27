/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-03-10T07:46:45+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { areObjects } from './Object'

export const debugDiffObjects = (left: any, right: any) => {
  if (left && right && areObjects(left, right)) {
    var result = Object.keys(left).reduce((subResult, key) => {
      const subLeft = left[key]
      const subRight = right[key]
      if (subLeft !== subRight) {
        subResult = (subResult || {}: Object)
        subResult[key] = areObjects(subLeft, subRight)
          ? debugDiffObjects(subLeft, subRight)
          : ['DIFF', subLeft, subRight]
      }
      return subResult
    }, undefined)
    result = Object.keys(right).reduce((subResult, key) => {
      const subLeft = left[key]
      const subRight = right[key]
      if (!left.hasOwnProperty(key)) {
        subResult = (subResult || {}: Object)
        subResult[key] = ['DIFF', subLeft, subRight]
      }
      return subResult
    }, result)
    return result || 'DIFF'
  }
  if (!left || !right) {
    return ['DIFF', left, right]
  }
}
