const express = require('express');

const { verifyToken, verifyRecruiterRole } = require('../../middleware/auth');

const router = express.Router();

const { handleError } = require('../../utils/errors');
const Vacancy = require('../../models/vacancy');

const mongoose = require('mongoose');

router.all('/*', verifyToken, verifyRecruiterRole);

router.get('/', (req, res) => {

    const id = req.user._id;

    let from = req.query.from || 0;
    from = Number(from);
    from = isNaN(from) ? 0 : from;

    let limit = req.query.limit || 5;
    limit = Number(limit);
    limit = isNaN(limit) ? 5 : limit;

    const query = { user: id, 'status.open': true };

    if (mongoose.Types.ObjectId.isValid(id)) {
        Vacancy.find(query)
            .skip(from)
            .limit(limit)
            .populate('user')
            .populate({
              path: 'postulate',
              options: { sort: '-createdAt' },
              populate: {
                path: 'user',
                model: 'User'
              }
            })
            .sort('-createdAt')
            .exec((err, vacanciesDB) => {
                if (err) return handleError(res, 500, err);

                Vacancy.count(query, (err, count) => {
                  if (err) return handleError(res, 500, err);

                  Vacancy.count({ user: id, 'status.open': false }, (err, countClosed) => {
                    if (err) return handleError(res, 500, err);

                    res.json({
                        ok: true,
                        count,
                        countClosed,
                        data: vacanciesDB
                    })
                  })
                })
            })
    } else {
        handleError(res, 400, { message: 'ID is not valid' })
    }
});

router.get('/closed', (req, res) => {

  const id = req.user._id;

  let from = req.query.from || 0;
  from = Number(from);
  from = isNaN(from) ? 0 : from;

  let limit = req.query.limit || 5;
  limit = Number(limit);
  limit = isNaN(limit) ? 5 : limit;

  const query = { user: id, 'status.open': false };

  if (mongoose.Types.ObjectId.isValid(id)) {
      Vacancy.find(query)
          .skip(from)
          .limit(limit)
          .populate('user')
          .populate({
            path: 'postulate',
            options: { sort: '-createdAt' },
            populate: {
              path: 'user',
              model: 'User'
            }
          })
          .sort('-createdAt')
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
  } else {
      handleError(res, 400, { message: 'ID is not valid' })
  }
});

router.get('/:id', (req, res) => {

    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {

        Vacancy.findById( id)
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

router.post('/', (req, res) => {

    const body = req.body;
    const id = req.user._id;

    const vacancy = new Vacancy({
        title: body.title,
        enterprise: body.enterprise,
        city: body.city,
        salary: body.salary,
        salaryPeriod: body.salaryPeriod,
        description: body.description,
        experience: body.experience,
        email: body.email,
        phone: body.phone,
        expire: body.expire,
        createdAt: body.createdAt,
        user: id,
    });

    vacancy.save((err, vacancyDB) => {
        if (err) return handleError(res, 500, err);

        res.json({
            ok: true,
            data: vacancyDB
        })
    })

});

router.put('/:id', (req, res) => {

  const { id } = req.params;

  const vacancy = req.body;

  if (mongoose.Types.ObjectId.isValid(id)) {

    Vacancy.findByIdAndUpdate(id, vacancy, { new: true, runValidators: true }, (err, vacancyDB) => {
      if (err) return handleError(res, 500, err);
      if (!vacancyDB) return handleError(res, 400, { message: 'Vacancy not found'});

      res.status(200).json({
        ok: true,
        data: vacancyDB
      })
    })

  } else handleError(res, 400, { message: 'ID is not valid'}) ;

});

router.put('/close/:id', (req, res) => {

    const { id } = req.params;

    const { status } = req.body;

    if (mongoose.Types.ObjectId.isValid(id)) {

      Vacancy.findByIdAndUpdate(id, { status }, { new: true })
      .populate('user')
      .exec((err, vacancyDB) => {
        if (err) return handleError(res, 500, err);
        if (!vacancyDB) return handleError(res, 400, { message: 'Vacancy not found'});

        res.status(200).json({
          ok: true,
          data: vacancyDB
        })
      })

    } else handleError(res, 400, { message: 'ID is not valid'}) ;

});

module.exports = router;
