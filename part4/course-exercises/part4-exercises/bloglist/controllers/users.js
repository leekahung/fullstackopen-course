const bcrypt = require("bcryptjs");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (_request, response) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return response.status(400).json({
      error: "Username already exist",
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: "Password length must be at least 3 characters long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = userRouter;
