/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-03-08T14:52:18+01:00
 * @Copyright: Technology Studio
**/

const isWrappedTypeName = (name: string | null | undefined): boolean => name === 'String' || name === 'Number' || name === 'Boolean' || name === 'Symbol'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWrappedType = (value: any): boolean => !!(
  value && typeof value === 'object' && value.constructor && isWrappedTypeName(value.constructor.name) && value.valueOf
)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isEmpty = (value: any): boolean => value == null || (Array.isArray(value) && value.length === 0) || value === 0 ||
  value == '' || // eslint-disable-line eqeqeq
  !!(value && isWrappedType(value) && value.valueOf && isEmpty(value.valueOf()))

export const nullIfEmpty = <T>(value: T): T | null => isEmpty(value) ? null : value

export const equalsStrictOnValues = <VALUE>(left: VALUE | null | undefined, right: VALUE | null | undefined): boolean =>
  left === right || (left == null && right == null)
