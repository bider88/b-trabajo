// Port
process.env.PORT = process.env.PORT || 3000;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Expiration token
// ms('1y')      // 31557600000
// ms('2 days')  // 172800000
// ms('1d')      // 86400000
// ms('10h')     // 36000000
// ms('2.5 hrs') // 9000000
// ms('2h')      // 7200000
// ms('1m')      // 60000
// ms('5s')      // 5000
process.env.EXP_TOKEN = '2d';

// SEED authentication
process.env.SEED = process.env.SEED || 'seed-dev';

// Database
let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/bolsatrabajo';
} else { urlDB = process.env.MONGO_URI }

process.env.URLDB = urlDB;
