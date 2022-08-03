const User = require( '../model/User.models' )

const getRegister = async ( req, res ) => {
  return res.render('register');
}

const postRegister = async ( req, res ) => {
  return res.redirect('/auth/login');
}

const getLogin = (req, res) => {
  return res.render('login');
}

const postLogin = ( req, res ) => {
  return res.redirect('/');
}

const logout = (req, res) => {
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