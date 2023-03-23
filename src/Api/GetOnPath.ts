/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-01-19T15:01:16+01:00
 * @Copyright: Technology Studio
**/

import { getPathIterator } from './Path'
import { isNotEmptyString } from './String'

export const getOnPath = <VALUE>(path?: string | null, value?: Record<string, unknown> | null): VALUE | null | undefined => (
  getOnPathIterator<VALUE>(isNotEmptyString(path) ? getPathIterator(path.split('.')) : null, value)
)

export const getOnPathIterator = <VALUE>(
  pathIterator: Iterator<string> | null | undefined,
  value?: Record<string, unknown> | null | undefined,
): VALUE | null | undefined => {
  if (pathIterator != null) {
    const pathIteratorResult = pathIterator.next()
    if (!(pathIteratorResult.done ?? false) && (value != null) && typeof value === 'object') {
      const key: string = pathIteratorResult.value
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return getOnPathIterator(pathIterator, value[key] as any)
    }
  }
  return value as VALUE | null | undefined
}
