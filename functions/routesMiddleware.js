
const signedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/dashboard');
}

const notSigned = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}



module.exports.signedIn = signedIn
module.exports.notSigned = notSigned