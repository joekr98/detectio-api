const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');

const signin = require('./controllers/signin');

const image = require('./controllers/image');

const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        host: 'postgresql-globular-59260',
        user: 'postgres',
        password: '12Brianmay',
        database: 'detectiodb'
    }
});



app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Working PogU');
})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req, res)=> {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 1337, () => {
    console.log(`App running on port ${process.env.PORT}`);
})