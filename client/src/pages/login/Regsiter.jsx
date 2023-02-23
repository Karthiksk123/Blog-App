import React, { useEffect } from "react";
import "./login.css";
import back from "../../assets/images/my-account.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const styling = {
  padding: 20,
};

export const Regsiter = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/register", {
        username,
        email,
        password,
      });

      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Register</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={handlesubmit}>
            <span>Email address *</span>
            <input
              type="text"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Username *</span>
            <input
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Password *</span>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {/*<span>Confirm Password *</span>
  <input type="password" required onChange={(e)=>setPassword(e.target.value)}/> */}
            <button className="button">Register</button>
            <h3 style={styling}>
              Already have an account?...{" "}
              <span>
                <Link to="/Login">LOGIN</Link>
              </span>
            </h3>
            {error && (
              <span style={{ color: "red" }}>
                Use a correct Credentials,Something wrong
              </span>
            )}
          </form>
        </div>
      </section>
    </>
  );
};
