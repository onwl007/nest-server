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
  GET_LOGIN_ERR = 3001,                            // 登录错误

  // Category 5000
  GET_ALL_CATEGORIES_ERR = 5001,                   // 获取全部分类错误
  GET_CATEGORY_BY_ID_ERR = 5002,                   // 获取分类详情错误
  POST_CATEGORY_ERR = 5003,                        // 创建分类错误
  PUT_CATEGORY_ERR = 5004,                         // 更新分类错误
  DELETE_CATEGORY_ERR = 5005,                      // 删除分类错误

  // Tag
  GET_ALL_TAGS_ERR = 8001,                         // 获取全部标签出错误
  POST_TAG_ERR = 8002,                             // 创建标签错误
  GET_TAG_ERR = 8003,                              // 根据 ID 获取标签详情错误
  PUT_TAG_ERR = 8004,                              // 更新标签错误
  DELETE_TAG_ERR = 8005,                           // 删除标签错误
}
