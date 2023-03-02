const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
const port = 4001;

// The body parser is used to appropriately parse content of the users JSON request to show properly in the req.body object
app.use(bodyParser.json());
// Enable CORS
app.use(cors());

// Memory
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const { content } = req.body;
  const id = req.params.id;
  const commentId = randomBytes(4).toString("hex");

  const comments = commentsByPostId[id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[id] = comments;

  res.status(201).send(commentsByPostId[id]);
});

app.listen(port, () => {
  console.log(`Post server listening on port ${port}`);
});
