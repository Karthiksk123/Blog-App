import React, { useState } from "react";
import "./details.css";
import "../../components/header/header.css";
import img from "../../assets/images/b5.jpg";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { blog } from "../../assets/data/data";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

export const DetailsPages = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const { user } = useContext(Context);

  const { id } = useParams();
  console.log(id);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:8080/api/post/" + id);
      setBlogs(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      console.log(res.data);
    };

    getPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:8080/api/post/" + id, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {}
  };

  const PF = "http://localhost:8080/images/";

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:8080/api/post/" + id, 
        { username: user.username ,title,desc},
      );
      window.location.reload();
      setUpdateMode(false)
    } catch (error) {}
  };

  return (
    <>
      {blogs ? (
        <section className="singlePage">
          <div className="container">
            {/*} <div className="left">
               <img src={PF + blogs.photo} alt="" />
      </div>*/}
            <div className="right">
              {blogs.username === user.username && (
                <div className="buttons">
                  <button
                    className="button"
                    onClick={() => setUpdateMode((prevState) => !prevState)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button className="button" onClick={handleDelete}>
                    <AiOutlineDelete />
                  </button>
                </div>
              )}
              {updateMode ? (
                <div>
                  <form onSubmit={handleUpdate}>
                    <input
                      type="text"
                      defaultValue={blogs.title}
                      onChange={(e) => setTitle(e.target.value)}
                      autoFocus
                    />

                    <textarea
                      defaultValue={blogs.desc}
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>

                    <button className="button" type="submit">
                      Update Post
                    </button>
                  </form>
                  <Link to={`/?user=${blogs.username}`}>
                    <p>Author: {blogs.username}</p>
                  </Link>
                  <label htmlFor="">
                    {new Date(blogs.createdAt).toDateString()}
                  </label>
                </div>
              ) : (
                <div>
                  <h1>{blogs.title}</h1>
                  <p>{blogs.desc}</p>
                  <Link to={`/?user=${blogs.username}`}>
                    <p>Author: {blogs.username}</p>
                  </Link>
                  <label htmlFor="">
                    {new Date(blogs.createdAt).toDateString()}
                  </label>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};
