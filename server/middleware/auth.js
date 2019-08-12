const jwt = require('jsonwebtoken');
const { handleError } = require('../utils/errors');

const verifyToken = (req, res, next) => {
    const token = req.get('token');

    verToken( req, res, next, token );
}

const verifyRecruiterRole = (req, res,next) => {

  const { role } = req.user;

  if (role === 'RECRUITER_ROLE') {
      next();
  } else {
      return res.status(401).json({
          ok: false,
          err: {
              message: 'User is not recruiter'
          }
      })
  }
}

const verifyTokenImage = (req, res,next) => {
  const { token } = req.query;

  verToken( req, res, next, token )
}

function verToken(req, res, next, token) {
    jwt.verify( token, process.env.SEED, (err, decode) => {
        if (err) {
            return handleError(res, 401, err);
        }

        req.user = decode.user;

        next();
    });
}

module.exports = {
    verifyToken,
    verifyRecruiterRole,
    verifyTokenImage
}
