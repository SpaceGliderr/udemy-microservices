const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 4003;

// The body parser is used to appropriately parse content of the users JSON request to show properly in the req.body object
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`Post server listening on port ${port}`);
});
