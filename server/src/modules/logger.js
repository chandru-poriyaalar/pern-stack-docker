const Winston = require("winston");
const { combine, timestamp, printf, colorize, align } = Winston.format;
const DailyRotateFile = require("winston-daily-rotate-file");

const Config = require("../config/app.config");

const APP_NAME = Config.app_name;
const CLIENT = Config.client_name;

const LOGGER = (scope) => {
  const transports = [
    new DailyRotateFile({
      filename: `${APP_NAME}_%DATE%.log`,
      dirname: "/var/log/",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "256m",
      maxFiles: "7d",
      timestamp: true,
      label: scope,
    }),
    new Winston.transports.Console({
      timestamp: true,
      colorize: true,
      label: scope,
      format: Winston.format.combine(
        Winston.format.colorize(),
        Winston.format.simple()
      ),
    }),
  ];
  if (Config.isProduction) {
    // Sentry, Slack Alerts goes here
  }
  return Winston.createLogger({
    level: "info",
    transports,
    format: combine(
      colorize({ all: true }),
      timestamp({
        format: "YYYY-MM-DD hh:mm:ss.SSS A",
      }),
      align(),
      printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    exceptionHandlers: [
      new Winston.transports.File({
        filename: `/var/log/${APP_NAME}.fatal.log`,
      }),
    ],
    exitOnError: false,
  });
};

module.exports = LOGGER;
