const jwt = require('jsonwebtoken')
require('express-async-errors')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response) => {
  console.error(error.message)
  console.error(error.name)

  if (error.name === 'SyntaxError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeDatabaseError') {
    // PostgreSQL error 22P02: invalid_text_representation
    if (error.parent && error.parent.code === '22P02') {
      return response.status(400).json({
        error: 'Invalid data type in one of the fields',
      })
    }
    return response.status(500).json({ error: 'Database error' })
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    const errors = error.errors.map(err => ({
      field: err.path,
      message: `${err.path} must be unique`,
    }))
    // 409 Conflict
    return response.status(409).json({ errors })
  }
  // handle TypeError
  if (error instanceof TypeError) {
    return response.status(400).json({
      error: 'Type error',
      message: error.message,
      // development only ... more details
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
      }),
    })
  }
  response.status(500).json({ error: 'Internal server error' })
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}
