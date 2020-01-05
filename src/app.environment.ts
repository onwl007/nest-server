/*
 * @Desc: 系统环境变量
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-05 00:33:12
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-05 16:38:37
 */

export const environment = process.env.NODE_ENV;
export const isDevMode = Object.is(environment, 'development');
export const isProdMode = Object.is(environment, 'production');
export const isTestMode = Object.is(environment, 'test');

export default {
  isDevMode,
  isProdMode,
  isTestMode,
  environment,
};
