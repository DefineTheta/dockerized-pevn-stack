const logger = require("./loaders/logger.js");

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// Used to load enviornment variables from file
require("dotenv").config();

// Enables parsing of body and url in requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startServer = async () => {
  // Make a connection to the postgres database
  const database = require("./loaders/database.js");
  await database.connect();

  app.get("/api/status", (req, res) => {
    res.sendStatus(200);
  });

  app.listen(port, () => {
    logger.info(`Server listening at http://localhost:${port}`);
  });
};

startServer();
