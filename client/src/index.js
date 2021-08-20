import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
//middle ware를 이용해야지 object 객체에서만 받는 redux store가 promise 와 function도 받음
//redux가 안에서 하는 일이 어떻게 state 가 변하는지 보여준 후 변한 값을 return해줌 

//화면에 표시되는 부분  =APP.js  보여주고 싶은 component를 넣어줌
//처음 react 설치시 ReactDOM.render(<App />, document.getElementById('root')); 로 되어있었음  --public 폴더에 index.html 보면 나옴
//webpack이 관리하는 부분은 src 만!! 그래서 public부분에 이미지 파일넣지 않음
ReactDOM.render(
    <Provider
        store={createStoreWithMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}  // redux dev tool.  redux를 프로젝트에 연결시킴
    >
        <App />
    </Provider>   //provider로 감싸주면 redux랑 app 이랑 연결시켜줌 
    , document.getElementById('root'));

serviceWorker.unregister();