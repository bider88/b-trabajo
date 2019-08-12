const express = require('express');

const { verifyToken } = require('../../middleware/auth');

const router = express.Router();

const { handleError } = require('../../utils/errors');
const Vacancy = require('../../models/vacancy');
const Postulate = require('../../models/postulate');

router.all('/*', verifyToken );

router.post('/postulate/:id', (req, res) => {

  const { id } = req.params;

  const postulate = new Postulate({
    user: req.user._id,
    createdAt: req.body.createdAt
  });

  postulate.save((err, postulateDB) => {
    if (err) return handleError(res, 500, err);

    Vacancy.findById( id , (err, vacancyDB) => {
      if (err) return handleError(res, 500, err);

      vacancyDB.postulate.push(postulateDB);

      vacancyDB.save((err, vacancySaved) => {
        if (err) return handleError(res, 500, err);
        res.json({
          ok: true,
          data: vacancySaved
        })
      })
    })

  });

})

router.get('/postulate/:id', (req, res) => {

  const { id } = req.params;

  let from = req.query.from || 0;
  from = Number(from);
  from = isNaN(from) ? 0 : from;

  let limit = req.query.limit || 10;
  limit = Number(limit);
  limit = isNaN(limit) ? 10 : limit;

  const query = { user: id };

  Postulate.find(query, '_id')
  .exec((err, postulateDB) => {
    if (err) return handleError(res, 500, err);

    Postulate.count(query, (err, count) => {
      if (err) return handleError(res, 500, err);

      Vacancy.find({postulate: {$in: postulateDB } }, 'title description postulate')
      .populate({ path: 'postulate', select: 'user createdAt', match: query})
      .sort('-postulate')
      .skip(from)
      .limit(limit)
      .exec((err, vacanciesDB) => {
        if (err) return handleError(res, 500, err);

        res.json({
          ok: true,
          count,
          data: vacanciesDB || []
        })
      })

    })

  })

})

router.get('/suggestion/:id', (req, res) => {

  const { id } = req.params;

  Vacancy.find({experience: id}, (err, postulateDB) => {
    if (err) return handleError(res, 500, err);

    res.json({
      ok: true,
      data: postulateDB || []
    })
  })

})

module.exports = router;
