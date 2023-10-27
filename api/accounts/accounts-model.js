const db = require('../../data/db-config')

async function getAll() {
  const result = await db('accounts')
  return result
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

const create = async account => {
  const [id] = await db('accounts').insert(account)
  return getById(id)
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
