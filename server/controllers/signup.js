const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const signUpRouter = require("express").Router();

signUpRouter.post("/", async (request, response) => {
  const { username, password, name } = request.body;

  // throw error if user already exists
  if (await User.findOne({ username })) {
    return response.status(400).json({ error: "user already exists" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(201)
    .json({ token, username: savedUser.username, name: savedUser.name });
});

module.exports = signUpRouter;
