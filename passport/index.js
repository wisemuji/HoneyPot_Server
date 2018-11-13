const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (Users) => {
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use(new LocalStrategy({ // local 전략을 세움
      usernameField: 'email',
      passwordField: 'passwd',
      session: true, // 세션에 저장 여부
      passReqToCallback: false,
  }, async function(email, passwd, done){
      console.log('passport function');
      var user = await Users.findOne({email: email, passwd: passwd}, {__v: 0, _id:0});
      if(!user) return done({message:"아이디나 비밀번호가 틀렸습니다."},false,null);
      else return done(null, user);
    }));
  return passport;
};
