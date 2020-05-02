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

export const sequence = (length: number) => {
  const array = []
  for (var index = 0; index < length; index++) {
    array.push(index)
  }
  return array
}

export const getLastItem = <ENTITY: Object>(array: $ReadOnlyArray<ENTITY>): ?ENTITY => (
  array[array.length - 1]
)

export const analyseArrays = <TYPE>(leftList?: TYPE[], rightList?: TYPE[], getUniqueKey: (value: TYPE) => string) => {
  leftList = leftList || []
  rightList = rightList || []
  if (!leftList.length || !rightList.length) {
    return {
      union: [...leftList, ...rightList],
      intersection: [],
      leftUnique: leftList,
      rightUnique: rightList,
    }
  }

  const intersectionMap = {}
  const unionMap = {}
  const leftUniqueMap = {}
  const rightUniqueMap = {}

  const intersection = []
  const union = []
  const leftUnique = []
  const rightUnique = []

  const prepare = list => list.reduce(({ map, keyList }, value) => {
    const key = getUniqueKey(value)
    if (!(key in map)) {
      map[key] = value
      keyList.push(key)
    }
    return { map, keyList }
  }, { map: {}, keyList: [] })

  const _left = prepare(leftList)
  const _right = prepare(rightList)

  const add = (outputList, outputMap, key, map) => {
    if (!(key in outputMap)) {
      outputMap[key] = true
      outputList.push(map[key])
    }
  }

  const process = ({ map, keyList }, { map: otherMap }, unique, uniqueMap) => {
    keyList.forEach(key => {
      add(union, unionMap, key, map)
      if (key in otherMap) {
        add(intersection, intersectionMap, key, map)
      } else {
        add(unique, uniqueMap, key, map)
      }
    })
  }

  process(_left, _right, leftUnique, leftUniqueMap)
  process(_right, _left, rightUnique, rightUniqueMap)
  return {
    intersection,
    union,
    leftUnique,
    rightUnique,
  }
}
