const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}
const closeDatabase = async () => {
try {
    await sequelize.close();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error closing database connection:', err.message);
    throw err;
  }
}
module.exports = { connectToDatabase, closeDatabase, sequelize }


