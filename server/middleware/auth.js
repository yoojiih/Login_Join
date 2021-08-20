const { User } = require('../models/User');

let auth = (req, res, next) => {
    //인증 처리
    //클라이언트 쿠키에서 토큰을 가져온다.

    let token = req.cookies.x_auth;  
    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => { //쿠키 안에다가 토큰을 집어넣어놓 것 
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })


        // console.log('userh', user)

        req.token = token;
        req.user = user;
        next();
    })
} // 로그인 한 유저 여부 판단해 다시 리액트 부분에 서버측 index.js 로 정보전달해 주는 api
 // app.get('/api/users/auth', auth, (req, res) => {res.status(200).json({_id: req.user._id,isAdmin: req.user.role === 0 ? false : true, ...
// 이부분에 request날리면 됨
module.exports = { auth };