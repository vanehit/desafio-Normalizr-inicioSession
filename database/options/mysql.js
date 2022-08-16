const { DB_HOST, DB_USERNAME, DB_NAME, DB_TABLE} = process.env;

const options = {
    client: 'mysql',
    connection: {
      host: DB_HOST,
      user: DB_USERNAME,
      password: '',
      database: DB_NAME,
      table: DB_TABLE
    }
  }
  
  module.exports = options;