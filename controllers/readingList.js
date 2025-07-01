const router = require('express').Router()

const { User, Blog, ReadingList} = require('../models')


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
    });

    res.status(201).json(readingEntry)
  } catch (err) {
    next(err);
  }
})

module.exports = router