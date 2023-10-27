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
  const result = db('accounts').where('id', id).update(account)
  return result
}

const deleteById = id => {
  const result = db('accounts').where('id', id).del()
  return result
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
