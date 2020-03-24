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

const  postUser = async (newUser) =>{
    return knex('users').insert(newUser)
}

const findUser = async (email) =>{
   var user = await knex('users').select().where({ email })
   return user
}


module.exports = {
   postUser,
   findUser
}