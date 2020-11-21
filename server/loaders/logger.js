const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const logger = winston.createLogger({
  level: "debug",
});

// Create custom format for log messages
const simpleFile = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// If in production log to rotating files
if (process.env.NODE_ENV === "production") {
  logger.configure({
    level: "info",
    transports: [
      new DailyRotateFile({
        level: "error",
        format: simpleFile,
        filename: "./logs/%DATE%.log",
        datePattern: "DD-MM-YYYY",
        zippedArchive: true,
        maxFiles: "14d",
        frequency: "24h",
      }),
      new DailyRotateFile({
        level: "info",
        format: simpleFile,
        filename: "./logs/%DATE%.log",
        datePattern: "DD-MM-YYYY",
        zippedArchive: true,
        maxFiles: "14d",
        frequency: "24h",
      }),
    ],
  });
}

// If in development log to the console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    })
  );
}

module.exports = logger;
