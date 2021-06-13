const express = require("express");
const actionRouter = require("./actions/actions-router");
const projectRouter = require("./projects/projects-router");

const server = express();

server.use(express.json());
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("*", (req, res) => {
  res.send(`<h2>this better effin work</h2>`);
});

module.exports = server;

