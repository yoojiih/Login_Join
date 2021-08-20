import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//cd client   후에 npm install react-router-dom --save
//react router dom  사용방법-  https://reacttraining.com/react-router/web/example/basic 
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'
//App.js는 Routing 관련 일 시키는 곳 
function App() {
  return (
    <Router>
      <div>
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch> 
          <Route exact path="/" component={Auth(LandingPage, null )  } />
          {/*<Route exact path="/"> 
                Auth(LandingPage, null ) 를 깔끔하게 한줄로 표현한 것 */}
          <Route exact path="/login" component={Auth(LoginPage, false) } />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          {/* auth로 페이지들을 감싸줌 export default function (SpecificComponent, option, adminRoute = null) {
              option 종류
              null    =>  아무나 출입이 가능한 페이지e
              true    =>  로그인한 유저만 출입이 가능한 페이지
              false   =>  로그인한 유저는 출입 불가능한 페이지 */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;