import Router from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const GoogleLogin = () => {
  const router = useRouter();
  const { accessToken } = router.query;
  
  useEffect(() => {
    const login = () => {
      if (typeof window === "undefined") {
        return;
      }

      return new Promise((resolve, reject) => {
        axios
          .post(`${API_URL}/auth/google/callback`, { accessToken })
          .then((res) => {
            resolve(res);
            console.log(res.data.user)
            console.log(res.data.jwt);
          })
          .catch((error) => {
            reject(error);
            console.log("No Match")
          });
      });
    }
    login()
  }, [])

  const onSignIn = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    Router.push('/')
  }

  return (
    <>
      <h5>Success! You are logged in!</h5>
      <br></br>
      <button
        type="submit"
        className="btn btn-success"
        onClick={onSignIn}
      >Start Shopping</button>
      <br></br>
      <br></br>
      <button
        type="submit"
        className="btn btn-secondary"
        onClick={() => Router.push('/login')}
      >Log Out</button>
    </>
  )
};

  export default GoogleLogin;