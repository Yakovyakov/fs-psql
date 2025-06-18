require('express-async-errors')

const unknownEndpoint = (request, response) => { 
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.error(error.name)
  
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  } 
  else if (error.name === 'SequelizeDatabaseError') {
    return response.status(500).json({ error: 'Database error' })
  } 
  else if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'TypeError') {
    return response.status(500).json({ error: 'Internal type error' })
  }

  response.status(500).json({ error: 'Internal server error' })
}


module.exports = {
  unknownEndpoint,
  errorHandler,
}