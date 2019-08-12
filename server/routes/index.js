const express = require('express');

const app = express();

app.use('/auth', require('./auth'));

app.use('/upload', require('./upload'));

app.use('/cities', require('./cities'));

app.use('/vacancy', require('./vacancy'));

app.use('/user', require('./user/vacancy'));

app.use('/user/info', require('./user/info'));

app.use('/recruiter/vacancy', require('./recruiter/vacancy'));

app.use(require('./image'));


module.exports = app;
