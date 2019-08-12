require('./config')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');

const morgan = require('morgan');

// enable public folder
app.use( express.static( path.resolve( __dirname, '../dist/b-trabajo' ) ) );

// Settings
const port = process.env.PORT;

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api', require('./routes'));

// Db connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;

    console.log('Online database');
});

app.get('*', (req, res) => {
    console.log( path.resolve(__dirname, '../dist/b-trabajo/index.html') );
    res.sendFile( path.resolve(__dirname, '../dist/b-trabajo/index.html') );
})

// Starting the server
app.listen(port, () => console.log(`restserver listen on port ${port}`));
