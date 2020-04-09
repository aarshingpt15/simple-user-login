//importing new files
const router = require('express').Router()
const db  = require('../db/db')
const bodyParser = require('body-parser')
let bcrypt = require('../util/bcrypt')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//user routes

//login routes
router.get('/login', async (req,res,next)=>{
    try {
        res.render('login')
    } catch (error) {
        next(error)
    }
})

//signup route
router.get('/signup', async (req,res,next)=>{
    try {
        res.render('signup')
    } catch (error) {
        next(error)
    }
    
})

//user main page route
router.post('/me', async(req,res,next)=>{
    try {
        let userPresent  = await db.findUser({email : req.body.email})
        if(!userPresent.length){
            const error =  new Error("Did you signup first? We can't find you in our database.")
            error.status = 404;
            next(error)
        }
        else{
            userPresent = userPresent[0];
            let isCorrectPassword = await bcrypt.checkPassword(req.body.password,userPresent.password)
            if(!isCorrectPassword) {
            const error = new Error("Hey! Did you try with a wrong password. Try with a correct one.")
                error.status = 400;
                next(error)
        } 
            else if(userPresent.length!==0 && isCorrectPassword && userPresent.admin===false)
            {
                res.render('common', {message:'You dont have acces to view users.Thank you for being here.'})
        }
            else{
            let  commonUsers = await db.findUser({admin:false})
            if(commonUsers.length){
                for(element of commonUsers){
                    delete element['password']
                    delete element['admin']
                }
            }
            
            res.render('main', {message : 'Welcome sir! You are the admin of the group.', userAccess : commonUsers.length ? commonUsers : "None" })
        }
    }
            
} catch (error) {
      next(error)
    }
})

//users route after signing up
router.post('/', async (req,res,next)=>{
try {
    const userPresent  = await db.findUser({email:req.body.email})
    if(userPresent.length!==0){
        const error = new Error("Somebody has already signed up with " + userPresent[0].email + ". Try signing up with another email Address")
        error.status = 400;
        throw error
    } 
    else{
    let hashedPassword = await bcrypt.hashPassword(req.body.password)
    req.body.password = hashedPassword
    req.body.admin = (req.body.admin==='true')
    await db.postUser(req.body)
    res.render('signupdone', {name:req.body.name || 'Anonymous'})
    }
} catch (error) {
    next(error)
    }
})

//other routes
router.get('/*',(req, res, next)=>{
    const error = new Error('Currently we are not serving on this route. We ll let you know')
    error.status(404)
    next(error)
})

module.exports  = router