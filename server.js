const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

// const db = knex({
//   client: 'pg',
//   connection: {
//     host : 'ec2-3-234-204-26.compute-1.amazonaws.com',
//     database : 'd3n8a5dhb2hra3',
//     user : 'nxzxielqquogpq',
//     post : 5432,
//     password : '2c8613ef6048689371b89fc2c370b3df0a2e9e3f8b845e8eb6d37983e0b16c03',
//     URI : 'postgres://nxzxielqquogpq:2c8613ef6048689371b89fc2c370b3df0a2e9e3f8b845e8eb6d37983e0b16c03@ec2-3-234-204-26.compute-1.amazonaws.com:5432/d3n8a5dhb2hra3'
//   }
// });

// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     port : 5432,
//     user : 'am',
//     password : '',
//     database : 'smart-brains'
//     }
// });

// console.log(db.select('*').from('users'));
// db.select('*').from('users').then(data => {
//   console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })



// app.listen(3000, () => {
//   console.log(`app is running on port 3000`);
// })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})