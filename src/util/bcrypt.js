var bcrypt = require('bcrypt');


let hashPassword = async (password)=>{
    let hash = await bcrypt.hash(password,8);
    return hash;
}

let checkPassword = async (givenPassword, hash)=>{
    let isCorrectPassword = await bcrypt.compare(givenPassword,hash)
    return isCorrectPassword
}

module.exports = {
    hashPassword,
    checkPassword
}