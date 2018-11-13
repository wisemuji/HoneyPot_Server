import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/honeypot', { useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });

var UsersSchema = mongoose.Schema({
  id: {type: String}, //아이디
  passwd: {type: String}, //비밀번호
  token : {type : String}, // 소셜 로그인 시 사용될 토큰 혹은 자동로그인.
  profile_img: {type: String}, // url을 넣어주면됨
  school: {type: String}, //학교
  grade: {type: String}, //학년
  field: {type: String}, //분야
  job: {type: String}, //직군
  skill_set: {type: String}, //스킬셋
  comment: {type: String}, //자기소개
  rank: {type: Number} //등급
});

require('./err')(UsersSchema);

var Users = mongoose.model("users", UsersSchema);

export {Users};

export default db;
