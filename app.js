import express from 'express'
import bodyParser from 'body-parser'

//서버 생성
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '1gb', extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


//서버 실행
const PORT = 8080;
app.listen(PORT, function(){
  console.log('server running');
});
