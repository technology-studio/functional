/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2019-07-13T10:07:39+02:00
 * @Copyright: Technology Studio
**/

import { Log } from '@txo/log'
const log = new Log('txo.functional.Api.String')

export const compareCaseInsensitive = (left: string, right: string): number => {
  log.debug('compareCaseInsensitive', { left, right })
  const _left = left.toLowerCase()
  const _right = right.toLowerCase()
  return _left < _right ? -1 : _left > _right ? 1 : 0
}
