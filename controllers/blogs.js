const { Op } = require('sequelize')
const router = require('express').Router()

const { sessionValidator } = require('../util/middleware')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const searchTerm = req.query.search
  const isValidSearch = searchTerm && typeof searchTerm === 'string' && searchTerm.trim() !== ''
  const where = isValidSearch
    ? {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            author: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
        ],
      }
    : {}
  const blogs = await Blog.findAll({
    where,
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'name', 'username'],
    },
    order: [['likes', 'DESC']],
  })
  res.json(blogs)
})

router.post('/', sessionValidator, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
    res.json(blog)
  } catch (error) {
    // return res.status(400).json({ error })
    next(error)
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: ['id', 'name', 'username'],
    },
  })
  next()
}

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', sessionValidator, blogFinder, async (req, res) => {
  if (req.blog) {
    const user = await User.findByPk(req.decodedToken.id)
    if (user && user.id === req.blog.userId) {
      await req.blog.destroy()
    } else {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res, next) => {
  if (!req.blog) {
    return res.status(404).end()
  }
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } catch (error) {
    next(error)
  }
})

module.exports = router
