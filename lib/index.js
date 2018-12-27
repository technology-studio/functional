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
} from './Api/Array'
import {
  areObjects,
  clearUndefinedAttributes,
  copyNotUndefinedAttributes,
  deepObjectEqualsBySchema,
  keysToObject,
  removeKeys,
  shallowObjectDiff,
  shallowObjectEquals,
} from './Api/Object'
import { debugDiffObjects } from './Api/Debug'

export {
  areObjects,
  clearUndefinedAttributes,
  copyNotUndefinedAttributes,
  debugDiffObjects,
  deepObjectEqualsBySchema,
  equalsStrictOnValues,
  findById,
  intersperseByCallback,
  isEmpty,
  isNullOrVoid,
  keysToObject,
  nullIfEmpty,
  removeKeys,
  shallowObjectDiff,
  shallowObjectEquals,
  translateOnPath,
}

export type {
  Translate,
  ValueStructure,
}
