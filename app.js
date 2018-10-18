var express = require('express');
var bodyParser = require('body-parser');

//서버 생성
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));


//서버 실행
const PORT = 8080;
app.listen(PORT, function(){
  console.log('server running');
});
