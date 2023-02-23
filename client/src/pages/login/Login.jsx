import React from "react";
import "./login.css";
import back from "../../assets/images/my-account.jpg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

const styling = {
  padding: 20,
};

export const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();

  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  console.log(user)

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Login</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>Username *</span>
            <input type="text" required ref={userRef} />
            <span>Password *</span>
            <input type="password" required ref={passwordRef} />
            <button className="button" type="submit" disabled={isFetching}>
              Log in
            </button>
            <h3 style={styling}>
              Don't have an account?...{" "}
              <span>
                <Link to="/Register">Register</Link>
              </span>
            </h3>
          </form>
        </div>
      </section>
    </>
  );
};
