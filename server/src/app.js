require("dotenv").config();
const Koa = require("koa");
const { koaBody } = require("koa-body");
const routes = require("./routes");
const db = require("./models");
const { errorHandler } = require("./middleware");
const cors = require("@koa/cors");
const Role = db.role;

const logger = require("koa-logger");
const Config = require("./config/app.config");
const logStreamMiddleware = require("./middleware/log-stream-middleware");
const LOGGER = require("./modules/logger")("app");

const app = new Koa();
app.use(logger());
// HTTP Requests Logger
// app.use(logStreamMiddleware());
app.use(errorHandler);
app.use(cors());

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });
//   Role.create({
//     id: 2,
//     name: "captain",
//   });
//   Role.create({
//     id: 3,
//     name: "admin",
//   });
//   Role.create({
//     id: 4,
//     name: "super_admin",
//   });
//   Role.create({
//     id: 5,
//     name: "agent",
//   });
// }
// db.sequelize.sync({ force: false });
//  initial();

app.use(koaBody());
routes.createRoute(app);

app.listen(Config.port, () => {
  LOGGER.info(`Running in PORT: ${Config.port}`);
});
