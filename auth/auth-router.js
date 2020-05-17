const router = require('express').Router();
const Auth = require('./auth-model')



router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await Auth.find())
  } catch(err) {
    next(err)
  }
})

router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
