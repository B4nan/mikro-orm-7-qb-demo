import { defineEntity, p, } from '@mikro-orm/sqlite';
import { BaseEntity } from './base.entity.js';
import { Article } from './article.entity.js';

export const UserSchema = defineEntity({
  name: 'User',
  extends: BaseEntity,
  properties: {
    fullName: p.string(),
    email: p.string().unique().hidden(),
    password: p.string().hidden().lazy().ref(),
    bio: p.text().default(''),
    articles: () => p.oneToMany(Article).mappedBy('author').hidden(),
    token: p.string().nullable().persist(false),
  },
});

export class User extends UserSchema.class {}

UserSchema.setClass(User);
