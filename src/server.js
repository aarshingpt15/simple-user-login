const express = require('express')
const userRouter  = require('./routes/users')
const app = express()

//sets ejs view engine
app.set('view engine','ejs')

// express middleware
app.use(express.json())
app.use(express.static("images"));

//routes
app.use('/users', userRouter)



//homepage route
app.get('/',(req,res)=>{
    res.render('home')
})

//all other routes
app.get('/*',(req,res)=>{
    res.render('error', {error:'Currently we are not serving on this route.Thank You!'})
})

//server listening at
app.listen(3000,()=>{
    console.log('app listening to server at port 3000')
})