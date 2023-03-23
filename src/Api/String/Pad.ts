/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-30T12:05:06+02:00
 * @Copyright: Technology Studio
**/

import { isNotEmptyString } from './IsNotEmptyString'

export const pad = (text: string | null | undefined = '', width: number, prefixChar?: string): string => {
  prefixChar = isNotEmptyString(prefixChar) ? prefixChar : '0'
  text = isNotEmptyString(text) ? text : ''
  let prefix = ''
  while (prefix.length < width - text.length) {
    prefix = prefix + prefixChar
  }
  for (let index = 0; index < width - text.length; index++) {
    prefix += prefixChar
  }
  return prefix + text
}
