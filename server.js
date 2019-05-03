const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const projectsRouter = require("./routers/projects-router.js");
const actionsRouter = require("./routers/actions-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);
// server.use("/api/ingredients", ingredientsRouter);

module.exports = server;
