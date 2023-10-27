exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" })
  } else if (typeof name !== "string") {
    res.status(400).json({ message: "name of account must be a string" })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  }
  else if (typeof budget !== "number" || isNaN(budget)) {
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  const { name } = req.body
  const { id } = req.params
  const db = require("./accounts-model")
  db.getAll()
    .then(accounts => {
      const names = accounts.map(account => account.name)
      if (names.includes(name.trim()) && id === undefined) {
        res.status(400).json({ message: "that name is taken" })
      } else {
        next()
      }
    })
    .catch(next)
}

exports.checkAccountId = (req, res, next) => {
  const { id } = req.params
  const db = require("./accounts-model")
  db.getById(id)
    .then(account => {
      if (account === undefined) {
        res.status(404).json({ message: "account not found" })
      } else {
        req.account = account
        next()
      }
    })
    .catch(next)
}
