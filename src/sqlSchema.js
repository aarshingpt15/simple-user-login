//setting up connections
var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.HOST,
      user : process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DATABASE,
      port: process.env.PORT
    }
  });

//creates table in mysql database
  knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name')
    table.string('email')
    table.string('password')
    table.boolean('admin')
  })
  .then((data) => {
    console.log(data)
  } )