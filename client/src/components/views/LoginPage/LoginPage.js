import React, { useState } from 'react'
import { useDispatch } from 'react-redux';  //dispatch
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
function LoginPage(props) {
    const dispatch = useDispatch();
    //dispatch(action)을 이용해서 action 취함 \
    //action 은 {type: 'LIKE_ARTICLE', articleId: 42 }
    //          {type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary'} }   -> mary liked article 42 이런식으로 action취하고 
    //action 다음에 reducer
    //reducer 
    //(previousState, action) => nextState
    //이전 State와 action object를 받은 후에 nextstate를 return함.


// 이 안에서 데이터들에 변화를 주려면 state
//타이핑을 할 때 state 를 바꿔주면 value 값이 바뀌도록 onchange라는 이벤트를 발생시켜 state를 바꿔주고 state가 변하면 value값이 변하는 기능 
//usestate는 리엑트 라이브러리에서 가져올 수 있음
    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)  //setId 을 이용해 state를 바꿔줄 수 있음
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();  //페이지 리프레시가 되면 밑에 기능들이 수행되지 못하니까 refresh 방지용

        let body = {
            id: Id,
            password: Password
        }
        //dispatch 의 action 이름을 loginuser   
        //action폴더의 user_action.js 에 export function loginUser(dataToSubmit) 넣어줘서 loginpage.js에서 구현한걸
        //user_action.js에서 하게 해줌
        //loginSucess까지 완료 후 landing 페이지 즉 처음페이지(루트페이지)로 이동 시켜주는거 구현
        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')  //리엑트에서 페이지 이동시 props.history.push이용 function LoginPage(props) {에서 props 넣어 줬기 때문에 가능
                } else {
                    alert('Error˝')
                }
            })
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} 
                onSubmit={onSubmitHandler}
            >  
                <label>ID</label>
                <input type="id" value={Id} onChange={onIdHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)