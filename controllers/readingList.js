const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')
const { sessionValidator } = require('../util/middleware')

router.post('/', async (req, res, next) => {
  try {
    const { blogId, userId } = req.body

    const user = await User.findByPk(userId)
    const blog = await Blog.findByPk(blogId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    const readingEntry = await ReadingList.create({
      blogId,
      userId,
    })

    res.status(201).json(readingEntry)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', sessionValidator, async (req, res, next) => {
  try {
    const { read } = req.body
    if (read === undefined || typeof read !== 'boolean') {
      return res.status(400).json({ error: 'read is missing or invalid' })
    }

    const readingList = await ReadingList.findByPk(req.params.id)
    if (!readingList) {
      return res.status(404).json({ error: '`readingList` not found' })
    }
    if (req.decodedTocken !== readingList.user_id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    readingList.read = read
    await readingList.save()
    return res.json(readingList)
  } catch (err) {
    next(err)
  }
})
module.exports = router
