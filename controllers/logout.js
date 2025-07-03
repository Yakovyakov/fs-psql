const router = require('express').Router()

const { Session } = require('../models')
const { sessionValidator } = require('../util/middleware')

router.delete('/', sessionValidator, async (req, res, next) => {
  // token and decodedToken was added to req by sessionValidator
  const { token } = req

  try {
    await Session.destroy({ where: { token } })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
