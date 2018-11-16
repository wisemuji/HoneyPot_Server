module.exports = (app, Users, passport, rndstring)=>{
  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/signin', function (req, res, next) {
    passport.authenticate('signin', function (error, user, info) {
      // this will execute in any case, even if a passport strategy will find an error
      // log everything to console
      console.log(error);
      console.log(user);
      console.log(info);

      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        res.status(401).send(info);
      } else {
        res.status(200).json(user);
      }
      res.status(401).send(info);
    })(req, res);
    // successRedirect : '/',
    // failureRedirect : '/', //가입 실패시 redirect할 url주소
  })

  .post('/signup', function (req, res, next) {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('signup', function (error, user, info) {
      // this will execute in any case, even if a passport strategy will find an error
      // log everything to console
      console.log(error);
      console.log(user);
      console.log(info);

      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        res.status(401).send(info);
      } else {
        res.status(200).json(user);
      }
      res.status(401).send(info);
    })(req, res);
  })

  .post('/delUser', async (req,res)=>{
    console.log('post:delUser');
    var result = await Users.deleteOne({token : req.body.token})
      console.log(req.body);
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    else return res.status(200).json({message : "success!"})
  })
  .post('/aa', async(req,res)=>{
    var result = await Users.find()
    res.send(result)
  })
  .get('/auto/:token', async(req,res)=>{
    var result = await Users.findOne({token : req.params.token})
    if(!result) return res.status(404).json({message : "User Not Found!"})
    var data = {
      token : result.token,
      triMandalChk : result.triangleMandalArt.triangleMandalChk,
      name : result.name,
      title : result.userMandalArt.title,
      startDay : result.userMandalArt.startDay,
      MandalChk : result.MandalChk,
      achievement : result.userMandalArt.achievement,
      triTitle : result.triangleMandalArt.title
    }
    return res.status(200).json({data : data})
  })
};
