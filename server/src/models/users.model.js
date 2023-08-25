module.exports = (sequelize, Sequelize) => {
  return sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },

    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    contactNumber: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "pending",
    },
    verifiedAccount: {
      type: Sequelize.BOOLEAN,
      defaultValue: "false",
    },
    verifyOtp: {
      type: Sequelize.STRING,
    },
    walletCurrency: {
      type: Sequelize.STRING,
      defaultValue: "inr",
    },
    address: {
      type: Sequelize.STRING,
    },
    referralId: {
      type: Sequelize.STRING,
    },
    forgotPasswordOtp: {
      type: Sequelize.INTEGER,
    },
  });
};
