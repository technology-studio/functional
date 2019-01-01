/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-07T21:37:28+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { Log } from '@txo-peer-dep/log'

const log = new Log('txo.functional.Api.TranslateOnPath')

export type ValueStructure<VALUE> = { [string]: ValueStructure<VALUE> | ?VALUE } | ?VALUE

export type Translate<VALUE> = (value: ?VALUE) => ?VALUE

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

const createPathIterator = (pathList: string[]): $Shape<Iterator<string>> => {
  var index: number = -1
  const length = pathList.length
  // $FlowExpectedError
  return {
    next: () => {
      index += 1
      const done = length <= index
      return {
        done,
        value: done ? undefined : pathList[index],
      }
    },
  }
}

const getPathIterator = (pathList: string[]): Iterator<string> =>
  [].values === undefined ? createPathIterator(pathList) : pathList.values()

export const translateOnPath = <VALUE>(
  path: ?string,
  value: ?ValueStructure<VALUE>,
  translate: Translate<VALUE>,
  options: $Shape<Options> = _defaultOptions,
): ValueStructure<VALUE> | void => {
  return translateOnPathIterator(path ? getPathIterator(path.split('.')) : null, value, translate, options)
}

const _isResultCandidate = <VALUE>(value: VALUE, options: $Shape<Options>, isTranslateResult: boolean): boolean => (
  value === null || typeof value !== 'object' || (value && Object.keys(value).length > 0) ||
  options.keepEmptyObjects || (isTranslateResult && options.keepEmptyObjectsAtTranlateResult)
)

export const translateOnPathIterator = <VALUE>(
  pathIterator: ?Iterator<string>,
  value: ?ValueStructure<VALUE>,
  translate: Translate<VALUE>,
  options: $Shape<Options> = _defaultOptions,
): ValueStructure<VALUE> | void => {
  return translateOnPathIteratorInternal(
    pathIterator,
    value,
    translate,
    options,
  ).result
}

export const translateOnPathIteratorInternal = <VALUE>(
  pathIterator: ?Iterator<string>,
  value: ?ValueStructure<VALUE>,
  translate: Translate<VALUE>,
  options: $Shape<Options> = _defaultOptions,
): { isTranslateResult: boolean, result: ValueStructure<VALUE> | void } => {
  if (pathIterator) {
    const pathIteratorResult = pathIterator.next()
    if (!pathIteratorResult.done) {
      const key: string = pathIteratorResult.value
      const { [key]: subPrevious, ...subOthers } = value != null && typeof value === 'object' ? value : {}
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
  const result = translate((value: any))
  log.debug('translateOnPathIterator', { value, options, result })
  return {
    isTranslateResult: true,
    result,
  }
}
