const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const passportConfig = require("./passport");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const goalRouter = require("./routes/goal");
const postsRouter = require("./routes/posts");
const db = require("./models");

dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("DB Connection ✔");
  })
  .catch(console.error);

const app = express();

passportConfig();

app.use(
  cors({
    origin: "http://localhost:3060", // 모든 서버 허용 '*'
    credentials: true, // 기본값이 false
  })
);
app.use(morgan("dev"));
// 프론트에서 보낸 데이터를 form 데이터를 req.body에 넣어준다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 쿠키와 세션
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET, //시크릿 키를 기반으로 쿠키 생성
  })
);
// passport 사용 미들웨어
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);
app.use("/goal", goalRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
