const {
  ERR_0003,
  ERR_0005,
  ERR_0004,
} = require("../constants/ApplicationErrorConstants");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const db = require("../models");
const ROLES = db.ROLES;
const CryptoUser = db.cryptoUser;
const User = db.user;
const { Op } = require("sequelize");
const responseHelper = require("../helpers/responseHelper");

const validateDuplicate = async (ctx, next) => {
  const { email, contactNumber } = ctx.request.body;
  try {
    const emailExists = await User.findOne({
      where: {
        [Op.or]: [{ email: email.toLowerCase() || "" }],
      },
    });
    const contactNumberExists = await User.findOne({
      where: {
        [Op.or]: [{ contactNumber: contactNumber || "" }],
      },
    });
    if (emailExists) {
      ctx.body = responseHelper.buildResponse({ message: ERR_0003 });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    }
    if (contactNumberExists) {
      ctx.body = responseHelper.buildResponse({ message: ERR_0004 });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    } else {
      console.log("Creating user:", { email, contactNumber });
      await next();
    }
  } catch (err) {
    ctx.body = responseHelper.buildResponse(err);
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }
};
const validateCryptoDuplicate = async (ctx, next) => {
  const { email, contactNumber } = ctx.request.body;
  try {
    const emailExists = await CryptoUser.findOne({
      where: {
        [Op.or]: [{ email: email.toLowerCase() || "" }],
      },
    });
    const contactNumberExists = await CryptoUser.findOne({
      where: {
        [Op.or]: [{ contactNumber: contactNumber || "" }],
      },
    });
    if (emailExists) {
      ctx.body = responseHelper.buildResponse({ message: ERR_0003 });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    }
    if (contactNumberExists) {
      ctx.body = responseHelper.buildResponse({ message: ERR_0004 });
      ctx.response.status = HttpStatusCodes.BAD_REQUEST;
      return;
    } else {
      console.log("Creating user:", { email, contactNumber });
      await next();
    }
  } catch (err) {
    ctx.body = responseHelper.buildResponse(err);
    ctx.response.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }
};

const checkRolesExists = async (ctx, next) => {
  const { roles } = ctx.request.body;
  console.log("roles", roles);
  console.log("ROLES", ROLES);
  if (roles) {
    for (const role of roles) {
      console.log(role);
      if (!ROLES.includes(role)) {
        ctx.body = responseHelper.buildResponse({ message: ERR_0005 });
        console.log("ctx.body", ctx.body);
        ctx.response.status = HttpStatusCodes.BAD_REQUEST;
        return;
      } else {
        await next();
      }
    }
  } else {
    await next();
  }
};

module.exports = {
  validateDuplicate,
  checkRolesExists,
  validateCryptoDuplicate,
};
