const Router = require("koa-router");
const { v1 } = require("../../../constants/RouterConstants");
const {
  checkRolesExists,
  validateDuplicate,
} = require("../../../middleware/verifySignup");
const AuthController = require("../../../controllers/AuthController.js");
const HttpStatusCodes = require("../../../constants/HttpStatusCodes");
const responseHelper = require("../../../helpers/responseHelper");
const { verifyRefreshtoken } = require("../../../middleware/authenticated");
const router = new Router({ prefix: v1.auth });
const _ = require("lodash");
const RoleController = require("../../../controllers/RoleController");

router.get("/get-all-roles", async (ctx, next) => {
  let response = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  try {
    response = await RoleController.getAll();
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, response);
  ctx.response.status = responseCode;
});

router.post("/update/role", async (ctx, next) => {
  let response = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  try {
    response = await AuthController.updateUserRole(ctx);
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, response);
  ctx.response.status = responseCode;
  next();
});

router.post("/signin", async (ctx) => {
  let response = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  try {
    response = await AuthController.signin(ctx);
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, response);
  ctx.response.status = responseCode;
});

router.post("/signup", validateDuplicate, checkRolesExists, async (ctx) => {
  let response = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  try {
    response = await AuthController.signup(ctx);
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }

  ctx.body = responseHelper.buildResponse(error, response);
  ctx.response.status = responseCode;
});

router.post(
  "/signup/admin",
  validateDuplicate,
  checkRolesExists,
  async (ctx) => {
    let response = {};
    let error = null;
    let responseCode = HttpStatusCodes.SUCCESS;
    try {
      response = await AuthController.adminSignup(ctx);
    } catch (err) {
      error = err;
      responseCode = HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body = responseHelper.buildResponse(error, response);
    ctx.response.status = responseCode;
  }
);

router.post("/refresh-token", verifyRefreshtoken, async (ctx) => {
  let response = {};
  let error = null;
  let responseCode = HttpStatusCodes.SUCCESS;
  try {
    response = await AuthController.extendedAccess(ctx);
  } catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
  }
  ctx.body = responseHelper.buildResponse(error, response);
  ctx.response.status = responseCode;
});

module.exports = router;
