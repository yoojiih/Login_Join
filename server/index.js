const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User");

//application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 해주는 것
//bodyparser가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 타입으로 된 것을 분석해서 가져올 수 있게 해주기 위해 넣음
app.use(bodyParser.json());
app.use(cookieParser());
//몽구스를 이용해 몽고db와 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, { 
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
//연결 확인용 안됐을땐 catch문으로

app.get('/', (req, res) => res.send('Hello World!~~ '))

app.get('/api/hello', (req, res) => res.send('Hello World!~~ '))
// 입력 값 : user name  id  password 값
app.post('/api/users/register', (req, res) => {
  //register Route
  //회원 가입시 정보들을 client에서 가져오면 DB에 넣어줌
  //json형식으로 id면 아아디 형식으로 들어있는 것으로 body parser를 이용해서 request body로 client 정보를 받아줌
  const user = new User(req.body)
   //user를 이용해서 mongo db에서 제공하는 save 메소드 해주면 모든 정보들이 user모델에 넣어주어 save됨
  user.save((err, userInfo) => {
    //콜백 function을 이용해
    if (err) return res.json({ success: false, err })  //에러시 클라이언트에 json형식으로 에러메시지와 함께 전달
    return res.status(200).json({  //성공시 저장한 userinfo를 클라이언트에 성공했다는 뜻의 status(200)을 json형식으로 success라는 정보 전달 
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  //로그인 기능 login route
  //post메소드를 사용 end point(login)
  //console.log('ping')

  //요청된 아이디를 데이터베이스에서 있는지 찾는다. 
  User.findOne({ id: req.body.id }, (err, user) => {
    //user 모델을 가져오기위해 mongoDB에서 제공하는 findone 메소드 이용해 찾음
    //찾고자 하는 요청된 아이디를 대괄호에 넣고 콜백 function 을 줌 (err, user)
    // console.log('user', user)
    // 유저 콜렉션 안에 해당 아이디을 가진 유저가 한명도 없다면 유저info =user 가 없으니 return시 메시지 날려줌
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 아이디에 해당하는 유저가 없습니다."
      })
    }

    //있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log('err',err)
      // argument는 콜백function을 줘서 에러 OR  ismatch로 입력 비밀번호와 DB내 비밀번호 비교해 맞으면 비밀번호가 맞다는 것을 가져옴
      // 메소드를 user 모델에서 만듦 user.js
      // console.log('isMatch',isMatch)

      // 비밀번호가 틀렸다는 뜻이기에 response를 client에 줄때 loginsuccess를 false로 줌
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

      //비밀번호 까지 맞다면 유저를 위한 토큰을 생성하기.  json web token 라이브러리 이용함 npm install jsonwebtoken --save
      // 사이트 참조 https://www.npmjs.com/package/jsonwebtoken
      // var jwt = require('jsonwebtoken');   -> json web token을 import 해와서 
      // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');  -> sign메소드를 이용해서 합쳐주면 토큰 생성되는 방식임   -user.js에서 구현

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다.  어디에 ?  쿠키 , 로컬스토리지 
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})


// role 1 어드민    role 2 특정 부서 어드민 
// role 0 -> 일반유저   role 0이 아니면  관리자 
app.get('/api/users/auth', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    id: req.user.id,
    role: req.user.role,
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  // console.log('req.user', req.user)
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

const port = 5000 //어플이 5000 번 포트에서 시작

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//nodemon 이용시 서버 끄고 npm run start 하는거 없이 소스변화 감지해 반영 시킴.  = live server?
// npm install nodemon --save dev