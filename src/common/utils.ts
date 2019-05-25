/**
 * 返回格式化的数据
 * @param code 编码
 * @param msg 信息
 * @param data 数据
 */
export function resFormat(code: number, message: string, data: any) {
  const result = {
    code,
    message,
    data,
  };
  return result;
}
