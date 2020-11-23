const express = require("express");
const moment = require("moment");
const router = express.Router();
const { Post, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const today = moment();
const value = today.format("YYYYMMDD");

router.get("/", isLoggedIn, async (req, res, next) => {
  // TODO 가져오기 LOAD_POST
  try {
    const posts = await Post.findAll({
      where: {
        date: value,
        UserId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  //MONTH DOTO 가져오기 LOAD_DATE_POST
  try {
    const posts = await Post.findAll({
      where: {
        date: req.body.month,
        UserId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/find", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: {
        date: req.body.date,
        UserId: req.user.id,
        content: req.body.content,
      },
    });
    if (posts) {
      res.status(201).json(posts);
    }
    return res.status(201).json(null);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
