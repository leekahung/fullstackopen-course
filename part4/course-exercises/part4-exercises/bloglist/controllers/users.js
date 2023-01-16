const bcrypt = require("bcryptjs");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (_request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users);
});

userRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  if (user) {
    response.json(user);
  } else {
    response.status(404).json({
      error: "Invalid ID or User does not exist",
    });
  }
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
