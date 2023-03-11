const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 4005;

// The body parser is used to appropriately parse content of the users JSON request to show properly in the req.body object
app.use(bodyParser.json());

const microserviceEndpoints = [
  "posts-clusterip-srv:4000",
  "comments-srv:4001",
  "query-srv:4002",
  "moderation-srv:4003",
];
const events = [];

app.get("/events", (_, res) => {
  res.send(events);
});

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  microserviceEndpoints.forEach((endpoint) => {
    axios.post(`http://${endpoint}/events`, event);
  });

  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Post server listening on port ${port}`);
});
