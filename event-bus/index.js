const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4005;

// The body parser is used to appropriately parse content of the users JSON request to show properly in the req.body object
app.use(bodyParser.json());

const microservicePorts = ["4000", "4001", "4002", "4003"];
const events = [];

app.get("/events", (_, res) => {
  res.send(events);
});

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  microservicePorts.forEach((port) => {
    axios.post(`http://localhost:${port}/events`, event);
  });

  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Post server listening on port ${port}`);
});
