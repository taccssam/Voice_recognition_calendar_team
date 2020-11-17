const dotenv = require("dotenv");

dotenv.config();

const pass = "1234";


module.exports = {
  development: {
    username: "root",
    password: pass,
    database: "nodejs",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: pass,
    database: "nodejs",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: pass,
    database: "nodejs",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
