const router = require('express').Router()

const { sequelize } = require('../util/db')
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  try {
    const authorsStats = await Blog.findAll({
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      ],
      group: ['author'],
      order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
      raw: true,
    })

    res.json(authorsStats)
  } catch (error) {
    console.error('Error fetching author stats:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
