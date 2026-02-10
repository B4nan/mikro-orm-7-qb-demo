import { defineConfig } from '@mikro-orm/sqlite';
import { User } from './entities/user.entity.js';
import { Article } from './entities/article.entity.js';
import { Tag } from './entities/tag.entity.js';
import { Comment } from './entities/comment.entity.js';

export default defineConfig({
  dbName: ':memory:',
  entities: [User, Article, Tag, Comment],
  debug: true,
});
