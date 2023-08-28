const path = require("path");
const morgan = require("koa-morgan");
const rfs = require("rotating-file-stream");
const Config = require("../config/app.config");

const pad = (num) => (num > 9 ? "" : "0") + num;

const fileNameGenerator = () => {
  const date = new Date();
  if (!date) return `${Config.client_name}_requests.log`;

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${day}-${month}-${year}_${Config.client_name}_requests.log`;
};

const requestLogStream = rfs.createStream(fileNameGenerator, {
  interval: "1d",
  compress: true,
  path: "/var/log/requests/",
  maxFiles: 7,
});

module.exports = () =>
  morgan("combined", {
    stream: requestLogStream,
  });
