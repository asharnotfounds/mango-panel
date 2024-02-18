const router = require('express').Router()
const { log, info, warn, error } = require(`../../functions/colors`)
const { signedIn, notSigned } = require(`../../functions/routesMiddleware`)


router.get('/' , (req , res)=>{
    res.render('landingPage', {
        isLogged : req.isAuthenticated()
    })
})

module.exports = router 
