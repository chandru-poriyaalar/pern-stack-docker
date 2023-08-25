const Router = require("koa-router");
const HttpStatusCodes = require("../../../constants/HttpStatusCodes");
const auth = require("./auth");

const app = new Router();

app.get("/", (ctx) => {
  ctx.body = "API is Live!!" + " Server Time is " + new Date().toISOString();
  ctx.response.status = HttpStatusCodes.SUCCESS;
});

module.exports = { app, auth };
