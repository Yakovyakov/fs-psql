require('dotenv').config()
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const Blog = require('./models/blog.js')


const express = require('express')
const app = express()
app.use(express.json())

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.get('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

app.post('/api/blogs', async (req, res) => {
  try {
    console.log(req.body)
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    await blog.destroy()
  }
  res.status(204).end()
})

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()