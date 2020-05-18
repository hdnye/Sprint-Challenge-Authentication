/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

function validateUser() {
  return async (req, res, next) => {
    const authErr = {
      message: 'Invalid Credentials'
    }
    try {
      const token = req.cookies.token
      if (!token) {
        return res.status(401).json(authErr)
      }
      jwt.verify(token, process.env.COOKIE_SECRET, (err, decodedPayload) => {
        if (err) {
          console.log(err)
          return res.status(401).json(authErr)
        }
        req.token = decodedPayload
        next()
      })

    } catch (err) {
      next(err)
    }
  }
}

module.exports = validateUser

module.exports = (req, res, next) => {
  res.status(401).json({ you: 'shall not pass!' });
};
