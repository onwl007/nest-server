import { Logger } from '@nestjs/common';
import { createHash } from 'crypto';

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

/**
 * 加密登录密码
 * @param password 密码
 */
export function encryptPassword(password: string) {
  return createHash('sha256').update(password).digest('hex');
}

/**
 * 检查登录密码是否正确
 * @param password 登录密码
 * @param encryptedPassword 加密后的密码
 */
export function checkPassword(password: string, encryptedPassword): boolean {
  const currentPass = this.encryptPassword(password);
  return currentPass === encryptedPassword;
}