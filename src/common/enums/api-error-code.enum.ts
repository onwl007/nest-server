export enum ApiErrorCode {
  SUCCESS = 0,                                     // 成功

  // General Error
  INTERNAL_ERR = 1000,                             // 内部错误
  PARAM_ERR = 1001,                                // 参数错误
  GLOBAL_ERR = 1002,                               // 全局异常
  NO_RIGHTS = 1003,                                // 无权操作
  ALREADY_EXISTS = 1004,                           // 已经存在指定资源
  AUTH_FAIL = 1005,                                // 验证失败
  NOT_FOUND = 1006,                                // 未找到指定资源

  // Cat 2000
  POST_CAT_ERR = 2001,                             // 新增猫错误
  GET_ALL_CATS_ERR = 2002,                         // 获取全部猫错误

  // Login 3000
  GET_LOGIN_ERR = 3001,                               // 登录错误
}
