/**
 * 获取枚举的值的数组
 * @param enumeration 枚举
 * @returns Array
 * @example
 * enum ColorEnum {
 *   Red,
 *   blue
 * }
 * enumValues(ColorEnum)
 */
export const enumValues = <T extends object>(
  enumeration: T,
): Array<T[keyof T]> => {
  return Object.keys(enumeration)
    .filter(k => isNaN(Number(k)))
    .map(k => enumeration[k]);
};
