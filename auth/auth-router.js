const router = require('express').Router();
const Auth = require('./auth-model')



router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await Auth.find())
  } catch(err) {
    next(err)
  }
})

router.post('/register', async (req, res, next) => {
  // implement registration
  try{ 
    const { username } = req.body
    const user = await Auth.findBy({ username }).first()
     if(user) {
       return res.status(409).json({
         message: 'Username taken'
       })
    } res.status(201).json(await Auth.insert(req.body))
  } catch(err) {
    next(err)
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
