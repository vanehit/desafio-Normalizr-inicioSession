const validateUser = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).redirect('/auth/login')
    }
    return next()
  }
  
  module.exports = validateUser;