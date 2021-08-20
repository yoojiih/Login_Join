import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';   //_actions 폴더에 types.js파일에서 type: 를 가져오는 식으로 설정
export function loginUser(dataToSubmit) {
    // request라는 변수에 지정해주고 서버에다가 request를 날린 후 
    //reponse 받은거에다가 reponse.data 이런식으로 서버에서 받은 데이터를 request 에다가 저장함
    //그 후 return을 시켜서 reducer로 보냄 because, reducer에서 previous state와 action 을 조합해서 다음 next state를 만들어 주는 거기 때문에
    //(previousState, action) => nextState
    //request를 reducer에 넘겨 주는 작업 필요
    
    const request = axios.post('/api/users/login', dataToSubmit)  // request가 backend에서 가져온 모든 데이터를 
        .then(response => response.data)
    //action은 type과 reponse 를 넣어 줘야하니까 //action 은 {type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary'} } 
    //여기선 그냥 reponse를 payload라고 지정
    //이걸 reducer로 보내는 방법은 _reducers폴더에 user_reducer.js 에 지정
    return {
        type: LOGIN_USER,  //types.js파일에서 가져오기 때문에 "LOGIN_USER" 이 아닌 LOGIN_USER로 
        payload: request  // request변수를 payload에다가 넣은것 이걸 user_reducer.js 의 : action.payload } 에 넣어줌  
    }
}

export function registerUser(dataToSubmit) {   //여기 registerUser이름은 registerpage.js의 dispatch(registerUser(body)) 이름과 같아야함
    //그래서 registerpage.js 에서 맨 위에 import { registerUser } from '../../../_actions/user_action'; 해줌
    const request = axios.post('/api/users/register', dataToSubmit) 
     //서버 폴더의 index.js가보면 app.post('/api/users/register', (req,res) => 이렇게 되어있기 때문에 
     // endpoint 똑같이 해줘야 api로 진입 가능 
        .then(response => response.data)  // 이렇게 보내면 서버에서 처리해 data값을 주면

    return {  //type를 바꿔줌 
        type: REGISTER_USER, //types.js에 export const REGISTER_USER = "register_user"; 정의해주고 user_reducer.js로 가서 case문 추가
        payload: request
    }
}


//맨 위 import 에 {AUTH_USER} 추가 & type.js에다가 export const AUTH_USER = "auth_user"; 정의 해줌 & user_reducer.js 에다가 case AUTH_USER: 추가
export function auth() { //get메소드니까 body 부분 필요 없으니 dataToSubmit 삭제  -> user_reducer로 가서 

    const request = axios.get('/api/users/auth')  
    //auth.js 에 가서 Axois.get('/api/users/auth') 이 endpoint이용 하고 post가 아닌 get 메소드로 request보내줘야함 
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}


