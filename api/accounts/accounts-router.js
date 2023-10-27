const router = require('express').Router()
const Accounts = require('./accounts-model.js')
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
} = require('./accounts-middleware.js')


router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.json(accounts)
      console.log(accounts)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  Accounts.getById(req.params.id)
    .then(account => {
      res.json(account)
    })
    .catch(next)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then(newAccount => {
      return res.status(201).json(newAccount)
    })
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(() => {
      return Accounts.getById(req.params.id)
    })
    .then(account => {
      res.json(account)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(() => {
      res.json(req.account)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
