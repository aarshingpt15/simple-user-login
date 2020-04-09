const express = require('express')
const userRouter  = require('./routes/users')
const app = express()
let bodyParser = require('body-parser');



//sets ejs view engine
app.set('view engine','ejs')

// express middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(express.static("images"))

//routes
app.use('/users', userRouter)



//homepage route
app.get('/',(req,res,next)=>{
    res.render('home')
})

//all other routes
app.get('/*',(req,res,next)=>{
    res.render('error', {error:'Currently we are not serving on this route.Thank You!'})
})

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(err.status || 500).render('error', {error:err.message})
})

//server listening at
app.listen(3000,()=>{
    console.log('app listening to server at port 3000')
})