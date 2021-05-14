/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2017-07-25T18:05:12+02:00
 * @Copyright: Technology Studio
**/

export const zero = <TYPE>(list: TYPE[], errorCallback?: () => Error): void => {
  if (list.length !== 0) {
    throw errorCallback ? errorCallback() : new Error(`Expected zero items in array (actual: ${list.length}).`)
  }
}

export const onlyOne = <TYPE>(list: TYPE[], errorCallback?: () => Error): TYPE => {
  if (list.length !== 1) {
    throw errorCallback ? errorCallback() : new Error(`Expected only one item in array (actual: ${list.length}).`)
  }
  return list[0]
}

export const atMostOne = <TYPE>(list: TYPE[], errorCallback?: () => Error): TYPE | null => {
  if (list.length > 1) {
    throw errorCallback ? errorCallback() : new Error(`Expected zero or one item in array (actual: ${list.length}).`)
  }
  if (list.length === 1) {
    return list[0]
  }
  return null
}

export const getLastItem = <ENTITY>(array: ENTITY[]): ENTITY | undefined | null => (
  array[array.length - 1]
)
