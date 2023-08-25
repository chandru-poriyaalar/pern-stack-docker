const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
const HttpStatusCodes = require("../constants/HttpStatusCodes");
const _ = require("lodash");
const { ERR_0009 } = require("../constants/ApplicationErrorConstants");
const authConfig = require("../config/auth.config");
const secret = authConfig.secret;

const AuthController = {
  async updateUserRole(ctx) {
    const { email, roles } = ctx.request.body;

    return User.findOne({ where: { email } })
      .then((user) => {
        if (roles) {
          return Role.findAll({
            where: {
              name: {
                [Op.or]: roles,
              },
            },
          })
            .then((savedRoles) => {
              return user
                .setRoles(savedRoles)
                .then(() => {
                  return {
                    message: "User role was updated successfully!",
                  };
                })
                .catch((e) => {
                  return Promise.reject("Error in updating user role");
                });
            })
            .catch((e) => {
              return Promise.reject("Error in updating user role");
            });
        } else {
          // user role = 1
          return user
            .setRoles([1])
            .then(() => {
              return {
                message: "User role was updated successfully!",
              };
            })
            .catch((e) => {
              return Promise.reject("Error in updating user role");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  },

  async extendedAccess(ctx) {
    let { data, accessToken } = {};
    let error = null;
    try {
      const userId = _.get(ctx.request.user, "id");
      const phoneNumber = _.get(ctx.request.user, "phoneNumber");
      const email = _.get(ctx.request.user, "email");
      data = await User.findOne({
        where: {
          id: userId,
          contactNumber: phoneNumber,
          email: email,
        },
      });
      if (data === null) {
        return Promise.reject({ message: ERR_0009 });
      } else {
        return {
          email: email,
          accessToken: jwt.sign(
            {
              userId: userId,
              phoneNumber: phoneNumber,
              email: email,
            },
            secret,
            { expiresIn: "168h" }
          ),
        };
      }
    } catch (err) {
      error = err;
      console.log(err);
      ctx.body = err.message;
      ctx.status = HttpStatusCodes.BAD_REQUEST;
    }
  },
};

module.exports = AuthController;
