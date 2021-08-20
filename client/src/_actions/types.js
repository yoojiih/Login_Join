export const LOGIN_USER = "login_user";  //타입을 따로 지정 
export const REGISTER_USER = "register_user";
export const AUTH_USER = "auth_user";
//_Action 과  _reducers 는 redux를 위한 폴더들  모든타입을 여기다가 지정함
//그래서 _reducers 폴더의 user_reducer.js 에서도 타입을 _actions폴더의 user_action.js에서 바로 가져오는게 아니라 types.js에서 가져오는 방식
// redux는 상태관리 라이브러리  26
// npm install redux react-redux redux-promise redux-thunk --save 
//리엑트에는 props vs state 
//props는 property의 줄임 
//state 는 mutable

// redux는 index.js에서 구현