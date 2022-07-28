require("dotenv").config();
// const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");

const notesRouter = require("./controllers/notes");

const Note = require("./models/note");

console.log("connnecting to database");
const url = process.env.DATABASE_URI;
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });

/* server.use(express.static("build"));
 */
server.use(express.json());
server.use(cors());

server.get("/", (_, res) => {
  Note.find({})
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      console.log(err);
    });
});

server.use("/api/notes", notesRouter);

// middleware to handle errors
const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
server.use(unknownEndpoint);

const PORT = process.env.PORT;
server.listen(PORT);
console.log(`Server running at http://localhost:${PORT}/`);
