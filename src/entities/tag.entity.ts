import { defineEntity, p } from '@mikro-orm/sqlite';
import { BaseEntity } from './base.entity.js';
import { Article } from './article.entity.js';

export const TagSchema = defineEntity({
  name: 'Tag',
  extends: BaseEntity,
  properties: {
    name: p.string().length(20),
    articles: () => p.manyToMany(Article).mappedBy('tags'),
  },
});

export class Tag extends TagSchema.class {}

TagSchema.setClass(Tag);
