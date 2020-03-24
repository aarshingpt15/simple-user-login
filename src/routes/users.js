//importing new files
const router = require('express').Router()
const db  = require('../db/db')
const bodyParser = require('body-parser')

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//user routes

//login routes
router.get('/login', async (req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        res.status(500).send(error)
    }
})

//signup route
router.get('/signup', async (req,res)=>{
    try {
        res.render('signup')
    } catch (error) {
        res.status(500).send(error)
    }
    
})

//user main page route
router.get('/me', async(req,res)=>{
    try {
        const userPresent  = await db.findUser(req.query.email)
        if(userPresent.length===0){
            throw "Did you signup first? We can't find you in our database."} 
        else if(userPresent.length!==0 && userPresent[0].password!==req.query.password){
            throw "Hey! Did you try with a wrong password. Try with a correct one."
        }
        else if(userPresent.length!==0 && userPresent[0].password!==req.query.password && userPresent[0].admin===false)
        {
            res.render('common', {message:'So you are not an admin huh!! This is all we have for you.Thank you for being here.'})
        }
        else{
            res.render('main', {message : 'Welcome sir! All the universe is bent to serve you!!'})
        }
        
    } catch (error) {
        res.status(400).render('error',{error:error})
    }
})

//users route after signing up
router.post('/', urlencodedParser, async (req,res)=>{
try {
    const userPresent  = await db.findUser(req.body.email)
    if(userPresent.length!==0){
        throw "Somebody has already signed up with " + userPresent[0].email + ". Try signing up with another email Address"} 
    else{
    req.body.admin = (req.body.admin==='true')
    await db.postUser(req.body)
    res.render('signupdone', {name:req.body.name || 'Anonymous'})
    }
} catch (error) {
    res.status(400).render('error',{error:error})
}
})

//other routes
router.get('/*',(req,res)=>{
    res.render('error', {error:'Currently we are not serving on this route.Thank You!'})
})

module.exports  = router