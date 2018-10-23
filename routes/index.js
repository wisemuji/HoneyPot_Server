var express = require('express');
var router = express.Router();
module.exports = function(app, Users){
    // CREATE BOOK
    app.post('/test/user', function(req, res){
      var users = new Users();
      users.id = req.body.id;
      users.passwd = req.body.passwd;

      users.save(function(err){
          if(err){
              console.error(err);
              res.json({result: 0});
              return;
          }

          res.json({result: 1});

      });
    });

}
