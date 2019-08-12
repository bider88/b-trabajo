const express = require('express');

// const { verifyToken } = require('../../middleware/auth');

const router = express.Router();

const { handleError } = require('../../utils/errors');
const Vacancy = require('../../models/vacancy');

const mongoose = require('mongoose');

router.get('/', (req, res) => {

  const query = { $and: [{ 'status.open': true }] };

  Vacancy.find(query)
    .sort('-createdAt')
    .limit(5)
    .exec((err, vacanciesDB) => {
      if (err) return handleError(res, 500, err);

      Vacancy.count(query, (err, count) => {
        if (err) return handleError(res, 500, err);

        res.json({
          ok: true,
          count,
          data: vacanciesDB
        })
      })
    })

});

router.get('/search/:search', (req, res) => {

  let from = req.query.from || 0;
  from = Number(from);
  from = isNaN(from) ? 0 : from;

  let limit = req.query.limit || 10;
  limit = Number(limit);
  limit = isNaN(limit) ? 10 : limit;

  const { search } = req.params;

  const regex = new RegExp(search, 'i');

  const query = search === 'allvacancies' ? { $and: [{ 'status.open': true }] } : { $or: [{title: regex }, {description: regex }, { experience: {$in: [ regex ]} }], $and: [{ 'status.open': true }] };

  Vacancy.find(query)
    .sort('-createdAt')
    .skip(from)
    .limit(limit)
    .exec((err, vancanciesDB) => {
      if (err) return handleError(res, 500, err);

      Vacancy.count(query, (err, count) => {
        if (err) return handleError(res, 500, err);

        res.json({
          ok: true,
          count,
          data: vancanciesDB
        })
      })
    })
})

router.get('/:id', (req, res) => {

  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {

    Vacancy.findById(id)
      .populate('user')
      .populate('postulate')
      .exec((err, vacancyDB) => {
        if (err) return handleError(res, 500, err);

        res.json({
          ok: true,
          data: vacancyDB
        })
      })
  } else {
    handleError(res, 400, { message: 'ID is not valid' })
  }
});

router.put('/views', (req, res) => {

  const { id } = req.body;

  if (mongoose.Types.ObjectId.isValid(id)) {

    Vacancy.findById(id, (err, vacancyDB) => {
      if (err) return handleError(res, 500, err);

      vacancyDB.views += 1;

      vacancyDB.save((err, vacancySaved) => {
        if (err) return handleError(res, 500, err);

        res.json({
          ok: true,
          data: vacancySaved
        })
      })
    })
  } else {
    handleError(res, 400, { message: 'ID is not valid' })
  }
});

module.exports = router;
