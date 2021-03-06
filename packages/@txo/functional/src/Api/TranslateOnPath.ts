/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-01-07T21:37:28+01:00
 * @Copyright: Technology Studio
**/

import { Log } from '@txo/log'

import { getPathIterator } from './Path'

const log = new Log('txo.functional.Api.TranslateOnPath')

export type ValueStructure<VALUE> = { [key: string]: ValueStructure<VALUE> | VALUE | undefined } | VALUE | undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Translate<VALUE> = (value: VALUE | undefined) => any

type Options = {
  keepEmptyObjects: boolean,
  keepEmptyObjectsAtTranlateResult: boolean,
  ignoreMissingPath: boolean,
}

const _defaultOptions: Options = {
  keepEmptyObjects: false,
  keepEmptyObjectsAtTranlateResult: false,
  ignoreMissingPath: false,
}

export const translateOnPath = <VALUE>(
  path: string | undefined,
  value: ValueStructure<VALUE> | undefined,
  translate: Translate<VALUE>,
  options: Partial<Options> = _defaultOptions,
): ValueStructure<VALUE> | undefined => {
  return translateOnPathIterator(path ? getPathIterator(path.split('.')) : null, value, translate, options)
}

const _isResultCandidate = <VALUE>(value: VALUE, options: Partial<Options>, isTranslateResult: boolean): boolean => !!(
  value === null || typeof value !== 'object' || (value && Object.keys(value).length > 0) ||
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  options.keepEmptyObjects || (isTranslateResult && options.keepEmptyObjectsAtTranlateResult)
)

export const translateOnPathIterator = <VALUE>(
  pathIterator: Iterator<string> | undefined | null,
  value: ValueStructure<VALUE> | undefined,
  translate: Translate<VALUE>,
  options: Partial<Options> = _defaultOptions,
): ValueStructure<VALUE> | undefined => {
  return translateOnPathIteratorInternal(
    pathIterator,
    value,
    translate,
    options,
  ).result
}

export const translateOnPathIteratorInternal = <VALUE>(
  pathIterator: Iterator<string> | undefined | null,
  value: ValueStructure<VALUE> | undefined,
  translate: Translate<VALUE>,
  options: Partial<Options> = _defaultOptions,
): { isTranslateResult: boolean, result: ValueStructure<VALUE> | undefined } => {
  if (pathIterator) {
    const pathIteratorResult = pathIterator.next()
    if (!pathIteratorResult.done) {
      const key: string = pathIteratorResult.value
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { [key]: subPrevious, ...subOthers } = (value != null && typeof value === 'object' ? value : {}) as Record<string, any>
      if (options.ignoreMissingPath && !subPrevious) {
        return {
          isTranslateResult: false,
          result: value,
        }
      }
      const { isTranslateResult, result: subNext } = translateOnPathIteratorInternal(pathIterator, subPrevious, translate, options)
      log.debug('translateOnPathIterator', { pathIteratorResult, value, options, subPrevious, subNext, subOthers, isTranslateResult })
      return {
        isTranslateResult: false,
        result: subPrevious === subNext
          ? value
          : subNext !== undefined && _isResultCandidate(subNext, options, isTranslateResult)
            ? { ...subOthers, [key]: subNext }
            : _isResultCandidate(subOthers, options, false)
              ? subOthers
              : undefined,
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = translate(value as any)
  log.debug('translateOnPathIterator', { value, options, result })
  return {
    isTranslateResult: true,
    result,
  }
}
