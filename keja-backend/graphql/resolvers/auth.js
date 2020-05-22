const {
  userRegistration,
  userLogin,
} = require("./controllers/authController/authController");

const userAuth = {
  createUser: userRegistration,
  login: userLogin,
};

module.exports = userAuth;
