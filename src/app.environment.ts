/**
 * @file app environment
 * @description 系统环境变量
 * @date 2020-01-05 00:33:12
 * @author onwl007 <https://github.com/onwl007>
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
