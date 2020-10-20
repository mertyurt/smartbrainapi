const express = require('express');
const bosyParser= require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });

const app = express();

app.use((req ,res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*') // * for all domains
  res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE')
  console.log("---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  return next();
})

app.use(bosyParser.json());
app.use(cors());

app.set('trust proxy',true);

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