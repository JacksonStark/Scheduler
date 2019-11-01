import React, {useState, useReducer} from 'react';

const fakeLogin = (email, password, callback) => {
  setTimeout(() => {
    if (email === "1@1" && password === "password") {
      callback(true);
    } else {
      callback(false);
    }
  }, 1000);
};

const loginLookup = {
  login: (state, action) => {
    const newState = {...state, waiting: true }    
    console.log("NEW STATE WHO DIS", action.type,  newState);
  },
  success: (state, action) => {
    const newState = {...state, waiting: true }    
    console.log("NEW STATE WHO DIS", action.type,  newState);
  },
  fail: (state, action) => {
    const newState = {...state, waiting: true }    
    console.log("NEW STATE WHO DIS", action.type,  newState);
  },
  logout: (state, action) => {
    const newState = {...state, waiting: true }    
    console.log("NEW STATE WHO DIS", action.type,  newState);
  },
  updateEmail: (state, action) => {
    const newState = {...state, waiting: true }    
    console.log("NEW STATE WHO DIS", action.type,  newState);
  },
  updatePassword: (state, action) => {
    const newState = {...state, waiting: true }    
    console.log("NEW STATE WHO DIS", action.type,  newState);
  }

};

const loginReducer = (state, action) => {
  return loginLookup[action.type](state, action);

  // if(action.type === 'login'){
  //   const newState = {...state, waiting: true }    
  //   console.log("NEW STATE WHO DIS", action.type,  newState);
  //   return newState;
  // } else if (action.type === 'success') {
  //   const newState = {...state, email: '', password: '', loggedin: true, waiting: false, error: ''}
  //   console.log("NEW STATE WHO DIS", action.type, newState);  
  //   return newState;
  // } else if (action.type === 'fail') {
  //   const newState = {...state, email: '', password: '', loggedin: false, waiting: false, error: 'Incorrect Email or Password' }
  //   console.log("NEW STATE WHO DIS", action.type, newState);  
  //   return newState;
  // } else if (action.type === 'logout') {
  //   const newState = {...state, loggedin: false}
  //   console.log("NEW STATE WHO DIS", action.type, newState);  
  //   return newState;
  // } else if (action.type === 'updateEmail'){
  //   const newState = {...state, email: action.value}
  //   console.log("NEW STATE WHO DIS", action.type, newState);
  //   return newState;
  // } else if (action.type === 'updatePassword'){
  //   const newState = {...state, password: action.value}
  //   console.log("NEW STATE WHO DIS", action.type, newState);
  //   return newState;
  // }
}
const initialValue = {
  email: '',
  password: '',
  loggedin: false,
  waiting: false,
  error: ''
};
  
function ReduceLogin() {
  let [loginState, dispatchLoginState] = useReducer(loginReducer, initialValue);
  const login = event => {
    event.preventDefault();
    dispatchLoginState({type: 'login'});
    fakeLogin(loginState.email, loginState.password, success => {
      if (success) {
        dispatchLoginState({type: 'success'});
      } else {
        dispatchLoginState({type: 'fail'});
      }
    });
  };
  return (
    <div className="App">
      {loginState.loggedin && (
        <div>
          <h2>You are logged in!</h2>
          <button
            onClick={() => {
              dispatchLoginState({type: 'logout'});
            }}
          >
            logout
          </button>
        </div>
      )}
      {loginState.loggedin || (
        <form onSubmit={login}>
          <p>{loginState.error}</p>
          <label>
            Email:
            <input
              type="email"
              value={loginState.email}
              onChange={e => {
                dispatchLoginState({type: 'updateEmail', value: e.target.value});
              }}
            />
          </label>
          <label>
            password:
            <input
              type="password"
              value={loginState.password}
              onChange={e => {
                dispatchLoginState({type: 'updatePassword', value: e.target.value});
              }}
            />
          </label>
          <input type="submit" disabled={loginState.waiting} value="login" />
        </form>
      )}
    </div>
  );
}

export default ReduceLogin;