/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-03-08T14:52:18+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

const isWrappedTypeName = (name: ?string): boolean => name === 'String' || name === 'Number' || name === 'Boolean' || name === 'Symbol'

const isWrappedType = (value: ?mixed): boolean => !!(value && typeof value === 'object' && value.constructor && isWrappedTypeName((value.constructor: any).name) && value.valueOf)

export const isNullOrVoid = (value: ?mixed): boolean %checks => value === null || value === undefined
export const isEmpty = (value: ?mixed): boolean => isNullOrVoid(value) || (Array.isArray(value) && value.length === 0) || value === 0 ||
  value == '' || // eslint-disable-line eqeqeq
  !!(value && isWrappedType(value) && value.valueOf && isEmpty((value: any).valueOf()))
export const nullIfEmpty = <T>/* </T> */(value: T): ?T => isEmpty(value) ? null : value

export const equalsStrictOnValues = <VALUE>(left: ?VALUE, right: ?VALUE) =>
  left === right || (!left && !right)
