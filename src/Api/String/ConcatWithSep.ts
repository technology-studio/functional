/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2019-07-13T10:07:39+02:00
 * @Copyright: Technology Studio
**/

export const concatWithSep = (
  left: string | null | undefined,
  separator: string,
  right: string | null | undefined,
): string | null | undefined => (
  left
    ? right
      ? left + separator + right
      : left
    : right
)
