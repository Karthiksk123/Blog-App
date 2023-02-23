import express from "express";
import {
  addCat,
  checkUser,
  createPost,
  createUser,
  deletePost,
  deleteUser,
  getAllCat,
  getAllPost,
  getPost,
  getUser,
  updatePost,
  updateUser,
} from "../Controller/controller.js";

const route = express.Router();

route.post("/api/register", createUser);
route.post("/api/login", checkUser);
route.put("/api/user/:id", updateUser);
route.delete("/api/user/:id", deleteUser);
route.get("/api/user/:id", getUser);
route.post("/api/post", createPost);
route.put("/api/post/:id", updatePost);
route.delete("/api/post/:id", deletePost);
route.get("/api/post/:id", getPost);
route.get("/api/post", getAllPost);
route.post("/api/category", addCat);
route.get("/api/category", getAllCat);

export default route;
