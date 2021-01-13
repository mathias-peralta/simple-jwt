const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/singin', async (req, res, next) => {
    const {email, password} = req.body;
    const user = User.findOne({email: email});
    if(!user) {
        return res.status(404).send('Este usuario no existe');
    }
    res.json({'me':'me'})
    const passwordIsValid = await user.validatePassword(password);
    console.log(passwordIsValid);
})

router.post('/singup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User({
        username: username,
        email: email,
        password: password
    });

    user.password = await user.encryptPassword(user.password);
    await user.save();
    const token = jwt.sign({id: user._id}, 'mysecrecttoken', {
        expiresIn: 60 * 60 * 24
    })

    console.log(user);
    res.json({auth: true, token});
})

router.get('/me', async (req, res, next) => {
     const token = req.headers['x-access-token'];
     console.log(token);
     if(!token) {
         return res.status(401).json({
            auth: false,
            message: 'no token'
        })
    }
    const decode = jwt.verify(token, 'mysecrecttoken');
    const user = await User.findById(decode.id, { password: 0})
    if(!user) {
        return res.status(404).send('User no found');
    }
    res.json(user)
})


module.exports = router;