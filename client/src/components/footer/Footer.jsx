import React from "react";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";

export const Footer = () => {
  return (
    <>
      <footer className="boxItems">
        <div className="container flex">
          <p>Designed & Developed by Karthik - 2023 </p>
          <div className="social">
            <BsFacebook className="icon" />
            <RiInstagramFill className="icon" />
            <AiFillTwitterCircle className="icon" />
            <a href='http://www.linkedin.com/in/developerkarthik'>
              <AiFillLinkedin
                className="icon"
                style={{ cursor: "pointer" }}
              />
            </a>
            <a href="https://github.com/Karthiksk123">
              <AiFillGithub
                className="icon"
                style={{ cursor: "pointer" }}
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
