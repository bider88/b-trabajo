const router = require('express').Router();

const { verifyToken } = require('../../middleware/auth');
const { userExist } = require('../../middleware/user');

const { handleError } = require('../../utils/errors');

const { UserInfo } = require('../../models/userInfo');
const User = require('../../models/user');


router.all('/*', verifyToken );

router.get('/:id', userExist, (req, res) => {

  const { id } = req.user;

  UserInfo.find({user: id})
  .populate('user')
  .exec((err, userInfoDB) => {

    if (err) return handleError(res, 500, err);

    res.status(200).json({
      ok: true,
      data: userInfoDB || []
    })
  })

})

router.post('/:id', userExist, (req, res) => {

  const { id } = req.user;

  const userInfo =  new UserInfo({
    user: id
  })

  userInfo.save((err, userInfoDB) => {
    if (err) return handleError(res, 500, err);

    userInfoDB.user = req.user;

    res.status(201).json({
      ok: true,
      data: userInfoDB
    })
  })

})

router.put('/:id', userExist, (req, res) => {

  const { id } = req.user;
  const body = req.body;

  const user = {
    firstName: body.user.firstName,
    lastName: body.user.lastName,
    email: body.user.email
  }

  User.findByIdAndUpdate(id, user, (err, userDB) => {
    if (err) return handleError(res, 500, err);

    const update = {
      bio : {
        titleProfessional: body.bio.titleProfessional,
        professionalObjective: body.bio.professionalObjective,
        birthday: body.bio.birthday,
        gender: body.bio.gender,
        phone: body.bio.phone,
        address: body.bio.address,
        skills: body.bio.skills,
        webSite: body.bio.webSite,
        twitter: body.bio.twitter,
        facebook: body.bio.facebook
      }
    }

    UserInfo.findOneAndUpdate({user: id}, update, { new: true }, (err, userUpdated) => {
      if (err) return handleError(res, 500, err);

      userUpdated.user = userDB;

      res.status(201).json({
        ok: true,
        data: userUpdated
      })
    })

  })
})

module.exports = router;
