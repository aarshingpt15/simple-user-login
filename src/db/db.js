//connection to mysql database using knex js library
var knex = require('knex')({
   client: 'mysql',
   connection: {
     host : '127.0.0.1',
     user : 'root',
     password : 'password',
     database : 'mysql'
   }
 });

  //insert user
const  postUser = async (newUser) =>{
    return knex('users').insert(newUser)
}

// gets users using their email
const findUser = async (obj) =>{
   console.log(obj)
   var user = await knex('users').where(obj)
   console.log(user)
   return user
}


module.exports = {
   postUser,
   findUser
}