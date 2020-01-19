/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-08T23:58:38+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import {
  translateOnPath,
  type Translate,
  type ValueStructure,
} from './Api/TranslateOnPath'
import {
  createPathIterator,
  getPathIterator,
} from './Api/Path'
import {
  getOnPath,
  getOnPathIterator,
} from './Api/GetOnPath'

import {
  equalsStrictOnValues,
  isEmpty,
  isNullOrVoid,
  nullIfEmpty,
} from './Api/Validation'
import {
  atMostOne,
  findById,
  getLastItem,
  intersperseByCallback,
  onlyOne,
  sequence,
} from './Api/Array'
import {
  areObjects,
  clearUndefinedAttributes,
  containsPathSegmentList,
  copyNotUndefinedAttributes,
  deepMergeIgnoreNil,
  deepObjectEqualsBySchema,
  isEmptyObject,
  isObject,
  keysToObject,
  removeKeys,
  shallowObjectDiff,
  shallowObjectEquals,
} from './Api/Object'
import {
  compareCaseInsensitive,
  concatWithSep,
} from './Api/String'
import { debugDiffObjects } from './Api/Debug'

export {
  areObjects,
  atMostOne,
  clearUndefinedAttributes,
  compareCaseInsensitive,
  concatWithSep,
  containsPathSegmentList,
  copyNotUndefinedAttributes,
  createPathIterator,
  debugDiffObjects,
  deepMergeIgnoreNil,
  deepObjectEqualsBySchema,
  equalsStrictOnValues,
  findById,
  getLastItem,
  getOnPath,
  getOnPathIterator,
  getPathIterator,
  intersperseByCallback,
  isEmpty,
  isEmptyObject,
  isNullOrVoid,
  isObject,
  keysToObject,
  nullIfEmpty,
  onlyOne,
  removeKeys,
  sequence,
  shallowObjectDiff,
  shallowObjectEquals,
  translateOnPath,
}

export type {
  Translate,
  ValueStructure,
}
