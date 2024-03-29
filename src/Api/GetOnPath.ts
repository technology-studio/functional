/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-01-19T15:01:16+01:00
 * @Copyright: Technology Studio
**/

import { isObject } from './Object'
import { getPathIterator } from './Path'
import { isNotEmptyString } from './String'

export const getOnPath = <VALUE>(path?: string | null, value?: unknown): VALUE | null | undefined => (
  getOnPathIterator<VALUE>(isNotEmptyString(path) ? getPathIterator(path.split('.')) : null, value)
)

export const getOnPathIterator = <VALUE>(
  pathIterator: Iterator<string> | null | undefined,
  value?: unknown,
): VALUE | null | undefined => {
  if (pathIterator != null) {
    const pathIteratorResult = pathIterator.next()
    if (!(pathIteratorResult.done ?? false) && isObject(value)) {
      const key: string = pathIteratorResult.value
      return getOnPathIterator(pathIterator, value[key])
    }
  }
  return value as VALUE | null | undefined
}
