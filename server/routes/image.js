const express = require('express');

const fs = require('fs');
const path = require('path');

const { verifyTokenImage } = require('../middleware/auth');

const app = express();

app.get('/image/profile/:img', verifyTokenImage, (req, res) => {
    const { img } = req.params;

    const pathImage = path.resolve( __dirname, `../../uploads/users/${img}` );

    if (fs.existsSync(pathImage)) {
        res.sendFile( pathImage );
    } else {
        const pathNoImage = path.resolve( __dirname, '../assets/noimage.png' );

        res.sendFile( pathNoImage );
    }
})

module.exports = app;
