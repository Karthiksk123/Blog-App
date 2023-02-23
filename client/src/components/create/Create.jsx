import React from "react";
import "./create.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (error) {}
    }
    try {
      const res = await axios.post("/post", newPost);
      window.location.replace("/details/" + res.data._id);
    } catch (error) {}
  };

  return (
    <>
      <section className="newPost">
        <div className="container boxItems">
          {file && (
            <div className="img ">
              <img
                src={URL.createObjectURL(file)}
                alt="image"
                class="image-preview"
              />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="inputfile flexCenter">
              <input type="file" id=''  accept="image/*" alt="img" onChange={e=>setFile(e.target.files[0])}/>
            </div>
            <input type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)}/>

            <textarea name="" id="" cols="30" rows="10" onChange={e=>setDesc(e.target.value)}></textarea>

            <button className="button" type="submit">Create Post</button>
          </form>
        </div>
      </section>
    </>
  );
};
