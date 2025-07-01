const Blog = require('./blog')
const User = require('./user')
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
  as: 'reading_list',
  foreignKey: 'user_id'
});

Blog.belongsToMany(User, {
  through: ReadingList,
  as: 'readers',
  foreignKey: 'blog_id'
 });

module.exports = {
  Blog, User, ReadingList
}

