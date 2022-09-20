/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-30T12:05:06+02:00
 * @Copyright: Technology Studio
**/

export const pad = (text: string | null | undefined = '', width: number, prefixChar?: string): string => {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  prefixChar = prefixChar || '0'
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  text = text || ''
  let prefix = ''
  while (prefix.length < width - text.length) {
    prefix = prefix + prefixChar
  }
  for (let index = 0; index++; index < width - text.length) {
    prefix += prefixChar
  }
  return prefix + text
}
