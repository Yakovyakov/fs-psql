const Blog = require('./blog')
const User = require('./user')
const Session = require('./session')
const ReadingList = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

// NOTE: be sure to remove the commands User.sync() and Blog.sync(),
// which synchronizes the models' schemas from your code,
// otherwise your migrations will fail.
// Blog.sync({ alter: true })
// User.sync({ alter: true })

User.belongsToMany(Blog, {
  through: ReadingList,
  as: 'readings',
})

Blog.belongsToMany(User, {
  through: ReadingList,
  as: 'readinglists',
})

// User - Session relations

User.hasMany(Session, {
  onDelete: 'CASCADE',
})
Session.belongsTo(User)

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
}
