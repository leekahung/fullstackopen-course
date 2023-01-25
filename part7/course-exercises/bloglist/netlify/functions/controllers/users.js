const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

userRouter.get("/", async (_request, response) => {
  const allUsers = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(allUsers);
});

userRouter.get("/:id", async (request, response) => {
  let checkUser;

  if (request.query.loginToken) {
    checkUser = await User.findById(request.params.id);

    if (checkUser.loginToken !== request.query.loginToken) {
      return response.status(401).json({
        error: "Mismatched tokens",
      });
    }

    return response.status(200).end();
  }

  const user = await User.findById(request.params.id).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  if (user) {
    return response.json(user);
  }

  response.status(404).json({
    error: "User not found",
  });
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "Username already exist in database",
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
    loginToken: "",
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

userRouter.put("/:id", async (request, response) => {
  const user = await User.findByIdAndUpdate(
    request.params.id,
    { loginToken: "" },
    { new: true }
  );

  await user.save();
  response.status(202).end();
});

module.exports = userRouter;
