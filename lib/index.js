/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-08T23:58:38+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import {
  translateOnPath,
  type ValueStructure,
  type Translate,
} from './Api/TranslateOnPath'
import {
  equalsStrictOnValues,
  isEmpty,
  isNullOrVoid,
  nullIfEmpty,
} from './Api/Validation'
import {
  findById,
  intersperseByCallback,
  onlyOne,
  atMostOne,
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
} from './Api/String'
import { debugDiffObjects } from './Api/Debug'

export {
  areObjects,
  atMostOne,
  clearUndefinedAttributes,
  compareCaseInsensitive,
  containsPathSegmentList,
  copyNotUndefinedAttributes,
  debugDiffObjects,
  deepMergeIgnoreNil,
  deepObjectEqualsBySchema,
  equalsStrictOnValues,
  findById,
  intersperseByCallback,
  isEmpty,
  isEmptyObject,
  isNullOrVoid,
  isObject,
  keysToObject,
  nullIfEmpty,
  onlyOne,
  removeKeys,
  shallowObjectDiff,
  shallowObjectEquals,
  translateOnPath,
}

export type {
  Translate,
  ValueStructure,
}
