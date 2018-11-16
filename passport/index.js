const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');

module.exports = (Users, rndstring) => {
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    console.log('serialize')
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    console.log('deserialize')
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use('signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'passwd',
        passReqToCallback : true
    },
      async(req, email, password, done)=>{
        console.log('post:signup:passport');
        Users.findOne({ 'email' : email }, function(err, user) {
            if (err) return done(err);
            if (user) {
                return done({message:"같은 이메일이 존재합니다."},false);
              }
            });
        var user = new Users(req.body);
        user.token = rndstring.generate(40);
        try {
          var result = await user.save();
        }catch(e){
          if(e instanceof user_duplicate)
            return done(null, false);
          if(e instanceof ValidationError)
            return done(null, false);
          if(e instanceof paramsError)
            return done(null, false);
        }
        return done(null, user);
      }
    ));

  passport.use('signin', new LocalStrategy({ // local 전략을 세움
      usernameField: 'email',
      passwordField: 'passwd',
      session: false, // 세션에 저장 여부
  }, async (email, passwd, done)=>{
      console.log('post:signin:passport');
      var user = await Users.findOne({email: email, passwd: passwd}, {__v: 0, _id:0});
      if(!user) {return done({message:"아이디나 비밀번호가 틀렸습니다."},false);
      console.log('incorrect id or passwd');}
      else return done(null, user);
    }));
  return passport;
};
