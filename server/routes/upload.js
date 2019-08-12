const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const User = require('../models/user');

const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');

const { handleError } = require('../utils/errors');

app.use(fileUpload());

app.put('/user/:id', (req, res) => {

  const { id } = req.params;

  if (!req.files) return handleError(res, 400, { message: 'No files were uploaded' });

  if (!req.files.file) return handleError(res, 400, { message: 'File is not valid' });

  const file = req.files.file;
  const nameFile = file.name.split('.');
  const ext = nameFile[nameFile.length - 1];

  const extValids = ['png', 'jpg', 'jpeg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF'];

  if (extValids.indexOf( ext ) < 0) {
    return handleError(res, 400, {
        message: 'Extension alloweds ' + extValids.join(', '),
        ext
    });
  }

  // const name = id + '-' + Date.now() + '.png';
  const name = id + '.png';

  file.mv(`uploads/users/${name}`, (err) => {
    if (err) return handleError(res, 400, err);

    imageUser(res, id, name);
  });

})

app.delete('/user/:id', (req, res) => {

  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    User.findById(id, (err, userDB) => {
        if (err) {
            return handleError(res, 500, err);
        }

        if (!userDB) {
            return handleError(res, 400, { message: 'User not found'});
        }

        deleteImage(userDB.img);

        userDB.img = '';

        userDB.save((err, userSavedDB) => {
            if (err) return handleError(res, 500, err);

            res.status(200).json({
                ok: true,
                data: userSavedDB,
                img: ''
            })
        })
    })
  } else {
      handleError(res, 400, { message: 'User ID not valid'});
  }
})

const imageUser = (res, id, name) => {

  if (mongoose.Types.ObjectId.isValid(id)) {
      User.findById(id, (err, userDB) => {
          if (err) {
              deleteImage(name);
              return handleError(res, 500, err);
          }

          if (!userDB) {
              deleteImage(name);
              return handleError(res, 400, { message: 'User not found'});
          }

          if (userDB.img) {
            deleteImage(userDB.img);
          }

          userDB.img = name;

          userDB.save((err, userSavedDB) => {
              if (err) {
                  return handleError(res, 500, err);
              }

              res.status(200).json({
                  ok: true,
                  data: userSavedDB,
                  img: name
              })
          })
      })
  } else {
      handleError(res, 400, { message: 'User ID not valid'});
  }
}


const deleteImage = (name) => {
  const pathImage = path.resolve(__dirname, `../../uploads/users/${name}`);
  if ( fs.existsSync(pathImage) ) {
      fs.unlinkSync(pathImage);
  }
}

module.exports = app;
