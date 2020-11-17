const express = require("express");
const moment = require("moment");
const router = express.Router();
const { Post, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const today = moment();
console.log(today);
const value = today.format("YYYYMMDD");
console.log(value);

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      date: req.body.date,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/", (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
