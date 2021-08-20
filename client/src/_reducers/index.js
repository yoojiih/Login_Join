import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
    user
})
//redux가 안에서 하는 일이 어떻게 state 가 변하는지 보여준 후 변한 값을 return해줌 
//여러 state가 있어 reducer가 나눠져 있는데 combine reducer를 이용해 rootreducer에서 하나로 합쳐줌
//로그인, 레지스터 , 인증에관한 기능 을 담당하는 user reducer 만든건데 나중에 여기서 comment 기능을 담당하는 reducer 생성시 합쳐줄 수 있음  ex import comment from './comment_reducer';   user. comment
export default rootReducer;