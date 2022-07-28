const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.post("/", async (req, res) => {
  const body = req.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const note = new Note({
    title: body.title,
    description: body.description,
    user: user._id,
  });

  const savedNote = await note.save();
  user.notes.concat(savedNote._id);
  await user.save();
  res.status(201).json(savedNote);
});

notesRouter.delete("/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = notesRouter;
