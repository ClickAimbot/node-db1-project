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

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
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
