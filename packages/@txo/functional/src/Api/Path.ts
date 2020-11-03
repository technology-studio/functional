/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-01-19T15:01:57+01:00
 * @Copyright: Technology Studio
**/

export const createPathIterator = (pathList: string[]): Iterator<string> => {
  let index = -1
  const length = pathList.length
  return {
    next: () => {
      index += 1
      const done = length <= index
      return {
        done,
        value: done ? undefined : pathList[index],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
    },
  }
}

export const getPathIterator = (pathList: string[]): Iterator<string> => (
  [].values === undefined ? createPathIterator(pathList) : pathList.values()
)
