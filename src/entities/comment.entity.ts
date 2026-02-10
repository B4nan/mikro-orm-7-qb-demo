import { defineEntity, p } from '@mikro-orm/sqlite';
import { ArticleSchema } from './article.entity.js';
import { User } from './user.entity.js';
import { BaseEntity } from './base.entity.js';

export const CommentSchema = defineEntity({
  name: 'Comment',
  extends: BaseEntity,
  properties: {
    text: p.string(),
    article: () => p.manyToOne(ArticleSchema).ref(),
    author: () => p.manyToOne(User).ref(),
    deletedAt: p.datetime().nullable(),
  },
});

export class Comment extends CommentSchema.class {}

CommentSchema.setClass(Comment);
