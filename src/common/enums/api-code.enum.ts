export enum ApiCode {
  // Cats 2000
  POST_CAT = 2001,                     // 新增
  GET_ALL_CATS = 2002,                 // 获取全部猫

  // Login 3000
  GET_LOGIN = 3000,                    // 登录

  // Article 4000
  GET_ALL_ARTICLES = 4001,             // 获取全部文章

  // Category 5000
  GET_ALL_CATEGORIES = 5001,           // 获取全部分类
  GET_CATEGORY_BY_ID = 5002,           // 根据 ID 获取分类详情
  POST_CATEGORY = 5003,                // 创建分类
  PUT_CATEGORY = 5004,                 // 更新分类
  DELETE_CATEGORY = 5005,              // 删除分类

  // Comment 6000
  // Setting 7000
  // Tag 8000
}
