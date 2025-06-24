const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

// NOTE: be sure to remove the commands User.sync() and Blog.sync(),
// which synchronizes the models' schemas from your code,
// otherwise your migrations will fail.
// Blog.sync({ alter: true })
// User.sync({ alter: true })


module.exports = {
  Blog, User
}

