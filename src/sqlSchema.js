//setting up connections
var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'password',
      database : 'mysql'
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