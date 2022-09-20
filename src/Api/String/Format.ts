/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2019-07-13T10:07:39+02:00
 * @Copyright: Technology Studio
**/

export const format = (value: string, params: Record<string, unknown>): string => value.replace(/{{\s*(\w+)\s*}}/g, (matchValue, param) => param in params ? String(params[param]) : matchValue)
