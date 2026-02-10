import { defineEntity, p } from '@mikro-orm/sqlite';
import { BaseEntity } from './base.entity.js';
import { User } from './user.entity.js';
import { Comment } from './comment.entity.js';
import { TagSchema } from './tag.entity.js';

function convertToSlug(title: string) {
  return title.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
}

export const ArticleSchema = defineEntity({
  name: 'Article',
  extends: BaseEntity,
  properties: {
    slug: p.string().unique().onCreate(article => convertToSlug(article.title)),
    title: p.string().index(),
    description: p.string().length(1000),
    text: p.text().lazy(),
    tags: () => p.manyToMany(TagSchema),
    author: () => p.manyToOne(User).ref(),
    comments: () => p.oneToMany(Comment).mappedBy('article').eager().orphanRemoval(),
  },
});

export class Article extends ArticleSchema.class {}

ArticleSchema.setClass(Article);
