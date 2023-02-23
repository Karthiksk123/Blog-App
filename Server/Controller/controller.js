import User from "../Model/user.js";
import bcrypt from "bcrypt";
import Post from "../Model/post.js";
import Categories from "../Model/category.js";

export const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      username: req.body.username,
      password: hashedPass,
      email: req.body.email,
    });

    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("Error While creating new user", error.message);
  }
};

export const checkUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(500).json("Username is Incorrect");
    }

    const validate = await bcrypt.compare(req.body.password, user.password);

    if (!validate) {
      return res.status(500).json("Password is incorrect");
    }

    const { password, ...other } = user._doc;

    return res.status(200).json(other);
  } catch (error) {
    res.status(500).json("Error while checking the user", error.message);
  }
};

export const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      return res.status(200).json(updateUser);
    } catch (error) {
      return res
        .status(500)
        .json("Error while updating the user ", error.message);
    }
  } else {
    return res.status(501).json("you can't update your account");
  }
};

export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await post.deleteMany({ username: user.username });

        await User.findByIdAndDelete(req.params.id);

        return res.status(200).json("User has been deleted...");
      } catch (error) {
        return res
          .status(500)
          .json("Error while deleting the user ", error.message);
      }
    } catch (error) {
      return res.status(501).json("User not found ..", error.message);
    }
  } else {
    return res.status(502).json("User not Found...");
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { passwor, ...other } = user._doc;

    return res.status(200).json(other);
  } catch (error) {
    return res.status(500).json("Error while getting the user", error.message);
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    const savePost = await newPost.save();
    return res.status(200).json(savePost);
  } catch (error) {
    return res
      .status(500)
      .json("Error while creating new post ", error.message);
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );

        return res.status(200).json(updatePost);
      } catch (error) {
        return res
          .status(500)
          .json("Error while updating the post ...", error.message);
      }
    } else {
      return res.status(501).json("Username is incorrect", error.message);
    }
  } catch (error) {
    return res.status(502).json("Cannot find any post...", error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        await post.delete();
        return res.status(200).json("Post has been deleted...");
      } catch (error) {
        return res
          .status(500)
          .json("Error while deleting the post ", error.message);
      }
    } else {
      return res.status(502).json("username is incorrect...");
    }
  } catch (error) {
    return res.status(503).json("Cannot find the Post", error.message);
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res
      .status(500)
      .json("Error while getting the post...", error.message);
  }
};

export const getAllPost = async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;

    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res
      .status(500)
      .json("Error while getting All the posts", error.message);
  }
};

export const addCat = async (req, res) => {
  try {
    const newCat = await Categories.create(req.body);
    const saveCat = await newCat.save();

    return res.status(200).json(saveCat);
  } catch (error) {
    return res.status(500).json("Error while adding category", error.message);
  }
};

export const getAllCat = async (req, res) => {
  try {
    const allCat = await Categories.find();
    return res.status(200).json(allCat);
  } catch (error) {
    return res
      .status(500)
      .json("Error while getting all the categories", error.message);
  }
};
