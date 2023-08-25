const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { ERR_0999 } = require("../constants/ApplicationErrorConstants");
const db = require("../models");
const User = db.user;
const chalk = require("chalk");
const secret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_SECRET2;

const verifyToken = async (ctx, next) => {
  const splitData1 = _.split(_.get(ctx, "request.url"), "?");

  const splitData2 = _.split(_.get(splitData1, "0"), "/");

  const mainPath = _.last(splitData2);

  const paths = ["view-conversion", "switch-Currency"];

  const websiteAccess =
    ctx.headers.source === "roy-exchange-website" && paths.includes(mainPath);

  if (ctx.headers.authorization) {
    const token = ctx.headers.authorization.split(" ")[1];
    try {
      ctx.request.user = jwt.verify(token, secret);
      console.log("REACHED", ctx.request.user);
      await next();
    } catch (err) {
      ctx.throw(err.status || 401, err.text);
    }
  } else if (websiteAccess) {
    await next();
  } else {
    ctx.throw(401, ERR_0999);
  }
};

const verifyRefreshtoken = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    ctx.throw(401, ERR_0999);
  }
  const token = ctx.headers.authorization.split(" ")[1];
  console.log(token);
  try {
    ctx.request.user = jwt.verify(token, refreshSecret);
    console.log(chalk.green("Refresh token verified 🍺 "));
    console.log(ctx.request.user);
    await next();
  } catch (err) {
    ctx.throw(err.status || 401, err.text);
  }
};

const isAdmin = async (ctx, next) => {
  console.log("ctx", ctx);
  try {
    const user = await User.findByPk(ctx.request.user.id);
    const roles = await user.getRoles();
    const roleNames = _.map(roles, (role) => role.name);

    if (_.includes(roleNames, "admin")) {
      console.log("Welcome Admin");
      await next();
    } else {
      ctx.throw(403, "Require Admin Role!");
    }
  } catch (err) {
    ctx.throw(err.status || 403, err.text);
  }
};

module.exports = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  verifyRefreshtoken: verifyRefreshtoken,
};
