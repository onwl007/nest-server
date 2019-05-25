import { Logger } from '@nestjs/common';

/**
 * 返回格式化的数据
 * @param code 编码
 * @param msg 信息
 * @param data 数据
 */
export function resFormat(api: number, code: number, message: string, data: any) {
  const result = {
    code,
    message,
    data,
  };
  Logger.log(`===api: ${api} ===code: ${code} ===message: ${message}`);
  return result;
}
