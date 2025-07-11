const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'URL is required',
        },
        notEmpty: {
          msg: 'URL cannot be empty',
        },
        isUrl: {
          msg: 'Must be a valid URL',
        },
      },
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required',
        },
        notEmpty: {
          msg: 'Title cannot be empty',
        },
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'Likes must be an integer',
        },
        min: {
          args: [0],
          msg: 'Likes cannot be negative',
        },
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Year is required',
        },
        isValidBlogYear(year) {
          const date = new Date()
          if (year < 1991 || year > date.getFullYear()) {
            throw new Error(`year must be between 1991 and ${date.getFullYear()}`)
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'blog',
    tableName: 'blogs',
    timestamps: false,
    underscored: true,
  },
)

module.exports = Blog
