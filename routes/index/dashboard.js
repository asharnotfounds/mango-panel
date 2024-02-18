const router = require('express').Router()
const { log, info, warn, error } = require(`../../functions/colors`)
const { signedIn, notSigned } = require(`../../functions/routesMiddleware`)


router.get('/dashboard' , signedIn, (req , res)=>{
    res.render('dashboard')
})

module.exports = router 
