const db = require('../../data/db-config')

async function getAll() {
  const result = await db('accounts')
  return result
}

const getById = id => {
  const result = db('accounts').where('id', id).first()
  return result
}

const create = account => {
  const result = db('accounts').insert(account)
  return result
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
