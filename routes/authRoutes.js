const router = require( 'express' ).Router();
const passport = require( 'passport' )
const {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logout
} = require( '../controllers/auth.Controller' );

router.get('/login', getLogin);

router.post('/login', passport.authenticate('login', {
  failureRedirect: '/auth/error-login'
}), postLogin);

router.get( '/register', getRegister );

router.post( '/register', passport.authenticate('singup', {
  failureRedirect: '/auth/error-register'
}), postRegister );

router.get( '/error-login', ( req, res ) => {
  res.render( 'error-login' )
} )

router.get( '/error-register', ( req, res ) => {
  res.render( 'error-register' )
} )

router.get('/logout', logout);

module.exports = router;