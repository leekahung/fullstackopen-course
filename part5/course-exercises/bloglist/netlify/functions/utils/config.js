require("dotenv").config();

const SECRET = "secretKey";
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  SECRET,
  MONGODB_URI,
};
