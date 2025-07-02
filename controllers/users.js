const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['blogId'] },
    include: {
      model: Blog,
    },
  })
  res.json(users)
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['name', 'username'],
      include: [
        {
          model: Blog,
          as: 'readings',
          through: {
            as: 'readinglists',
            attributes: ['id', 'read'],
          },
          attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
        },
      ],
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { username, name, password } = req.body
  if (password === undefined || password.length < 3) {
    return res.status(400).json({ error: '`password` is missing or is to short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const userToCreate = {
    username,
    name,
    passwordHash,
  }

  try {
    const user = await User.create(userToCreate)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    user.username = req.body.username
    await user.save()
    res.json(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router
