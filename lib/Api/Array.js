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
