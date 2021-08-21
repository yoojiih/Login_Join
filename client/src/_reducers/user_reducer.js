//타입을 user_action.js에서 바로 가져오는게 아니라 types.js에서 가져오는 방식이라 여기도 import 해줌
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';
//_aciton 폴더의 user_action.js 에 export 

//(previousState, action) => nextState 형식
export default function (state = {}, action) {  
    //이젠 next state을 리턴 해주면 됨
    //user_action 에서 return 되는 type들이 굉장히 많아(ex) type: LOGIN_USER, type: REGISTER_USER, ... types.js파일에)각기 다른 조치를 취해줘야하기 때문에 switch 문법 씀 
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }  
            break;
            //현재 state는 ...(=spread operator) 즉 state = {}을 그대로 가져오는거라 그냥 빈상태 = 원본 state
            //user_action.js에서의 payload: 를 loginSuccess에다가 넣어준 것  
            //로그인 시 loginSuccess: true 되고 노드 서버측 index.js에  .json({ loginSuccess: true, userId: user._id }) 넣어 놔서  userId가 redux store안에 들어오게 됨  
            //LoginPage.js에 import { loginUser } from '../../../_actions/user_action'; & index.js에 import user from './user_reducer'; 넣어줌
            
        case REGISTER_USER:
            return { ...state, register: action.payload }  //서버에서 가져온 response를 action.payload로 넣어줌
            break;
        case AUTH_USER:
            return { ...state, userData: action.payload }  //서버 측 index.js 라우터에서 모든 것을 처리하고 난후
            //클라이언트에 전해주고 있기 때문에 action.payload에 모든 user데이터가 들어있는 것 그래서 이름을 userData 라고 해줌
            break;
        default:
            return state;
    }
}