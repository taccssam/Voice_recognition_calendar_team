const express = require("express");
const moment = require("moment");
const router = express.Router();
const { Post, User, Goal } = require("../models");
const { isLoggedIn } = require("./middlewares");

const today = moment();
const value = today.format("YYYYMMDD");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const goal = await Goal.create({
      goalTitle: req.body.goalTitle,
      startLine: req.body.startLine,
      endLine: req.body.endLine,
      checkTotal: req.body.checkTotal,
      UserId: req.user.id,
    });
    res.status(201).json(goal);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/load", isLoggedIn, async (req, res, next) => {
  try {
    const goal = await Goal.findAll({
      where: {
        UserId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(201).json(goal);
  } catch (err) {
    console.error(err);
    next(error);
  }
});

module.exports = router;
