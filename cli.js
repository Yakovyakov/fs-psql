require('dotenv').config()

const { connectToDatabase, closeDatabase } = require('./util/db')

const Blog = require('./models/blog.js')



const main = async () => {
  try {
    await connectToDatabase()
    //const blogs = await sequelize.query('SELECT * from blogs', { type: QueryTypes.SELECT })
    //console.log(blogs)
    const blogs = await Blog.findAll()
    blogs.map(blog => console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`))
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }finally {
    try {
      await closeDatabase();
    } catch (closeError) {
      console.error('Error while closing connection:', closeError);
    }
  }
}

main()