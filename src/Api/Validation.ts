/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-03-08T14:52:18+01:00
 * @Copyright: Technology Studio
**/

const isWrappedTypeName = (name: string | null | undefined): boolean => name === 'String' || name === 'Number' || name === 'Boolean' || name === 'Symbol'

const isWrappedType = (value: unknown): boolean => !!(
  value != null && typeof value === 'object' && value.constructor != null && isWrappedTypeName(value.constructor.name) && value.valueOf != null
)

export const isEmpty = (value: unknown): boolean => value == null || (Array.isArray(value) && value.length === 0) || value === 0 ||
  value == '' || // eslint-disable-line eqeqeq
  (value != null && isWrappedType(value) && value.valueOf != null && isEmpty(value.valueOf()))

export const nullIfEmpty = <T>(value: T): T | null => isEmpty(value) ? null : value

export const equalsStrictOnValues = <VALUE>(left: VALUE | null | undefined, right: VALUE | null | undefined): boolean =>
  left === right || (left == null && right == null)
