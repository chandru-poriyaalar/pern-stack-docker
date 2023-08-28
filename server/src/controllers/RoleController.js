const db = require("../models");
const Role = db.role;

const RoleController = {
  async getAll() {
    return Role.findAll();
  },
};

module.exports = RoleController;
