/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2017-07-25T18:05:12+02:00
 * @Copyright: Technology Studio
**/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EMPTY_ARRAY: any[] = []

export const analyseArrays = <TYPE>(

  leftList: TYPE[] = EMPTY_ARRAY,

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
    { map, keyList }: { map: Record<string, TYPE>, keyList: string[] },
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
