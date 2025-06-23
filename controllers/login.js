const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (request, response) => {

  const {username, password} = request.body

  if (password === undefined || username === undefined) {
    return response.status(400).json({
      error: 'username or password is missing'
    })    
  }

  const user = await User.findOne({
    where: {
      username: username
    }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken,
    process.env.SECRET,
    { expiresIn: 60*120 }
  )


  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router