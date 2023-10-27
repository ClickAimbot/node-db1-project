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

router.post('/', checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  Accounts.create(req.body)
    .then(newAccount => {
      return res.status(201).json(newAccount)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
