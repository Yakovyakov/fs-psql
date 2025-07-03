const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Session } = require('../models')

router.post('/', async (request, response, next) => {
  const { username, password } = request.body

  if (password === undefined || username === undefined) {
    return response.status(400).json({ error: 'username or password is missing' })
  }

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    })

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({ error: 'invalid username or password' })
    }

    if (user.disabled) {
      await Session.destroy({ where: { userId: user.id } })
      return response.status(401).json({ error: 'Account disabled' })
    }
    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 120 })

    await Session.create({
      token,
      userId: user.id,
    })

    response.status(200).send({ token, username: user.username, name: user.name })
  } catch (err) {
    next(err)
  }
})

module.exports = router
