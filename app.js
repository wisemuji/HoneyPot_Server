import express from 'express'
import bodyParser from 'body-parser'
import rndstring from 'randomstring'
import path from 'path'
import mongoose from 'mongoose'
//서버 생성
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '1gb',
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

//module setting
import { Users, Hackathons } from './mongo';
let passport = require('./passport')(Users);

//라우터
// let auth = require('./routes/auth/auth')(app);
// app.use('/', auth);
// var router = require('./routes')(app, Users);
app.post('/test', function(req, res){
  console.log(req.body);
});
//서버 실행
const PORT = 8888;
app.listen(PORT, function(){
  console.log('server running');
});

require('./routes/auth/auth')(app, Users, passport, rndstring);
