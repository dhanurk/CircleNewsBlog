const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel.js");

// CREATE BLOG

router.post("/", (req, res) => {
  const newBlog = new Blog({
    blogContent: req.body.text,
    user: req.user._id
  });
  newBlog
    .save()
    .then(Blog => res.json(Blog))
    .catch(err => console.log(err));
});

// COMMENT ON BLOG

router.post("/comment/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then(Blog => {
      const newComment = {
        text: req.body.text,
        user: req.user.id
      };
      Blog.comments.unshift(newComment);
      Blog.save().then(blog => res.json(blog));
    })
    .catch(err => console.log(err));
});

//ALL BLOGS

router.get("/", (req, res) => {
  Blog.find({})
    .populate("user")
    .then(blogs => res.json(blogs))
    .catch(err => console.log(err));
});

//ALL COMMENTS

router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)

    .then(blog => {
      res.json(blog);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
