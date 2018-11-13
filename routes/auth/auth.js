module.exports = (app, Users, passport, rndstring)=>{
  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/signup', async(req,res)=>{
    console.log('post:signup');
    var user = new Users(req.body);
    user.token = rndstring.generate(40);
    try {
      var result = await user.save();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    res.status(200).json(user);
  })
  .post('/signin', async(req,res)=>{
    console.log('post:signin');
    var result = await Users.findOne(req.body)
    if(!result) return res.status(404).json({message : "Not Found"})
    else return res.status(200).json(result)
  })
  .post('/delUser', async (req,res)=>{
    console.log('post:delUser');
    var result = await Users.remove({token : req.body.token})
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    else return res.status(200).json({message : "success!"})
  })
};
