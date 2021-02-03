import { ItemType, PageType } from '../types/item';
import { knex } from '../db/postgre';
import { pageTable } from '../constants';

const tableName = 'todos';

const assertUserId = (userId: string) => {
  if (!userId) {
    throw new Error('userId must be provided');
  }
};

// todos

const listAll = async (userId: string) => {
  assertUserId(userId);

  return knex(tableName)
    .select()
    .where({ userId });
};

const getById = async (userId: string, id: string) => {
  assertUserId(userId);

  const list = await knex(tableName)
    .select()
    .where({ id, userId });

  return list[0];
};

const create = async (userId: string, item: ItemType) => {
  assertUserId(userId);

  const { id, title, complete } = item;

  const list = await knex(tableName)
    .insert({ id, title, complete, userId })
    .returning('*');

  return list[0];
};

const update = async (userId: string, item: ItemType) => {
  assertUserId(userId);

  const { id, title, complete } = item;

  const list = await knex(tableName)
    .update({ id, title, complete, userId })
    .where({ id })
    .returning('*');

  return list[0];
};

const remove = async (userId: string, id: string) => {
  assertUserId(userId);

  if (!id) {
    return;
  }

  await knex(tableName)
    .delete()
    .where({ id, userId });
};

// pages

const getAllPages = async (userId: string) => {
  assertUserId(userId);

  return knex(pageTable)
    .select()
    .where({ userId });
};

const getPageById = async (userId: string, id: string) => {
  assertUserId(userId);

  const list = await knex(pageTable)
    .select()
    .where({ id, userId });

  return list[0];
};

const createPage = async (userId: string, item: PageType) => {
  assertUserId(userId);

  const { id, name, after, data } = item;

  const list = await knex(pageTable)
    .insert({ id, userId, name, after, data })
    .returning('*');

  return list[0];
};

const updatePage = async (userId: string, item: PageType) => {
  assertUserId(userId);

  const { id, name, after, data } = item;
  
  const list = await knex(pageTable)
    .update({ id, userId, name, after, data })
    .where({ id })
    .returning('*');

  return list[0];
};

const removePage = async (userId: string, id: string) => {
  assertUserId(userId);

  if (!id) {
    return;
  }

  await knex(pageTable)
    .delete()
    .where({ id, userId });
};

export {
  listAll,
  getById,
  create,
  update,
  remove,
  getAllPages,
  getPageById,
  createPage,
  updatePage,
  removePage
};
