const router = require('express').Router()
const passport = require('passport');
const { log, info, warn, error } = require(`../../functions/colors`)
const { signedIn, notSigned } = require(`../../functions/routesMiddleware`)


router.get('/login' , notSigned, (req , res)=>{
    // router code here
    res.render('login')
})

router.post('/login', notSigned, passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: false,
  }))
  

module.exports = router 
