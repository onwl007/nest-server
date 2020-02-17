// 文章状态 0 草稿 | 1 发布
export enum ArticleStateEnum {
  DRAFT,
  PUBLISHED,
}

// 文章来源 0 原创 | 1 转载 | 2 混撰 | 3 翻译
export enum ArticleSourceEnum {
  ORIGINAL,
  REPRINT,
  HYBRID,
  TRANSLATE,
}
