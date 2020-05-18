const router = require('express').Router();
const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('./auth-model')
const validateUser = require('../auth/authenticate-middleware')


router.get('/', validateUser(), async (req, res, next) => {
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

router.post('/login', async (req, res, next) => {
  // implement login
  console.log('checkpoint1')
  const authErr = {
    message: 'Invalid Credentials'
  } 
  try{
    
    const { username, password } = req.body
    const user = await Auth.findBy({ username }).first()
     if(!user) {
       console.log('checkpoint2')
       return res.status(401).json(authErr)
     }
     const pswdValid = await bcrypt.compare(password, user.password)
      if(!pswdValid) {
        console.log('checkpoint')
        return res.status(401).json({
          message: 'Invalid Password'
       })
     }
     const tokenPayload = {
       subject: user.id,
       username: user.username
     }
     res.cookie('token', jwt.sign(tokenPayload, process.env.COOKIE_SECRET))
     res.json({
       message: `Welcome ${user.username}`
     })
     

  } catch(err) {
    next(err)
  }
});

module.exports = router;
