const Accounts = require("./accounts-model")

function checkAccountPayload(req, res, next) {
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    next({ status: 400, message: "name and budget are required" })
  } else if (typeof name !== "string") {
    next({ status: 400, message: "name of account must be a string" })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" })
  } else if (typeof budget !== "number" || isNaN(budget)) {
    next({ status: 400, message: "budget of account must be a number" })
  } else if (budget < 0 || budget > 1000000) {
    next({ status: 400, message: "budget of account is too large or too small" })
  } else {
    req.body.name = name.trim()
    next()
  }
}

function checkAccountNameUnique(req, res, next) {
  const { name } = req.body
  Accounts.getByName(name)
    .then(account => {
      if (account) {
        next({ status: 400, message: "that name is taken" })
      } else {
        next()
      }
    })
    .catch(next)
}

function checkAccountId(req, res, next) {
  const { id } = req.params
  Accounts.getById(id)
    .then(account => {
      if (account) {
        req.account = account
        next()
      } else {
        next({ status: 404, message: "account not found" })
      }
    })
    .catch(next)
}

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
}
