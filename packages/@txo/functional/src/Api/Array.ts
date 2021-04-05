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

export const findById = <ENTITY extends{ id: string }>(
  id: string | undefined | null, entityList: ENTITY[],
): ENTITY | null | undefined => {
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

export const sequence = (length: number): number[] => {
  const array = []
  for (let index = 0; index < length; index++) {
    array.push(index)
  }
  return array
}

export const getLastItem = <ENTITY>(array: ENTITY[]): ENTITY | undefined | null => (
  array[array.length - 1]
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EMPTY_ARRAY: any[] = []

export const analyseArrays = <TYPE>(
  // eslint-disable-next-line @typescript-eslint/default-param-last
  leftList: TYPE[] = EMPTY_ARRAY,
  // eslint-disable-next-line @typescript-eslint/default-param-last
  rightList: TYPE[] = EMPTY_ARRAY,
  getUniqueKey: (value: TYPE) => string,
): {
    intersection: TYPE[],
    union: TYPE[],
    leftUnique: TYPE[],
    rightUnique: TYPE[],
  } => {
  if (!leftList.length || !rightList.length) {
    return {
      union: [...leftList, ...rightList],
      intersection: EMPTY_ARRAY,
      leftUnique: leftList,
      rightUnique: rightList,
    }
  }

  const intersectionMap = {}
  const unionMap = {}
  const leftUniqueMap = {}
  const rightUniqueMap = {}

  const intersection: TYPE[] = []
  const union: TYPE[] = []
  const leftUnique: TYPE[] = []
  const rightUnique: TYPE[] = []

  const prepare = (list: TYPE[]): { map: Record<string, TYPE>, keyList: string[] } => list.reduce(({ map, keyList }: {
    map: Record<string, TYPE>,
    keyList: string[],
  }, value) => {
    const key = getUniqueKey(value)
    if (!(key in map)) {
      map[key] = value
      keyList.push(key)
    }
    return { map, keyList }
  }, { map: {}, keyList: [] })

  const _left = prepare(leftList)
  const _right = prepare(rightList)

  const add = (outputList: TYPE[], outputMap: Record<string, boolean>, key: string, map: Record<string, TYPE>): void => {
    if (!(key in outputMap)) {
      outputMap[key] = true
      outputList.push(map[key])
    }
  }

  const process = (
    { map, keyList }: { map: Record<string, TYPE>, keyList: string[]},
    { map: otherMap }: { map: Record<string, TYPE> },
    unique: TYPE[],
    uniqueMap: Record<string, boolean>,
  ): void => {
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
