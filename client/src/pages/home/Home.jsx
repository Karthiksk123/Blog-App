import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "../../components/blog/Card";
import { Category } from "../../components/category/Category";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Footer } from "../../components/footer/Footer";

export const Home = () => {
  const [post, setPost] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:8080/api/post" + search);
      setPost(res.data);
    };

    fetchPosts();
  }, [search]);

  return (
    <>
      {/*  <Slider />*/}
      <Category />
      <Card post={post} />
      <Footer/>
    </>
  );
};
