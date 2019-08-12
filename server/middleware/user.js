const { handleError } = require('../utils/errors');
const User = require('../models/user');
const mongoose = require('mongoose');

const userExist = (req, res, next) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {

    User.findById(id, (err, userDB) => {
      if (err) return handleError(res, 500, err);
      if (!userDB) return handleError(res, 400, {message: 'User not found'});
      req.user = userDB;
      next();
    })

  } else {
    handleError(res, 400, { message: 'ID is not valid' })
  }
}

module.exports = {
  userExist
}
