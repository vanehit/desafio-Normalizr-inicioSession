const User = require( '../model/User.models' )
const log4js = require('log4js')
const logger = log4js.getLogger('info');

const getRegister = async ( req, res ) => {
  logger.info(`${ req.method }: ${ req.url }`);
  return res.render('register');
}

const postRegister = async ( req, res ) => {
  logger.info(`${ req.method }: ${ req.url }`);
  return res.redirect('/auth/login');
}

const getLogin = (req, res) => {
  logger.info(`${ req.method }: ${ req.url }`);
  return res.render('login');
}

const postLogin = ( req, res ) => {
  logger.info(`${ req.method }: ${ req.url }`);
  return res.redirect('/');
}

const logout = (req, res) => {
  logger.info(`${ req.method }: ${ req.url }`);
  const username = req.session.username;
  req.session.destroy(err => {
    if (!err) res.render('logout', { username: username })
    else res.send({ status: 'Logout ERROR ', body: err })
  })

}

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logout
};