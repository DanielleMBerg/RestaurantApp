import React, { useState, useContext } from "react";
import { login } from "../components/auth";
import AppContext from "../components/context";
import { Card } from "../components/card";
import Router from "next/router";

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
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
              <div id="g_id_onload"
                data-client_id="546276158927-k0rt1nn5vpe5lj74h4kofda95d2u1dhg.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-login_uri={`${API_URL}/connect/google/`}
                data-auto_prompt="false">
              </div>
              <div className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
                data-width="300">
              </div>
            </form>
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
