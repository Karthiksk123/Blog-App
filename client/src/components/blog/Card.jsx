import React from "react";
import "./blog.css";
import { blog } from "../../assets/data/data";
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Link } from "react-router-dom";

export const Card = ({ post }) => {
  return (
    <>
      <section className="blog">
        <div className="container grid3">
          {post.map((item) => (
            <div className="box boxItems" key={item.id}>
              <div className="img">
              {item.cover && 
                <img src={item.cover} alt="" />}
              </div>
              <div className="details">
              {item.category && 
                <div className="tag">
                  <AiOutlineTags className="icon" />
                  <a href="/">#{item.category}</a>
                </div> }
                <Link to={`/details/${item._id}`} className="link">
                  <h2>{item.title}</h2>
                </Link>
                <p>{item.desc.slice(0, 180)}...</p>
                <div className="date">
                  <AiOutlineClockCircle className="icon" />{" "}
                  <label htmlFor="">
                    {new Date(item.createdAt).toDateString()}
                  </label>
                  {/*} <AiOutlineComment className='icon' /> <label htmlFor=''>27</label>
          <AiOutlineShareAlt className='icon' /> <label htmlFor=''>SHARE</label>*/}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
