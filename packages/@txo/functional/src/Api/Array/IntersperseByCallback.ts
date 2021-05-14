/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2017-07-25T18:05:12+02:00
 * @Copyright: Technology Studio
**/

export const intersperseByCallback = <T> (array: T[], callback: (index: number) => T): T[] => {
  return array.reduce((result: T[], element: T, index: number, array: T[]) => {
    result.push(element)
    if (index < array.length - 1) {
      result.push(callback(index))
    }
    return result
  }, [])
}
