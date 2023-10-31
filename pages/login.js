import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { login } from "../components/auth";
import AppContext from "../components/context";
import { Card } from "../components/card";
import Router from "next/router";
import GoogleButton from 'react-google-button'

const Login = () => {
  const { currentUser, setCurrentUser, setViewMode } = useContext(AppContext);
  const router = useRouter();
  const [emailInput, setEmailInput]         = useState(null);
  const [passwordInput, setPasswordInput]   = useState(null);
  const [show, setShow]                     = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  }
  
  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    setShow(false);
    login(emailInput, passwordInput)
      .then((res) => {
        setCurrentUser(res.data.user.username);
      })
      .catch((error) => {
        console.log(error)
        alert("Information entered does not match our records.")
      });
  }

  const handleLogOut = () => {
    setCurrentUser("");
    setShow(true);
    setEmailInput(null);
    setPasswordInput(null);
    setViewMode("restaurant")
  }

  return (
    <Card
      header="Log In"
      body= {
        show ? (
          <>
            <form>
              <label>Email Address</label>
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Enter email"
                onChange={handleEmailChange}
              />
              <br></br>
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                onChange={handlePasswordChange}
              />
              <br></br>
              <button
                id="account submit"
                type="submit"
                className="btn btn-success"
                disabled={emailInput && passwordInput ? false : true}
                onClick={handleLogIn}
              >Log In</button>
              <br></br>
              <br></br>                            
            </form>
              <hr></hr>
            <GoogleButton
            className="google"
              type="light" 
              onClick={() => router.push('http://localhost:1337/connect/google')}
            />



          </>
        ):(
          <>
            <h5>Success! { currentUser }, you are logged in!</h5>
            <br></br>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => Router.push("/")}
            >Start Shopping</button>
            <br></br>
            <br></br>
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={handleLogOut}
            >Log Out</button>
            </>
        )
      }
    ></Card>
  );
}

export default Login;
