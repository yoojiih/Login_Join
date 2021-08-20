const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');



const userSchema = mongoose.Schema({

    id: {
        type: String,
        trim: true, // 띄어쓰기 제거
        unique: 1  // 똑같은 아이디 쓰지 못하게
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,  // number =1 이면 관리자 0이면 일반유저
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
}) 
	
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

// index.js 에서의 user.comparePassword(req.body.password, (err, isMatch) => 부분
// comparepassword 이름은 바꿔도 됨. 
userSchema.methods.comparePassword = function (plainPassword, cb) {

    //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
    //plainPassword와 바로 위의 user 스키마의 Password를 비교 
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        // 같지 않으면 콜백으로 에러줌
        if (err) return cb(err);
        //plainPassword암화화 한 것과 같다면 is match 비밀번호는 같다고 = true 를 index.js 에 다시 보내줌  
        cb(null, isMatch);
    })
}
//index.js 에 user.generateToken((err, user) => {   이와같이 콜백 function 이 하나만 들어있기 때문에 그냥 (cb)
userSchema.methods.generateToken = function (cb) {
    var user = this;
    // console.log('user._id', user._id)

    // jsonwebtoken을 이용해서 token을 생성하기 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token 
    // -> 
    // 'secretToken' -> user._id

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // user._id + ''  = token
    //토큰을 decode 한다. 
    jwt.verify(token, 'secretToken', function (err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema) //스키마를 모델로 감싸줘야하기 때문에 (모델의 이름 , 스키마)
module.exports = { User } // 모델을 다른 곳에서도 쓸 수 있게 exports