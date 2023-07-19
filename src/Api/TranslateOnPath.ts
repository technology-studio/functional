/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-01-07T21:37:28+01:00
 * @Copyright: Technology Studio
**/

import { Log } from '@txo/log'

import { getPathIterator } from './Path'
import { isNotEmptyString } from './String'

const log = new Log('txo.functional.Api.TranslateOnPath')

export type ValueStructure<VALUE> = { [key: string]: ValueStructure<VALUE> | VALUE | undefined } | VALUE | undefined

export type Translate<VALUE> = (value: VALUE | undefined) => unknown

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
): ValueStructure<VALUE> | undefined => translateOnPathIterator(isNotEmptyString(path) ? getPathIterator(path.split('.')) : null, value, translate, options)

const _isResultCandidate = <VALUE>(value: VALUE, options: Partial<Options>, isTranslateResult: boolean): boolean => !!(
  value === null || typeof value !== 'object' || (value != null && Object.keys(value).length > 0) ||
  (options.keepEmptyObjects ?? false) || (isTranslateResult && (options.keepEmptyObjectsAtTranlateResult ?? false))
)

export const translateOnPathIterator = <VALUE>(
  pathIterator: Iterator<string> | undefined | null,
  value: ValueStructure<VALUE> | undefined,
  translate: Translate<VALUE>,
  options: Partial<Options> = _defaultOptions,
): ValueStructure<VALUE> | undefined => translateOnPathIteratorInternal(
    pathIterator,
    value,
    translate,
    options,
  ).result

export const translateOnPathIteratorInternal = <VALUE>(
  pathIterator: Iterator<string> | undefined | null,
  value: ValueStructure<VALUE> | undefined,
  translate: Translate<VALUE>,
  options: Partial<Options> = _defaultOptions,
): { isTranslateResult: boolean, result: ValueStructure<VALUE> | undefined } => {
  if (pathIterator != null) {
    const pathIteratorResult = pathIterator.next()
    if (!(pathIteratorResult.done ?? false)) {
      const key = pathIteratorResult.value as keyof ValueStructure<VALUE>
      const { [key]: subPrevious, ...subOthers } = (value != null && typeof value === 'object' ? value : {}) as ValueStructure<VALUE>
      if ((options.ignoreMissingPath ?? false) && (subPrevious == null || !isNotEmptyString(subPrevious as string))) {
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
  const result = translate(value as VALUE | undefined)
  log.debug('translateOnPathIterator', { value, options, result })
  return {
    isTranslateResult: true,
    result: result as ValueStructure<VALUE> | undefined,
  }
}
