const ENVIRONMENT = process.env.NODE_ENV;
const APP_NAME = process.env.APP_NAME || "Poriyaalar";
const CLIENT_NAME = process.env.CLIENT_NAME || "Poriyaalar";
const isProduction = ENVIRONMENT === "production";

const Config = {
  app_name: APP_NAME,
  client_name: CLIENT_NAME,
  env: ENVIRONMENT,
  isProduction,
  aws: {
    core: {
      accessKeyId: "",
      region: "ap-south-1",
      secretAccessKey: "",
    },
    s3: {
      bucket: process.env.S3_BUCKET || "",
      region: "ap-south-1",
      signatureVersion: "v4",
    },
  },
  bcrypt_salt_rounds: 8,
  log: {
    level: process.env.LOG_LEVEL || "debug",
    name: "poriyaalar",
  },
  port: process.env.PORT || 8080,
  logger_stream: isProduction,
};

module.exports = Config;
