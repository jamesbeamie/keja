const userAuth = require("./auth");
const homeResolver = require("./homeResolver");
const bookingResolver = require("./bookingResolver");

const rootResolver = {
  ...userAuth,
  ...homeResolver,
  ...bookingResolver,
};

module.exports = rootResolver;
