const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { handleError } = require('../utils/errors');
const User = require('../models/user');

const mongoose = require('mongoose');

const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/login', (req, res) => {

    const body = req.body;

    User.findOne({ email: body.email}, (err, userDB) => {
        if (err) {
            return handleError(res, 500, err);
        }

        if (!userDB) {
            return handleError(res, 400, { message: 'Email or password are invalid' });
        }

        if ( !bcrypt.compareSync( body.password, userDB.password ) ) {
            return handleError(res, 400, { message: 'Email or password are invalid' });
        }

        const token = createToken(userDB);

        res.json({
            ok: true,
            token,
            data: userDB
        })
    })

})

router.post('/signup', (req, res) => {

    const body = req.body;

    if (!body.password) {
        return handleError(res, 400, { message: 'Password is required' });
    }

    const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return handleError(res, 500, err);
        }

        const token = createToken(userDB);

        res.json({
            ok: true,
            token,
            data: userDB
        })
    })
})

router.get('/user/:id', verifyToken, (req, res) => {

  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    User.findById(id, (err, userDB) => {
      if (err) return handleError(res, 400, err);

      if (!userDB) return handleError(res, 400, { message: 'User not found' });

      const token = createToken(userDB);

      res.status(200).json({
        ok: true,
        token,
        data: userDB
      })
    })
  } else {
      handleError(res, 400, { message: 'User ID not valid'});
  }

})

const createToken = (userDB) => {
    return jwt.sign({
        user: userDB,
    }, process.env.SEED, { expiresIn: process.env.EXP_TOKEN });
}

module.exports = router;
