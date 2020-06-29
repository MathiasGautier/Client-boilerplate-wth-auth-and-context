import React, { useState, useContext, useEffect, useRef } from "react";
import apiHandler from "../services/apiHandler";
import { AuthContext } from "../Auth/AuthContext";

function Register(props) {
  const [user, setUser] = useState({ username: "", password:"", role:'user'});
  const [message, setMessage] = useState(false);

  const authContext = useContext(AuthContext);
  let timerID= useRef(null);

  useEffect(()=>{
    return ()=>{
        clearTimeout(timerID);
    }
  },[]);
  

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm=()=>{
    setUser({username:'', password:''})
}


  const onSubmit = (e) => {
    e.preventDefault();
    apiHandler.register(user)
    .then((data) => {
     console.log(data)
     const { isAuthenticated, user } = data;
     authContext.setUser(user);
     authContext.setIsAuthenticated(isAuthenticated);
     resetForm();
     setMessage("yes");
     timerID = setTimeout(() => {
       props.history.push("/");
     }, 2000);
    })
    .catch((error)=>{
      setMessage("no");
      resetForm();
      timerID = setTimeout(() => {
        setMessage(false);
      }, 2000);
      console.log(error);
    })
  };

  return (
    <div className="container-fluid mt-5 ">
      <form onSubmit={onSubmit}>
        <h3>Please enter your informations</h3>
        <label htmlFor="username" className="sr-only">
          Username :
        </label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={onChange}
          className="form-control"
          placeholder="Enter user name"
        />
        <label htmlFor="password" className="sr-only">
          Password :
        </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={onChange}
          className="form-control"
          placeholder="Enter password"
        />
        {/* <label htmlFor="role" className="sr-only">
          Role :
        </label>
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={onChange}
          className="form-control"
          placeholder="Enter role (admin/user)"
        /> */}
        <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">
          Register
        </button>
      </form>
      {message === "yes" ? (
          <div className="alert alert-success text-center" role="alert">
            Account successfully created. You can now login.
          </div>
        ) : null}
        {message === "no" ? (
          <div className="alert alert-danger text-center" role="alert">
            We couldn't create your account, please verify your informations.
          </div>
        ) : null}
    </div>
  );
}

export default Register;
