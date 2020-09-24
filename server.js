const express = require('express');
const bosyParser= require("body-parser");
const bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '316293',
      database : 'smartbrain'
    }
  });

const app = express();

app.use(bosyParser.json());
app.use(cors());

app.get('/', (req,res) => res.send('it is workin'))
app.get("/profile/:id", (req, res)=>{profile.handleProfileGet(req, res, db)})

app.post("/signin", (req, res)=> {signin.handleSignin(req, res, db, bcrypt)})
app.post("/register", (req, res)=>{ register.handleRegister(req, res, db ,bcrypt)})

app.put("/image", (req, res) =>{image.handleImage(req, res, db)})
app.post("/imageurl", (req, res) =>{image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`apps running on port ${process.env.PORT}`)
})

/*
/--> res = this is working
/signin ---> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT = user
*/