import { MikroORM, Loaded, wrap } from '@mikro-orm/sqlite';
import config from './mikro-orm.config.js';
import { User } from './entities/user.entity.js';

const orm = new MikroORM(config);
await orm.schema.refresh();

const em = orm.em.fork();

// types flow through the fluent interface, every join adds to the QB context on type level
const user = await em.createQueryBuilder(User, 'u')
  .leftJoinAndSelect('u.articles', 'a')
  .leftJoinAndSelect('a.comments', 'c')
  .leftJoinAndSelect('a.tags', 't')
  .leftJoinAndSelect('a.author', 'a2')
  .where({ 't.name': 'hobby' })
  .orderBy({ 'a.createdAt': 'desc' })
  .getSingleResult();

// this wont do anything on runtime, since the db is empty
if (!user) {
  throw new Error('No user found');
}

// serialization is type safe, try to comment out some of the joins
const dto = wrap(user).toObject();
console.log(dto.articles[0].tags[0].name);
console.log(dto.articles[0].author.fullName);
console.log(dto.articles[0].comments[0].text);

// require populated relations via Loaded type
// try to skip comments join and this will fail
export function doSomething(user: Loaded<User, 'articles.comments' | 'articles.author'>) {
  console.log(user.articles.$[0].author.$.fullName)
}

doSomething(user);
