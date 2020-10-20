const express = require('express');
const bodyParser= require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    connection: {
      connectionString : "postgres://palacktninffpj:e330069346434d2e626e5d8941fe1677eb861f84454ad92e4ce55115ff7be17f@ec2-3-218-112-22.compute-1.amazonaws.com:5432/d69fboq3951m0n",
      ssl: true,
    }
  });

const app = express();
app.use(cors());


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("--------------------->>>>>>>>>>>><<")
  next();});

app.use(bodyParser.json());


app.set('trust proxy',true);

app.get('/', (req,res) => res.send('it is workin'))
app.get("/profile/:id", (req, res)=>{profile.handleProfileGet(req, res, db)})

app.post("/signin", (req, res)=> { 
  console.log("-----------------------------signin")
  signin.handleSignin(req, res, db, bcrypt)})
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