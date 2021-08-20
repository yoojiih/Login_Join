import React, { useEffect } from 'react';
//import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
//app.js 에서 import Auth from './hoc/auth' 해줘서 모든 페이지 컴포넌트들을 auth hoc에 넣어줌
export default function (SpecificComponent, option, adminRoute = null) {

    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        
        useEffect(() => {
            //백엔드의 index.js의 app.get('/api/users/auth', auth, (req, res) => { 에 get request 요청주면 그 사람의 현재상태를 가져오기 위해 리액트 라이브러리의 useEffect사용  
            //auth라는 미들웨어 부분 const { auth } = require('./middleware/auth'); 서버측 auth.js 로 요청이 가게 됨 
            
            //Axois.get('/api/users/auth') 하지 않고 redux사용 import { useDispatch } from 'react-redux'; 
            // 액션 이름은 auth()   import { auth } from '../_actions/user_action';
            dispatch(auth()).then(response => {  //백엔드에서 처리해서 가져오는 정보들이 response에 들어있음
                console.log(response) //response안에 어떤 정보들이 들어있는지 
                //로그인 하지 않은 상태  여기서 해당 유저가 해당페이지에 들어갈 자격되는 지 알아낸 후에 자격되면 admin component 에 가게 해주고 아니라면 다른 페이지로 보내버림
                if (!response.payload.isAuth) {
                    if (option) { // option == true 와 같음
                        props.history.push('/login')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}