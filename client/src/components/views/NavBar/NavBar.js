import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import './NavBar.css';

function NavBar(props) {
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
      axios.get(`${USER_SERVER}/logout`).then(response => {
        if (response.status === 200) {
          props.history.push("/login");
        } else {
          alert('Log Out Failed')
        }
      });
    };
    
    if (user.userData && !user.userData.isAuth) {
      return (
        <div className="nav">
          <div className="logo">
            <a href="/">EDDIE`s ASSIGNMEMT</a>
          </div>
          <div className="menu">
            <a href="/login">로그인</a>
            <a href="/register">회원가입</a>
          </div>
      </div>
      )
    } else {
      return (
        <div className="nav">
          <div className="logo">
            <a href="/">EDDIE`s ASSIGNMEMT</a>
          </div>
          <div className="menu">
            <a onClick={logoutHandler}>로그아웃</a>
          </div>
        </div>
      )
    }
  }

export default withRouter(NavBar);
