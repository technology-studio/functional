/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2017-07-25T18:05:12+02:00
 * @Copyright: Technology Studio
**/

export * from './AnalyseArrays'
export * from './ArrayValidationAndExtraction'
export * from './IntersperseByCallback'

export const findById = <ENTITY extends{ id: string }>(
  id: string | undefined | null, entityList: ENTITY[],
): ENTITY | null | undefined => {
  return id ? entityList.find(entity => entity.id === id) : null
}

export const sequence = (length: number): number[] => {
  const array = []
  for (let index = 0; index < length; index++) {
    array.push(index)
  }
  return array
}
