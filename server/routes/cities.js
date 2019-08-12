const router = require('express').Router();

const { verifyToken } = require('../middleware/auth');

const { handleError } = require('../utils/errors');

const Cities = require('../models/cities');

router.get('/', verifyToken, (req, res) => {

  Cities.find({}, (err, citiesDB) => {
    if (err) return handleError(res, 500, err);

    res.json({
      ok: true,
      data: citiesDB
    })
  })
})

module.exports = router;
