module.exports = (app)=>{
  var express = require('express');
  var router = express.Router();
  router.get('/auth', function(req, res){
  	res.send('<h1>Login Success</h1><br><a href="/logout">logout</a>');
  });
  return router;
};
