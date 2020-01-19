/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-01-19T15:01:57+01:00
 * @Copyright: Technology Studio
 * @flow
**/

export const createPathIterator = (pathList: string[]): $Shape<Iterator<string>> => {
  var index: number = -1
  const length = pathList.length
  // $FlowExpectedError
  return {
    next: () => {
      index += 1
      const done = length <= index
      return {
        done,
        value: done ? undefined : pathList[index],
      }
    },
  }
}

export const getPathIterator = (pathList: string[]): Iterator<string> =>
  [].values === undefined ? createPathIterator(pathList) : pathList.values()
