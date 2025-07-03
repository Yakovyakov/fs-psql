require('dotenv').config()

const express = require('express')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/readingList')
const logoutRouter = require('./controllers/logout')
const { unknownEndpoint, errorHandler } = require('./util/middleware')

require('express-async-errors')

const app = express()
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  try {
    await connectToDatabase()
  } catch (error) {
    console.error('Critical failure when starting application:', error.message)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
