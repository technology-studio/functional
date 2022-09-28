/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-01-19T15:01:16+01:00
 * @Copyright: Technology Studio
**/

import { getPathIterator } from './Path'

export const getOnPath = <VALUE>(path?: string | null, value?: Record<string, unknown> | null): VALUE | null | undefined => (
  getOnPathIterator<VALUE>(path ? getPathIterator(path.split('.')) : null, value)
)

export const getOnPathIterator = <VALUE>(
  pathIterator: Iterator<string> | null | undefined,
  value?: Record<string, unknown> | null | undefined,
): VALUE | null | undefined => {
  if (pathIterator) {
    const pathIteratorResult = pathIterator.next()
    if (!pathIteratorResult.done && value && typeof value === 'object') {
      const key: string = pathIteratorResult.value
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return getOnPathIterator(pathIterator, value[key] as any)
    }
  }
  return value as VALUE | null | undefined
}
