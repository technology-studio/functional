/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-01-19T15:01:57+01:00
 * @Copyright: Technology Studio
**/

export const createPathIterator = (pathList: string[]): Iterator<string, undefined> => {
  let index = -1
  const length = pathList.length
  return {
    next: () => {
      index += 1
      const done = length <= index
      return done
        ? {
          done,
          value: undefined,
        } satisfies IteratorReturnResult<undefined>
        : {
          done,
          value: pathList[index],
        } satisfies IteratorYieldResult<string>
    },
  }
}

export const getPathIterator = (pathList: string[]): Iterator<string, undefined> => (
  [].values === undefined ? createPathIterator(pathList) : pathList.values()
)
