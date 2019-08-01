/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2017-07-25T18:05:12+02:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

export const intersperseByCallback = <T> (array: T[], callback: (index: number) => T): T[] => {
  return array.reduce((result: T[], element: T, index: number, array: T[]) => {
    result.push(element)
    if (index < array.length - 1) {
      result.push(callback(index))
    }
    return result
  }, [])
}

export const findById = <ENTITY: { id: string }>(id: ?string, entityList: ENTITY[]): ?ENTITY => {
  return id ? entityList.find(entity => entity.id === id) : null
}

export const onlyOne = <TYPE>(list: TYPE[]): TYPE => {
  if (list.length !== 1) {
    throw new Error(`Expected only one item in array (actual: ${list.length}).`)
  }
  return list[0]
}

export const atMostOne = <TYPE>(list: TYPE[]): TYPE | null => {
  if (list.length > 1) {
    throw new Error(`Expected zero or one item in array (actual: ${list.length}).`)
  }
  if (list.length === 1) {
    return list[0]
  }
  return null
}
