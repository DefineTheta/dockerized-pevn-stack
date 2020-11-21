const { Model } = require("objection");
const logger = require("./logger.js");

const connect = async () => {
  let connectionTries = 1;

  // Retry connection to databse after failed attempts
  while (connectionTries <= process.env.PG_CONNECTION_RETRIES) {
    // Connect to the postgres database through Knex
    const knex = require("knex")({
      client: "pg",
      connection: process.env.PG_CONNECTION_STRING,
      debug: process.env.DATABASE_DEBUG,
    });

    try {
      // Check to see if the connection was successfully made
      await knex.raw("select 1+1 as result");

      logger.info("Successfully connected to database!");

      // Give the knex client to objection.js
      Model.knex(knex);

      break;
    } catch (err) {
      logger.info(
        `Failed to connect to database. Tried ${connectionTries} times.`
      );

      logger.log(err);
      connectionTries++;

      // Wait specified amount of time between failed attempts
      await new Promise((res) =>
        setTimeout(res, process.env.PG_CONNECTION_INTERVAL)
      );
    }
  }
};

module.exports = { connect };